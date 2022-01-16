const commonConfig = require('./jest.config');

module.exports = {
  ...commonConfig,
  testMatch: ['**/*.functional.test.{js,jsx,ts,tsx}'],
  coverageDirectory: 'coverage/functional'
};
