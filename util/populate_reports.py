import mysql.connector
import pickle
from tqdm import tqdm
import pandas as pd
data_8400=pickle.load(open("data_8400.pickle","rb"))
data_15000=pickle.load(open("(8401-15000)data.pickle","rb"))
data_22000=pickle.load(open("(15001-22000)data.pickle","rb"))
data_28000=pickle.load(open("(22001-28000)data.pickle","rb"))


data=pd.read_excel('final_df_with_orig_repo.xls')
data.fillna('undefined')

conn = mysql.connector.connect(
   user='nupur', password='casper7197', host='127.0.0.1', database='PE',auth_plugin='mysql_native_password')

cursor=conn.cursor()


report=data['orig report'].to_list()
location=data['location'].to_list()


final=data_8400+data_15000+data_22000+data_28000
master=data
other_diags=[]
final_diags=[]
for i in range(len(final)):
	if(len(final[i])):
		other_diags.append(''.join(final[i][0]))
		final_diags.append(final[i][1])
	else:
		other_diags.append("undefined")
		final_diags.append("undefined")
rem=len(report)-len(other_diags)
other_diags=other_diags+['TBD']*rem
final_diags=final_diags+['TBD']*rem

master['other_diags']=other_diags
master['final_diags']=final_diags


sql = "INSERT INTO repos (report,site,other_diagnosis,diagnosis) VALUES (%s,%s,%s,%s)"
count=0
for i in tqdm(range(len(report))):
	try:
		val=(report[i],location[i],other_diags[i],final_diags[i])
		cursor.execute(sql,val)
		conn.commit()
	except:
		continue

# conn.close()





