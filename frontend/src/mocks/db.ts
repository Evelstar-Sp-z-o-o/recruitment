import { faker } from '@faker-js/faker';
import { factory, primaryKey } from '@mswjs/data';

faker.seed(123);

export const db = factory({
  post: {
    data: {
      body: faker.lorem.paragraphs({ min: 1, max: 6 }),
      author: faker.internet.email(),
      created: faker.date.past().getTime(),
      edited: faker.date.recent().getTime(),
      postId: faker.string.uuid(),
    },
    id: primaryKey(faker.number.int),
  },
});
