// This is called like:
// $ node index.js golf-scorer
// Which will execute the subject function in labs/golf-scorer.js
// against the testCases in that file.
// Then a result will be printed to the console.

import { spawn } from 'child_process';
import { watchFile, unwatchFile } from 'fs';

import { prependFile, fuzzyTime } from './utils.js';

const filename = process.argv[2];
const filePath = `./labs/${filename}.js`;

const startTime = Date.now();
let attempts = 0;

watchFile(filePath, async () => {
  attempts++;
  console.log(`Attempt ${attempts}...`);
  const testResults = spawn('node', ['executeLab.js', filename]);

  testResults.stdout.on('data', (data) => {
    console.log(data.toString());
  });

  testResults.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  testResults.on('close', (code) => {
    if (code === 0) {
      // stop watching the file
      unwatchFile(filePath);

      // All tests passed!
      const duration = Date.now() - startTime;
      console.log(`Challenge complete in ${fuzzyTime(duration)} after ${attempts} attempts.`);
      logAttempt(true, duration);
    } else {
      // Some tests failed.
    }
  });
});

process.on('SIGINT', () => {
  logAttempt(false, Date.now() - startTime);
  process.exit();
});

process.on('SIGTERM', () => {
  logAttempt(false, Date.now() - startTime);
  process.exit();
});

function logAttempt(pass, duration) {
  prependFile(filePath, `// ${new Date().toISOString()} - ${attempts} attempts - ${pass ? 'Success' : 'Failed'} after ${fuzzyTime(duration)}`);
}


