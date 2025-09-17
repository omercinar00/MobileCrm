export interface UserResponse {
  Oid: number;
  CreateDate: number;
  LastUpdatedDate: number;
  Name: string;
  SurName: string;
  UserName: string;
  Password: string;
  TitleCode: number;
  Birthday: number;
  Email: string;
  Gender: string;
  Gsm: string;
  IsActive: boolean;
  IsLocked: any;
  IsDelete: any;
  CompanyOid: number;
  UserOid: number;
  RoleCode: number;
  ProfileImageUrl: string | null;
  Avatar: string | null;
}

export interface SaveUserRequest {
  Name: string;
  SurName: string;
  UserName: string;
  Password: string;
  TitleCode: number;
  Birthday: number;
  Email: string;
  Gender: string;
  Gsm?: any;
  IsActive: boolean;
  CompanyOid: number;
  UserOid: number;
  RoleCode: number;
  ProfileImageUrl: string | null;
}

export interface UpdateUserRequest {
  Oid: number;
  Name: string;
  SurName: string;
  UserName: string;
  Password: string;
  TitleCode: number;
  BirthDay: number;
  Email: string;
  Gender: string;
  Gsm?: any;
  IsActive: boolean;
  CompanyOid: number;
  UserOid: number;
  RoleCode: number;
  ProfileImageUrl: string | null;
}

interface MenuAuthorizationList {
  MenuCode: string;
  IsActive: boolean;
}

export interface SaveMenuAuthorizationRequest {
  UserOid: number;
  MenuAuthorizationList: MenuAuthorizationList[];
}

export interface MenuAuthorizationResponse {
  Oid: number;
  CreatedDate: number;
  LastUpdatedDate: number;
  UserOid: number;
  MenuCode: string;
  IsActive: boolean;
}
