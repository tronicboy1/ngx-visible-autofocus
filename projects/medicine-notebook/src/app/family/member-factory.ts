export type Member = {
  name: string;
  dob: number;
  familyId: string;
  weight: number;
  sex: Sex;
  medicineAllergies: string[];
  foodAllergies: string[];
  otherAllergies: string[];
  pollinosis: boolean;
  sideEffectHistory: string[];
  diseaseHistory: string[];
  pharmacies: string[];
  medicalInstitutions: string[];
  uid?: string; // Users that can login have an id
  email?: string;
};

export enum Sex {
  Male = 1,
  Female,
  Q,
}

export type MemberWithId = Member & { id: string };

export class MemberFactory {
  create(data: Partial<Member>) {
    return Object.assign<Member, typeof data>(
      {
        uid: '',
        name: '',
        dob: new Date('1990/1/1').getTime(),
        familyId: '',
        weight: 60,
        sex: Sex.Q,
        medicineAllergies: [],
        foodAllergies: [],
        otherAllergies: [],
        pollinosis: false,
        sideEffectHistory: [],
        diseaseHistory: [],
        pharmacies: [],
        medicalInstitutions: [],
      },
      data,
    );
  }
}
