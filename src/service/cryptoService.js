const { parseInt, get, isEmpty, isNil } = require('lodash');
const logger = require('../utils/logger');
const {
  getCoinRateByCoinType,
  setCoinTransaction,
  updateCoinTransaction
} = require('../clients/mongoClient');

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
      `service:getCoinRate: unexpected error occurred while trying fetch coin rate. Error: ${error.message}`
    );
    throw new Error(`service:getCoinRate: ${error}`);
  }
};

const sellCoinByType = async (id, coinType, amount) => {
  try {
    logger.info(`service:getCoinRate: selling coin of coinType: ${coinType}`);
    const mongoResponse = await getCoinRateByCoinType(coinType);

    if (isEmpty(mongoResponse)) {
      return setCoinTransaction(coinType, amount);
    }

    mongoResponse.amount = String(
      parseInt(get(mongoResponse, 'amount', 0)) + parseInt(amount)
    );
    return updateCoinTransaction(
      id,
      mongoResponse.coinType,
      mongoResponse.amount
    );
  } catch (error) {
    logger.error(
      `service:sellCoinByType: unexpected error occurred while trying sell coin. Error: ${error.message}`
    );
    throw new Error(`service:sellCoinByType: ${error}`);
  }
};

const purchaseCoinByType = async (id, coinType, amount) => {
  try {
    logger.info(
      `service:getCoinRate: purchasing coins of coinType: ${coinType}`
    );
    const mongoResponse = await getCoinRateByCoinType(coinType);

    if (isEmpty(mongoResponse) || isNil(mongoResponse)) {
      return false;
    }

    mongoResponse.amount = String(
      parseInt(get(mongoResponse, 'amount', 0)) - parseInt(amount)
    );
    return updateCoinTransaction(
      id,
      mongoResponse.coinType,
      mongoResponse.amount
    );
  } catch (error) {
    logger.error(
      `service:purchaseCoinByType: unexpected error occurred while trying purchase coin. Error: ${error.message}`
    );
    throw new Error(`service:purchaseCoinByType: ${error}`);
  }
};

module.exports = { getCoinRate, sellCoinByType, purchaseCoinByType };
