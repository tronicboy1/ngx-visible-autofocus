import { MemberFactory } from './member-factory';

describe('MemberFactory', () => {
  it('should create an instance', () => {
    expect(new MemberFactory()).toBeTruthy();
  });
});
