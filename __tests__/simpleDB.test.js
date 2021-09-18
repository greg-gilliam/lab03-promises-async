import { mkdir, rm } from 'fs/promises';
import { SimpleDB } from '../SimpleDB.js';


describe('file copier', () => {
  const storeDest = '../store';

  beforeEach(() => {
    return rm(storeDest, { force: true, recursive: true }).then(() => {
      return mkdir(storeDest);
    });
  });

  it('should have an id', () => {
    const db = new SimpleDB(storeDest);
    const mabel = {
      name: 'mabel',
      age:5
    };

    return db.save(mabel).then(() => {
      expect(mabel.id).toEqual(expect.any(String)); 
    });
  });

  it('should save and retrieve an object', () => {
    const savedInstance = new SimpleDB(storeDest);
    const mabel = {
      name: 'mabel',
      age:5
    };

    return savedInstance
      .save(mabel)
      .then(() => {
        return savedInstance.get(mabel.id);
      })
      .then((booger) => {
        expect(booger).toEqual(mabel);
      });
  });

  it('should return null if no object was returned', () => {
    const getInstance = new SimpleDB(storeDest);

    return getInstance.get().then((booger) => {
      expect(booger).toBeNull();
    });
  });
});       
