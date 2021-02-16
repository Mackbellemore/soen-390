import { IUser } from './../models/UserModel';
export interface IUserEntity {
  username: string;
  email: string;
  id: string;
  role: string;
}

export class UserEntity {
  public static buildUser(userModel: IUser): IUserEntity {
    return {
      username: userModel.username,
      email: userModel.email,
      id: userModel._id,
      role: userModel.role,
    };
  }

  public static buildUsers(userModels: IUser[]): IUserEntity[] {
    const builtUsers: IUserEntity[] = [];
    userModels.forEach((userModel) => {
      builtUsers.push({
        username: userModel.username,
        email: userModel.email,
        id: userModel._id,
        role: userModel.role,
      });
    });

    return builtUsers;
  }
}
