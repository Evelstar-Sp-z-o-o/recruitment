import formatDateToTimestamp from './formatDateToTimestamp';

describe('formatDateToTimestamp', () => {
  it('should return the current date as a UNIX timestamp', () => {
    const mockDate = new Date();

    const expectedTimestamp = Math.floor(mockDate.getTime() / 1000);

    const result = formatDateToTimestamp();
    expect(result).toBe(expectedTimestamp);
  });

  it('should return a timestamp value that is a number', () => {
    const result = formatDateToTimestamp();
    expect(typeof result).toBe('number');
  });
});
