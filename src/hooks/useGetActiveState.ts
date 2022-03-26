import { useSelector } from 'react-redux';
import { Properties } from '@/constants/Properties';
import { PropertyObject } from '@/types/properties';
import { RootState } from '@/app/store';
import { TokenTypes } from '@/constants/TokenTypes';

export function useGetActiveState(properties: (PropertyObject | TokenTypes)[], type: Properties, name: string) {
  return useSelector((state: RootState) => {
    const { uiState } = state;
    return (
      uiState.mainNodeSelectionValues[type] === name
      || properties.some((prop) => (
        typeof prop !== 'string'
        && uiState.mainNodeSelectionValues[prop.name] === name
      ))
    );
  });
}
