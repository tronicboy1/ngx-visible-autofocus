export type Member = {
  name: string;
  dob: number;
  groupId: string;
  weight: number;
  sex: Sex;
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

export enum DiseaseHistory {
  HighBloodPressure = 1,
  Diabetes,
  LipidMetabolismAbnormality,
  HeartDisease,
  Arrhythmia,
  Gout,
  Cancer,
  Eczema,
  Asthma,
  Stroke,
  Pollinosis,
  Other,
}

export type MemberWithId = Member & { id: string };

export class MemberFactory {
  getDefaultValue(key: keyof Member): Member[typeof key] {
    switch (key) {
      case 'diseaseHistory':
        return DiseaseHistory.HighBloodPressure;
      case 'dob':
        return new Date('1990/1/1').getTime();
      case 'email':
        return undefined;
      case 'foodAllergies':
        return '';
      case 'medicalInstitutions':
        return '';
      case 'medicineAllergies':
        return '';
      case 'name':
        return '';
      case 'otherAllergies':
        return '';
      case 'pharmacies':
        return '';
      case 'sex':
        return Sex.Q;
      case 'sideEffectHistory':
        return '';
      case 'uid':
        return undefined;
      case 'weight':
        return 60;
      default:
        throw ReferenceError('InvalidKey');
    }
  }

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
        sideEffectHistory: [],
        diseaseHistory: [],
        pharmacies: [],
        medicalInstitutions: [],
      },
      data,
    );
  }
}
