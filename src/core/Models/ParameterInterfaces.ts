export interface GetGeneralParameterTypeListResponse {
  Oid: number
  CreatedDate: number
  LastUpdatedDate: number
  ParameterTypeName: string
  ParameterTypeCode: number
  IsActive: boolean
}

export interface SaveGeneralParameterTypeRequest {
  ParameterTypeName: string
  ParameterTypeCode: number
  IsActive: boolean
}

export interface SaveGeneralParameterTypeResponse {
  Oid: number
  CreatedDate: number
  LastUpdatedDate: number
  ParameterTypeName: string
  ParameterTypeCode: number
  IsActive: boolean
}

export interface UpdateGeneralParameterTypeRequest {
  Oid: number
  ParameterTypeName: string
  ParameterTypeCode: number
  IsActive: boolean
}

export interface UpdateGeneralParameterTypeResponse {
  Oid: number
  CreatedDate: number
  LastUpdatedDate: number
  ParameterTypeName: string
  ParameterTypeCode: number
  IsActive: boolean
}

export interface GetGeneralParameterListResponse {
  Oid: number
  CreatedDate: number
  LastUpdatedDate: number
  ParameterName: string
  ParameterCode: number
  ParameterTypeCode: number
  IsActive: boolean
}

export interface SaveGeneralParameterRequest {
  ParameterName: string
  ParameterCode: number
  ParameterTypeCode: number
  IsActive: boolean
}

export interface SaveGeneralParameterResponse {
  Oid: number
  CreatedDate: number
  LastUpdatedDate: number
  ParameterName: string
  ParameterCode: number
  ParameterTypeCode: number
  IsActive: boolean
}

export interface UpdateGeneralParameterRequest {
  Oid: number
  ParameterName: string
  ParameterCode: number
  ParameterTypeCode: number
  IsActive: boolean
}

export interface UpdateGeneralParameterResponse {
  Oid: number
  CreatedDate: number
  LastUpdatedDate: number
  ParameterName: string
  ParameterCode: number
  ParameterTypeCode: number
  IsActive: boolean
}

export interface GetProjectListResponse {
  Oid: number
  CreatedDate: number
  LastUpdatedDate: number
  IsActive: boolean
  IsDefault: boolean | null
  ProjectCode: string
  ProjectName: string
}

export interface SaveProjectRequest {
  IsActive: boolean
  ProjectCode: string
  ProjectName: string
}

export interface UpdateProjectRequest {
  Oid: number
  IsActive: boolean
  ProjectCode: string
  ProjectName: string
}

export interface ModuleListResponse {
  Oid: number
  CreatedDate: number
  LastUpdatedDate: number
  ModuleName: string
  ModuleCode: number
  ParentModuleOid: number
  IsActive: boolean
}

export interface ParentModulePesponse {
  Oid: number
  CreatedDate: number
  LastUpdatedDate: number
  ModuleName: string
  ModuleCode: number
  ParentModuleOid: number
  IsActive: boolean
}

export interface ParentMenuResponse {
  MenuCode: number
  MenuName: string
  MenuPage: string
  MenuExplanation: string
  IsActiveMenu: boolean
}

export interface SaveModuleRequest {
  ModuleName: string
  ModuleCode: string
  ParentModuleOid: number
  IsActive: boolean
  ProjectOid?: number
}

export interface ModuleResponse {
  Oid: number
  CreatedDate: number
  LastUpdatedDate: number
  ModuleName: string
  ModuleCode: number
  ParentModuleOid: number
  IsActive: boolean
}

export interface UpdateModuleRequest {
  Oid: number
  ModuleName: string
  ModuleCode: string
  ParentModuleOid: number
  IsActive: boolean
  ProjectOid?: number
}

