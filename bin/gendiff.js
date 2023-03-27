import { Command } from 'commander';

const program = new Command();

program
  .name('gendiff', '<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .argument('<filepath1> <filepath2>')
  .version('0.0.1')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format <type>', 'output format');

program.parse();
