import { mkdir, rm } from 'fs/promises';
import { SimpleDB } from '../SimpleDB.js';


describe('file copier', () => {
  const destination = './__tests__/destination';

  beforeEach(() => {
    return rm(destination, { force: true, recursive: true }).then(() => {
      return mkdir(destination);
    });
  });

  it('should have an id', () => {
    const db = new SimpleDB(destination);
    const mabel = {
      name: 'mabel',
      age:5
    };

    return db.save(mabel).then(() => {
      expect(mabel.id).toEqual(expect.any(String)); 
    });
  });
});

it('should save and retrieve an object', () => {
  const savedInstance = new SavedObject(destination);
  const getInstance = new GetObject(id);
  const mabel = {
    name: 'mabel',
    age:5
  };

  return savedInstance
    .save(mabel)
    .then(() => {
      return getInstance.get(id);
    })
    .then((booger) => {
    //mabel.id?
      expect(booger).toEqual(mabel.id);
    });
});

it('should return null if no object was returned', () => {
  const getInstance = new GetObject(id);

  return getInstance.get().then((booger) => {
    expect(booger).toBeNull();
  });
});
       
