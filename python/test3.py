import os.path
import time

print("Hello World")

  
file1 = open('python\scenario.txt', 'r')
Lines = file1.readlines()
count = 0
for line in Lines:
    if line.strip()=="test":
        time.sleep(0.1)  
    else:
        print(line);
       