import { useSelector } from 'react-redux';
import { Properties } from '@/constants/Properties';
import { PropertyObject } from '@/types/properties';
import { RootState } from '@/app/store';

export function useGetActiveState(properties: PropertyObject[], type: Properties, name: string) {
  return useSelector((state: RootState) => {
    const { uiState } = state;
    return (
      uiState.mainNodeSelectionValues[type] === name
      || properties.some((prop) => (
        uiState.mainNodeSelectionValues[prop.name] === name
      ))
    );
  });
}
