import * as yup from 'yup';

const schema = yup.object().shape({
  post: yup
    .string()
    .min(10, 'The minimum number of characters is 10')
    .max(350, 'The maximum number of characters is 350'),
});

export default schema;
