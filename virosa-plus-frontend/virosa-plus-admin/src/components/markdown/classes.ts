import { createClasses } from 'src/theme/create-classes';

// ----------------------------------------------------------------------

export const markdownClasses = {
  root: createClasses('markdown__root'),
  content: {
    pre: createClasses('markdown__content__pre'),
    codeInline: createClasses('markdown__content__codeInline'),
    codeBlock: createClasses('markdown__content__codeBlock'),
    image: createClasses('markdown__content__image'),
    link: createClasses('markdown__content__link'),
  },
};
