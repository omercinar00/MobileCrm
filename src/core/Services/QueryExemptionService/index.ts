import projectManagementAndCRMCore from '../../index';
import type {
  AddApplicationRequest,
  AddApplicationResponse,
  AddExceptionRequest,
  AddExceptionResponse,
  AddQueryRequest,
  ApplicationsResponse,
  DeleteExceptionRequest,
  DeleteQueryRequest,
  ExceptionResponse,
  GetApplicationHistoriesRequest,
  GetApplicationHistoryResponse,
  GetExceptionHistoryRequest,
  GetExceptionHistoryResponse,
  GetQueriesRequest,
  GetQueryHistoryRequest,
  GetQueryHistoryResponse,
  OperationResponse,
  QueryCRUDResponse,
  QueryResponse,
  UpdateApplicationRequest,
  UpdateExceptionRequest,
  UpdateQueryRequest,
} from '../../Models/QueryExemptionInterfaces';

export default class QueryExemptionService {
  endPoint: string;

  constructor() {
    this.endPoint = '/QueryExemption';
  }

  // #Application
  getApplications = async (): Promise<ApplicationsResponse[]> =>
    (await projectManagementAndCRMCore.api.request(
      'get',
      `${this.endPoint}/GetApplications`,
      {},
    )) as unknown as ApplicationsResponse[];

  getNewApplicationId = async (): Promise<number> =>
    (await projectManagementAndCRMCore.api.request(
      'get',
      `${this.endPoint}/GetNewApplicationId`,
      {},
    )) as unknown as number;

  addApplication = async (
    saveData: AddApplicationRequest,
  ): Promise<AddApplicationResponse> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/AddApplication`,
      saveData,
    )) as unknown as AddApplicationResponse;

  updateApplication = async (
    updateData: UpdateApplicationRequest,
  ): Promise<AddApplicationResponse> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/UpdateApplication`,
      updateData,
    )) as unknown as AddApplicationResponse;

  // #Query
  getDataSourceList = async (): Promise<any[]> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/GetDataSourceList`,
      {},
    )) as unknown as any[];

  addQuery = async (saveData: AddQueryRequest): Promise<QueryCRUDResponse> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/AddQuery`,
      saveData,
    )) as unknown as QueryCRUDResponse;

  updateQuery = async (
    updateData: UpdateQueryRequest,
  ): Promise<QueryCRUDResponse> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/UpdateQuery`,
      updateData,
    )) as unknown as QueryCRUDResponse;

  deleteQuery = async (
    deleteData: DeleteQueryRequest,
  ): Promise<QueryCRUDResponse> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/DeleteQuery`,
      deleteData,
    )) as unknown as QueryCRUDResponse;

  getQueries = async (queries: GetQueriesRequest): Promise<QueryResponse[]> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/GetQueries`,
      queries,
    )) as unknown as QueryResponse[];

  // # Exceptions

  getExceptions = async (): Promise<ExceptionResponse[]> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/GetExceptions`,
      {},
    )) as unknown as ExceptionResponse[];

  addException = async (
    savedData: AddExceptionRequest,
  ): Promise<AddExceptionResponse[]> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/AddException`,
      savedData,
    )) as unknown as AddExceptionResponse[];

  updateException = async (
    updateData: UpdateExceptionRequest,
  ): Promise<AddExceptionResponse[]> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/UpdateException`,
      updateData,
    )) as unknown as AddExceptionResponse[];

  deleteException = async (
    deleteData: DeleteExceptionRequest,
  ): Promise<ExceptionResponse[]> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/DeleteException`,
      deleteData,
    )) as unknown as ExceptionResponse[];

  // #ProcessHistory

  getOperations = async (): Promise<OperationResponse[]> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/GetOperations`,
      {},
    )) as unknown as OperationResponse[];

  getQueryHistories = async (
    data: GetQueryHistoryRequest,
  ): Promise<GetQueryHistoryResponse[]> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/GetQueryHistories`,
      data,
    )) as unknown as GetQueryHistoryResponse[];

  getExceptionHistories = async (
    data: GetExceptionHistoryRequest,
  ): Promise<GetExceptionHistoryResponse[]> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/GetExceptionHistories`,
      data,
    )) as unknown as GetExceptionHistoryResponse[];

  getApplicationHistories = async (
    data: GetApplicationHistoriesRequest,
  ): Promise<GetApplicationHistoryResponse[]> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/GetApplicationHistories`,
      data,
    )) as unknown as GetApplicationHistoryResponse[];
}
