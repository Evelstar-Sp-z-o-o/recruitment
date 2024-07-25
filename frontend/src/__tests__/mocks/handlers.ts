import { http, HttpResponse } from 'msw';

import { mockData } from './mockData';

export const handlers = [
  http.get('/api/posts', () => {
    return HttpResponse.json(mockData);
  }),
];
