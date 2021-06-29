
import { DEFAULT_LANGUAGE } from '@shared/config';
import { translate } from '@shared/utils';


export default (key) => (parent, { language }, context) => {
  return translate(
    parent[key],
    language
      ?? context.language
      ?? context.user.language
      ?? DEFAULT_LANGUAGE,
    null // Specifically null missing translation.
  );
};
