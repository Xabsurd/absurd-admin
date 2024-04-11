import Dexie, { type Table } from 'dexie';

export class CustomDB extends Dexie {
  // 'friends' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  dataStructures!: Table<DataStructureType>;

  constructor() {
    super('absurd-admin');
    this.version(1).stores({
      dataStructures: '++id,name,fieldList,addTime,description'
    });
  }
}

export const db = new CustomDB();
