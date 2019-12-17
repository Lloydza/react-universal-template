module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'references-empty': [2, 'never'],
    'scope-case': [2, 'always', 'lowerCase'],
    'header-max-length': [2, 'always', 100],
  },

  parserPreset: {
    parserOpts: {
      issuePrefixes: ['USP-', 'ESP-', 'QA-', 'PSD-', 'SYS-', 'CPA-'],
      headerPattern: /^(\w*)(?:\((.*)\))?: (.*) (.*)$/,
      headerCorrespondence: [`type`, `scope`, `subject`],
      noteKeywords: [`BREAKING CHANGE`],
      revertPattern: /^revert:\s([\s\S]*?)\s*This reverts commit (\w*)\./,
      revertCorrespondence: [`header`, `hash`],
    },
  },
};
