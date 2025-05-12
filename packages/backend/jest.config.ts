export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  rootDir: './src',
  coverageDirectory: './../coverage/unit',
  reporters: ['default', ['summary', { summaryThreshold: 1 }]],
}
