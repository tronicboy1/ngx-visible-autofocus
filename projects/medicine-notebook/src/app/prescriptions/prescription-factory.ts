type Days = number;

export type Prescription = {
  memberId: string;
  createdAt: number;
  dispensedAt: number;
  pharmacyName: string;
  medicines: {
    amountDispensed: Days;
    medicineName: string;
    dosage: {
      takenAt: TakenAt;
      amount: number;
    }[];
  }[];
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
    return Object.assign<Prescription, typeof params>(
      {
        memberId: '',
        createdAt: Date.now(),
        dispensedAt: Date.now(),
        pharmacyName: '',
        medicines: [],
      },
      params,
    );
  }
}
