import mysql.connector
import pickle
from tqdm import tqdm
import pandas as pd
data_8400=pickle.load(open("data_8400.pickle","rb"))
data_15000=pickle.load(open("(8401-15000)data.pickle","rb"))
data_22000=pickle.load(open("(15001-22000)data.pickle","rb"))
data_28000=pickle.load(open("(22001-28000)data.pickle","rb"))

final=data_8400+data_15000+data_22000+data_28000

print('initial length of final: ',len(final))

final_data = []
for i in tqdm(range(len(final))):
  if final[i] in final_data:
    continue
  final_data.append(final[i])

print('exit length : ',len(final_data))

print('inserting into database ')

import mysql.connector

mydb = mysql.connector.connect(
  host="localhost",
  user="nupur",
  password="casper7197",
  database="PE",
  auth_plugin='mysql_native_password'
  )

mycursor = mydb.cursor()

one = 0
more = 0
for i in tqdm(range(len(final_data))):
  if(len(final_data[i]) == 0):
    one = one + 1
    # 386
  else:
    more = more + 1
    sql = "INSERT INTO corpus_diagnosis (diagnosis) VALUES (%s)"
    val = (final_data[i][1],)
    mycursor.execute(sql, val)
    mydb.commit()

print('last insert id', mycursor.lastrowid)

print('records inserted')
