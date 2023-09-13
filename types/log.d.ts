export type LogFunciton = (...args: any) => void;

/**
 * An abstract logger which enables adding logging to modules without adding a dependency to a full log library
 */
export type AbstractLogger = {
    trace: LogFunciton,
    debug: LogFunciton,
    info: LogFunciton,
    warn: LogFunciton,
    error: LogFunciton,
    fatal: LogFunciton
}

declare function abstractLogger(logger: any): AbstractLogger;
export default abstractLogger;