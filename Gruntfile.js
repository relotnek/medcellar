var db = require('./grunt/db/db');
var path = require('path');
var _ = require('underscore');


var users = [{
    username: 'ktoler',
    email: 'ken@medcellar.com',
    password: 'slapdabass',
    role: 'admin'
}, {
    username: 'bob',
    email: 'bob@medcellar.com',
    password: 'bobdole',
    role: 'admin'
}, {
    username: 'gellerb',
    email: 'geller@medcellar.com',
    password: 'magellan',
    role: 'user'
}, ];


var meds = [{
    name: "Percocet",
    classification: "Opioid + Analgesic",
    indication: "Moderate to moderately severe pain",
    supply: "Tabs - 100, 500",
    price: 1508.00,
    description: "Oxycodone HCl, acetaminophen; 2.5mg/325mg, 5mg/325mg, 7.5mg/325mg, 10mg/325mg; tabs.",
    warnings: "Head injury. Increased intracranial pressure. Acute abdominal conditions. Severe pulmonary, renal, hepatic, thyroid, or adrenocortical dysfunction. Asthma. GI or GU obstruction. Drug abusers. Elderly. Debilitated. Labor & delivery. Pregnancy (Cat.C). Nursing mothers.",
    interactions: "Potentiation with alcohol, other CNS depressants, MAOIs, tricyclic antidepressants, anticholinergics.",
    directions: "2.5mg/325mg: 1–2 tabs every 6hrs as needed. 5mg/325mg, 7.5mg/325mg, 10mg/325mg: 1 tab every 6hrs as needed. Max 4g acetaminophen/day.",
    picture: "percocet.jpg",
    isPrescription: true

}, {
    name: "Vicodin",
    classification: "Opioid + Analgesic",
    indication: "Moderate to moderately severe pain",
    supply: "Tabs - 100, 500",
    price: 192.00,
    description: "Hydrocodone bitartrate 5mg, acetaminophen 300mg; scored tabs.",
    warnings: "Risk of hepatotoxicity may result with acetaminophen doses >4g per day or involving more than one acetaminophen-containing product. Head injury. Increased intracranial pressure. Acute abdomen. Impaired renal, hepatic, thyroid, pulmonary, or adrenocortical function. GI or GU obstruction. Asthma. Post-op. Drug abusers. Elderly. Debilitated. Labor and delivery. Pregnancy (Cat.C). Nursing mothers: not recommended.",
    interactions: "Potentiation with alcohol, CNS depressants, MAOIs, tricyclic antidepressants, anticholinergics.",
    directions: "1–2 tabs every 4–6 hrs as needed; max 8 tabs/24 hrs",
    picture: "vicodin.jpg",
    isPrescription: true
}, {
    name: "Advair HFA 45.21",
    classification: "Steroid + long-acting beta-2 agonist",
    indication: "Maintenance treatment of asthma in patients not adequately controlled on other asthma-controller medications (eg, inhaled corticosteroid) or whose disease severity warrants initiation of 2 maintenance therapies.",
    supply: "Inhaler—12g (120 inh)",
    price: 0,
    description: "Fluticasone propionate 45mcg, salmeterol (as xinafoate) 21mcg; per inh; metered-dose inhaler; CFC-free.",
    warnings: "Increased risk of asthma-related deaths and hospitalizations. Do not initiate in rapidly or acutely deteriorating asthma. Not for relief of acute bronchospasm. Not for use with other long-acting β2-agonists or for transferring from systemic steroids. Reevaluate periodically. Do not exceed recommended dose. Cardiovascular disease (esp. coronary insufficiency, arrhythmias, hypertension). Convulsive disorders. Thyrotoxicosis. Hyperresponsiveness to sympathomimetics. Diabetes. Ketoacidosis. Hypokalemia. Hyperglycemia. Hepatic impairment (monitor). Tuberculosis. Untreated infections. Ocular herpes simplex. Eosinophilic conditions. Immunosuppressed. If exposed to chickenpox or measles, consider anti-infective prophylactic therapy. If adrenal insufficiency exists following systemic corticosteroid therapy, replacement with inhaled corticosteroids may exacerbate symptoms of adrenal insufficiency (eg, lassitude). Prescribe a short-acting, inhaled β2-agonist for acute symptoms; monitor for increased need. Monitor potassium, intraocular pressure; bone mineral density if other osteoporosis risk factors exist; and for growth suppression in children; hypercorticism and HPA axis suppression (if occurs, discontinue gradually). Labor & delivery. Pregnancy (Cat.C). Nursing mothers: not recommended. Pregnancy (Cat.C). Nursing mothers: not recommended.",
    interactions: "See Contraindications. Concomitant strong CYP3A4 inhibitors (eg, ketoconazole, itraconazole, ritonavir, atazanavir, clarithromycin, indinavir, nefazodone, nelfinavir, saquinavir, telithromycin): not recommended. Caution with other sympathomimetics (except short-acting bronchodilators), during or within 2 weeks of MAOIs, tricyclic antidepressants (increased cardiac effects), K+-depleting diuretics. Antagonized by β-blockers.",
    directions: "See literature. 2 inh twice daily (AM & PM; approx. 12hrs apart). If insufficient response after 2wks, use next higher strength. Max: 2 inh of Advair HFA 230/21 twice daily.",
    picture: "advair.jpg",
    isPrescription: true
}, {
    name: "Viagra",
    classification: "Phosphodiesterase type 5 inhibitor (cGMP-specific)",
    indication: "Erectile dysfunction.",
    supply: "Tabs 25mg—30; 50mg, 100mg—30, 100",
    price: 361.00,
    description: "Sildenafil citrate 25mg, 50mg, 100mg; tabs.",
    warnings: "Confirm diagnosis. Cardiovascular disease (eg, MI, stroke, or life-threatening arrhythmia within 6 months; BP<90/50 or >170/110; unstable angina, LV outflow obstruction, impaired autonomic regulation of BP). Anatomical penile deformation. Predisposition to priapism. Underlying non-arteritic anterior ischemic optic neuropathy risk factors. Advise patients to discontinue if sudden vision or hearing loss occurs. Retinitis pigmentosa. Patients for whom sexual activity is inadvisable or contraindicated. Bleeding disorders. Active peptic ulcer. Pregnancy (Cat.B).",
    interactions: "Hypotension with nitrates: see Contraindications. Concomitant α-blockers (eg, doxazosin) may lead to symptomatic hypotension. Additive effects with concomitant antihypertensives (eg, amlodipine). Plasma levels increased by inhibitors of CYP3A4 (eg, ketoconazole, itraconazole, erythromycin, saquinavir, ritonavir) or CYP2C9, or cimetidine. Plasma levels reduced by inducers of CYP3A4 (eg, rifampin). Concomitant other erectile dysfunction treatments: not recommended",
    directions: "Take 1 dose as needed about 1 hr (½–4 hrs) before sexual activity at frequency of up to once daily. Initially 50mg. May reduce dose to 25mg or increase to max of 100mg. Elderly, hepatic impairment, severe renal impairment, or concomitant potent CYP3A4 inhibitors (eg, erythromycin, ketoconazole, itraconazole, saquinavir): consider initial dose of 25mg. Concomitant ritonavir: max single sildenafil dose of 25mg in 48hrs. Concomitant α-blockers (patients should be stable on α-blocker therapy before starting): initially 25mg.",
    picture: "viagra.jpg",
    isPrescription: true
}, {
    name: "Mucinex",
    classification: "Expectorant",
    indication: "Chest congestion",
    supply: "600mg—20, 40, 100, 500; Max Strength—14, 28; Pkts—12; Soln—4oz",
    price: 8.99,
    description: "Sildenafil citrate 25mg, 50mg, 100mg; tabs.",
    warnings: "Asthma. Lower respiratory disorders. Pregnancy. Nursing mothers. Mini-Melts: Renal disease. Magnesium-restricted diet.",
    interactions: "Concomitant live vaccines, biologic DMARDs or potent immunosuppressants (eg, azathioprine, cyclosporine): not recommended. Potentiated by potent CYP3A4 inhibitors (eg, ketoconazole), or drugs that result in both moderate CYP3A4 and potent CYP2C19 (eg, fluconazole) inhibition. Antagonized by potent CYP3A4 inducers (eg, rifampin); see Adults.",
    directions: "Swallow whole. 1–2 tabs every 12 hours. Max: 4 tabs/day",
    picture: "mucinex.jpg",
    isPrescription: true
}, {
    name: "Oxycodone HCl",
    classification: "Opioid",
    indication: "pain severe",
    supply: "10,15,20,30,40,60, 80 mg tablets for oral administration",
    price: 0.99,
    description: "A strong prescription pain medicine that contains an opioid (narcotic) that is used to manage pain severe enough to require daily around-the-clock, long-term treatment with an opioid, when other pain treatments such as non-opioid pain medicines or immediate-release opioid medicines do not treat your pain well enough or you cannot tolerate them.",
    warnings: "Head injury. Increased intracranial pressure. CNS depression. Coma. Toxic psychosis. Convulsive disorders. Shock. Severe renal or hepatic impairment. Impaired pulmonary, thyroid, or adrenocortical function. GI or GU obstruction. Acute abdomen. Biliary tract disease. Acute pancreatitis. Kyphoscoliosis (associated with respiratory depression). Drug abusers. Acute alcoholism. Delirium tremens. Elderly. Debilitated. Pregnancy (Cat.B). Labor & delivery, nursing mothers: not recommended.",
    interactions: "Potentiation with alcohol, other CNS depressants, anticholinergics, MAOIs, tricyclic antidepressants, phenothiazines, general anesthetics, skeletal muscle relaxants. Possible withdrawal symptoms with mixed opioid agonist/antagonists.",
    directions: "A single dose greater than 40 mg, or a total daily dose greater than 80 mg are only for use in patients in whom tolerance to an opioid of comparable potency has been established.",
    picture: "oxycodone.jpg",
    isPrescription: true
}, {
    name: "Glyburide",
    classification: "sulfonylurea",
    indication: "An adjunct to diet and exercise to improve glycemic control in adults with type 2 diabetes mellitus.",
    supply: "Tabs 1.25mg—50; 2.5mg—100; 5mg—100",
    price: 8.00,
    description: "Glyburide is used along with diet and exercise, and sometimes with other medications, to treat type 2 diabetes (condition in which the body does not use insulin normally and, therefore, cannot control the amount of sugar in the blood).",
    warnings: "Increased risk of cardiovascular mortality. Renal or hepatic impairment. Adrenal or pituitary insufficiency. Stress. Secondary failure may occur with extended therapy. Risk of hemolytic anemia in G6PD deficiency; consider non-sulfonylurea alternative. Monitor urine, fasting blood glucose, and HbA1c levels periodically. Discontinue if jaundice or hepatitis occurs. Sulfonamide allergy.",
    interactions: "May be potentiated by NSAIDs, ACEIs, disopyramide, fluoxetine, clarithromycin, coumarin, alcohol, highly protein bound drugs, salicylates, sulfonamides, chloramphenicol, probenecid, MAOIs, β-blockers, oral miconazole (possibly), fluroquinolones. Antagonized by diuretics, steroids, phenothiazines, thyroid products, estrogens, oral contraceptives, phenytoin, niacin, sympathomimetics, calcium channel blockers, isoniazid.",
    directions: "The usual starting dose of Diaβeta as initial therapy is 2.5 to 5 mg daily, administered with breakfast or the first main meal. Those patients who may be more sensitive to hypoglycemic drugs should be started at 1.25 mg daily.",
    picture: "glyburide.jpg",
    isPrescription: true
}, {
    name: "Claritin",
    classification: "Antihistamine",
    indication: "Indicated for the relief of nasal and non-nasal symptoms of seasonal allergic rhinitis and for the treatment of chronic idiopathic urticaria in patients 2 years of age or older.",
    supply: "Tabs—10, 20, 30; Liqui-Gels—10, 24, 40; Chewables—5, 10",
    price: 8.98,
    description: "Loratadine is a white to off-white powder not soluble in water, but very soluble in acetone, alcohol, and chloroform.",
    warnings: "Before taking loratadine, tell your doctor or pharmacist if you are allergic to it; or to desloratadine; or if you have any other allergies.",
    interactions: "Loratadine (10 mg once daily) has been coadministered with therapeutic doses of erythromycin, cimetidine, and ketoconazole in controlled clinical pharmacology studies in adult volunteers.",
    directions: "The recommended dose of CLARITIN (loratadine) is one 10 mg tablet or reditab, or 2 teaspoonfuls (10 mg) of syrup once daily.",
    picture: "claritin.png",
    isPrescription: false
}, {
    name: "Dimenhydrinate",
    classification: "Antihistamine",
    indication: "Motion sickness prophylaxis",
    supply: "Tabs—12, 36, 100; Chewable—8, 24",
    price: 3.98,
    description: "Used to prevent and treat nausea, vomiting, and dizziness caused by motion sickness",
    warnings: "Asthma or chronic respiratory disease. Glaucoma. Arrhythmias. GI or urinary obstruction. Phenylketonuria (chewable tabs). Pregnancy (Cat.B). Nursing mothers: not recommended.",
    interactions: "Potentiates CNS depression with alcohol, other CNS depressants. May potentiate ototoxicity of antibiotics (esp. aminoglycosides).",
    directions: "50–100mg every 4–6 hours, starting ½–1 hour before travel",
    picture: "dimenhydrinate.jpg",
    isPrescription: false
}, {
    name: "FIORICET w. CODEINE",
    classification: "Opioid + barbiturate + analgesic/antipyretic + CNS stimulant",
    indication: "Tension (or muscle contraction) headache",
    supply: "Caps—100",
    price: 30,
    description: "Codeine phosphate 30mg, butalbital 50mg, acetaminophen 300mg, caffeine 40mg; caps.",
    warnings: "Hepatotoxicity (acetaminophen >4g/day). Drug abusers. Impaired hepatic or renal function (monitor). Acute abdominal conditions. Elderly. Debilitated. Pregnancy (Cat.C). Nursing mothers: not recommended. Also with Codeine: risk of respiratory depression and death related to ultra-rapid metabolizers of codeine (esp. in children in post-op tonsillectomy and/or adenoidectomy). Obstructive sleep apnea. Head injury. Increased intracranial pressure. Hypothyroidism. Addison’s disease. GI or GU obstruction. Abuse potential. Labor and delivery.",
    interactions: "May be potentiated by MAOIs. May potentiate alcohol, general anesthetics, tranquilizers, sedative-hypnotics, other narcotic analgesics or CNS depressants. Induction of drug-metabolizing hepatic enzymes. Acetaminophen may cause false (+) urine test for 5-hydroxyindoleacetic acid. Codeine may increase serum amylase levels.",
    directions: "1–2 caps every 4hrs; max 6/da",
    picture: "fiorcetcodeine.jpg",
    isPrescription: true
}, ];