export interface CompanyListResponse {
  Oid: number
  CreatedDate: number
  LastUpdatedDate: number
  CompanyCode: string
  CompanyName: string
  RelatedPerson: string
  Email: string
  Phone: string
  ContractStartDate: string
  ContractFinishDate: string
  ProjectOid: number
  IsActive: boolean
  IsDelete: boolean | null
  UserOid: number
  ProjectUrl: string
  ServiceUrl: string
  ServerCode: number
  AuthUserName?: string
}

export interface SaveCompanyRequest {
  CompanyCode: string
  CompanyName: string
  RelatedPerson: string
  Email: string
  Phone: string
  ContractStartDate: string
  ContractFinishDate: string
  IsActive: boolean
  UserOid: number
  ProjectOid: number
  ProjectUrl: string
  ServiceUrl: string
  ServerCode: number
  UsingMaksAddress: boolean
  AuthUserName?: string
}

export interface UpdateCompanyRequest {
  Oid: number
  CompanyCode: string
  CompanyName: string
  RelatedPerson: string
  Email: string
  Phone: string
  ContractStartDate: string
  ContractFinishDate: string
  IsActive: boolean
  UserOid: number
  ProjectOid: number
  ProjectUrl: string
  ServiceUrl: string
  ServerCode: number
  UsingMaksAddress: boolean
  AuthUserName?: string
}

export interface RoleListResponse {
  Oid: number
  CreatedDate: number
  LastUpdatedDate: number
  RoleCode: number
  RoleName: string
  IsActive: boolean
}

export interface SaveRoleRequest {
  RoleCode: number
  RoleName: string
  IsActive: boolean
}

export interface UpdateRoleRequest {
  Oid: number
  RoleCode: number
  RoleName: string
  IsActive: boolean
}

export interface TitleListResponse {
  Oid: number
  CreatedDate: number
  LastUpdatedDate: number
  TitleCode: number
  TitleName: string
  IsActive: boolean
  UserOid: number
}

export interface SaveTitleRequest {
  TitleCode: number
  TitleName: string
  IsActive: boolean
}

export interface UpdateTitleRequest {
  Oid: number
  TitleName: string
  TitleCode: number
  IsActive: boolean
  UserOid: number
}

interface ModuleList {
  ModuleOid: number
  ModuleCode: string
  IsActive: boolean
  ParentModuleOid: number
}

export interface SaveOrUpdateCompanyModuleRequest {
  CompanyOid: number
  ModuleList: ModuleList[]
}

export interface GetCompanyListByCompanyOidResponse {
  Oid: number
  CreatedDate: number
  LastUpdatedDate: number
  CompanyOid: number
  ModuleOid: number
  ModuleCode: number
  IsActive: boolean
  ParentModuleOid: number
}

export interface MeetingStaffList {
  IsActive?: boolean
  MeetingOid?: number
  UserOid: number
  IsJoined: boolean
}

export interface SaveMeetingsRequest {
  IsActive: boolean
  Subject: string
  Explanation: string
  MeetingDate: number
  MeetingStartTime: number
  MeetingFinishTime: number
  MeetingStaffList: MeetingStaffList[]
}

export interface UpdateMeetingsRequest {
  Oid: number
  IsActive: boolean
  Subject: string
  Explanation: string
  MeetingDate: number
  MeetingStartTime: number
  MeetingFinishTime: number
  MeetingStaffList: MeetingStaffList[]
}

export interface MeetingsResponse {
  CreatedDate: number
  Explanation: string
  IsActive: boolean
  LastUpdatedDate: number
  MeetingDate: number
  MeetingFinishTime: number
  MeetingStaffList: any
  MeetingStartTime: number
  Oid: number
  Subject: string
}

export interface DeveloperStatisticsResponse {
  CompanyOid: number
  CompanyName: string
  StartDate: number
  EndDate: number
  ErrorCount: number
  TaskCount: number
  ResolvedErrorCount: number
  ResolvedTaskCount: number
}

export interface CompanyStatisticsResponse {
  Oid: number
  Name: string
  StartDate: number
  EndDate: number
  ErrorCount: number
  ResolvedErrorCount: number
  TaskCount: number
  ResolvedTaskCount: number
}
