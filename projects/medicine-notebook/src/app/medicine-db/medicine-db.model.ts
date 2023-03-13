export type Medicines = Map<string, Medicine>;

export interface Medicine {
  name: string;
  code: string;
  manufacturer: string;
  generic: boolean;
}
