module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['feature', 'fix', 'revert', 'perf', 'refactor', 'optimize', 'style', 'docs', 'chore', 'test', 'build']
    ],
    'type-empty': [2, 'never'],
    // 'scope-empty': [2, 'never'],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never'],
    // 'subject-case': [
    //   2,
    //   'always',
    //   ['lower-case', 'upper-case', 'camel-case', 'kebab-case', 'pascal-case', 'sentence-case', 'snake-case', 'start-case']
    // ],
    'header-max-length': [2, 'always', 100]
  }
}
