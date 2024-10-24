export default {
  '*.{js,jsx,ts,tsx}': [
    'eslint --fix',
    () => 'tsc --noEmit', // Type checking without emitting files
  ],
  '*.{css,scss}': 'stylelint --fix',
  '*.{json,md}': 'prettier --write',
};
