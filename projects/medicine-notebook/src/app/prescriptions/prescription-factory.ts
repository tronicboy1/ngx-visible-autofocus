import { Medicine } from '../medicine-db/medicine-factory';

type Days = number;
type Amount = number;

export type Prescription = {
  memberId: string;
  createdAt: number;
  dispensedAt: number;
  pharmacyName: string;
  amountDispensed: Days;
  finishedAt: number;
  medicineName: string;
  medicine?: Medicine;
  dosage: [TakenAt, Amount][];
};

export type RxWithId = {
  id: string;
} & Prescription;

export enum TakenAt {
  WhenWoken = 1,
  Morning,
  Lunch,
  Dinner,
  BeforeBed,
  Other,
}

export class PrescriptionFactory {
  create(params: Partial<Prescription>): Prescription {
    if (params.amountDispensed && params.amountDispensed < 1) throw TypeError('AmountDispensed Cannot be less than 1');
    if (params.dispensedAt && params.finishedAt && params.dispensedAt > params.finishedAt)
      throw TypeError('Rx Dates misaligned');
    if (params.dosage && params.dosage.length < 1) throw TypeError('Must have at least one dose');
    if (params.dosage?.some((dose) => dose[1] < 1)) throw TypeError('Dosage Amounts must be greater than 1');
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    return Object.assign<Prescription, typeof params>(
      {
        memberId: '',
        createdAt: today.getTime(),
        dispensedAt: today.getTime(),
        pharmacyName: '',
        amountDispensed: 1,
        finishedAt: tomorrow.getTime(),
        medicineName: '',
        dosage: [],
      },
      params,
    );
  }
}
