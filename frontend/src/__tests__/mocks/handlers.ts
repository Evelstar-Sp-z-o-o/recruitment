import { http, HttpResponse } from 'msw';

import { mockData } from './mockData';

export const handlers = [
  http.get('http://localhost:3000/api/posts', () => {
    return HttpResponse.json(mockData, { status: 200 });
  }),
];
