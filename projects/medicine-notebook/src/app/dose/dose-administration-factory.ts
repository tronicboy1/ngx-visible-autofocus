import { TakenAt } from '../prescriptions/prescription-factory';

export type DoseAdministration = {
  rxId: string;
  memberId: string;
  takenAt: TakenAt;
  completedAt: number;
};

export type DoseAdministrationWithId = DoseAdministration & { id: string };

export class DoseAdministrationFactory {
  create$(params: Partial<DoseAdministration>): DoseAdministration {
    return Object.assign<DoseAdministration, typeof params>(
      { rxId: '', memberId: '', takenAt: TakenAt.Other, completedAt: Date.now() },
      params,
    );
  }
}
