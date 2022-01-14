const { MongoClient, ObjectId } = require('mongodb');
const logger = require('../utils/logger');

const CRYPTO_COLLECTION = process.env.CRYPTO_COLLECTION || 'transaction';

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
  if (!client) {
    client = getMongoClient();
  }
  return new Promise((resolve, reject) => {
    client.connect(err => {
      if (err) {
        logger.error(err.message);
        reject(err);
      }
      db = client.db('crypto_exchange');
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
    const response = await db
      .collection(CRYPTO_COLLECTION)
      .findOne({ coinType });
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

const setCoinTransaction = async (coinType, amount) => {
  logger.info('setCoinTransaction: persisting coin transaction');
  try {
    if (!db) {
      db = await getDb();
    }
    const response = await db
      .collection(CRYPTO_COLLECTION)
      .insert({ coinType, amount });
    logger.info(
      `setCoinTransaction: successfully set transaction for coinType: ${coinType}, amount: ${amount}`
    );
    return response;
  } catch (error) {
    logger.error(
      `setCoinTransaction: unexpected error occurred while persisting the transaction. ${error.message}`
    );
    throw new Error(`setCoinTransaction: ${error.stack}`);
  }
};

const updateCoinTransaction = async (id, coinType, amount) => {
  logger.info('updateCoinTransaction: updating coin transaction');
  try {
    if (!db) {
      db = await getDb();
    }
    const response = await db
      .collection(CRYPTO_COLLECTION)
      .update({ _id: ObjectId(id) }, { $set: { coinType, amount } });
    logger.info(
      `updateCoinTransaction: successfully updated transaction for coinType: ${coinType}, amount: ${amount}`
    );
    return response;
  } catch (error) {
    logger.error(
      `updateCoinTransaction: unexpected error occurred while updating the transaction. ${error.message}`
    );
    throw new Error(`updateCoinTransaction: ${error.stack}`);
  }
};

module.exports = {
  getCoinRateByCoinType,
  setCoinTransaction,
  updateCoinTransaction
};
