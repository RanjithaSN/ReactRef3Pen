import pathOr from 'ramda/src/pathOr';
export const ARTICLES = {
  LEARN_MORE_MOBILE_APP: 'MOBILE_APP',
  PRIVACY_POLICY: 'PRIVACY_POLICY'
};

export const assumeCategoryAndTopicNamesFromPost = (categories, article) => {
  const firstArticleCategoryId = pathOr(0, ['categories', 0], article);
  const topic = categories.find((x) => x.id === firstArticleCategoryId);
  const topicParentId = Number(pathOr(null, ['parent'], topic));
  const category = categories.find((x) => x.id === topicParentId);
  return [pathOr('', ['name'], category), pathOr('', ['name'], topic), pathOr('', ['slug'], category), pathOr('', ['slug'], topic)];
};

export const findPostByKeyOrId = (posts, paramString) => {
  const id = parseInt(paramString, 10);
  if (!Number.isNaN(id)) {
    return posts.find((x) => x.id === id);
  }
  return posts.find((x) => x.key === paramString);
};
