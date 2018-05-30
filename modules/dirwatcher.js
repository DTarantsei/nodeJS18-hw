import { readdir } from 'fs';
import { EventEmitter } from 'events';


export default class DirWatcher extends EventEmitter {
  constructor() {
    super();
    this.timer = null;
    this.dirs = [];
  }

  watch(path, delay) {
    this.timer = setInterval(() => {
      readdir(path, (error, files) => {
        if (error) {
          return console.log(error);
        }

        if (!this.dirs || !this.isEqual(this.dirs, files)) {
          this.dirs = files;
          this.emit('changed', files);
        }
      });
    }, delay);
  }

  isEqual(prevDirs, dirs) {
    return prevDirs.length === dirs.length &&
      prevDirs.filter(prevDir => !dirs.includes(prevDir)).length > 0;
  }
}
