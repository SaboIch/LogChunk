import fs from 'fs';
import chalk from 'chalk';
import stripAnsi from 'strip-ansi';
import path from 'path';

export default class LogChunk {

    /**
    *  Colors for the logger    
    *  @param {Object} Colors - Colors for the logger
    *  @param {Function} RED - Red color
    *  @param {Function} GREEN - Green color
    *  @param {Function} YELLOW - Yellow color
    *  @param {Function} BLUE - Blue color
    *  @param {Function} MAGENTA - Magenta color
    *  @param {Function} CYAN - Cyan color
    *  @param {Function} WHITE - White color
    *  @param {Function} BLACK - Black color
    *  @param {Function} GRAY - Gray color
    *  @param {Function} GREY - Grey
    *  @returns {Object} - The colors object
    */
    static Colors = Object.freeze({
        RED: chalk.red,
        GREEN: chalk.green,
        YELLOW: chalk.yellow,
        BLUE: chalk.blue,
        MAGENTA: chalk.magenta,
        CYAN: chalk.cyan,
        WHITE: chalk.white,
        BLACK: chalk.black,
        GRAY: chalk.gray,
        GREY: chalk.grey,
    });

    /**
     * Warning types for the logger
     * @param {Object} Warning - Warning types for the logger
     * @param {String} WARN - Warning message
     * @param {String} INFO - Information message
     * @param {String} ERROR - Error message
     * @param {String} DEBUG - Debug message
     * @param {String} CRITICAL - Critical
     * @returns {Object} - The warning
     */
    static Warning = Object.freeze({
        WARN: 'warn',
        INFO: 'info',
        ERROR: 'error',
        DEBUG: 'debug',
        CRITICAL: 'critical',
    })

    /**
    *  Admitted options for the logger
    *  @param {Object} options - Options for the logger
    *  @param {String} logFile - The file to log to
    */
    constructor({logFile = null}) {
        this.logFile = logFile;
    }

    _safeLogFile(message) {
        if (this.logFile) {
            fs.appendFileSync(this.logFile, stripAnsi(message) + '\n', (err) => {
                if (err) {
                    console.log(chalk.red('Error: ', err));
                }
            });
        }
    }

    /**
    *  Create a custom log message
    *  @param {Function} color - The color function from LogChunk.Colors
    *  @param {String} type - The type of log message
    *  @param {String} message - The message to log
    *  @returns {String} - The log message
    */
    customLogMessage(color, type, message) {
        if (!Object.keys(LogChunk.Colors).includes(color)) {
            throw new Error(`Invalid log type: "${type}". Allowed types: ${Object.keys(LogChunk.Colors).join(', ')}`);
        }
        const dateTime = new Date().toLocaleString();
        const logMessage = `${chalk.white()}[${color(type.toUpperCase())}${chalk.white()}] ${color(dateTime)} ${chalk.white()}: ${color(message)}`;
        console.log(logMessage);
        this._safeLogFile(logMessage);
    }

    _mkLogMessage(color, type, message) {
        const dateTime = new Date().toLocaleString();
        const logMessage = `${chalk.white()}[${color(type.toUpperCase())}${chalk.white()}] ${color(dateTime)} ${chalk.white()}: ${color(message)}`;
        console.log(logMessage);
        this._safeLogFile(logMessage);
    }

    /**
    *  Create a log message
    *  @param {String} type - The type of log message
    *  @param {String} message - The message to log
    *  @returns {String} - The log message
    */
    makeLogMessage(type, message) {
        if (type === LogChunk.Warning.WARN) {
            this._mkLogMessage(chalk.yellow, type, message);
        } else if (type === LogChunk.Warning.INFO) {
            this._mkLogMessage(chalk.blue, type, message);
        } else if (type === LogChunk.Warning.ERROR) {
            this._mkLogMessage(chalk.red, type, message);
        } else if (type === LogChunk.Warning.DEBUG) {
            this._mkLogMessage(chalk.green, type, message);
        } else if (type === LogChunk.Warning.CRITICAL) {
            this._mkLogMessage(chalk.redBright, type, message);
        } else {
            throw new Error(`Invalid log type: "${type}". Allowed types: ${Object.keys(LogChunk.Warning).join(', ')}`);
        }
    }

}