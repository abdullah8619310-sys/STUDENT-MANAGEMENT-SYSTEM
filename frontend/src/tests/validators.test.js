import { describe, it, expect } from 'vitest';
import { isRequired, isValidEmail } from '../utils/validators';

describe('Student Validators', () => {
  it('checks required values correctly', () => {
    expect(isRequired('Abdullah')).toBe(true);
    expect(isRequired('')).toBe(false);
  });

  it('checks email format correctly', () => {
    expect(isValidEmail('student@gmail.com')).toBe(true);
    expect(isValidEmail('student')).toBe(false);
  });
});