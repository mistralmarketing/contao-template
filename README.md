# mistralmarketing/contao-template

Template für ein neues Contao-Projekt auf PHP 8.1

- bootstrap 4
- contao-bootstrap
- fontawesome
- Rocksolid Antispam

## Installation

Das Skript kann auf einem Linuxsystem irgendwo zentral abgelegt werden, muss aber aus dem Zielverzeichnis aufgerufen werden. Datenbank-Zugangsdaten werden während der Installation abgefragt. Für den Adminuser **sysadmin** wird abschließend ein Kennwort vergeben.

	#!/bin/bash

	workdir=${PWD}

	cd $workdir

	wget https://github.com/mistralmarketing/contao-template/archive/refs/heads/main.zip
	unzip main.zip
	unlink main.zip
	mv contao-template-main/ contao/

	usr=$(stat -c '%U' .)
	grp=$(stat -c '%G' .)

	chown -R $usr:$grp contao/

	cd $workdir/contao/public/

	sudo -u $usr php8.1 -q -dmax_execution_time=0 -dmemory_limit=-1 -dallow_url_fopen=1 -ddisable_functions= -ddate.timezone=Europe/Berlin contao-manager.phar.php self-update

	sudo -u $usr php8.1 -q -dmax_execution_time=0 -dmemory_limit=-1 -dallow_url_fopen=1 -ddisable_functions= -ddate.timezone=Europe/Berlin contao-manager.phar.php composer install --no-dev --no-progress --no-ansi --no-interaction --optimize-autoloader

	cd $workdir/contao/

	echo "Datenbankverbindung angeben"
	echo "User:"
	read dbuser
	echo "Password:"
	read dbpass
	echo "Database:"
	read dbname

	dbpass=$(php8.1 -r "echo urlencode(\"$dbpass\");"; )
	secret=$(php8.1 -r "echo md5(microtime());"; )

	cat > .env << ENDOFFILE
	# .env
	APP_SECRET=$secret
	DATABASE_URL="mysql://$dbuser:$dbpass@localhost:3306/$dbname"
	ENDOFFILE

	cd $workdir/
	chown -R $usr:$grp contao/

	cd $workdir/contao/

	sudo -u $usr php8.1 vendor/bin/contao-console contao:backup:restore
	sudo -u $usr php8.1 vendor/bin/contao-console contao:user:password sysadmin
