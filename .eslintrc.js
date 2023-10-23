module.exports = {
  rules: {
    'no-underscore-dangle': 0,
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
  },
  extends: 'airbnb-base',
};
