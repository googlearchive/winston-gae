/*
Copyright 2015 Google, Inc. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

var winston = require('winston'),
    util = require('util'),
    os = require('os'),
    fs = require('fs');

var GoogleAppEngine = exports.GoogleAppEngine = function (options) {
    options = options || {};

    this.name = 'GoogleAppEngine';
    this.level = options.level || 'info';
};

var levels = exports.levels = {
    emergency: 0,
    alert: 1,
    critical: 2,
    error: 3,
    warning: 4,
    notice: 5,
    info: 6,
    debug: 7,
    'default': 8
};

util.inherits(GoogleAppEngine, winston.Transport);

winston.transports.GoogleAppEngine = GoogleAppEngine;

winston.config.GoogleAppEngine = {
    levels: levels
};

GoogleAppEngine.prototype.log = function (level, msg, meta, callback) {
    if (this.silent) {
        return callback(null, true);
    }

    // if meta is ommitted, make sure callback is assigned correctly
    if (typeof(meta) === 'function' && !callback) {
        callback = meta;
    }

    if (typeof(msg) !== 'string') {
        msg = util.inspect(msg);
    }

    var milliseconds = (new Date()).getTime();
    var seconds = Math.floor(milliseconds / 1000);
    var nanos = (milliseconds % 1000) * 1000000;

    var severity = level.toUpperCase();

    var output = {
        'timestamp': {
            'seconds': seconds,
            'nanos': nanos
        },
        'message': msg,
        'severity': severity
    };

    var line = JSON.stringify(output) + os.EOL;
    fs.appendFile('/var/log/app_engine/custom_logs/app.log.json', line, callback);
};
