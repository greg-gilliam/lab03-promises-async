import { writeFile, readFile } from 'fs/promises';
import path from 'path';
import shortid from 'shortid';

export class SimpleDB {
  constructor(instance) {
    this.storeDest = instance;
  }

// method that saves object
  // save method takes in an object. generate Id & assign id to object Id..
  // create JSON file name with object id.
  // create path by joining location with the file name
  // stringify object
  // return written file of the path that is stringified.

  getPath(id){
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
    return readFile(getPathById, 'utf-8').then(contentTxt => 
      JSON.parse(contentTxt)).catch((err) => {
      if (err.code === 'ENOENT') {
        return null;
      }
      throw err;
    });
    // const parsedObject = JSON.parse(getPathById);
    // return parsedObject;
  }
}
