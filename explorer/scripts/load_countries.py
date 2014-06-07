import os
from pprint import pprint
from mit.models import Location

def getCountries():
    fpath = 'explorer/data/country_codes.csv'
    data = {}
    with open(fpath, 'r') as f:
        for line in f:
            code = line[:3]
            name = line[4:-1]
            shortname = name.split(',')[0]
            shortname = shortname.split(' (')[0]
            data[shortname] = int(code)
    return data

def checkLocations(data):
    locations = Location.objects.all()
    for loc in locations:
        if loc.name not in data:
            print loc.name
        else:
            print loc.name, 'is', data[loc.name]

def run():
    data = getCountries()
    checkLocations(data)
    #pprint( data)





