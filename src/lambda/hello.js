const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

function launchChromeAndRunLighthouse(url, opts, config = null) {
  return chromeLauncher
    .launch({ chromeFlags: opts.chromeFlags, onlyCategories: ['performance'] })
    .then(chrome => {
      opts.port = chrome.port;
      return lighthouse(url, opts, config).then(results => {
        // use results.lhr for the JS-consumeable output
        // https://github.com/GoogleChrome/lighthouse/blob/master/types/lhr.d.ts
        // use results.report for the HTML/JSON/CSV output as a string
        // use results.artifacts for the trace/screenshots/other specific case you need (rarer)
        return chrome.kill().then(() => results.lhr);
      });
    });
}

// this uses the callback syntax, however, we encourage you to try the async/await syntax shown in async-dadjoke.js
export function handler(event, context, callback) {
  const opts = { chromeFlags: ['--show-paint-rects'] };
  console.log('queryStringParameters', event.queryStringParameters);
  launchChromeAndRunLighthouse('https://google.com', opts).then(result => {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(result)
    });
  });
}
