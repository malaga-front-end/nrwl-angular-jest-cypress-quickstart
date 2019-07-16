module.exports = {
  name: 'nrwl-angular-jest-cypress',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/nrwl-angular-jest-cypress',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
