const { MongoClient } = require('mongodb');

const password = process.env.MONGO_PASSWORD;

const uri = `mongodb+srv://cryptouser:${password}@cluster0.30rla.mongodb.net/sample_airbnb?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const getDb = () => {
  client.connect(err => {
    if (err) {
      console.log(err.message);
    }
    const db = client.db('sample_airbnb');
    console.log(`Successfully connected`);
  });
};
