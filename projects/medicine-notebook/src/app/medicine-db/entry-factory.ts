export abstract class EntryFactory<T extends Object> {
  abstract create(params: Partial<T>): T;

  abstract parse(csv: string): Map<string, T>;
}
