import { afterEach } from 'vitest';

import apiService from '../store/services/apiService';

import store from '../store';

afterEach(() => {
  store.dispatch(apiService.util.resetApiState());
});
