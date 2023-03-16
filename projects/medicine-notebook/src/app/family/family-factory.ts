export type Family = {
  lastName: string;
  memberIds: [];
  owner: string;
  createdAt: number;
  setupCompleted: boolean;
  useMode: UseMode;
};

export enum UseMode {
  NotSet = 0,
  SingleUser,
  Family,
}

export type FamilyWithId = Family & { id: string };

export class FamilyFactory {
  create(data: Partial<Family>): Family {
    return Object.assign<Family, typeof data>(
      { lastName: '', memberIds: [], owner: '', createdAt: Date.now(), setupCompleted: false, useMode: UseMode.NotSet },
      data,
    );
  }
}
