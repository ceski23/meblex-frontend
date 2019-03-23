import os

for f in os.listdir()[:-1]:
  # print(f)
  print(f.replace('-', ' ').title().replace(' ', ''))