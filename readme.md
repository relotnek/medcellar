# Med Cellar Sample Application with Backbone.js, Twitter Bootstrap, Node.js, Express, and MongoDB based on NodeCellar#

"Med Cellar" is a sample CRUD application built with with Backbone.js, Twitter Bootstrap, Node.js, Express, and MongoDB.

It contains a deliberately vulnerable branch as well as a "fixed branch"

The application allows you to browse through a list of meds, as well as add, update, and delete meds.

#Configurations

There are two configurations inside of Med Cellar, development and weak. The configuration files are located in ```$MEDCELLAR_PATH/medcellar/config/```. Development will have all of the security fixes mentioned in the excercises, whereas the weak build will have none or very minimal security controls.

#Install

```js
cd ./medcellar
npm install
```

* Grunt & Nodemon require global installation

```js
npm i grunt nodemon -g
```

In order to run the application in development mode use:
* Note: One must be inside the `medcellar` directory

```js
sudo grunt deploy
```
* https://localhost


To run the application in weak mode use:

```js
grunt deployweak
```
* http://localhost:3000

Running the commands mentioned above will completely drop the database, rebuild it with demo data, and launch the application with the associated configuration.

Additionally if you would like to experiment with different security controls, you may manually edit the config.js file in the config folder to enable or disable other options. One of these options is the use of helmet or lusca as a security middleware.

#Install - Vagrant

```js
vagrant box add phusion/ubuntu-14.04-amd64
```
* If the above command does not work it's because your version of vagrant is outdated.

Instead run the following:

```js
vagrant box add phusion/ubuntu-14.04-amd64 https://atlas.hashicorp.com/phusion/boxes/ubuntu-14.04-amd64/versions/2014.04.30/providers/virtualbox.box
```

```js
vagrant ssh
cd /opt/medcellar
```

In order to run the application in development mode use:

```js
sudo grunt deployweak
```
* http://localhost:3000

To run the application in weak mode use:

```js
sudo grunt deploy
```
* https://localhost:3001


#Dropping the Database
If you would like to drop the database automatically you may run

```js
grunt exec:dropdb
```
