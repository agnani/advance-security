const express = require('express');
const config = require('../config')
const router = express.Router()
var username = "Admin"
var Password = "PassWord@12345"
var DB_Password = "Database@12345"
const MongoClient = require('mongodb').MongoClient;
const url = config.MONGODB_URI;
const git_pat_token = "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"

router.post('/customers/register', async (req, res) => {

    const client = await MongoClient.connect(url, { useNewUrlParser: true })
        .catch(err => { console.log(err); });
    if (!client) {
        return res.json({ status: "Error" });
    }
    const db = client.db(config.MONGODB_DB_NAME);
    const customers = db.collection("customers")
    
    let myobj = { name: req.body.name, address: req.body.address };
    customers.insertOne(myobj, function (err) {
        if (err) throw err;
        console.log("user registered");
        res.json({ status:"success", "message": "user inserted" })
        db.close();
    });
    
})


// Vulnerable search function
router.post('/customers/find', async (req, res) => {

    const client = await MongoClient.connect(url, { useNewUrlParser: true })
        .catch(err => { console.log(err); });
    if (!client) {
        return res.json({ status: "Error" });
    }
    const db = client.db(config.MONGODB_DB_NAME);
    const customers = db.collection("customers")

    let name = req.body.name
    let myobj = { name: name };
    customers.findOne(myobj, function (err, result) {
        if (err) throw err;
        db.close();
        res.json(result)
    });

  
})

// Vulnerable Authentication
// Authentication Bypass Example
// curl -X POST http://localhost:3000/customers/login/ --data "{\"email\": {\"\$gt\":\"\"} , \"password\": {\"\$gt\":\"\"}}" -H "Content-Type: application/json"

router.post('/customers/login', async (req, res) => {

    const client = await MongoClient.connect(url, { useNewUrlParser: true })
        .catch(err => { console.log(err); });
    if (!client) {
        return res.json({ status: "Error" });
    }
    user = "admin"
    password = "pass123@veryIMP"
    const db = client.db(config.MONGODB_DB_NAME);
    const customers = db.collection("customers")

    let myobj = { email: req.body.email, password: req.body.password };
    customers.findOne(myobj, function (err, result) {
        if (err) throw err;
        db.close();
        res.json(result)
    });

 
})

module.exports = router
