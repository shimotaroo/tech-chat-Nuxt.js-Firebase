module.exports = {
  // npm run test実行時にFIRESTORE (7.18.0) INTERNAL ASSERTION FAILED: Unexpected stateへの対応
  testEnvironment: "node",
  moduleFileExtensions: [
    'js',
  ],
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
}
