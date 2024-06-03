module.exports = {
  preset: 'ts-jest',
  setupFilesAfterEnv: ['./src/setupTests.ts'],
  collectCoverageFrom: ['src/**/*.ts'],
};
