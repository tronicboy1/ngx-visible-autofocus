export type Member = {
  name: string;
  dob: number;
  groupId: string;
  weight: number;
  sex: Sex;
  pollinosis: boolean;
  uid?: string; // Users that can login have an id
  email?: string;
} & MemberArrayFields;

export type MemberArrayFields = {
  medicineAllergies: string[];
  foodAllergies: string[];
  otherAllergies: string[];
  sideEffectHistory: string[];
  diseaseHistory: string[];
  pharmacies: string[];
  medicalInstitutions: string[];
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
        groupId: '',
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
