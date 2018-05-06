import fs from 'fs';
import path from 'path';
import csvjson from 'csvjson';

const dataDirPath = './data';
const encoding = 'utf8';
const options = { delimiter : ',' };


export default class Importer {
  constructor(watcher, isSync = true) {
    this.watcher = watcher;
    this.watcher.on('changed', (files) => this.onChange(files, isSync));
  }

  /*
   * @param {array} files
   * @param {boolean} isSync
   */
  onChange(files, isSync) {
    for(let fileName of files) {
      if (isSync) {
        this.importSync(fileName);
      } else {
        this.import(fileName)
          .then(data => console.log(data))
          .catch(error => console.log(error));
      }
    }
  };

  /*
   * @param {string} fileName
   */
  import(fileName) {
    const filePath = path.resolve(dataDirPath, fileName);

    return new Promise((resolve, reject) => {
      fs.readFile(filePath, encoding, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(csvjson.toObject(data, options));
        }
      });
    });
  };

  /*
   * @param {string} fileName
   */
  importSync(fileName) {
    const filePath = path.resolve(dataDirPath, fileName);
    const readFileSync = fs.readFileSync(filePath, {encoding});

    console.log(csvjson.toObject(readFileSync, options));
  };
}
