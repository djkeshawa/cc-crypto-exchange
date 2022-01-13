module.exports = {
  testEnvironment: 'node',
  collectCoverage: true,
  coverageDirectory: 'coverage/unit',
  testMatch: [
    '**/*.test.{js,ts}',
    '!**/*.integration.test.{js,ts}',
    '!**/*.functional.test.{js,ts}'
  ],
  transformIgnorePatterns: [
    '[/\\\\\\\\]node_modules[/\\\\\\\\].+\\\\.(js|ts)$'
  ],
  transform: {
    '^.+\\.(js|ts)$': '<rootDir>/node_modules/babel-jest'
  },
  testTimeout: 40000
};
