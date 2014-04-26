from django.db import connection

def run():
    tables = connection.introspection.table_names()
    seen_models = connection.introspection.installed_models(tables)
    for m in tables:
        print m
