export interface SaveTaskRequest {
  Oid?: number
  TaskTitle: string
  TaskExplanation: string
  Priority: string
  CompanyOid: number
  ProjectOid: number
  ModuleOid: number
  TaskStatusCode?: number
  CreatedUserOid: number
  UpdatedDate: number
  UpdateUserOid: number
  DeletedDate: number
  DeleteUserOid: number
  ClosedDate: number
  CloseUserOid: number
  IsTaskClosed: boolean
  EstimatedFinishDate: number
  TaskDocumentList: [
    {
      DeletedDate: number
      TaskOid: number
      FileExplanation: string
      FileName: string
      OriginalFilename: string
      FileExtension: string
      FileUrl: string
      ProjectOid: number
      ModuleName: string
      CreatedUserOid: number
      DeletedUserOid: number
      IsActive: boolean
    },
  ]
  TaskDetail: {
    Description: string
    CreatedUserOid: number
    SendUserOid: number
    TaskStatusCode: number
    InProgress: string
    TaskOid: number
  }
}

export interface TaskListResponse {
  Oid: number
  CreatedDate: number
  LastUpdatedDate: number
  TaskTitle: string
  TaskExplanation: string
  Priority: string
  CompanyOid: number
  ProjectOid: number
  ModuleOid: number
  TaskStatusCode: number
  CreatedUserOid: number
  UpdatedDate: any
  UpdateUserOid: number
  DeletedDate: number
  DeleteUserOid: number
  ClosedDate: number
  CloseUserOid: number
  CompanyRequestOid: number
  TaskNo: number
  IsTaskClosed: boolean
  TaskDocumentList: any
  TaskDetailList: any
  TaskNoteList: any
  SendUserOid: number
  EstimatedFinishDate: number
  SenderUserOid: number
}

export interface TaskInfoResponse {
  Oid: number
  CreatedDate: number
  LastUpdatedDate: number
  TaskTitle: string
  TaskExplanation: string
  Priority: number
  CompanyOid: number
  ProjectOid: number
  ModuleOid: number
  TaskStatusCode: number
  CreatedUserOid: number
  UpdatedDate: number | null
  UpdateUserOid: number
  DeletedDate: number
  DeleteUserOid: number
  ClosedDate: number
  CloseUserOid: number
  CompanyRequestOid: number
  TaskNo: number
  IsTaskClosed: boolean
  EstimatedFinishDate: number
  TaskDocumentList: [
    {
      Oid: number
      CreatedDate: number
      LastUpdatedDate: number
      DeletedDate: number | null
      TaskOid: number
      FileExplanation: string
      FileDisplayname: string
      OriginalFilename: string
      FileExtension: string
      FileUrl: string
      ProjectOid: number
      ModuleName: string
      CreatedUserOid: number
      DeletedUserOid: number | null
      IsActive: boolean
    },
  ]
  TaskDetailList: [
    {
      Oid: number
      CreatedDate: number
      LastUpdatedDate: number
      Description: string
      CreatedUserOid: number
      SendUserOid: number
      TaskStatusCode: number
      InProgress: string
      TaskOid: number
    },
  ]
  TaskNoteList: []
  SendUserOid: number
  SenderUserOid: number
}

export interface TaskDetailList {
  Oid: number
  CreatedDate: number
  LastUpdatedDate: number
  Description: string
  CreatedUserOid: number
  SendUserOid: number
  TaskStatusCode: number
  InProgress: string
  TaskOid: number
}

export interface SaveTaskDetailRequest {
  Description: string
  CreatedUserOid: number
  SendUserOid: number
  TaskStatusCode: number
  InProgress: string
  TaskOid: number
}

export interface SaveTaskDetailResponse {
  Oid: number
  CreatedDate: number
  LastUpdatedDate: number
  Description: string
  CreatedUserOid: number
  SendUserOid: number
  TaskStatusCode: number
  InProgress: string
  TaskOid: number
}

export interface SaveAssignTaskRequest {
  Description: string
  CreatedUserOid: number
  SendUserOid: number
  TaskStatusCode: number
  InProgress: string
  TaskOid: number
  Duration: number
}

export interface SaveAssignTaskResponse {
  Oid: number
  CreatedDate: number
  LastUpdatedDate: number
  Description: string
  CreatedUserOid: number
  SendUserOid: number
  TaskStatusCode: number
  InProgress: string
  TaskOid: number
  Duration: number
}

export interface SaveTaskDocumentRequset {
  DeletedDate: number
  TaskOid: number
  FileExplanation: string
  FileName: string
  OriginalFilename: string
  FileExtension: string
  FileUrl: string
  ProjectOid: number
  ModuleName: string
  CreatedUserOid: number
  DeletedUserOid: number
  IsActive: boolean
}

export interface GetTaskDocumentListResponse {
  Oid: number
  CreatedDate: number
  LastUpdatedDate: number
  DeletedDate: number
  TaskOid: number
  FileExplanation: string
  FileDisplayname: string
  OriginalFilename: string
  FileExtension: string
  FileUrl: string
  ProjectOid: number
  ModuleName: string
  CreatedUserOid: number
  DeletedUserOid: number
  IsActive: boolean
}

