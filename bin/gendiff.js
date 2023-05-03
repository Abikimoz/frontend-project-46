import { Command } from 'commander';
import showDiff from '../src/index.js';

const program = new Command();

program
  .name('gendiff', '<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .argument('<format>')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .version('0.0.1')
  // .helpOption('-h, --help', 'output usage information')
  .option('-f, --format [type]', 'output format (default: "stylish")')
  .action((format, filepath1, filepath2) => {
    const result = showDiff(filepath1, filepath2, format);
    console.log(result);
  });

program.parse();
