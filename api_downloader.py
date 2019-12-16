# Used to download copies of JSON file every 10 minutes to see
# how formats for games in different states

import requests
import time

url = 'https://feeds.nfl.com/feeds-rs/scores.json'


def getAndSaveAPI(fileNameTag):
    myfile = requests.get(url)
    open('APIs/API-Example-' + str(fileNameTag) +
         '.json', 'wb').write(myfile.content)


counter = 1
while counter < 31:
    getAndSaveAPI(counter)
    counter += 1
    time.sleep(600)
