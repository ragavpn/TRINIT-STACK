import os
import socket           
import sys
from dotenv import load_dotenv

load_dotenv()
with open('logs', 'w') as f:
    print(f'LOGS INIT \n\n')
    
    s = socket.socket()         
    port = int(os.getenv('PY_SOCKET'))               
    s.bind(('', port))         
    print ("Py server binded to %s" %(port)) 
    s.listen(5)     
    
    while True: 
      c, addr = s.accept()     
      print ('Got connection from', addr )
      data = c.recv(1024)
      print(data)
   