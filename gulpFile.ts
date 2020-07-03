"use strict";
export {};

const gulp = require("gulp");
const eslint = require("gulp-eslint");

/**
 * Overview of gulp:
 * TASKS
 * - Each gulp task is an asynchronous JavaScript function - a function that accepts an error-first callback 
 *   or returns a stream, promise, event emitter, child process, or observable.
 * 
 * FILES
 * - The src() and dest() methods are exposed by gulp to interact with files on your computer.
 *   src() is given a glob to read from the file system and produces a Node stream.
 *   src() can operate in three modes: buffering, streaming, and empty. 
 *   These are configured with the buffer and read options on src().
 *   Avoid using Node's path methods, like path.join, to create globs. 
 *   On Windows, it produces an invalid glob because Node uses \\ as the separator. 
 *   Also avoid the __dirname global, __filename global, or process.cwd() for the same reasons.
 *   ** matches any amount - including none - of characters across segments.
 *   ! (negative) Since globs are matched in array order, a negative glob must follow 
 *   at least one non-negative glob in an array.
 * 
 * PIPE API
 * - The main API of a stream is the .pipe() method for chaining Transform or Writable streams.
 *   Most often plugins will be placed between src() and dest() using the .pipe() method and will 
 *   transform the files within the stream.
 * 
 * PLUGINS
 * - Gulp plugins are Node Transform Streams that encapsulate common behavior to transform files in a pipeline 
 *   often placed between src() and dest() using the .pipe() method. 
 *   They can change the filename, metadata, or contents of every file that passes through the stream.
 * 
 * NOTE: In the past, task() was used to register your functions as tasks. While that API is still available, 
 * exporting should be the primary registration mechanism, except in edge cases where exports won't work.
 */

const eslintBuild = () => {
    return gulp.src(["**/*.ts", "!tests/**/**.ts", "!gulpFile.ts"])
        .pipe(eslint({
            configFile: "eslint.json"
        }))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
};

exports.default = gulp.series(eslintBuild);