'use strict';

const express = require('express');
const { MongoClient } = require('mongodb');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req, res) => {
  res.send('Hello World V2');
});

app.get('/crypto/rate/:coinType',(req,res)=>{
    const {coinType} = req.params;
    res.status(200).send({rate:`crypto rate of ${coinType}`});
})


app.post('/crypto/buy',(req,res)=>{
    const transactionInfo = req.body;

    if(!transactionInfo.coinType || !transactionInfo.amount){
        res.status(400).send({message:'Incorrect request body parameters'})
    }
    const response = {
        message:"purchase successful",
        purchaseInfo: transactionInfo
    }
    res.status(200).send(response);
})

app.post('/crypto/sell',(req,res)=>{
    const transactionInfo = req.body;

    if(!transactionInfo.coinType || !transactionInfo.amount){
        res.status(400).send({message:'Incorrect request body parameters'})
    }
    const response = {
        message:"successfully sold",
        purchaseInfo: transactionInfo
    }
    res.status(200).send(response);
})

app.put('/crypto/update',(req,res)=>{
    const transactionInfo = req.body;

    if(!transactionInfo.coinType || !transactionInfo.amount){
        res.status(400).send({message:'Incorrect request body parameters'})
    }
    const response = {
        message:"successfully updated",
        purchaseInfo: transactionInfo
    }
    res.status(200).send(response);
})
app.delete('/crypto/cancel',(req,res)=>{
    const transactionInfo = req.body;

    if(!transactionInfo.coinType || !transactionInfo.amount){
        res.status(400).send({message:'Incorrect request body parameters'})
    }
    const response = {
        message:"Transaction canceled",
        purchaseInfo: transactionInfo
    }
    res.status(200).send(response);
})


app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

const password = process.env.MONGO_PASSWORD
const uri = `mongodb+srv://cryptouser:${password}@cluster0.30rla.mongodb.net/sample_airbnb?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


client.connect(err => {
    if(err){
        console.log(err.message)
    }
  const collection = client.db("sample_airbnb").collection("listingsAndReviews");
  console.log('trying to fetch data from collection')
  collection.findOne({_id:'10006546'}).then(data=>{
    console.log(data)
  })
  console.log(`Successfully connected`)
});