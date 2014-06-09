import os
from pprint import pprint
from mit.models import Location

lookup = {
        'U.S.A.': 'United States',
        }

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
        print 'setting', loc.name, 'id to', data[loc.name]
        loc.official_id = str(data[loc.name])
        loc.save()

def run():
    data = getCountries()
    checkLocations(data)
    #pprint( data)





