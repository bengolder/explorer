install-server-deps:
	sudo apt-get install libapache2-mod-wsgi

install-deps:
	pip install -r ./requirements.txt

install:
	make install-deps

update:
	git pull origin master

test_travis:
	make test

