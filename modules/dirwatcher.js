import { readdir } from 'fs';
import { EventEmitter } from 'events';


export default class DirWatcher extends EventEmitter {
  constructor() {
    super();
    this.timer = null;
    this.dir = [];
  }

  watch(path, delay) {
    this.timer = setInterval(() => {
      readdir(path, (error, files) => {
        if (error) {
          return console.log(error);
        }

        if (!this.dir || !this.isEqual(this.dir, files)) {
          this.dir = files;
          this.emit('changed', files);
        }
      });
    }, delay);
  }

  isEqual(prevDir, dir) {
    return prevDir.length === dir.length &&
      prevDir.reduce((prev, file) => dir.includes(file));
  }
}
