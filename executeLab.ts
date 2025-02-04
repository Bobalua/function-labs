import { argv, exit } from 'process';

const language: string = argv[2];
const filename: string = argv[3];
const testCaseFilter: string = argv[4];
const filePath: string = `./labs/${language}/${filename}`;

const dump = (obj: any): string => JSON.stringify(obj);

interface TestCase {
  input: any[];
  output: any;
  actual?: any;
  logs?: string[];
}

const parseTestCaseParam = (param: string): number[] => {
  if (!param) return [];
  const indices = param.split(',');
  return indices.map(i => parseInt(i));
};

async function executeFunctionLab(): Promise<void> {
  // Inject Custom logger to capture logs -- Must come BEFORE the await import
  const logs: string[][] = [];
  const originalConsoleLog = console.log;
  console.log = (message: string, ...optionalParams: any[]) => {
    if (logs.length > 0) {
      logs[logs.length - 1].push(message, ...optionalParams);
    } else {
      originalConsoleLog(message, ...optionalParams);
    }
  };

  const { testCases, subject }: { testCases: TestCase[], subject: (...args: any[]) => any } = await import(filePath);
  const results: string[] = [];
  let pass: boolean = true;

  const indicesToRun = parseTestCaseParam(testCaseFilter);
  const filteredTestCases = indicesToRun.length > 0 ? indicesToRun.map(i => testCases[i - 1]) : testCases;

  filteredTestCases.forEach((testCase: TestCase, index: number) => {
    logs.push([]);
    const result = subject(...testCase.input);
    testCase.actual = result;
    testCase.logs = logs[logs.length - 1];
    if (result === testCase.output) {
      results.push(`\x1b[42m[PASS]\x1b[0m`);
    } else {
      results.push(`\x1b[41m[FAIL]\x1b[0m`);
      pass = false;
    }
  });

  // Restore the original console.log
  console.log = originalConsoleLog;

  // And color code the results.
  console.log(`🧪 labs/${filename}.ts: ${indicesToRun.join(',')}`);
  results.forEach((result: string, index: number) => {
    const testCase: TestCase = filteredTestCases[index];
    if (result !== `\x1b[42m[PASS]\x1b[0m`) { 
      console.log(`  ${result}: subject(${testCase.input}) => `);
      console.log(`    (Actual) ${dump(testCase.actual)} != ${dump(testCase.output)} (Expected)`);
    } else {
      console.log(`  ${result}: subject(${testCase.input}) => ${dump(testCase.actual)}`);
    }
    if (testCase.logs) {
      testCase.logs.forEach(line => console.log(`      ${line}`));
    }
  });

  exit(pass ? 0 : 1);
}

executeFunctionLab();