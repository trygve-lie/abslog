export type LogFunction = (...args: any) => void;

/**
 * An abstract logger which enables adding logging to modules without adding a dependency to a full log library
 */
export type AbstractLogger = {
    trace: LogFunction,
    debug: LogFunction,
    info: LogFunction,
    warn: LogFunction,
    error: LogFunction,
    fatal: LogFunction
}

declare function abstractLogger(logger: any): AbstractLogger;
export default abstractLogger;
