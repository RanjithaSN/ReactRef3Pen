export const PreferencesTypes = {
  UpdateDisplayLanguage: 'UPDATE_DISPLAY_LANGUAGE'
};

export const UpdateDisplayLanguage = (language) => {
  return {
    type: PreferencesTypes.UpdateDisplayLanguage,
    payload: language
  };
};
