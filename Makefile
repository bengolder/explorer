install-server-deps:
	sudo apt-get install libapache2-mod-wsgi
	sudo apt-get install python-dev # needed for gcc

install-deps:
	pip install -r ./requirements.txt

install:
	make install-deps

update:
	git pull origin master

test_travis:
	make test


pre-deploy:
	python ./explorer/manage.py collectstatic
	git add ./explorer/static/*
	git commit -a -m 'adding static files pre-deployment'
