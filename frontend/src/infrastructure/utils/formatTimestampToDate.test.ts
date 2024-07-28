import formatTimestampToDate from './formatTimestampToDate';

describe('formatTimestampToDate', () => {
  it('should format timestamp to date correctly', () => {
    const mockTimestamp = 1690466700;

    const result = formatTimestampToDate(mockTimestamp);
    expect(result).toBe('27.07.2023 16:05');
  });

  it('should return a timestamp value that is a string', () => {
    const mockTimestamp = 1690466700;

    const result = formatTimestampToDate(mockTimestamp);
    expect(typeof result).toBe('string');
  });
});
