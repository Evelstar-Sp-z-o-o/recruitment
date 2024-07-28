import * as matchers from '@testing-library/jest-dom/matchers';
import { cleanup } from '@testing-library/react';

import server from './server';

expect.extend(matchers);

beforeAll(() => {
  server.listen();
});
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
afterAll(() => {
  server.close();
});
