import { secondsTimestampToTimeAgo } from '../utils/secondsTimestampToTimeAgo';

describe('secondsTimestampToTimeAgo', () => {
  const now = new Date().getTime() / 1000; // current time in seconds

  it('should return "1 second ago" for 1 second ago', () => {
    expect(secondsTimestampToTimeAgo(now - 1)).toBe('1 second ago');
  });

  it('should return "30 seconds ago" for 30 seconds ago', () => {
    expect(secondsTimestampToTimeAgo(now - 30)).toBe('30 seconds ago');
  });

  it('should return "1 minute ago" for 60 seconds ago', () => {
    expect(secondsTimestampToTimeAgo(now - 60)).toBe('1 minute ago');
  });

  it('should return "2 minutes ago" for 2 minutes ago', () => {
    expect(secondsTimestampToTimeAgo(now - 120)).toBe('2 minutes ago');
  });

  it('should return "1 hour ago" for 1 hour ago', () => {
    expect(secondsTimestampToTimeAgo(now - 3600)).toBe('1 hour ago');
  });

  it('should return "2 hours ago" for 2 hours ago', () => {
    expect(secondsTimestampToTimeAgo(now - 7200)).toBe('2 hours ago');
  });

  it('should return "1 day ago" for 1 day ago', () => {
    expect(secondsTimestampToTimeAgo(now - 86400)).toBe('1 day ago');
  });

  it('should return "2 days ago" for 2 days ago', () => {
    expect(secondsTimestampToTimeAgo(now - 2 * 86400)).toBe('2 days ago');
  });

  it('should return "1 week ago" for 1 week ago', () => {
    expect(secondsTimestampToTimeAgo(now - 7 * 86400)).toBe('1 week ago');
  });

  it('should return "2 weeks ago" for 2 weeks ago', () => {
    expect(secondsTimestampToTimeAgo(now - 14 * 86400)).toBe('2 weeks ago');
  });
});
