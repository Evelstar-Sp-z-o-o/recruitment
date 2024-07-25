import { http, HttpResponse } from 'msw';

import { faker } from '@faker-js/faker';

import { db } from '../db';

export const handlers = [
  http.get('http://localhost:3000/api/posts', () => {
    return HttpResponse.json(db.post.getAll());
  }),
  http.put('http://localhost:3000/api/posts/:postId', async ({ request }) => {
    const updatedPost = await request.json();
    if (updatedPost) {
      db.article.update({
        where: {
          id: {
            equals: updatedPost.id,
          },
        },
        data: {
          data: {
            body: updatedPost.data.body,
            author: updatedPost.data.author,
            created: updatedPost.data.created,
            edited: Date.now(),
            postId: updatedPost.data.postId,
          },
          id: updatedPost.id,
        },
      });
      return HttpResponse.json(updatedPost, { status: 201 });
    }
  }),
  http.post('http://localhost:3000/api/posts/', async ({ request }) => {
    const newPost = await request.json();
    db.post.create({
      data: {
        body: newPost.data.body,
        author: newPost.data.author,
        created: Date.now(),
        edited: Date.now(),
        postId: faker.string.uuid(),
      },
      id: newPost.id,
    });
    return HttpResponse.json(newPost, { status: 201 });
  }),
  http.delete('http://localhost:3000/api/posts/:postId', async ({ params }) => {
    const { postId } = params;
    if (!isNaN(Number(postId))) {
      db.article.delete({
        where: {
          id: {
            equals: Number(postId),
          },
        },
      });
      return HttpResponse.json();
    }

    return new HttpResponse(null, { status: 404 });
  }),
];
