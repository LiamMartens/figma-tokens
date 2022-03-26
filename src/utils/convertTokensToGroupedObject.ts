import set from 'set-value';
import { appendTypeToToken } from '@/app/components/createTokenObj';
import { TransformerOptions } from './types';
import { ResolveTokenValuesResult } from '@/plugin/tokenHelpers';

export default function convertTokensToGroupedObject(
  tokens: ResolveTokenValuesResult[],
  excludedSets: string[],
  options: TransformerOptions,
) {
  let tokenObj = {};
  tokenObj = tokens.reduce((acc, token) => {
    if (token.internal__Parent && excludedSets.includes(token.internal__Parent)) {
      return acc;
    }
    const obj = acc || {};
    const tokenWithType = appendTypeToToken(token);
    delete tokenWithType.name;
    if (!options.preserveRawValue) {
      delete tokenWithType.rawValue;
    }
    delete tokenWithType.internal__Parent;
    if (!!options.expandTypography && tokenWithType.type === 'typography') {
      const expandedTypography = Object.entries(tokenWithType.value).reduce((acc, [key, val]) => {
        acc[key] = {
          value: val,
          type: key,
        };
        return acc;
      }, {});
      set(obj, token.name, { ...expandedTypography });
    } else {
      set(obj, token.name, tokenWithType);
    }
    return acc;
  }, {});

  return tokenObj;
}
