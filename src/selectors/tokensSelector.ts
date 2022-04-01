import isEqual from 'lodash.isequal';
import { createSelector } from '@reduxjs/toolkit';
import { tokenStateSelector } from './tokenStateSelector';

export const tokensSelector = createSelector(
  tokenStateSelector,
  (state) => state.tokens,
  {
    memoizeOptions: {
      resultEqualityCheck: isEqual,
    },
  },
);
