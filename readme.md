# Med Cellar Sample Application with Backbone.js, Twitter Bootstrap, Node.js, Express, and MongoDB based on NodeCellar#

"Med Cellar" is a sample CRUD application built with with Backbone.js, Twitter Bootstrap, Node.js, Express, and MongoDB.

It contains a deliberately vulnerable branch as well as a "fixed branch"

The application allows you to browse through a list of meds, as well as add, update, and delete meds.

#Configurations

There are two configurations inside of Med Cellar, production and weak. Production will have all of the security fixes mentioned in the excercises, whereas the weak build will have none. In order to run the application in production mode use:

```js
grunt build
```

To run the application with the weaknesses use:

```js
grunt buildweak
```

#Building the Database
Before you can use the app you will need to populate your mongo database using the following tasks:

To populate the users:
```js
grunt buildusers
```

To populate the medications:
```js
grunt buildmeds
```

#Dropping the Database
If you would like to drop the database automatically you may run
```js
grunt exec:dropdb
```

