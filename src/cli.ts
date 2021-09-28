import { Command } from 'commander';
const pkg = require("../package.json");

import { translate } from './main'

const program = new Command();
program.version(pkg.version).name('fanyi')
  .usage('<English>')
  .argument('<English>')
  .action((english) => {
    translate(english)
  });

program.parse(process.argv);