type UserInfo = {
  username: string;
  activated: number | undefined;
  userType: number | undefined;
};

let userInfo: UserInfo = {
  username: '',
  activated: undefined,
  userType: undefined,
};

export const getUser = () => {
  return userInfo;
};

export const setUser = (u: UserInfo) => {
  userInfo = u;
};
