const { GenericContainer } = require('testcontainers');
const { get } = require('lodash');
const {
  getCoinRateByCoinType,
  getDb,
  getMongoClient
} = require('../../src/clients/mongoClient');
const logger = require('../../src/utils/logger');
const { expect } = require('@jest/globals');

jest.setTimeout(100000);

describe('Mongo Client integration tests', () => {
  let container;
  let mongoUrl;
  let db;

  const insertData = async (collection, data) => {
    const result = await db.collection(collection).insert(data);
    logger.info(
      `${get(
        result,
        'insertedCount'
      )} number of documents successfully inserted to ${collection} collection`
    );
  };

  beforeAll(async () => {
    const testPayload = {
      amount: '10',
      coinType: 'BIT'
    };
    try {
      container = await new GenericContainer('mongo')
        .withExposedPorts(27017)
        .start();
      mongoUrl = `mongodb://127.0.0.1:${container.getMappedPort(27017)}`;
      process.env.ATLAS_TEST_URL = mongoUrl;
      db = await getDb();
      await insertData('transaction', testPayload);
    } catch (err) {
      throw err;
    }
  });
  afterAll(async () => {
    const mongoClient = getMongoClient();
    await container.stop();
    mongoClient.close();
    process.env.ATLAS_TEST_URL = null;
  });

  it('should be able to make the mongo DB connection', async () => {
    const response = await getCoinRateByCoinType('BIT');
    expect(response.amount).toBe('10');
    expect(response.coinType).toBe('BIT');
  });
});
