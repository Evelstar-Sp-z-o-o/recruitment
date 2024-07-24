import { faker } from '@faker-js/faker';
import { factory, primaryKey } from '@mswjs/data';

faker.seed(123);

export const db = factory({
  post: {
    data: {
      body: faker.lorem.sentence({ min: 1, max: 20 }),
      author: faker.internet.email(),
      created: faker.date.past().getTime(),
      edited: faker.date.recent().getTime(),
      postId: primaryKey(faker.string.uuid),
    },
    id: faker.number.int(),
  },
});
