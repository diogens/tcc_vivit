module.exports = {
  testPathIgnorePatterns: ['/node_modules/'],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/**/stories.js',
    '!src/screens/**/*.js',
    '!src/styles/**/*.js',
    '!src/context/**/*.js',
    '!src/services/api.js',
    '!src/hooks/**/*.js',
    '!src/routers/**/*.js'
  ],
  setupFilesAfterEnv: ['<rootDir>/.jest/setup.js'],
  modulePaths: ['<rootDir>/src/', '<rootDir>/.jest'],
  moduleNameMapper: {
    '^styled-components':
      '<rootDir>/node_modules/styled-components/dist/styled-components.browser.cjs.js'
  }
}
