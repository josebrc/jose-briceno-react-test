import { LoginResponse } from "../interfaces/auth";
import { User } from "../interfaces/user";

export const getUser = (): User => {
  const demoUser = {
    id: 1,
    fullName: "Jose Briceño",
    email: "jose@mail.com",
  };
  return demoUser;
};

export const requestLogin = (): LoginResponse => {
  return {
    token: "authtoken",
    user: getUser(),
  };
};
