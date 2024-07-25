/**
 * Defines the React 16 Adapter for Enzyme.
 *
 * @link http://airbnb.io/enzyme/docs/installation/#working-with-react-16
 * @copyright 2017 Airbnb, Inc.
 */
import enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { server } from './src/__tests__/mocks/server';

enzyme.configure({ adapter: new Adapter() });

// MSW setup
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
