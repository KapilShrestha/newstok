import * as userModel from '../model/users';
export const getUsers = (params: Object) => {
    const data = userModel.getUsers(params);
    return data;
};
export const getUserById = (id: number) => {
    const data = userModel.getUserById(id);
    return data;
};