module.exports = function(grunt) {
    grunt.initConfig({
        exec: {
            dropdb: 'mongo meddb --eval "db.dropDatabase()"',
            dropusers: 'mongo meddb --eval "db.users.drop()"',
            dropmeds: 'mongo meddb --eval "db.meds.drop()"',
            run: 'nodemon server.js'
        },
        env: {
            dev: {
                MED_CONF: path.resolve('./config/config.json')
            },
            weak: {
                MED_CONF: path.resolve('./config/weakconfig.json')
            }
        },
        availabletasks: {
            tasks: {}
        }
    });

    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-env');
    grunt.loadNpmTasks('grunt-available-tasks');
    grunt.registerTask('deployweaknohash', ['exec:dropdb', 'builddb:none', 'env:weak', 'exec:run']);
    grunt.registerTask('deployweak', ['exec:dropdb', 'builddb:md5', 'env:weak', 'exec:run']);

    grunt.registerTask('deploy', ['exec:dropdb', 'builddb:bcrypt', 'env:dev', 'exec:run']);

    grunt.registerTask('tasks', ['availabletasks']);

    grunt.registerTask('builddb', 'populate the database with medications & users', function(hashDigest) {
        var done = this.async();
        _.each(meds, function(insertion) {
            var med = new db.med({
                name: insertion.name,
                classification: insertion.classification,
                indication: insertion.indication,
                supply: insertion.supply,
                price: insertion.price,
                description: insertion.description,
                warnings: insertion.warnings,
                interactions: insertion.interactions,
                directions: insertion.directions,
                picture: insertion.picture,
                isPrescription: insertion.isPrescription
            });
            console.log(med);
            med.save(function(err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Med: " + med.name + " Saved.");
                }
            });
        });

        _.each(users, function(insertion) {
            var user = new db.user({
                username: insertion.username,
                email: insertion.email,
                password: insertion.password,
                hashDigest: hashDigest,
                role: insertion.role
            });
            console.log(user);
            user.save(function(err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("User: " + user.username + "with role:" + user.role + " Saved.");
                }
            });
        });
        done();
    });

};
