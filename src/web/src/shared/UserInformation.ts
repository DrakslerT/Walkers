/** To handle binary error from DB */
type IUserInformation = {
  username: string;
  activated:
    | {
        data: number[];
      }
    | undefined;
  userType: number | undefined;
};

type UserInfo = {
  username: string;
  activated: number | undefined;
  userType: number | undefined;
};


const noUser: UserInfo = {
  username: '',
  activated: undefined,
  userType: undefined,
};


let userInfo = noUser;

export const getUser = () => {
  return userInfo;
};

export const setUser = (u: IUserInformation) => {
  const isActivated = (buffer: unknown[]) => {
    if (buffer[0] === 49) {
      return 1;
    }
    return 0;
  };
  userInfo = {
    username: u.username,
    userType: u.userType,
    activated: u.activated ? isActivated(u.activated?.data) : 0,
  };
};

/**
 * Frontend function to activate user on first confirm activation.
 * After this function is not required since cookie will redirect send the activation
 */
export const activateUser = () => {
  userInfo = {...userInfo, activated: 1}
}


export const clearUserInfo = () => {
  userInfo = noUser;
}