import { spawn } from "child_process";
import { watchFile, unwatchFile, readFileSync, writeFileSync } from "fs";
import { prependFile, fuzzyTime } from "./utils.js";
import readline from "readline";

class LabRunner {
  constructor(language, filename) {
    this.language = language;
    this.filename = filename;
    this.startTime = Date.now();
    this.attempts = 0;
    this.caseResults = [];
    this.lastRunResults = [];
    this.lastRunFilter = [];
    this.caseFilter = [];
    this.isRunningTests = false;
    this.runData = '';
    this.config = this.getConfig();
    this.filePath = this.getFilePath();
    this.abortController = new AbortController();
    this.history = this.loadHistory();

    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  getConfig() {
    return {
      command: "./node_modules/.bin/tsx",
      args: ["executeLab.ts", this.language, this.filename],
    };
  }

  getFilePath() {
    const extension = this.language === "javascript" ? "js" : "ts";
    return `./labs/${this.language}/${this.filename}.${extension}`;
  }

  loadHistory() {
    return { bestTime: null, totalAttempts: 0 };
    // TODO: Implement additional or different history than the existing comment prefix system
    //    Meg, you out there?? Take a swing! 😎
    // try {
    //   const historyPath = `./labs/${this.language}/.history/${this.filename}.json`;
    //   const historyData = JSON.parse(readFileSync(historyPath, 'utf8'));
    //   return historyData || { bestTime: null, totalAttempts: 0 };
    // } catch {
    //   return { bestTime: null, totalAttempts: 0 };
    // }
  }

  saveHistory() {
    // const duration = Date.now() - this.startTime;
    // const historyPath = `./labs/${this.language}/.history/${this.filename}.json`;
    // const history = {
    //   bestTime: this.history.bestTime ? Math.min(duration, this.history.bestTime) : duration,
    //   totalAttempts: this.history.totalAttempts + this.attempts
    // };
    // writeFileSync(historyPath, JSON.stringify(history, null, 2));
  }

  logAttempt(pass, duration) {
    const status = pass ? "✅ Success" : "❌ Failed";
    const timestamp = new Date().toISOString();
    const message = `// ${timestamp} - Attempt ${this.attempts} - ${status} after ${fuzzyTime(duration)}`;
    prependFile(this.filePath, message);
  }

  clearScreen() {
    process.stdout.write("\x1b[2J\x1b[H");
  }

  displayProgressBar(passed, total) {
    const width = 40;
    
    // Calculate statistics for all test cases
    const totalCases = this.lastRunResults.length;
    const totalPassed = this.lastRunResults.filter(r => r === true).length;
    const totalFailed = this.lastRunResults.filter(r => r === false).length;
    const totalUnrun = this.lastRunResults.filter(r => r === undefined).length;
    
    // Calculate statistics based on the filter from the last run
    let activeTotal, activePassed, activeFailed, activeUnrun;
    
    if (this.lastRunFilter.length > 0) {
      activeTotal = this.lastRunFilter.length;
      activePassed = this.lastRunFilter.reduce((count, caseNumber) => {
        return count + (this.lastRunResults[caseNumber - 1] === true ? 1 : 0);
      }, 0);
      activeFailed = this.lastRunFilter.reduce((count, caseNumber) => {
        return count + (this.lastRunResults[caseNumber - 1] === false ? 1 : 0);
      }, 0);
      activeUnrun = this.lastRunFilter.reduce((count, caseNumber) => {
        return count + (this.lastRunResults[caseNumber - 1] === undefined ? 1 : 0);
      }, 0);
    } else {
      activeTotal = totalCases;
      activePassed = totalPassed;
      activeFailed = totalFailed;
      activeUnrun = totalUnrun;
    }
  
    // Calculate segments for the progress bar
    const passedWidth = Math.round((activePassed / totalCases) * width);
    const failedWidth = Math.round((activeFailed / totalCases) * width);
    const remainingWidth = width - (passedWidth + failedWidth);
    
    // Create color-coded progress bar
    const bar = '\x1b[32m' + '█'.repeat(passedWidth) +   // Green for passed
                '\x1b[31m' + '█'.repeat(failedWidth) +   // Red for failed
                '\x1b[0m' + '░'.repeat(remainingWidth);  // Default color for filtered/unrun
    
    const percent = Math.round((activePassed / activeTotal) * 100);
    const basicProgress = `${bar} ${percent}% (${activePassed}/${activeTotal})`;
    
    // Show current filter status separate from the last run results
    const filterInfo = this.lastRunFilter.length > 0
      ? ` (Filtered: ${this.lastRunFilter.join(',')})`
      : '';
      
    const statusInfo = `\n\x1b[90m├─ Passed: ${activePassed}`
      + `\n├─ Failed: ${activeFailed}`
      + `\n└─ Not run: ${activeUnrun}\x1b[0m`;
    
    return `${basicProgress}${filterInfo}${statusInfo}`;
  }

  displayWaitingMessage() {
    this.clearScreen();
    const totalTests = this.caseResults.length;
    let passedTests;
  
    if (this.caseFilter.length > 0) {
      passedTests = this.caseFilter.reduce((count, caseNumber) => {
        return count + (this.caseResults[caseNumber - 1] === true ? 1 : 0);
      }, 0);
    } else {
      passedTests = this.caseResults.filter(r => r === true).length;
    }
    
    console.log(`\x1b[1m🔬 Lab: ${this.filename} (${this.language})\x1b[0m`);
    console.log(`\x1b[90m${'-'.repeat(50)}\x1b[0m\n`);
    
    if (totalTests > 0) {
      console.log(`\x1b[1mProgress:\x1b[0m`);
      console.log(this.displayProgressBar(passedTests, totalTests));
      console.log(`\nAttempts: ${this.attempts}`);
      if (this.history.bestTime) {
        console.log(`Best time: ${fuzzyTime(this.history.bestTime)}`);
      }
      
      if (this.caseFilter.length > 0) {
        const totalFiltered = this.caseFilter.length;
        const passedFiltered = this.caseFilter.reduce((count, caseNumber) => {
          return count + (this.caseResults[caseNumber - 1] === true ? 1 : 0);
        }, 0);
        console.log(`\n\x1b[33mActive Filter:\x1b[0m ${passedFiltered}/${totalFiltered} passed in filter (Cases ${this.caseFilter.join(', ')})`);
      }
    }

    console.log(`\n\x1b[36m🔄 Watching for changes...\x1b[0m`);
    console.log(`\n\x1b[90mCommands:\x1b[0m`);
    if (this.caseResults.length > 0) {
      console.log(`  \x1b[90mf\x1b[0m        Filter to failed cases`);
    }
    console.log(`  \x1b[90m1,2,3\x1b[0m    Run specific cases`);
    console.log(`  \x1b[90menter\x1b[0m    Clear filter`);
    
    // Setup input listener
    this.setupInputListener();
  }

  setupInputListener() {
    this.rl.question('', { signal: this.abortController.signal }, (input) => {
      this.handleInput(input.trim());
      if (!this.isRunningTests) {
        this.setupInputListener();
      }
    });
  }

  displayTestResults(data) {
    this.clearScreen();
    console.log(`\x1b[1m📝 Attempt ${this.attempts} Results:\x1b[0m\n`);
    console.log(data.toString());
  }

  handleTestOutput(data) {
    this.runData += data.toString();
  }

  handleTestError(data) {
    const error = data.toString().trim();
    console.error(`\x1b[31m\n❌ Error: ${error}\x1b[0m`);
    
    // Provide helpful context for common errors
    if (error.includes('SyntaxError')) {
      console.log(`\n\x1b[33mTip: Check for missing semicolons, brackets, or syntax errors\x1b[0m`);
    } else if (error.includes('ReferenceError')) {
      console.log(`\n\x1b[33mTip: Ensure all variables are properly declared and imported\x1b[0m`);
    }
  }

  handleTestCompletion(exitCode) {
    this.isRunningTests = false;
  
    // Parse test results - these are only for the filtered cases that were actually run
    const filteredResults = this.runData.split("\n").reduce((acc, line) => {
      if (line.includes("[PASS]") || line.includes("[FAIL]")) {
        acc.push(line.includes("[PASS]"));
      }
      return acc;
    }, []);
  
    if (this.caseFilter.length > 0) {
      // If this is our first run and caseResults is empty, initialize it
      if (this.caseResults.length === 0) {
        const maxTestCase = Math.max(...this.caseFilter);
        this.caseResults = new Array(maxTestCase).fill(undefined);
      }
      
      // Map the new filtered results back to their positions
      this.caseFilter.forEach((caseNumber, index) => {
        // caseNumber is 1-based, array is 0-based
        this.caseResults[caseNumber - 1] = filteredResults[index];
      });
    } else {
      // No filter active - use all results
      this.caseResults = filteredResults;
    }
  
    // After updating caseResults, store them as the last completed run
    // Store both results and filter from this run
    this.lastRunResults = [...this.caseResults];
    this.lastRunFilter = [...this.caseFilter];
  
    this.displayTestResults(this.runData);
    this.runData = '';
  
    if (exitCode === 0) {
      unwatchFile(this.filePath);
      const duration = Date.now() - this.startTime;
      this.saveHistory();
      
      console.log(`\n\x1b[32m🎉 Challenge Complete!\x1b[0m`);
      console.log(`\x1b[32m├─ Time: ${fuzzyTime(duration)}\x1b[0m`);
      console.log(`\x1b[32m└─ Attempts: ${this.attempts}\x1b[0m`);
      
      // TODO: Without working history loading this doesn't work
      if (this.history.bestTime && duration < this.history.bestTime) {
        console.log(`\n\x1b[33m🏆 New personal best!\x1b[0m`);
      }
      
      this.logAttempt(true, duration);
      this.rl.close();
      process.exit(0);
    } else {
      console.log(`\n\x1b[36mPress any key to continue...\x1b[0m`);
      this.waitForKeyContinue();
    }
  }

  async runTests() {
    if (this.isRunningTests) return;

    this.isRunningTests = true;
    this.attempts++;
    this.clearScreen();

    const spinner = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
    let spinnerIdx = 0;
    const spinnerInterval = setInterval(() => {
      // Note: \r is a carriage return to move cursor to start of line which is different from \n
      process.stdout.write(`\r\x1b[33m${spinner[spinnerIdx]} Running tests...\x1b[0m`);
      spinnerIdx = (spinnerIdx + 1) % spinner.length;
    }, 80);

    // Abort any pending user input
    this.abortController.abort();
    this.abortController = new AbortController();

    const args = [...this.config.args, this.caseFilter.join(",")];
    const testResults = spawn(this.config.command, args, {
      env: this.config.env
    });

    testResults.stdout.on("data", this.handleTestOutput.bind(this));
    testResults.stderr.on("data", this.handleTestError.bind(this));
    testResults.on("close", (code) => {
      clearInterval(spinnerInterval);
      process.stdout.write('\r');  // /r over /n again to prevent new line
      this.handleTestCompletion(code);
    });

    await testResults;
  }

  handleInput(input) {
    if (this.isRunningTests) return;

    // Clear filter if Enter is pressed (empty input)
    if (!input) {
      if (this.caseFilter.length > 0) {
        this.caseFilter = [];
        this.displayWaitingMessage()
      }
      return;
    }

    // Filter to failed tests if 'f' or 'F' is entered
    if (input.toLowerCase() === 'f') {
      const failedIndices = this.caseResults
        .map((pass, index) => pass ? null : index + 1)
        .filter(index => index !== null);
      
      if (failedIndices.length > 0) {
        this.caseFilter = failedIndices;
        this.displayWaitingMessage();
      } else {
        console.log('\n\x1b[32mNo failed cases to filter.\x1b[0m');
        setTimeout(() => this.displayWaitingMessage(), 3000);
      }
      return;
    }

    // Handle numeric input for specific test cases
    // Filter to only valid numbers between 1 and the number of test cases
    const testIndices = input.split(',')
      .map(n => parseInt(n.trim()))
      .filter(n => !isNaN(n) && n > 0 && n <= this.caseResults.length);

    if (testIndices.length > 0) {
      this.caseFilter = testIndices;
      this.displayWaitingMessage();
    } else {
      console.log('\n\x1b[31mInvalid test-case numbers. Enter comma-separated numbers or "f" for failed cases.\x1b[0m');
      setTimeout(() => this.displayWaitingMessage(), 1500);
    }
  }

  runFailedTests() {
    // Create a filter for tests that failed or haven't been run yet
    this.caseFilter = this.caseResults
      .map((pass, index) => (pass === false || pass === undefined ? index + 1 : null))
      .filter(caseNumber => caseNumber !== null);
    
    if (this.caseFilter.length > 0) {
      console.log(`\n\x1b[36mRunning failed test cases: ${this.caseFilter.join(', ')}\x1b[0m`);
      this.runTests();
    } else {
      console.log(`\n\x1b[32mNo failed tests to run!\x1b[0m`);
      this.displayWaitingMessage();
    }
  }

  waitForKeyContinue() {
    const cleanup = () => {
      process.stdin.setRawMode(false);
      process.stdin.removeListener('data', handler);
    };

    const handler = (data) => {
      cleanup();
      this.displayWaitingMessage();
    };

    process.stdin.setRawMode(true);
    process.stdin.on('data', handler);
  }

  quit() {
    console.log(`\n\x1b[33m👋 Goodbye! Lab Runner is shutting down...\x1b[0m`);
    this.logAttempt(false, Date.now() - this.startTime);
    this.rl.close();
    process.exit(0);
  }

  start() {
    this.clearScreen();
    console.log(`\x1b[36m\n🚀 Welcome to Lab Runner!\x1b[0m`);
    console.log(`\x1b[1m${this.filename}\x1b[0m in ${this.language} mode`);
    
    if (this.history.totalAttempts > 0) {
      console.log(`\nPrevious attempts: ${this.history.totalAttempts}`);
      if (this.history.bestTime) {
        console.log(`Best time: ${fuzzyTime(this.history.bestTime)}`);
      }
    }
    
    console.log('\nPress any key to begin...');
    
    // Setup file watcher
    watchFile(this.filePath, async () => {
      if (!this.isRunningTests) {
        await this.runTests();
      }
    });

    // Handle termination signals
    const terminationHandler = () => this.quit();
    process.on("SIGINT", terminationHandler);
    process.on("SIGTERM", terminationHandler);
    
    // Wait for key press to start
    this.waitForKeyContinue();
  }
}

// Parse command line arguments
const [language, filename] = process.argv.slice(2);

// Start the lab runner
const runner = new LabRunner(language, filename);
runner.start();