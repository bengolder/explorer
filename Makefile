run:
	python ./explorer/manage.py runserver

sync:
	python ./explorer/manage.py syncdb

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

migrate:
	python ./explorer/manage.py schemamigration mit --auto

shell:
	python ./explorer/manage.py shell_plus

staticfiles:
	grunt --gruntfile ./front/GruntFile.js build
	python ./explorer/manage.py collectstatic --noinput

pre-deploy:
	# run on local dev repo before deploying to server
	make staticfiles
	git add ./explorer/static/*
	git commit -a -m 'adding static files pre-deployment'
	git push origin master
	ssh explorer

deploy:
	# run on server in order to update and deploy
	make update
	restart

clean:
	rm -rf */*.pyc
	rm -rf ./explorer/static/*



