module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@client/(.*)$': '<rootDir>/src/$1',
    '^@common/(.*)$': '<rootDir>/../common/$1',
  },
};
