import { writeFile, readFile, readdir } from 'fs/promises';
import path from 'path';
import shortid from 'shortid';

export class SimpleDB {
  constructor(instance) {
    this.storeDest = instance;
  }
  getPath(id) {
    const fileName = `${id}.json`;
    const filePath = path.join(this.storeDest, fileName);
    return filePath;
  }
  save(obj) {
    obj.id = shortid.generate();
    const filePath = this.getPath(obj.id);
    const stringified = JSON.stringify(obj);
    return writeFile(filePath, stringified);
  }

  get(id) {
    const getPathById = this.getPath(id);
    return readFile(getPathById, 'utf-8')
      .then((contentTxt) => JSON.parse(contentTxt))
      .catch((err) => {
        if (err.code === 'ENOENT') {
          return null;
        }
        throw err;
      });
  }

  getAll() {
    return readdir(this.storeDest).then((dogs) => {
      return Promise.all(
        dogs.map((dogObj) => {
          return path.join(this.storeDest, dogObj);
        })
      ).then((booger) => {
        return Promise.all(
          booger.map((dogIds) => {
            return readFile(dogIds, 'utf-8').then((contentTxt) =>
              JSON.parse(contentTxt)
            );
          })
        );
      });
    });
  }
}
