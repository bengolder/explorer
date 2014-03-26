run:
	python ./explorer/manage.py runserver

sync:
	python ./explorer/manage.py syncdb

install-server-deps:
	sudo apt-get install libapache2-mod-wsgi
	sudo apt-get install python-dev # needed for gcc

install-deps:
	pip install -r ./requirements.txt

install:
	make install-deps

update:
	git pull origin master

pre-deploy:
	# run on local dev repo before deploying to server
	python ./explorer/manage.py collectstatic
	git add ./explorer/static/*
	git commit -a -m 'adding static files pre-deployment'
	git push origin master
	ssh explorer

deploy:
	# run on server in order to update and deploy
	make update
	restart



