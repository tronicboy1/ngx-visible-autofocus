import { DbWorker } from './db-worker';
import { Medicine, MedicineFactory } from './medicine-factory';

export class MedicineDbWorker extends DbWorker<Medicine> {
  protected storeName = 'medicines';
  protected version = 1;

  protected factory = new MedicineFactory();
}
