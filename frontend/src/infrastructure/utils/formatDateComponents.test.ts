import formatDateComponents from './formatDateComponents';

describe('formatDateComponents', () => {
  it('should format date components correctly for a given date', () => {
    const date = new Date('2023-07-27T14:05:00');
    const expectedResult = {
      day: '27',
      month: '07',
      year: 2023,
      hours: '14',
      minutes: '05',
    };

    const result = formatDateComponents(date);
    expect(result).toEqual(expectedResult);
  });

  it('should format single-digit day and month correctly', () => {
    const date = new Date('2023-01-01T08:05:00');
    const expectedResult = {
      day: '01',
      month: '01',
      year: 2023,
      hours: '08',
      minutes: '05',
    };

    const result = formatDateComponents(date);
    expect(result).toEqual(expectedResult);
  });

  it('should format month and day correctly for single digits', () => {
    const date = new Date('2023-03-05T10:00:00');
    const expectedResult = {
      day: '05',
      month: '03',
      year: 2023,
      hours: '10',
      minutes: '00',
    };

    const result = formatDateComponents(date);
    expect(result).toEqual(expectedResult);
  });

  it('should handle a date at the end of the month correctly', () => {
    const date = new Date('2023-02-28T23:59:59');
    const expectedResult = {
      day: '28',
      month: '02',
      year: 2023,
      hours: '23',
      minutes: '59',
    };

    const result = formatDateComponents(date);
    expect(result).toEqual(expectedResult);
  });

  it('should handle leap year correctly', () => {
    const date = new Date('2024-02-29T12:00:00');
    const expectedResult = {
      day: '29',
      month: '02',
      year: 2024,
      hours: '12',
      minutes: '00',
    };

    const result = formatDateComponents(date);
    expect(result).toEqual(expectedResult);
  });
});
