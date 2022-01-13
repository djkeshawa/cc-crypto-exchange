const { isEmpty, isNil } = require('lodash');
const cryptoService = require('../service/cryptoService');
const { HTTP_STATUSES } = require('../common/constants');

const getCoinRate = async (req, res) => {
  const { coinType } = req.params;
  try {
    const response = await cryptoService.getCoinRate(coinType);
    if (isEmpty(response) || isNil(response)) {
      res
        .status(HTTP_STATUSES.NOT_FOUND)
        .send({ message: 'Rate for the requested coin not found' });
    }
    res.status(HTTP_STATUSES.OK).send(response);
  } catch (error) {
    res
      .status(HTTP_STATUSES.INTERNAL_SERVER_ERROR)
      .send({ message: error.message });
  }
};

const purchaseCoin = (req, res) => {
  const transactionInfo = req.body;

  if (!transactionInfo.coinType || !transactionInfo.amount) {
    res.status(400).send({ message: 'Incorrect request body parameters' });
  }
  const response = {
    message: 'purchase successful',
    purchaseInfo: transactionInfo
  };
  res.status(200).send(response);
};

const sellCoin = (req, res) => {
  const transactionInfo = req.body;

  if (!transactionInfo.coinType || !transactionInfo.amount) {
    res.status(400).send({ message: 'Incorrect request body parameters' });
  }
  const response = {
    message: 'successfully sold',
    purchaseInfo: transactionInfo
  };
  res.status(200).send(response);
};

const updateTransaction = (req, res) => {
  const transactionInfo = req.body;

  if (!transactionInfo.coinType || !transactionInfo.amount) {
    res.status(400).send({ message: 'Incorrect request body parameters' });
  }
  const response = {
    message: 'successfully updated',
    purchaseInfo: transactionInfo
  };
  res.status(200).send(response);
};
const cancelTransaction = (req, res) => {
  const transactionInfo = req.body;

  if (!transactionInfo.coinType || !transactionInfo.amount) {
    res.status(400).send({ message: 'Incorrect request body parameters' });
  }
  const response = {
    message: 'Transaction canceled',
    purchaseInfo: transactionInfo
  };
  res.status(200).send(response);
};

module.exports = {
  getCoinRate,
  purchaseCoin,
  sellCoin,
  updateTransaction,
  cancelTransaction
};
