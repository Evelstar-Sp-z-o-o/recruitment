import renderer from 'react-test-renderer';

import Header from '@/src/components/Header';
import '@testing-library/jest-dom';

describe('Header', () => {
  it('should match snapshot', () => {
    const tree = renderer.create(<Header />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
