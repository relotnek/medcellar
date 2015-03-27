var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('meddb', server, {safe: true});

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'meddb' database");
        db.collection('meds', {safe:true}, function(err, collection) {
            if (err) {
                console.log("The 'meds' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
});

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving med: ' + id);
    db.collection('meds', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};

exports.findAll = function(req, res) {
    db.collection('meds', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.addMed = function(req, res) {
    var med = req.body;
    console.log('Adding med: ' + JSON.stringify(med));
    db.collection('meds', function(err, collection) {
        collection.insert(med, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

exports.updateMed = function(req, res) {
    var id = req.params.id;
    var med = req.body;
    delete med._id;
    console.log('Updating med: ' + id);
    console.log(JSON.stringify(med));
    db.collection('meds', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, med, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating med: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(med);
            }
        });
    });
}

exports.deleteMed = function(req, res) {
    var id = req.params.id;
    console.log('Deleting med: ' + id);
    db.collection('meds', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}

/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() {

    var meds = [
    {
        name: "Percocet",
        classification: "Opioid + Analgesic",
        indication: "Moderate to moderately severe pain",
        supply: "Tabs - 100, 500",
        price: 1508.00,
        description: "Oxycodone HCl, acetaminophen; 2.5mg/325mg, 5mg/325mg, 7.5mg/325mg, 10mg/325mg; tabs.",
        warnings: "Head injury. Increased intracranial pressure. Acute abdominal conditions. Severe pulmonary, renal, hepatic, thyroid, or adrenocortical dysfunction. Asthma. GI or GU obstruction. Drug abusers. Elderly. Debilitated. Labor & delivery. Pregnancy (Cat.C). Nursing mothers.",
        interactions: "Potentiation with alcohol, other CNS depressants, MAOIs, tricyclic antidepressants, anticholinergics.",
        directions: "2.5mg/325mg: 1–2 tabs every 6hrs as needed. 5mg/325mg, 7.5mg/325mg, 10mg/325mg: 1 tab every 6hrs as needed. Max 4g acetaminophen/day.",
        picture: "percocet.jpg"
    },
    {
        name: "Vicodin",
        classification: "Opioid + Analgesic",
        indication: "Moderate to moderately severe pain",
        supply: "Tabs - 100, 500",
        price: 192.00,
        description: "Hydrocodone bitartrate 5mg, acetaminophen 300mg; scored tabs.",
        warnings: "Risk of hepatotoxicity may result with acetaminophen doses >4g per day or involving more than one acetaminophen-containing product. Head injury. Increased intracranial pressure. Acute abdomen. Impaired renal, hepatic, thyroid, pulmonary, or adrenocortical function. GI or GU obstruction. Asthma. Post-op. Drug abusers. Elderly. Debilitated. Labor and delivery. Pregnancy (Cat.C). Nursing mothers: not recommended.",
        interactions: "Potentiation with alcohol, CNS depressants, MAOIs, tricyclic antidepressants, anticholinergics.",
        directions: "1–2 tabs every 4–6 hrs as needed; max 8 tabs/24 hrs",
        picture: "vicodin.jpg"
    }
    ];

    db.collection('meds', function(err, collection) {
        collection.insert(meds, {safe:true}, function(err, result) {});
    });

};