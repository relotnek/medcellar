# Med Cellar Sample Application with Backbone.js, Twitter Bootstrap, Node.js, Express, and MongoDB based on NodeCellar#

"Med Cellar" is a sample CRUD application built with with Backbone.js, Twitter Bootstrap, Node.js, Express, and MongoDB.

It contains a deliberately vulnerable branch as well as a "fixed branch"

The application allows you to browse through a list of meds, as well as add, update, and delete meds.

#Configurations

There are two configurations inside of Med Cellar, development and weak. The configuration files are located in ```$APP_PATH/config``` .Development will have all of the security fixes mentioned in the excercises, whereas the weak build will have none or very minimal security controls. In order to run the application in production mode use:

```js
sudo grunt deploy
```

To run the application with the weaknesses use:

```js
grunt deployweak
```


Running the commands mentioned above will completely drop the database, rebuild it with demo data, and launch the application with the associated configuration.

Additionally if you would like to experiment with different security controls, you may manually edit the config.js file in the config folder to enable or disable other options. One of these options is the use of helmet or lusca as a security middleware.

#Dropping the Database
If you would like to drop the database automatically you may run
```js
grunt exec:dropdb
```

