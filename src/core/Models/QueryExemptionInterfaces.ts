export interface ApplicationsResponse {
  Oid: number
  Status: boolean
  LastUpdated: number
  Applicationid: number
  ApplicationName: string
  OperationRefNo: number
  ProcessDate: number
  ProcessTime: number
}

export interface AddApplicationRequest {
  ApplicationId: number
  ApplicationName: string
}

interface ResultList {
  Oid: number
  Status: boolean
  LastUpdated: number
  Applicationid: number
  ApplicationName: string
  OperationRefNo: any
  ProcessDate: any
  ProcessTime: any
}

export interface AddApplicationResponse {
  Errors: any
  Result: any
  ResultList: ResultList[]
  Message: any
  QueryModelList: any
}

export interface UpdateApplicationRequest {
  Oid: number
  ApplicationId: number
  ApplicationName: string
}

export interface AddQueryRequest {
  QueryName: string
  QueryText: string
  DataSource: string
  ApplicationId: number
}

interface ErrorMessage {
  Code: number
  Message: string
}

interface Result {
  Oid: number
  Status: boolean
  LastUpdated: number
  ApplicationId: number
  DataSource: string
  QueryName: string
  QueryText1: string
  QueryText2: string
  QueryText3: string
  QueryText4: string
  QueryText5: string
  QueryText6: string
  QueryText7: string
  QueryText8: string
  QueryText9: string
  QueryText10: string
  ProcessDate: number
  ProcessTime: number
  OperationRefNo: number
}

export interface QueryResponse {
  Oid: number
  Status: boolean
  LastUpdated: number
  ApplicationId: number
  DataSource: string
  Operationrefno?: number | null
  ProcessDate?: Date | null
  ProcessTime?: string | null
  QueryName: string
  QueryText: string
  QueryText1: string | null
  QueryText2: string | null
  QueryText3: string | null
  QueryText4: string | null
  QueryText5: string | null
  QueryText6: string | null
  QueryText7: string | null
  QueryText8: string | null
  QueryText9: string | null
  QueryText10: string
}

export interface QueryCRUDResponse {
  Errors: ErrorMessage[] | any
  Message: any
  QueryModelList: QueryResponse[]
  Result: Result
  ResultList: Result[]
}

export interface UpdateQueryRequest {
  Oid: number
  QueryName: string
  QueryText: string
  DataSource: string
  ApplicationId: number
}

export interface DeleteQueryRequest {
  ApplicationId: number
  Oid: number
}

export interface GetQueriesRequest {
  ApplicationId: number
  Oid: number
}

export interface ExceptionResponse {
  Oid: number
  Status: boolean
  Lastupdated: number
  Exceptionid: string
  Exceptiontext: string
  ProcessDate: number
  ProcessTime: number
}

export interface AddExceptionRequest {
  ExceptionId: string
  ExceptionText: string
}

interface ExceptionResult {
  Oid: number
  Status: boolean
  LastUpdated: number
  ExceptionId: string
  ExceptionText: string
  ProcessDate: number
  ProcessTime: number
}

interface QueryModel {
  Oid: number
  QueryName: string
  QueryText: string
  DataSource: string
  ApplicationId: number
}

export interface AddExceptionResponse {
  Errors: ErrorMessage[]
  Result: ExceptionResult
  ResultList: ExceptionResult[]
  Message: string
  QueryModelList: QueryModel[]
}

export interface UpdateExceptionRequest {
  Oid: number
  Status: boolean
  LastUpdated: number
  ExceptionId: string
  ExceptionText: string
}

export interface DeleteExceptionRequest {
  Oid: number
  ApplicationId: number
}

export interface OperationResponse {
  Oid: number
  Status: boolean
  Lastupdated: number
  ProcessDate: number
  ProcessTime: number
  OperationCode: string
  OperationName: string
}

export interface GetQueryHistoryRequest {
  ApplicationId?: number
  ProcessFinishDate?: any
  ProcessStartDate?: any
}

export interface GetQueryHistoryResponse {
  ApplicationId: number
  DataSource: string
  LastUpdated: number
  Oid: number
  OperationInformationModel: {
    OperationTypeName: any
    UserName: any
  }
  OperationRefNo: any
  ParentOid: number
  ProcessDate: any
  ProcessTime: any
  QueryName: string
  QueryText: string
  Status: boolean
}

export interface GetExceptionHistoryRequest {
  ProcessFinishDate?: any
  ProcessStartDate?: any
}

export interface GetExceptionHistoryResponse {
  ExceptionId: string
  ExceptionText: string
  LastUpdated: number
  Oid: number
  OperationInformationModel: {
    OperationTypeName: any
    UserName: any
  }
  ParentOid: number
  ProcessDate: any
  ProcessTime: any
  Status: boolean
}

export interface GetApplicationHistoriesRequest {
  ProcessFinishDate?: any
  ProcessStartDate?: any
}

export interface GetApplicationHistoryResponse {
  ApplicationId: number
  ApplicationName: string
  LastUpdated: number
  Oid: number
  OperationInformationModel: {
    OperationTypeName: any
    UserName: any
  }
  OperationRefNo: any
  ProcessDate: any
  ProcessTime: any
  Status: boolean
}
