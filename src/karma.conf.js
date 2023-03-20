process.env.CHROME_BIN = require('puppeteer').executablePath() // IMPORTANT!

export default function (config) {
  config.set({
    browsers: ["Chrome", "ChromeHeadless", "MyHeadlessChrome"],

    customLaunchers: {
        ChromeHeadless: {
          base: 'Chrome',
          flags: [
            '--no-sandbox',
            '--headless',
            '--disable-gpu',
            '--remote-debugging-port=9222'
          ]
        }
      },

    frameworks: ["mocha", "chai"],
    files: ["test/**/*.js"],
    reporters: ["progress"],
    port: 9876, // karma web server port
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ["ChromeHeadless"],
    autoWatch: false,
    // singleRun: false, // Karma captures browsers, runs the tests and exits
    concurrency: Infinity,
  });
};
