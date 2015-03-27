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
    },
    {
        name: "Advair HFA 45.21",
        classification: "Steroid + long-acting beta-2 agonist",
        indication: "Maintenance treatment of asthma in patients not adequately controlled on other asthma-controller medications (eg, inhaled corticosteroid) or whose disease severity warrants initiation of 2 maintenance therapies.",
        supply: "Inhaler—12g (120 inh)",
        price: 0,
        description: "Fluticasone propionate 45mcg, salmeterol (as xinafoate) 21mcg; per inh; metered-dose inhaler; CFC-free.",
        warnings: "Increased risk of asthma-related deaths and hospitalizations. Do not initiate in rapidly or acutely deteriorating asthma. Not for relief of acute bronchospasm. Not for use with other long-acting β2-agonists or for transferring from systemic steroids. Reevaluate periodically. Do not exceed recommended dose. Cardiovascular disease (esp. coronary insufficiency, arrhythmias, hypertension). Convulsive disorders. Thyrotoxicosis. Hyperresponsiveness to sympathomimetics. Diabetes. Ketoacidosis. Hypokalemia. Hyperglycemia. Hepatic impairment (monitor). Tuberculosis. Untreated infections. Ocular herpes simplex. Eosinophilic conditions. Immunosuppressed. If exposed to chickenpox or measles, consider anti-infective prophylactic therapy. If adrenal insufficiency exists following systemic corticosteroid therapy, replacement with inhaled corticosteroids may exacerbate symptoms of adrenal insufficiency (eg, lassitude). Prescribe a short-acting, inhaled β2-agonist for acute symptoms; monitor for increased need. Monitor potassium, intraocular pressure; bone mineral density if other osteoporosis risk factors exist; and for growth suppression in children; hypercorticism and HPA axis suppression (if occurs, discontinue gradually). Labor & delivery. Pregnancy (Cat.C). Nursing mothers: not recommended. Pregnancy (Cat.C). Nursing mothers: not recommended.",
        interactions: "See Contraindications. Concomitant strong CYP3A4 inhibitors (eg, ketoconazole, itraconazole, ritonavir, atazanavir, clarithromycin, indinavir, nefazodone, nelfinavir, saquinavir, telithromycin): not recommended. Caution with other sympathomimetics (except short-acting bronchodilators), during or within 2 weeks of MAOIs, tricyclic antidepressants (increased cardiac effects), K+-depleting diuretics. Antagonized by β-blockers.",
        directions: "See literature. 2 inh twice daily (AM & PM; approx. 12hrs apart). If insufficient response after 2wks, use next higher strength. Max: 2 inh of Advair HFA 230/21 twice daily.",
        picture: "advair.jpg"
    },
    {
        name: "Viagra",
        classification: "Phosphodiesterase type 5 inhibitor (cGMP-specific)",
        indication: "Erectile dysfunction.",
        supply: "Tabs 25mg—30; 50mg, 100mg—30, 100",
        price: 361.00,
        description: "Sildenafil citrate 25mg, 50mg, 100mg; tabs.",
        warnings: "Confirm diagnosis. Cardiovascular disease (eg, MI, stroke, or life-threatening arrhythmia within 6 months; BP<90/50 or >170/110; unstable angina, LV outflow obstruction, impaired autonomic regulation of BP). Anatomical penile deformation. Predisposition to priapism. Underlying non-arteritic anterior ischemic optic neuropathy risk factors. Advise patients to discontinue if sudden vision or hearing loss occurs. Retinitis pigmentosa. Patients for whom sexual activity is inadvisable or contraindicated. Bleeding disorders. Active peptic ulcer. Pregnancy (Cat.B).",
        interactions: "Hypotension with nitrates: see Contraindications. Concomitant α-blockers (eg, doxazosin) may lead to symptomatic hypotension. Additive effects with concomitant antihypertensives (eg, amlodipine). Plasma levels increased by inhibitors of CYP3A4 (eg, ketoconazole, itraconazole, erythromycin, saquinavir, ritonavir) or CYP2C9, or cimetidine. Plasma levels reduced by inducers of CYP3A4 (eg, rifampin). Concomitant other erectile dysfunction treatments: not recommended",
        directions: "Take 1 dose as needed about 1 hr (½–4 hrs) before sexual activity at frequency of up to once daily. Initially 50mg. May reduce dose to 25mg or increase to max of 100mg. Elderly, hepatic impairment, severe renal impairment, or concomitant potent CYP3A4 inhibitors (eg, erythromycin, ketoconazole, itraconazole, saquinavir): consider initial dose of 25mg. Concomitant ritonavir: max single sildenafil dose of 25mg in 48hrs. Concomitant α-blockers (patients should be stable on α-blocker therapy before starting): initially 25mg.",
        picture: "viagra.jpg"
    },
    ];

    db.collection('meds', function(err, collection) {
        collection.insert(meds, {safe:true}, function(err, result) {});
    });

};