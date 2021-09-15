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
