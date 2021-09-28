import { Command } from 'commander';
const pkg = require("../package.json");

const program = new Command();
program.version(pkg.version).name('fanyi');

program.parse(process.argv);