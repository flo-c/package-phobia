module.exports = {
  roots: ['<rootDir>/src', '<rootDir>/server'],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}', '!src/**/*.d.ts',
    'server/**/*.{js,ts}', '!server/**/*.d.ts'
  ],
  setupFiles: [
    require.resolve('react-app-polyfill/jsdom'),
  ],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}',
    '<rootDir>/server/**/__tests__/**/*.{js,ts}',
    '<rootDir>/server/**/*.{spec,test}.{js,ts}'
  ],
  testEnvironment: 'jsdom',
  testRunner: require.resolve('jest-circus/runner'),
  transform: {
    '^.+\\.(js|jsx|mjs|cjs|ts|tsx)$': require.resolve('./config/jest/babelTransform.js'),
    '^.+\\.css$': require.resolve('./config/jest/cssTransform.js'),
    '^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)': require.resolve('./config/jest/fileTransform.js'
    ),
  },
  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
  resetMocks: true
}