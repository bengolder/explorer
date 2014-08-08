run:
	gulp --gulpfile ./front/gulpfile.js & python ./explorer/manage.py runserver

runscript: 
	 python ./explorer/manage.py runscript $(script)

dropdb:
	dropdb 'explorer'

dump_tables:
	bash ./explorer/scripts/export_tables.sh

newdb:
	createdb explorer

schema-chart:
	python ./explorer/manage.py graph_models mit -o dusp_explorer_db_schema.png

install-server-deps:
	sudo apt-get install libapache2-mod-wsgi
	sudo apt-get install python-dev # needed for gcc

install-deps:
	pip install -r ./requirements.txt

install:
	make install-deps

update:
	git pull origin master

getdata:
	scp athena:datadump.json ./explorer/data/datadump.json


### RESETTING THE DATABASE
# make desouth
# make newdb
# make sync
# make schemainit
# make fakemigrate
# make loaddata

cleardata:
	python ./explorer/manage.py flush

loaddata:
	python ./explorer/manage.py loaddata ./explorer/data/datadump.json

sql:
	python ./explorer/manage.py sql mit

sync:
	python ./explorer/manage.py syncdb

schemainit:
	python ./explorer/manage.py schemamigration mit --initial

schema:
	python ./explorer/manage.py schemamigration mit --auto

migrate:
	python ./explorer/manage.py migrate mit

switchworkmodels:
	make runscript script=migrate_models

deleteworks:
	make runscript script=delete_old_models

fakemigrate:
	python ./explorer/manage.py migrate mit 0001 --fake

desouth:
	dropdb 'explorer'
	rm -rf ./explorer/mit/migrations
	rm -rf ./lib/python2.7/site-packages/django/contrib/auth/migrations

shell:
	python ./explorer/manage.py shell_plus

build: 
	gulp --gulpfile front/gulpfile.js build

staticfiles:
	python ./explorer/manage.py collectstatic --noinput

fullstatic:
	make build
	make staticfiles

pre-deploy:
	# run on local dev repo before deploying to server
	make fullstatic
	git add ./explorer/static/*

deploy:
	# run on server in order to update and deploy
	make update
	restart

clean:
	rm -rf */*.pyc
	rm -rf ./explorer/static/*



