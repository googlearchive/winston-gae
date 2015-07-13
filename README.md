# winston-gae

A Google App Engine (Managed VMs) transport for [Winston](https://github.com/flatiron/winston).  Logs will show up in the [Google Developers Console](https://console.developers.google.com/project) Logs Viewer.

> Experimental until v1.0.0
> This is not an official Google project

## Installation

```sh
$ npm install winston
$ npm install winston-gae
```

## Usage
```js
var winston = require('winston');

// Requiring `winston-gae` will expose
// `winston.transports.GoogleAppEngine`
// and
// `winston.config.GoogleAppEngine.levels`
require('winston-gae');

var logger = new winston.Logger({
  levels: winston.config.GoogleAppEngine.levels,
  transports: [
    new winston.transports.GoogleAppEngine({
      // capture logs at emergency level and above (all levels)
      level: 'emergency'
    })
  ]
});

logger.default('this is a default message');
logger.debug('this is a debug message');
logger.info('this is my normal message');
logger.notice('this is a notice');
logger.warning('this is a warning');
logger.error('this is an error message');
logger.critical('this is a critical message');
logger.alert('this is an alert');
logger.emergency('this is an emergency');
```

There is one optional setting:

- `level` - The lowest log level this transport will log, defaults to `info`

## Viewing your logs

When `winston-gae` is used as a Winston transport in a Node.js app running on Google App Engine (Managed VMs), logs will be visible in the [Google Developers Console](https://console.developers.google.com/project) Logs Viewer.

After selecting your Cloud project, navigate to `Monitoring > Logs` in the left navigation bar.  Select `App Engine`, your module, your version, and `app` log type from the drop-down menus.
