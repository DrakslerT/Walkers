/** To handle binary error from DB */
type IUserInformation = {
  username: string;
  activated: number | undefined;
  userType: number | undefined;
  notifications: number | undefined;
};


const noUser: IUserInformation = {
  username: '',
  activated: undefined,
  userType: undefined,
  notifications: undefined
};

let userInfo = noUser;

export const getUser = () => {
  return userInfo;
};

export const setUser = (u: IUserInformation) => {
  userInfo = u
};

/**
 * Frontend function to activate user on first confirm activation.
 * After this function is not required since cookie will redirect send the activation
 */
export const activateUser = () => {
  userInfo = { ...userInfo, activated: 1 };
};

export const clearUserInfo = () => {
  userInfo = noUser;
};
