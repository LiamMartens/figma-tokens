/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useSelector } from 'react-redux';
import { mergeTokenGroups, resolveTokenValues } from '@/plugin/tokenHelpers';
import TokenListing from './TokenListing';
import TokensBottomBar from './TokensBottomBar';
import ToggleEmptyButton from './ToggleEmptyButton';
import { mappedTokens } from './createTokenObj';
import { RootState } from '../store';
import TokenSetSelector from './TokenSetSelector';
import TokenFilter from './TokenFilter';
import EditTokenFormModal from './EditTokenFormModal';
import { TokensContext } from '@/context';

function Tokens({ isActive }: { isActive: boolean }) {
  const { tokens, activeTokenSet, usedTokenSet } = useSelector((state: RootState) => state.tokenState);
  const { showEditForm, tokenFilter, tokenFilterVisible } = useSelector((state: RootState) => state.uiState);

  const resolvedTokens = React.useMemo(
    () => resolveTokenValues(mergeTokenGroups(tokens, [...usedTokenSet, activeTokenSet])),
    [tokens, usedTokenSet, activeTokenSet],
  );

  const memoizedTokens = React.useMemo(() => {
    if (tokens[activeTokenSet]) {
      return mappedTokens(tokens[activeTokenSet], tokenFilter).sort((a, b) => {
        if (b[1].values) {
          return 1;
        }
        if (a[1].values) {
          return -1;
        }
        return 0;
      });
    }
    return [];
  }, [tokens, activeTokenSet, tokenFilter]);

  const tokensContextValue = React.useMemo(() => ({
    resolvedTokens,
  }), [resolvedTokens]);

  if (!isActive) return null;

  return (
    <TokensContext.Provider value={tokensContextValue}>
      <div>
        <TokenSetSelector />
        {tokenFilterVisible && <TokenFilter />}
        {memoizedTokens.map(([key, group]) => (
          <div key={key}>
            <TokenListing
              tokenKey={key}
              label={group.label || key}
              explainer={group.explainer}
              schema={group.schema}
              property={group.property}
              tokenType={group.type}
              values={group.values}
            />
          </div>
        ))}
        {showEditForm && <EditTokenFormModal resolvedTokens={resolvedTokens} />}
        <ToggleEmptyButton />
        <TokensBottomBar />
      </div>
    </TokensContext.Provider>
  );
}

Tokens.whyDidYouRender = true;

export default Tokens;
