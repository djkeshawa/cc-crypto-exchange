const logger = require('../utils/logger');
const { getCoinRateByCoinType } = require('../clients/mongoClient');

const getCoinRate = async coinType => {
  try {
    logger.info(`service:getCoinRate: fetching coin rate: ${coinType}`);
    const mongoResponse = await getCoinRateByCoinType(coinType);
    logger.info(
      `service:getCoinRate: successfully fetched coin rate for coin type: ${coinType}. response: ${JSON.stringify(
        mongoResponse
      )}`
    );
    return mongoResponse;
  } catch (error) {
    logger.error(
      `getCoinRate: unexpected error occurred while trying fetch coin rate. Error: ${error.message}`
    );
    throw new Error(`getCoinRate: ${error}`);
  }
};

module.exports = { getCoinRate };