export interface SaveTaskNoteRequest {
  TaskOid: number
  TaskNote: string
  CreatedUserOid: number
  UpdatedUserOid: number
}

export interface SaveTaskNoteResponse {
  Oid: number
  CreatedDate: number
  LastUpdatedDate: number
  DeletedDate: number
  TaskOid: number
  TaskNote: string
  CreatedUserOid: number
  UpdatedUserOid: number
  DeletedUserOid: number
}

export interface DeleteTaskDocumentRequest {
  Oid: number
  TaskOid: number
}

export interface DeleteTaskNoteRequest {
  Oid: number
  TaskOid: number
}
export interface TaskNoteListResonse {
  Oid: number
  CreatedDate: number
  LastUpdatedDate: number
  DeletedDate: number
  TaskOid: number
  TaskNote: string
  CreatedUserOid: number
  UpdatedUserOid: number
  DeletedUserOid: number
}

export interface TaskAndErrorListByCriteriaRequest {
  UserOid?: number
  StartDate?: number
  EndDate?: number
  Type?: string
  Priority?: string
  CompanyOid?: number
  ProjectOid?: number
  ModuleOidList?: number[]
  StatusCode?: number
  CreatedUserOid?: number
  ClosedUserOid?: number
  IsTaksClosed?: boolean
  ShowClosedTask?: boolean
  TaskOrErrorNumber?: number
  IsActive?: boolean
}

export interface TaskErrorListByCriteriaResponse {
  Oid: number | any
  CreatedDate: number
  LastUpdatedDate: number
  Title: string
  Explanation: string
  Priority: string
  CompanyOid: number
  ProjectOid: number
  ModuleOid: number
  StatusCode: number
  CreatedUserOid: number
  UpdatedDate: number
  UpdateUserOid: number
  DeletedDate: number
  DeleteUserOid: number
  ClosedDate: number
  CloseUserOid: number
  CompanyRequestOid: number
  No: number
  IsTaskClosed: boolean
  SendUserOid: number
  SenderUserOid: number
  Type: string
  Duration: any
  StartDate: any
  EndDate: any
  RemainingDuration: any
  DetailOid: number
}

export interface CloseTaskRequest {
  TaskOid: number
  TaskStatusCode: number
  CloseUserOid: number
  Closedexplanation: string
}

export interface CloseTaskResponse {
  Oid: number
  CreatedDate: number
  LastUpdatedDate: number
  TaskTitle: string
  TaskExplanation: string
  Priority: string
  CompanyOid: number
  ProjectOid: number
  ModuleOid: number
  TaskStatusCode: number
  CreatedUserOid: number
  UpdatedDate: number
  UpdateUserOid: number
  DeletedDate: number
  DeleteUserOid: number
  ClosedDate: number
  CloseUserOid: number
  CompanyRequestOid: number
  TaskNo: number
  IsTaskClosed: boolean
  TaskDocumentList: null
  TaskDetailList: null
  TaskNoteList: null
  SendUserOid: number
  SenderUserOid: number
}

export interface SaveTaskScriptRequest {
  TaskOid: number
  QueryNames: string
  Script: string
  MaksScript: string
  IsActive: boolean
  ProjectOid: number
}

export interface UpdateTaskScriptRequest {
  Oid: number
  TaskOid: number
  QueryNames: string
  Script: string
  MaksScript: string
  IsActive: boolean
  ProjectOid: number
}

export interface GetTaskScriptByTaskOidResponse {
  Oid: number
  CreatedDate: number
  LastUpdatedDate: number
  TaskOid: number
  QueryNames: string
  Script: any
  MaksScript: any | string
  IsActive: boolean
  ProjectOid: number
}
export interface AddFavoriteTaskRequest {
  TaskOid: number
  UserOid: number
  IsActive: boolean
}
export interface TaskFavoriteResponse {
  Oid: number
  CreatedDate: number
  LastUpdatedDate: number
  TaskOid: number
  UserOid: number
  IsActive: boolean
}

export interface GetFavoriteInfoByTaskOidRequest {
  UserOid: number
  TaskOid: number
}

export interface GetAllFavoriteErrorsAndTasksResponse {
  Oid: number
  CreatedDate: number
  LastUpdatedDate: number
  Title: string
  Explanation: string
  Priority: string
  CompanyOid: number
  ProjectOid: number
  ModuleOid: number
  StatusCode: number
  CreatedUserOid: number
  UpdatedDate: number
  UpdateUserOid: number
  DeletedDate: number
  DeleteUserOid: number
  ClosedDate: number
  CloseUserOid: number
  CompanyRequestOid: number
  Closedexplanation: null
  No: number
  Type: string
  SendUserOid: number
  SenderUserOid: number
  IsActive: boolean
}

export interface GetErrorsAndTasksByPersonnelRequest {
  UserOid?: number
  StartDate?: number
  EndDate?: number
}

export interface ProcessTaskOrErrorRequest {
  UserOid: number
  TaskOrErrorOid: number
  TaskOrErrorDetailOid: number
  Type?: string
}

export interface WorkScheduleRequest {
  CreatedUserOid?: number
  UserOid?: number
  WorkScheduleDetailList?: any[]
  IsActive?: boolean
}
