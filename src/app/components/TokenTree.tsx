import React from 'react';
import { useSelector } from 'react-redux';
import { TokenTypes } from '@/constants/TokenTypes';
import { tokenStateSelector } from '@/selectors';
import { SingleToken, TokenTypeSchema } from '@/types/tokens';
import { isSingleToken, isTypographyToken } from '@/utils/is';
import Icon from './Icon';
import TokenButton from './TokenButton';
import TokenGroupHeading from './TokenGroupHeading';
import Tooltip from './Tooltip';

// @TODO fix typings

export type ShowFormOptions = {
  name: string;
  isPristine?: boolean;
  token: SingleToken | null;
};

export type ShowNewFormOptions = {
  name?: string;
};

type Props = {
  type: TokenTypes;
  schema: TokenTypeSchema['schema']
  tokenValues: Record<string, SingleToken[]>
  path?: string | null
  showNewForm: (opts: ShowNewFormOptions) => void
  showForm: (opts: ShowFormOptions) => void
};

function TokenTree({
  tokenValues, showNewForm, showForm, schema, path = null, type,
}: Props) {
  const { editProhibited } = useSelector(tokenStateSelector);
  const tokenValuesEntries = React.useMemo(() => Object.entries(tokenValues), [tokenValues]);

  return (
    <div className="flex justify-start flex-row flex-wrap">
      {tokenValuesEntries.map(([name, value]) => {
        const stringPath = [path, name].filter((n) => n).join('.');

        return (
          <React.Fragment key={stringPath}>
            {typeof value === 'object' && !isTypographyToken(value) && !isSingleToken(value) ? (
              <div className="property-wrapper w-full" data-cy={`token-group-${stringPath}`}>
                <div className="flex items-center justify-between group">
                  <TokenGroupHeading label={name} path={stringPath} id="listing" />
                  <Tooltip label="Add a new token" side="left">
                    <button
                      disabled={editProhibited}
                      data-cy="button-add-new-token-in-group"
                      className="button button-ghost opacity-0 group-hover:opacity-100 focus:opacity-100"
                      type="button"
                      onClick={() => {
                        showNewForm({ name: `${stringPath}.` });
                      }}
                    >
                      <Icon name="add" />
                    </button>
                  </Tooltip>
                </div>

                <TokenTree
                  tokenValues={value}
                  showNewForm={showNewForm}
                  showForm={showForm}
                  schema={schema}
                  path={stringPath}
                  type={type}
                />
              </div>
            ) : (
              <TokenButton
                type={type}
                token={value}
                showForm={showForm}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default TokenTree;
