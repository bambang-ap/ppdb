import axios from 'axios';

type ResetPasswordBody = Record<'username' | 'code' | 'password', string>;

export const resetPassword = (body: ResetPasswordBody) => {
  const url = `${location.origin}/barista-access/users/confirmResetPassword`;
  return axios.post(url, body);
};
