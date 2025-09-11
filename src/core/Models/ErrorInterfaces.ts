interface ErrorDocumentList {
  Oid: number
  DeletedDate: number
  ErrorOid: number
  FileExplanation: string
  FileDisplayName: string
  FileName: string
  OriginalFileName: string
  FileExtension: string
  FileUrl: string
  ProjectOid: number
  CreatedUserOid: number
  DeletedUserOid: number
  IsActive: boolean
  ModuleName: string
}

export interface ErrorDetailList {
  Oid: number
  Description: string
  CreatedUserOid: number
  SendUserOid: number
  ErrorStatusCode: number
  InProgress: string
  ErrorOid: number
}

interface ErrorNoteList {
  Oid: number
  CreatedDate: number
  LastUpdatedDate: number
  DeletedDate: number
  ErrorOid: number
  CreatedUserOid: number
  UpdatedUserOid: number
  DeletedUserOid: number
  IsActive: boolean
  Note: string
}

export interface SaveErrorRequest {
  ErrorExplanation: string
  Priority: string
  CompanyOid: number
  ProjectOid: number
  ModuleOid: number
  ErrorStatusCode: number
  CreatedUserOid: number
  UpdatedDate: number
  UpdateUserOid: number
  DeletedDate: number
  DeleteUserOid: number
  ClosedDate: number
  CloseUserOid: number
  CompanyRequestOid: number
  ErrorNo: number
  ErrorTitle: string
  ClosedExplanation: string
  IsTaskClosed: boolean
  EstimatedFinishDate: number
  ErrorDocumentList: {
    DeletedDate: number
    ErrorOid: number
    FileExplanation: string
    FileDisplayName: string
    FileName: string
    OriginalFileName: string
    FileExtension: string
    FileUrl: string
    ProjectOid: number
    DreatedUserOid: number
    DeletedUserOid: number
    IsActive: boolean
    ModuleName: string
  } | []
  ErrorDetail: {
    Description: string
    CreatedUserOid: number
    SendUserOid: number
    ErrorStatusCode: number
    InProgress: string
    ErrorOid: number
  }
}

export interface ErrorListResponse {
  Oid: number
  CreatedDate: number
  LastUpdatedDate: number
  ErrorExplanation: string
  Priority: string
  CompanyOid: number
  ProjectOid: number
  ModuleOid: number
  ErrorStatusCode: number
  CreatedUserOid: number
  UpdatedDate: number
  UpdateUserOid: number
  DeletedDate: number
  DeleteUserOid: number
  ClosedDate: number
  CloseUserOid: number
  CompanyRequestOid: number
  ErrorNo: number
  ErrorTitle: string
  ClosedExplanation: string
  IsTaskClosed: boolean
  SendUserOid: number
  SenderUserOid: number
  ErrorDocumentList: ErrorDocumentList[]
  ErrorDetailList: ErrorDetailList[]
  ErrorNoteList: ErrorNoteList[]
  EstimatedFinishDate: number
  OfficerFullName: string
  OfficerUserName: string
  ApprovalStatusForCompanyError: string
  TemporaryErrorNo: number
}

export interface SaveErrorDocumentRequest {
  DeletedDate: number
  ErrorOid: number
  FileExplanation: string
  FileDisplayName: string
  FileName: string
  OriginalFilename: string
  FileExtension: string
  FileUrl: string
  ProjectOid: number
  CreatedUserOid: number
  DeletedUserOid: number
  IsActive: boolean
  ModuleName: string
}

export interface SaveErrorDocumentResponse {
  Oid: number
  CreatedDate: number
  LastUpdatedDate: number
  DeletedDate: number
  ErrorOid: number
  FileExplanation: string
  FileDisplayName: string
  OriginalFilename: string
  FileExtension: string
  FileUrl: string
  ProjectOid: number
  CreatedUserOid: number
  DeletedUserOid: number
  IsActive: boolean
  ModuleName: string
}

export interface SaveErrorNoteRequest {
  deletedDate: number
  errorOid: number
  createdUserOid: number
  SendUserOid?: number
  updatedUserOid: number
  deletedUserOid: number
  isActive: boolean
  note: string
}

export interface DeleteErrorDocumentRequest {
  Oid: number
  ErrorOid: number
}

