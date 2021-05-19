#!/usr/bin/python

import mysql.connector
import re
from tqdm import tqdm
# iterate over the database table and read data
# files table will store the files that have been uploaded.  
mydb = mysql.connector.connect( host="localhost",user="nupur",password="casper7197",database="PE",auth_plugin='mysql_native_password')
mycursor = mydb.cursor()
mycursor.execute("SELECT * FROM files")
reports_to_update = mycursor.fetchall()

# the input report will be parsed against these arrays. We'll try to find the site based upon this corpus.

# corpus[] stores the site mentioned in corpus_site
mycursor.execute("SELECT * FROM corpus_site")
corpus = mycursor.fetchall()
print('length of corpus: ',len(corpus))

# biopsy[] stores the site mentioned in biopsy
mycursor.execute("SELECT * FROM corpus_biopsy")
biopsy = mycursor.fetchall()

f = open("/home/nupur/Desktop/PE/code/res.txt", "w")
f.write("Now the file has more content!")
f.close()

# # ============================================================ the corpus has duplicates. corpus length = 22968. diag_list = 4464.
# diag[] stores the diagnosis from corpus_diagnosis
mycursor.execute("SELECT * FROM corpus_diagnosis")
diag = mycursor.fetchall()
diag_list = []

for i in tqdm(range(len(diag))):
  if diag[i][1] not in diag_list:
    diag_list.append(diag[i][1])
    
print('length of diag is : ',len(diag_list))    

# # =============================================================
print('arrays ready')
# remove \n \t. (L) and (R) with left, right. converted to lowercase.
def clean(i):
  data = i.replace("\n"," ").replace("\t"," ").replace('(L)','left').replace('(R)','right').replace('(',' ').replace(')',' ').replace(',',' ')
  data = data.lower()
  return data
print('after clean')

# splitting the data based on final impression or impression.
# if the report cannot be split, it cannot be processed. We'll be storing them with site - unspecified.
def final_impression_split(data):
  final_impression = ''
  if "final impression" in data:
    final_impression = data.split('final impression',1)[1]
  elif "impression" in data:
    final_impression = data.split('impression',1)[1]
  elif "Impression" in data:
    final_impression = data.split('Impression',1)[1]
  elif "Final Impression" in data:
    final_impression = data.split('Final Impression',1)[1]
  return final_impression

print('final imp split')
# remove note, comment section.
def remove_note_comment(final_impression):
  if 'note' in final_impression:
    final_impression = final_impression.split('note',1)[0]
  elif 'comment' in final_impression:
    final_impression = final_impression.split('comment',1)[0]
  return final_impression

print('remove note')
# remove special symbols
def remove_special_symb(final_impression):
  final_data=final_impression.replace('–',' ').replace('.',' ').replace(';',' ').replace(':',' ').replace('/',' ')
  # print(final_data)
  return final_data
  
# convert the list of tokens to string
def listToString(s):   
  str1 = " " 
  return (str1.join(s))

print('list to string')
# match against biopsy. If not found, check tokens in corpus[]
def get_loc(biopsy,corpus,final_data):
  locData = []
  flag = 0
  for j in biopsy:
    if j in final_data:
      locData.append(j)
      flag = 1
      break
  if flag == 0: 
    s = re.split(', |_|-|!|\.|\. | ', final_data)
    l = []
    for j in s:
      if j in corpus:
        print('token in corpus: ',j)
        l.append(j)
    t = listToString(l)
    if t != '': 
      print('t is :',t)
      locData.append(t)
  return locData
  

#################Diagnosis Part##########
import requests


def query_raw(text, url="https://bern.korea.ac.kr/plain"):
    return requests.post(url, data={'sample_text': text}).json()
def get_diag_helper(text,query):
    spans=[]
    try:
        for i in query['denotations']:
            spans.append(i['span'])
        final=[]
        for s in spans:
            final.append(text[s['begin']:s['end']])
    except:
        return []
    return final
    
