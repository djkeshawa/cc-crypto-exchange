const { isEmpty, isNil } = require('lodash');
const cryptoService = require('../service/cryptoService');
const { HTTP_STATUSES } = require('../common/constants');

/**
 * @swagger
 * /crypto/rate/:coinType:
 *   get:
 *     summary: Get the rate for a given coin type
 *     produces:
 *       "application/json"
 *     tags:
 *       - "Get coin rate"
 *     parameters:
 *       - name: coinType
 *         in: path
 *         description: "Crypto currency type"
 *         required: true
 *         type: "string"
 *     responses:
 *       200:
 *         schema:
 *           type: object
 *           properties:
 *             _id:
 *               type: "string"
 *             coinType:
 *               type: "string"
 *             amount:
 *               type: "string"
 *         examples:
 *           application/json: {
 *             "_id": "61e188db8c523f67436cf6ad",
 *             "coinType": "BIT",
 *             "amount": "10"
 *           }
 *       404:
 *         description: Not found
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *         examples:
 *           application/json: {
 *             "message": "Rate for the requested coin not found",
 *           }
 */
const getCoinRate = async (req, res) => {
  const { coinType } = req.params;
  try {
    const response = await cryptoService.getCoinRate(coinType);
    if (isEmpty(response) || isNil(response)) {
      return res
        .status(HTTP_STATUSES.NOT_FOUND)
        .send({ message: 'Rate for the requested coin not found' });
    }
    return res.status(HTTP_STATUSES.OK).send(response);
  } catch (error) {
    return res
      .status(HTTP_STATUSES.INTERNAL_SERVER_ERROR)
      .send({ message: error.message });
  }
};
/**
 * @swagger
 * /crypto/buy:
 *   post:
 *     summary: purchase coin
 *     produces:
 *       "application/json"
 *     tags:
 *       - "buy coin"
 *     parameters:
 *       - name: coinType
 *         in: body
 *         description: "Crypto currency type"
 *         required: true
 *         type: "string"
 *       - name: body
 *         in: path
 *         description: "Crypto currency amount"
 *         required: true
 *         type: "string"
 *       - name: _id
 *         in: body
 *         description: "transaction id"
 *         required: true
 *         type: "string"
 *     responses:
 *       200:
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: "string"
 *             transactionInfo:
 *               type: object
 *         examples:
 *           application/json: {
 *             "_id": "successfully purchased",
 *             "transactionInfo": '{"acknowledged": true,"modifiedCount": 0,"upsertedId": null,"upsertedCount": 0,"matchedCount": 0}',
 *           }
 */
const purchaseCoin = async (req, res) => {
  const { id, coinType, amount } = req.body;
  try {
    if (!coinType || !amount) {
      return res
        .status(400)
        .send({ message: 'Incorrect request body parameters' });
    }
    const response = await cryptoService.purchaseCoinByType(
      id,
      coinType,
      amount
    );
    const resBody = {
      message: 'successfully sold',
      transactionInfo: response
    };
    return res.status(200).send(resBody);
  } catch (error) {
    return res
      .status(HTTP_STATUSES.INTERNAL_SERVER_ERROR)
      .send({ message: error.message });
  }
};
/**
 * @swagger
 * /crypto/sell:
 *   post:
 *     summary: sell coin
 *     produces:
 *       "application/json"
 *     tags:
 *       - "sell coin"
 *     parameters:
 *       - name: coinType
 *         in: body
 *         description: "Crypto currency type"
 *         required: true
 *         type: "string"
 *       - name: body
 *         in: path
 *         description: "Crypto currency amount"
 *         required: true
 *         type: "string"
 *       - name: _id
 *         in: body
 *         description: "transaction id"
 *         required: true
 *         type: "string"
 *     responses:
 *       200:
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: "string"
 *             transactionInfo:
 *               type: object
 *         examples:
 *           application/json: {
 *             "_id": "successfully sold",
 *             "transactionInfo": '{"acknowledged": true,"modifiedCount": 0,"upsertedId": null,"upsertedCount": 0,"matchedCount": 0}',
 *           }
 */
const sellCoin = async (req, res) => {
  const { id, coinType, amount } = req.body;
  try {
    if (!coinType || !amount) {
      return res
        .status(400)
        .send({ message: 'Incorrect request body parameters' });
    }
    const response = await cryptoService.sellCoinByType(id, coinType, amount);
    const resBody = {
      message: 'successfully sold',
      transactionInfo: response
    };
    return res.status(200).send(resBody);
  } catch (error) {
    return res
      .status(HTTP_STATUSES.INTERNAL_SERVER_ERROR)
      .send({ message: error.message });
  }
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
