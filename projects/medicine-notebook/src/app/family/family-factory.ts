export type Family = {
  lastName: string;
  memberIds: [];
  owner: string;
  createdAt: number;
};

export type FamilyWithId = Family & { id: string };

export class FamilyFactory {
  create(data: Partial<Family>): Family {
    return Object.assign<Family, typeof data>({ lastName: '', memberIds: [], owner: '', createdAt: Date.now() }, data);
  }
}
