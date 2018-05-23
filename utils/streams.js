const commander = require('commander');
const fs = require('fs');
const path = require('path');
const through2 = require('through2');
const csvjson = require('csvjson');


const readStream = filePath => fs.createReadStream(filePath);


function reverse() {
  process.stdin
    .pipe(through2(function (chunk, enc, next) {
      this.push(chunk
        .toString()
        .split('')
        .reverse()
        .join(''));
      return next();
    }))
    .pipe(process.stdout);
}

function transform() {
  process.stdin
    .pipe(through2(function (chunk, enc, next) {
      this.push(chunk.toString().toUpperCase());
      return next();
    }))
    .pipe(process.stdout);
}

function outputFile(path) {
  if (!path) {
    throw new Error('File path is missing')
  }

  readStream(path)
    .on('error', e => console.error(e))
    .pipe(process.stdout);
}

function convertFromFile(path) {
  if (!path) {
    throw new Error('File path is missing')
  }

  const toObject = csvjson.stream.toObject();
  const stringify = csvjson.stream.stringify();

  readStream(path)
    .on('error', e => console.error(e))
    .pipe(toObject)
    .pipe(stringify)
    .pipe(process.stdout);
}

function convertToFile(path) {
  if (!path) {
    throw new Error('File path is missing')
  }

  const toObject = csvjson.stream.toObject();
  const stringify = csvjson.stream.stringify();
  const writeStream = fs.createWriteStream(path.replace(/\.[^\.]+$/, '.json'));

  readStream(path)
    .on('error', e => console.error(e))
    .pipe(toObject)
    .pipe(stringify)
    .pipe(writeStream);
}

function cssBundler(dirPath) {
  if (!dirPath) {
    throw new Error('Directory path is missing')
  }

  const writeStream = fs.createWriteStream(`${dirPath}/bundle.css`);
  const lastFileName = 'nodejs-homework3.css';

  fs.readdir(dirPath, (error, files) => {
    if (error) {
      throw error;
    }

    files
      .filter(fileName => path.extname(fileName) === '.css' && path.basename(fileName) !== lastFileName)
      .forEach(file => readStream(`${dirPath}/${file}`)
        .on('data', chunk => writeStream.write(chunk))
        .on('error', e => console.error(e)));
  });

  fs.readFile(`${dirPath}/${lastFileName}`, (error, data) => {
    if (error) {
      throw error;
    }

    writeStream.write(data);
  });
};

function helpMessage() {
  console.log('  Options:');
  console.log('');
  console.log('    $ set action name -a, --action');
  console.log('    $ set file path -f, --file');
  console.log('    $ get help info -h, --help');
  console.log('    $ --cssBundler');
  console.log('    $ set directory path -f, --file');
  console.log('');

  process.exit();
}

commander
  .option('-a, --action [actionName]', 'action name')
  .option('-f, --file [filePath]', 'file path')
  .option('-h, --help []', 'custom helper')
  .option('--cssBundler []')
  .option('-p, --path [dirPath]', 'directory path')
  .parse(process.argv);

if (commander.rawArgs.length <= 2 ||
  commander.rawArgs[2] === '--help' || commander.rawArgs[2] === '-h'
) {
  helpMessage();
}

if (commander.action) {
  switch (commander.action) {
    case 'reverse':
      reverse();
      break;
    case 'transform':
      process.stdin.once('readable', () => {
        transform(String(process.stdin.read()));
      });
      break;
    case 'outputFile':
      outputFile(commander.file);
      break;
    case 'convertFromFile':
      convertFromFile(commander.file);
      break;
    case 'convertToFile':
      convertToFile(commander.file);
      break;
    case 'cssBundler':
      cssBundler(commander.path);
      break;
  }
}
