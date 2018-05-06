import { config } from '../config';
import { Product, User } from '../models';
import { DirWatcher, Importer } from '../modules';

console.log(config.name);

new Product();
new User();

const dirwatcher = new DirWatcher();
dirwatcher.watch('./data', 1000);
const importer = new Importer(dirwatcher);
