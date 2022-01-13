const { MongoClient } = require('mongodb');
const logger = require('../utils/logger');

const CRYPTO_COLLECTION = process.env.CRYPTO_COLLECTION;

let db;

const getMongoClient = () => {
  const password = process.env.MONGO_PASSWORD;
  const uri = `mongodb+srv://cryptouser:${password}@cluster0.30rla.mongodb.net/sample_airbnb?retryWrites=true&w=majority`;
  return new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
};

const getDb = () => {
  let client;
  if (client) {
    client = getMongoClient();
  }
  return new Promise(resolve => {
    client.connect(err => {
      if (err) {
        logger.error(err.message);
      }
      db = client.db('sample_airbnb');
      logger.info(`Successfully connected`);

      return resolve(db);
    });
  });
};

const getCoinRateByCoinType = async coinType => {
  logger.info('getCoinRateByCoinType: fetching coin rate');
  try {
    if (!db) {
      db = await getDb();
    }
    const response = await db.collection(CRYPTO_COLLECTION).find({ coinType });
    logger.info(
      `getCoinRateByCoinType: successfully fetched coin rate for coin type: ${coinType}`
    );
    return response;
  } catch (error) {
    logger.error(
      `getCoinRateByCoinType: unexpected error occurred while fetching the coin rate. ${error.message}`
    );
    throw new Error(`getCoinRateByCoinType: ${error.stack}`);
  }
};

module.exports = { getCoinRateByCoinType };
