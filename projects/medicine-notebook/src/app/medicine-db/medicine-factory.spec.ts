import { MedicineFactory } from './medicine-factory';

describe('MedicineFactory', () => {
  it('should create an instance', () => {
    expect(new MedicineFactory()).toBeTruthy();
  });
});
