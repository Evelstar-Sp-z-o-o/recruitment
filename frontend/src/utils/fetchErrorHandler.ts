export const handleError = (error: unknown): string => {
  if (typeof error === 'string') {
    console.error(error);
    return error;
  } else if (error instanceof Error) {
    console.error(error);
    return error.name;
  } else {
    console.error('An uknown error occurred');
    return 'An unknown error occurred.';
  }
};
