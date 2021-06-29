

export const Query = {
  user_id: (_, args, { user }) => user.id,

  theme: (_, args, { user }) => user.theme,
  language: (_, args, { user }) => user.language,
};

export const Mutation = {
  setTheme: (_, { theme = null }, { user }) => user.update({ theme }),
  setLanguage: (_, { language = null }, { user }) => user.update({ language }),
}
