// jest.mock('pluralize', () => {
//   return () => 'test';
// });

import pluralize from 'pluralize';

export class NegativeCapacityError extends Error {
}

const formatCapacity = (capacity: number): string => {
  return `${capacity} ${pluralize('person', capacity)}`;
};

export default formatCapacity;
