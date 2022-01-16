const express = require('express');
const {
  getCoinRate,
  purchaseCoin,
  sellCoin,
  updateTransaction,
  cancelTransaction
} = require('./cryptoController');

const router = express.Router();

router.get('/rate/:coinType', getCoinRate);
router.post('/buy', purchaseCoin);
router.post('/sell', sellCoin);
router.put('/update', updateTransaction);
router.delete('/cancel', cancelTransaction);

module.exports = router;
