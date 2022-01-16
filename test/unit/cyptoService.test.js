const mockGetCoinRateByCoinType = jest.fn();
const mockSetCoinTransaction = jest.fn();
const mockUpdateCoinTransaction = jest.fn();
jest.mock('../../src/clients/mongoClient', () => ({
  getCoinRateByCoinType: mockGetCoinRateByCoinType,
  setCoinTransaction: mockSetCoinTransaction,
  updateCoinTransaction: mockUpdateCoinTransaction
}));

const {
  getCoinRate,
  sellCoinByType,
  purchaseCoinByType
} = require('../../src/service/cryptoService');

describe('Crypto service unit test', () => {
  afterEach(() => {
    jest.resetAllMocks();
    mockGetCoinRateByCoinType.mockClear();
    mockSetCoinTransaction.mockClear();
    mockUpdateCoinTransaction.mockClear();
  });

  const mockPayload = {
    _id: '123141341341',
    amount: '5',
    coinType: 'BIT'
  };

  describe('getCoinRate: unit test', () => {
    it('should be able to fetch the coin rate', async () => {
      mockGetCoinRateByCoinType.mockImplementation(() =>
        Promise.resolve(mockPayload)
      );
      const response = await getCoinRate(mockPayload.coinType);
      expect(response).toEqual(mockPayload);
    });

    it('should be able to return the correct error if DB invocation failed', async () => {
      mockGetCoinRateByCoinType.mockImplementation(() =>
        Promise.reject(new Error('dummy error'))
      );
      try {
        await getCoinRate(mockPayload.coinType);
      } catch (error) {
        expect(error).toEqual(
          new Error('service:getCoinRate: Error: dummy error')
        );
      }
    });
  });

  describe('sellCoinByType: unit test', () => {
    it('should be able to sell coin by type', async () => {
      mockGetCoinRateByCoinType.mockImplementation(() =>
        Promise.resolve(mockPayload)
      );
      await sellCoinByType(
        mockPayload._id,
        mockPayload.coinType,
        mockPayload.amount
      );
      expect(mockUpdateCoinTransaction).toHaveBeenCalledWith(
        '123141341341',
        'BIT',
        '10'
      );
    });

    it('should be able to return the correct error if DB invocation failed', async () => {
      mockGetCoinRateByCoinType.mockImplementation(() =>
        Promise.reject(new Error('dummy error'))
      );
      try {
        await sellCoinByType(
          mockPayload._id,
          mockPayload.coinType,
          mockPayload.amount
        );
      } catch (error) {
        expect(error).toEqual(
          new Error('service:sellCoinByType: Error: dummy error')
        );
      }
    });
  });

  describe('purchaseCoinByType: unit test', () => {
    it('should be able purchase coin', async () => {
      mockGetCoinRateByCoinType.mockImplementation(() =>
        Promise.resolve(mockPayload)
      );
      await purchaseCoinByType(
        mockPayload._id,
        mockPayload.coinType,
        mockPayload.amount
      );
      expect(mockUpdateCoinTransaction).toHaveBeenCalledWith(
        '123141341341',
        'BIT',
        '0'
      );
    });

    it('should be able to return the correct error if DB invocation failed', async () => {
      mockGetCoinRateByCoinType.mockImplementation(() =>
        Promise.reject(new Error('dummy error'))
      );
      try {
        await purchaseCoinByType(
          mockPayload._id,
          mockPayload.coinType,
          mockPayload.amount
        );
      } catch (error) {
        expect(error).toEqual(
          new Error('service:purchaseCoinByType: Error: dummy error')
        );
      }
    });
  });
});
