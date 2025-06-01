import { globalTeardown } from './integration/test-utils';

export default async () => {
  await globalTeardown();
};
