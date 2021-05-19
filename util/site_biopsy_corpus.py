from tqdm import tqdm

filename = "site_list.txt"
with open(filename) as f:
    site = f.readlines()
# you may also want to remove whitespace characters like `\n` at the end of each line
site = [x.strip() for x in site] 
site_final = []

for i in site:
  if i not in site_final:
    site_final.append(i)
    
filename = "biopsy_list.txt"
with open(filename) as f:
    biopsy = f.readlines()
# you may also want to remove whitespace characters like `\n` at the end of each line
biopsy = [x.strip() for x in biopsy] 


print(len(site), '  ', len(biopsy))

for i in biopsy:
  if i not in site:
    site.append(i)
print(len(site), '  ', len(biopsy))

print('inserting into database')

import mysql.connector

mydb = mysql.connector.connect(
  host="localhost",
  user="nupur",
  password="casper7197",
  database="PE",
  auth_plugin='mysql_native_password'
)

mycursor = mydb.cursor()

print('inserting into site')
for i in tqdm(site_final):
    sql = "INSERT INTO corpus_site (site) VALUES (%s)"
    val = (i,)
    mycursor.execute(sql, val)
    mydb.commit()
    
print('last insert id', mycursor.lastrowid)

print('inserting into biopsy')
for i in tqdm(biopsy):
    sql = "INSERT INTO corpus_biopsy (biopsy) VALUES (%s)"
    val = (i,)
    mycursor.execute(sql, val)
    mydb.commit()

print('records inserted')



