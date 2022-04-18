#!/usr/bin/python

import os
from django.conf import  settings

print("hello")
query = input("查找的名字\n")
print(settings.BASE_DIR)
DirName = os.path.join(settings.BASE_DIR, "tmp","info.log")
print(DirName)
flag = True
with open(DirName, 'r') as f:
    for line in f.readlines():
       if query in line:
           if flag:
               print("\tDate\t\t\t\t\tusername\t\t\t\t\t Userip")
               flag = False
           print(line)
