import path from 'path';
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

async function executeFunctionLab(filePath, testCases) {
  const { testCases, subject } = await import(path.join(dirname, 'labs', filePath));
  const results = [];
  testCases.forEach((testCase, index) => {
    const result = subject(...testCase.input);

    if (result === testCase.output) {
      results.push('Pass');
    } else {
      results.push('Fail');
    }
  });
}