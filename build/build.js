// copy assets (/src/assets/file-64) to dist folder (/dist/assets/file-64)
// and run vite build

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const log = console.log;

// run vite build
const { exec } = require('child_process');
exec('vite build', (err, stdout) => {
    if (err) {
        log(chalk.red(err));
        return;
    }
    log(stdout);
    const src = path.resolve(__dirname, '../src/assets/file-64');
    const dist = path.resolve(__dirname, '../dist/assets/file-64');

    fs.cp(src, dist, {recursive: true}, function (err) {
        if (err) return console.error(err);
        log(chalk.green('Assets copied to dist folder.'));
        }
    );
});




