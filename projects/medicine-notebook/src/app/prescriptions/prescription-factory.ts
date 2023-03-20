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
    const parsedMedicines = params.medicines ? this.getUniqueDosages(params.medicines) : undefined;
    return Object.assign<Prescription, typeof params>(
      {
        memberId: '',
        createdAt: Date.now(),
        dispensedAt: Date.now(),
        pharmacyName: '',
        medicines: [],
      },
      {
        ...params,
        medicines: parsedMedicines,
      },
    );
  }

  private getUniqueDosages(medicines: Prescription['medicines']) {
    return medicines.map<Prescription['medicines'][0]>((medicine) => {
      const dosageMap = new Map(medicine.dosage.map((dose) => [dose.takenAt, dose]));
      const dosageUnique = Array.from(dosageMap.values());
      const sortedDosages = this.sortMedicineDosage(dosageUnique);
      return { ...medicine, dosage: sortedDosages };
    });
  }

  private sortMedicineDosage(dosage: Prescription['medicines'][0]['dosage']) {
    return dosage.sort((a, b) => a.takenAt - b.takenAt);
  }
}
