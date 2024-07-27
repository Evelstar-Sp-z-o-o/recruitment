import { delay, http, HttpResponse } from 'msw';

import { mockData } from './mockData';

export const handlers = [
  http.get('/api/posts', () => {
    return HttpResponse.json(mockData);
  }),
  http.put('/api/posts/:postId', async () => {
    await delay(400); // give delay for loading simulation
    return HttpResponse.json(mockData[0], { status: 200 });
  }),
  http.post('/api/posts', () => {
    return HttpResponse.json(mockData[0], { status: 201 });
  }),
  http.delete('/api/posts', () => {
    return HttpResponse.json(null, { status: 204 });
  }),
];
