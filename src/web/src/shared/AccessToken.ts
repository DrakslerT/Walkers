let AccessToken = '';

export const getAccessToken = () => {
  return AccessToken;
};
export const setAccessToken = (s: string) => {
  AccessToken = s;
};
export const isAuth = () => {
  return AccessToken !== '' ? true : false;
};

export const removeToken = () => {
  setAccessToken('')
}