export interface SaveErrorNoteResponse {
  Oid: number
  CreatedDate: number
  LastUpdatedDate: number
  DeletedDate: number
  ErrorOid: number
  CreatedUserOid: number
  UpdatedUserOid: number
  DeletedUserOid: number
  IsActive: boolean
  Note: string
}

export interface DeleteErrorNoteRequest {
  Oid: number
  DeletedDate?: number
  ErrorOid: number
  CreatedUserOid?: number
  UpdatedUserOid?: number
  DeletedUserOid?: number
  IsActive?: boolean
  Note?: string
}

export interface DeleteErrorNoteResponse {
  Oid: number
  CreatedDate: number
  LastUpdatedDate: number
  DeletedDate: number
  ErrorOid: number
  CreatedUserOid: number
  UpdatedUserOid: number
  DeletedUserOid: number
  IsActive: boolean
  Note: string
}

export interface SaveAssignErrorRequest {
  Description: string
  CreatedUserOid: number
  SendUserOid: number
  ErrorStatusCode: number
  InProgress: string
  ErrorOid: number
  Duration: number
}

export interface SaveAssignErrorResponse {
  Oid: number
  CreatedDate: number
  LastUpdatedDate: number
  Description: string
  CreatedUserOid: number
  SendUserOid: number
  ErrorStatusCode: number
  InProgress: string
  ErrorOid: number
  Duration: number
}

export interface CloseErrorRequest {
  ErrorOid: number
  ErrorStatusCode: number
  CloseUserOid: number
  Closedexplanation: string
  IsNeedCodeUpdate: boolean
}

export interface CloseErrorResponse {
  Oid: number
  CreatedDate: number
  LastUpdatedDate: number
  ErrorExplanation: string
  Priority: string
  CompanyOid: number
  ProjectOid: number
  ModuleOid: number
  ErrorStatusCode: number
  CreatedUserOid: number
  UpdatedDate: number
  UpdateUserOid: number
  DeletedDate: number
  DeleteUserOid: number
  ClosedDate: number
  CloseUserOid: number
  CompanyRequestOid: number
  ErrorNo: number
  ErrorTitle: string
  ClosedExplanation: string
  IsTaskClosed: boolean
  SendUserOid: number
  SenderUserOid: number
  IsNeedCodeUpdate: boolean
  ErrorDocumentList: ErrorDocumentList[]
  ErrorDetailList: ErrorDetailList[]
  ErrorNoteList: ErrorNoteList[]
}

export interface SaveErrorScriptRequest {
  ErrorOid: number
  QueryNames: string
  Script: string
  MaksScript: string
  IsActive: boolean
  IsNeedCodeUpdate: boolean
  ProjectOid: number
}

export interface SaveErrorScriptResponse {
  Oid: number
  CreatedDate: number
  LastUpdatedDate: number
  ErrorOid: number
  QueryNames: string
  Script: string
  IsActive: boolean
  IsNeedCodeUpdate: boolean
  ProjectOid: number
}

export interface UpdateErrorScriptRequest {
  Oid: number
  ErrorOid: number
  QueryNames: string
  Script: string
  MaksScript: string
  IsActive: boolean
  IsNeedCodeUpdate: boolean
  ProjectOid: number
}

export interface UpdateErrorScriptResponse { // eklenicek!

}

export interface GetErrorScriptByErrorOidResponse {
  CreatedDate: number
  IsActive: boolean
  LastUpdatedDate: number
  Oid: number
  QueryNames: string
  Script: string
  MaksScript: string
  TaskOid: number
  IsNeedCodeUpdate: boolean
  ProjectOid: number
}

export interface GetFavoriteInfoByErrorOidRequest {
  UserOid: number
  ErrorOid: number
}

export interface GetFavoriteInfoByErrorOidResponse {
  Oid: number
  CreatedDate: number
  LastUpdatedDate: number
  ErrorOid: number
  UserOid: number
  IsActive: boolean
}

export interface AddFavoriteErrorRequest {
  ErrorOid: number
  UserOid: number
  IsActive: boolean
}

export interface AddFavoriteErrorResponse {
  Oid: number
  CreatedDate: number
  LastUpdatedDate: number
  ErrorOid: number
  UserOid: number
  IsActive: boolean
}
