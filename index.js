import path from 'path';

// This is called like:
// $ node index.js golf-scorer
// Which will execute the subject function in labs/golf-scorer.js
// against the testCases in that file.
// Then a result will be printed to the console.

const filename = process.argv[2];

async function executeFunctionLab() {
  const { testCases, subject } = await import(`./labs/${filename}.js`);
  const results = [];
  testCases.forEach((testCase, index) => {
    const result = subject(...testCase.input);

    if (result === testCase.output) {
      results.push(`\x1b[42m[PASS]\x1b[0m`);
    } else {
      results.push(`\x1b[41m[FAIL]\x1b[0m`);
    }
  });
  
  // And color code the results.
  console.log(`labs/${filename}.js:`);
  results.forEach((result, index) => {
    console.log(`  ${result}`);
  });
}

executeFunctionLab();