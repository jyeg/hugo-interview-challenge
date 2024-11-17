import { calculateAge } from '../utils';

describe('calculateAge', () => {
  it('calculates age correctly', () => {
    const birthDate = new Date('1990-01-01');
    const age = calculateAge(birthDate);
    expect(age).toBe(new Date().getFullYear() - 1990);
  });

  it('handles future dates', () => {
    const futureDate = new Date(Date.now() + 86400000); // Tomorrow
    const age = calculateAge(futureDate);
    expect(age).toBe(0);
  });
});
