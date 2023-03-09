import { deepClone } from "../utils";

describe('utils', () => {
  describe('#deepClone', () => {
    it('should create a copy 1 level deep', () => {
      const foo = {value: 'hi'};
      const value = deepClone({foo});
      expect(value.foo).toEqual(foo);
      expect(value.foo).not.toBe(foo);
    });

    it('should create a deep copy', () => {
      const foo = {value: 'hi'};
      const bar = {foo};
      const value = deepClone({bar});
      expect(value.bar.foo).toEqual(foo);
      expect(value.bar.foo).not.toBe(foo);
    });
  });
});
