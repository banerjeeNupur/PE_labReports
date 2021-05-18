filename = "corpus_list.txt"
with open(filename) as f:
    content = f.readlines()
# you may also want to remove whitespace characters like `\n` at the end of each line
content = [x.strip() for x in content] 

print(len(content))

for i in content:
    print(i)
    
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


for i in content:
    sql = "INSERT INTO corpus_site (site) VALUES (%s)"
    val = (i,)
    mycursor.execute(sql, val)
    mydb.commit()
    
print('last insert id', mycursor.lastrowid)

print('records inserted')



