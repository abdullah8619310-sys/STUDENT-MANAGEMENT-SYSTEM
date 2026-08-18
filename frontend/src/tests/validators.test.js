import { describe, it, expect } from 'vitest';
import {
  isRequired,
  isValidEmail,
  isMinimumAge,
} from '../utils/validators';

describe('Student Validators', () => {
  it('checks required values correctly', () => {
    expect(isRequired('Abdullah')).toBe(true);
    expect(isRequired('')).toBe(false);
  });

  it('checks email format correctly', () => {
    expect(isValidEmail('student@gmail.com')).toBe(true);
    expect(isValidEmail('student')).toBe(false);
  });

  it('checks minimum age correctly', () => {
    expect(isMinimumAge(20)).toBe(true);
    expect(isMinimumAge(15)).toBe(false);
  });
});