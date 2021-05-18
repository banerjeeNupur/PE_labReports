#!/usr/bin/python

import mysql.connector
import re

# iterate over the database table and read data
# files table will store the files that have been uploaded.  
mydb = mysql.connector.connect( host="localhost",user="nupur",password="casper7197",database="reports",auth_plugin='mysql_native_password')
mycursor = mydb.cursor()
mycursor.execute("SELECT * FROM files")
reports_to_update = mycursor.fetchall()

# the input report will be parsed against these arrays. We'll try to find the site based upon this corpus.

# corpus[] stores the site mentioned in corpus_site
mycursor.execute("SELECT * FROM corpus_site")
corpus = mycursor.fetchall()
print('length of corpus: ',len(corpus))

# biopsy[] stores the site mentioned in biopsy
mycursor.execute("SELECT * FROM biopsy")
biopsy = mycursor.fetchall()

# diag[] stores the diagnosis from corpus_diagnosis
mycursor.execute("SELECT * FROM corpus_diagnosis")
diag = mycursor.fetchall()


# remove \n \t. (L) and (R) with left, right. converted to lowercase.
def clean(i):
  data = i.replace("\n"," ").replace("\t"," ").replace('(L)','left').replace('(R)','right').replace('(',' ').replace(')',' ').replace(',',' ')
  data = data.lower()
  return data


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

# remove note, comment section.
def remove_note_comment(final_impression):
  if 'note' in final_impression:
    final_impression = final_impression.split('note',1)[0]
  elif 'comment' in final_impression:
    final_impression = final_impression.split('comment',1)[0]
  return final_impression

# remove special symbols
def remove_special_symb(final_impression):
  final_data=final_impression.replace('–',' ').replace('.',' ').replace(';',' ').replace(':',' ').replace('/',' ')
  # print(final_data)
  return final_data
  
# convert the list of tokens to string
def listToString(s):   
  str1 = " " 
  return (str1.join(s))
  
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
# # add the biopsy list to database, table : biopsy
# # check if any of the biopsies are present in the report.
# # corpus list : load value from site_corpus.
# if locData length > 0 : report was successfully parsed, i.e, site found. return (report,site) to java.
# if locData == 0 : return (report,'undefined').

def get_diag(diag,final_data):
  diagData = []
  flag = 0
  for j in diag:
    if j in final_data:
      diagData.append(j)
      flag = 1
      break
  if flag == 0: 
    s = re.split(', |_|-|!|\.|\. | ', final_data)
    l = []
    for j in s:
      if j in diag:
        print('token in corpus: ',j)
        l.append(j)
    t = listToString(l)
    if t != '': 
      print('t is :',t)
      diagData.append(t)
  return diagData

processed_corpus=[tup[1] for tup in corpus]
processed_biopsy=[tup[1] for tup in biopsy]


f = open("/home/nupur/Desktop/PE/code/res.txt", "w")
f.write("Now the file has more content!")
f.close()


for tup in reports_to_update:	
  data=tup[1]
  data=clean(data)
  final_impression=final_impression_split(data)
# couldn't be split.
  if final_impression=='':
    sql = "INSERT INTO repos (report,site) VALUES (%s, %s)"
    site='undefined'
    mycursor.execute(sql,(data,site))
    mydb.commit()
    continue

  print('report: ',tup[1])
  final_impression=remove_note_comment(final_impression)
  final_impression=remove_special_symb(final_impression)
  location=get_loc(processed_biopsy,processed_corpus,final_impression)
  diagnosis=get_diag(diag,final_impression)
  
  print('final impression: ',final_impression)
  print('length of diagnosis : ',len(diagnosis))
  print('diag is :',diagnosis)
  if len(location)>0 and len(diagnosis)>0:
    print("succ")
    sql = "INSERT INTO repos (report,site,diagnosis) VALUES (%s, %s, %s)"
    site=location[0]
    d=diagnosis[0]
    mycursor.execute(sql,(data,site,d))
    mydb.commit()
  elif len(location)>0:
    sql = "INSERT INTO repos (report,site,diagnosis) VALUES (%s, %s, %s)"
    site=location[0]
    d='undefined'
    mycursor.execute(sql,(data,site,d))
    mydb.commit()
  elif len(diagnosis)>0:
    sql = "INSERT INTO repos (report,site,diagnosis) VALUES (%s, %s, %s)"
    site='undefined
    d=diagnosis[0]
    mycursor.execute(sql,(data,site,d))
    mydb.commit()
  else:
    print('Not parssed')
    sql = "INSERT INTO repos (report,site,diagnosis) VALUES (%s, %s,%s)"
    site='undefined'
    d='undefined'
    mycursor.execute(sql,(data,site,d))
    mydb.commit()
    
# remove all data from files. 
# TRUNCATE TABLE yourTableName.
sql = "TRUNCATE TABLE files;"
mycursor.execute(sql)
mydb.commit()


print('deleted data from files.')



