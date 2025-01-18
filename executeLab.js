const filename = process.argv[2];
const filePath = `./labs/${filename}.js`;

async function executeFunctionLab() {
  // Clear the require cache so we can re-import the module in case it has changed.
  // delete require.cache[require.resolve(modulePath)];

  const { testCases, subject } = await import(filePath);
  const results = [];
  let pass = true;
  testCases.forEach((testCase, index) => {
    const result = subject(...testCase.input);
    console.log(result + ' stupid');
    if (result === testCase.output) {
      results.push(`\x1b[42m[PASS]\x1b[0m`);
    } else {
      results.push(`\x1b[41m[FAIL]\x1b[0m`);
      pass = false;
    }
  });
  
  // And color code the results.
  console.log(`🧪 labs/${filename}.js:`);
  results.forEach((result, index) => {
    console.log(`  ${result}: subject(${testCases[index].input}) => ${testCases[index].output}`);
  });

  process.exit(pass ? 0 : 1);
}

executeFunctionLab();