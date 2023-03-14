import { EntryFactory } from './entry-factory';

export type Medicines = Map<string, Medicine>;

export interface Medicine {
  name: string;
  code: string;
  manufacturer: string;
  generic: boolean;
}

export class MedicineFactory extends EntryFactory<Medicine> {
  create(params: Partial<Medicine>): Medicine {
    return Object.assign<Medicine, typeof params>({ name: '', code: '', manufacturer: '', generic: false }, params);
  }

  parse(csvRaw: string): Medicines {
    const endOfFirstLine = csvRaw.indexOf('\n');
    const body = csvRaw.slice(endOfFirstLine + 1);
    const rows = body.split('\n');
    const rowsWithColumns = rows.map((row) => row.split(','));
    return rowsWithColumns.reduce((acc, current) => {
      if (!current[1]) return acc;
      return acc.set(current[1], {
        name: current[7],
        code: current[1],
        manufacturer: current[8],
        generic: current[9] === '後発品',
      });
    }, new Map() as Medicines);
  }
}