# ============================================================================ if diag not present in the corpus, insert it
def get_diag(x):
  temp=get_diag_helper(x,query_raw(x))
  diagnosis=[]
  try:
      diagnosis.append((temp[:-1],temp[-1]))
  except:
      pass
  if(len(diagnosis) > 0 and diagnosis[0][1] in diag_list ):
    print('diag in corpus: ',diagnosis[0][1])
  else:
    sql = "INSERT INTO files (diagnosis) VALUES (%s)"
    d = diagnosis[0][1]
    mycursor.execute(sql,(d))
    mydb.commit()
  return diagnosis

# =============================================================================

processed_corpus=[tup[1] for tup in corpus]
processed_biopsy=[tup[1] for tup in biopsy]


for tup in reports_to_update:	
  data=tup[1]
  data=clean(data)
  final_impression=final_impression_split(data)
# couldn't be split.
  if final_impression=='':
    sql = "INSERT INTO repos (report,site,diagnosis) VALUES (%s, %s, %s)"
    site='undefined'
    d='undefined'
    mycursor.execute(sql,(data,site,d))
    mydb.commit()
    continue

  print('report: ',tup[1])
  final_impression=remove_note_comment(final_impression)
  final_impression=remove_special_symb(final_impression)
  print('before get location')
  location=get_loc(processed_biopsy,processed_corpus,final_impression)
  print('after get location')
  print('before get diag')
  diagnosis=get_diag(data)
  print('after get diag')
  print('final impression: ',type(final_impression))
  print('length of diagnosis : ',len(diagnosis))
  if len(diagnosis) > 0:
    print('other diag is :',diagnosis[0][0])
    print('len of other diag : ',len(diagnosis[0][0]))
  if len(location)>0 and len(diagnosis)>0:
    print("succ")
    sql = "INSERT INTO repos (report,site,other_diagnosis,diagnosis) VALUES (%s, %s, %s,%s)"
    site=location[0]
    d=diagnosis[0][1]
    if len(diagnosis[0][0]) == 0:
      od = ''
      sql = "INSERT INTO repos (report,site,diagnosis) VALUES (%s, %s,%s)"
      mycursor.execute(sql,(data,site,d))
    else:
      od=''.join(diagnosis[0][0])
      sql = "INSERT INTO repos (report,site,other_diagnosis,diagnosis) VALUES (%s, %s, %s,%s)"
      mycursor.execute(sql,(data,site,od,d))
    mydb.commit()
  elif len(location)>0:
    sql = "INSERT INTO repos (report,site,other_diagnosis,diagnosis) VALUES (%s, %s, %s,%s)"
    site=location[0]
    od='undefined'
    d='undefined'
    mycursor.execute(sql,(data,site,od,d))
    mydb.commit()
  elif len(diagnosis)>0:
    sql = "INSERT INTO repos (report,site,other_diagnosis,diagnosis) VALUES (%s, %s, %s,%s)"
    site='undefined'
    d=diagnosis[0][1]
    if len(diagnosis[0][0]) == 0:
      od = ''
      sql = "INSERT INTO repos (report,site,diagnosis) VALUES (%s, %s,%s)"
      mycursor.execute(sql,(data,site,d))
    else:
      od=''.join(diagnosis[0][0])
      sql = "INSERT INTO repos (report,site,other_diagnosis,diagnosis) VALUES (%s, %s, %s,%s)"
      mycursor.execute(sql,(data,site,od,d))
    mydb.commit()
  else:
    print('Not parsed')
    sql = "INSERT INTO repos (report,site,other_diagnosis,diagnosis) VALUES (%s, %s,%s,%s)"
    site='undefined'
    od='undefined'
    d='undefined'
    mycursor.execute(sql,(data,site,od,d))
    mydb.commit()
  
    
# remove all data from files. 
# TRUNCATE TABLE yourTableName.
#sql = "TRUNCATE TABLE files;"
#mycursor.execute(sql)
#mydb.commit()


print('deleted data from files.')



