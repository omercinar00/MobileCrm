import type {
  MenuAuthorizationResponse,
  SaveMenuAuthorizationRequest,
  SaveUserRequest,
  UpdateUserRequest,
  UserResponse,
} from '../../Models/UserInterfaces';

import projectManagementAndCRMCore from '../../index';

export default class AuthService {
  endPoint: string;

  constructor() {
    this.endPoint = '/Auth';
  }

  login = async (userName: string, password: string): Promise<UserResponse> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/Login`,
      { userName, password },
    )) as unknown as UserResponse;

  getUserList = async (): Promise<UserResponse[]> =>
    (await projectManagementAndCRMCore.api.request(
      'get',
      `${this.endPoint}/GetUserList`,
      {},
    )) as unknown as UserResponse[];

  saveUser = async (savedData: SaveUserRequest): Promise<UserResponse[]> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/SaveUser`,
      savedData,
    )) as unknown as UserResponse[];

  updateUser = async (
    updatedData: UpdateUserRequest,
  ): Promise<UserResponse[]> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/UpdateUser`,
      updatedData,
    )) as unknown as UserResponse[];

  saveOrUpdateMenuAuthorization = async (
    saveData: SaveMenuAuthorizationRequest,
  ): Promise<MenuAuthorizationResponse[]> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/SaveOrUpdateMenuAuthorization`,
      saveData,
    )) as unknown as MenuAuthorizationResponse[];

  getMenuListByUserOid = async (
    userOid: number,
  ): Promise<MenuAuthorizationResponse[]> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/GetMenuListByUserOid`,
      { userOid },
    )) as unknown as MenuAuthorizationResponse[];

  getUserInfoByUserOid = async (userOid: number): Promise<UserResponse[]> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/GetUserInfoByUserOid`,
      { userOid },
    )) as unknown as UserResponse[];
}
