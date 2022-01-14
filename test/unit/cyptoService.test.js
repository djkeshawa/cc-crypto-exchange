const mockGetCoinRateByCoinType = jest.fn();
const mockSetCoinTransaction = jest.fn();
const mockUpdateCoinTransaction = jest.fn();
jest.mock('../../src/clients/mongoClient', () => ({
  getCoinRateByCoinType: mockGetCoinRateByCoinType,
  setCoinTransaction: mockSetCoinTransaction,
  updateCoinTransaction: mockUpdateCoinTransaction
}));

const { getCoinRate } = require('../../src/service/cryptoService');

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
});
