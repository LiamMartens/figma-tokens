import { PropertyObject } from '@/types/properties';
import { Properties } from './Properties';

export const DocumentationProperties: PropertyObject[] = [
  {
    label: 'Name',
    name: Properties.tokenName,
    clear: ['tokenValue', 'value', 'description'],
  },
  {
    label: 'Raw value',
    name: Properties.tokenValue,
    clear: ['tokenName', 'value', 'description'],
  },
  {
    label: 'Value',
    name: Properties.value,
    clear: ['tokenName', 'tokenValue', 'description'],
  },
  {
    label: 'Description',
    name: Properties.description,
    clear: ['tokenName', 'tokenValue', 'value'],
  },
];
