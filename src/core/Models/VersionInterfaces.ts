export interface ScriptsOfErrorsAndTasksResponse {
  Oid: number
  CreatedDate: number
  LastUpdatedDate: number
  Type: number
  TaskOid: number
  ErrorOid: number
  QueryNames: string
  MaksScript: string
  Script: string
  ProjectOid: number
  IsNeedCodeUpdate?: boolean
  IsActive: boolean
}

export interface ScriptsOfErrorsAndTasksRequest {
  StartDate: number
  EndDate: number
}
export interface TaskAndErrorScriptRequestDto {
  StartDate: number
  EndDate: number
  ProjectOid: number
  TaskOrErrorOid?: number
}

interface VersionDetailList {
  CompanyOid: number
}

export interface SaveVersionRequest {
  IsActive: boolean
  VersionNo: string
  VersionExplanation: string
  ProjectOid: number
  ReleaseDate: number
  VersionDetailList: VersionDetailList[]
  FrontSideDocId?: string
  ServerSideDocId?: string
}

export interface VersionDetailListResponse {
  Oid: number
  CreatedDate: number
  LastupdatedDate: number
  CompanyOid: number
  VersionOid: number
}
export interface VersionListResponse {
  Oid: number
  CreatedDate: number
  LastUpdatedDate: number
  IsActive: boolean
  VersionNo: string
  VersionExplanation: string
  ProjectOid: number
  ReleaseDate: number
  VersionDetailList: VersionDetailListResponse[]
}

interface VersionDetailListUpdateRequest {
  Oid: number
  CompanyOid: number
  VersionOid: number
}
export interface UpdateVersionRequest {
  Oid: number
  IsActive: boolean
  VersionNo: string
  VersionExplanation: string
  ProjectOid: number
  ReleaseDate: number
  VersionDetailList: VersionDetailListUpdateRequest[]
  FrontSideDocId?: string
  ServerSideDocId?: string
}

export interface SaveProjectMenuRequest {
  ParentMenuOid: number
  MenuCode: string
  MenuName: string
  MenuPage: string
  MenuExplanation: string
  IsActive: boolean[]
  ProjectOid?: string
  CompanyList?: any[]
  ServiceUrl?: string
}

export interface UpdateProjectMenuRequest {
  Oid: number
  ParentMenuOid: number
  MenuCode: string
  MenuName: string
  MenuPage: string
  MenuExplanation: string
  IsActive: boolean[]
  ProjectOid?: string
  CompanyList?: any[]
}
