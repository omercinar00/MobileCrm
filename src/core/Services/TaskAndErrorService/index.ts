import type {
  GetAllFavoriteErrorsAndTasksResponse,
  GetErrorsAndTasksByPersonnelRequest,
  ProcessTaskOrErrorRequest,
  TaskAndErrorListByCriteriaRequest,
  TaskErrorListByCriteriaResponse,
  WorkScheduleRequest,
} from '../../Models/TaskInterfaces';
import projectManagementAndCRMCore from '../../index';

export default class TaskAndErrorService {
  endPoint: string;

  constructor() {
    this.endPoint = '/TaskAndError';
  }

  // # Task List By Criteria
  getTaskAndErrorListByCriteria = async (
    queryData: TaskAndErrorListByCriteriaRequest,
  ): Promise<TaskErrorListByCriteriaResponse[]> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/GetTaskAndErrorListByCriteria`,
      queryData,
    )) as unknown as TaskErrorListByCriteriaResponse[];

  getUserTaskAndErrorListByCriteria = async (
    queryData: TaskAndErrorListByCriteriaRequest,
  ): Promise<TaskErrorListByCriteriaResponse[]> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/GetUserTaskAndErrorListByCriteria`,
      queryData,
    )) as unknown as TaskErrorListByCriteriaResponse[];

  getAllErrorsAndTasks = async (): Promise<TaskErrorListByCriteriaResponse[]> =>
    (await projectManagementAndCRMCore.api.request(
      'get',
      `${this.endPoint}/GetAllErrorsAndTasks`,
      {},
    )) as unknown as TaskErrorListByCriteriaResponse[];

  getAllFavoriteErrorsAndTasks = async (
    userOid: number,
  ): Promise<GetAllFavoriteErrorsAndTasksResponse[]> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/GetAllFavoriteErrorsAndTasks`,
      { userOid },
    )) as unknown as GetAllFavoriteErrorsAndTasksResponse[];

  getErrorsAndTasksByPersonnel = async (
    queryData: GetErrorsAndTasksByPersonnelRequest,
  ): Promise<TaskErrorListByCriteriaResponse[]> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/GetErrorsAndTasksByPersonnel`,
      queryData,
    )) as unknown as TaskErrorListByCriteriaResponse[];

  processTaskOrError = async (
    queryData: ProcessTaskOrErrorRequest,
  ): Promise<boolean> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/ProcessTaskOrError`,
      queryData,
    )) as unknown as boolean;

  stopProcessTaskOrError = async (
    queryData: ProcessTaskOrErrorRequest,
  ): Promise<boolean> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/StopProcessTaskOrError`,
      queryData,
    )) as unknown as boolean;

  checkTaskOrErrorInProcess = async (
    queryData: ProcessTaskOrErrorRequest,
  ): Promise<boolean> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/CheckTaskOrErrorInProcess`,
      queryData,
    )) as unknown as boolean;

  getTaskAndErrorListInProcess = async (): Promise<
    TaskErrorListByCriteriaResponse[]
  > =>
    (await projectManagementAndCRMCore.api.request(
      'get',
      `${this.endPoint}/GetTaskAndErrorListInProcess`,
      {},
    )) as unknown as TaskErrorListByCriteriaResponse[];

  getErrorAndTaskListBasedUser = async (queryData: any): Promise<any[]> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/GetErrorAndTaskListBasedUser`,
      queryData,
    )) as unknown as any[];

  bulkTaskAndErrorClosing = async (queryData: any): Promise<any[]> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/BulkTaskAndErrorClosing`,
      queryData,
    )) as unknown as any[];

  closeBulkTaskOrError = async (queryData: any): Promise<any[]> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/CloseBulkTaskOrError`,
      queryData,
    )) as unknown as any[];

  getCompanyTaskAndErrorListByCriteria = async (
    queryData: TaskAndErrorListByCriteriaRequest,
  ): Promise<TaskErrorListByCriteriaResponse[]> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/GetCompanyTaskAndErrorListByCriteria`,
      queryData,
    )) as unknown as TaskErrorListByCriteriaResponse[];

  saveWorkSchedule = async (
    queryData: WorkScheduleRequest,
  ): Promise<TaskErrorListByCriteriaResponse[]> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/SaveWorkSchedule`,
      queryData,
    )) as unknown as TaskErrorListByCriteriaResponse[];

  getWorkScheduleByUserOid = async (
    queryData: TaskAndErrorListByCriteriaRequest,
  ): Promise<TaskErrorListByCriteriaResponse[]> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/GetWorkScheduleByUserOid`,
      queryData,
    )) as unknown as TaskErrorListByCriteriaResponse[];

  getUserTaskAndErrorDetailListWithDuration = async (
    queryData: TaskAndErrorListByCriteriaRequest,
  ): Promise<any[]> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/GetUserTaskAndErrorDetailListWithDuration`,
      queryData,
    )) as unknown as any[];

  getUserIstatisticInfo = async (
    queryData: TaskAndErrorListByCriteriaRequest,
  ): Promise<any> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/GetUserIstatisticInfo`,
      queryData,
    )) as unknown as any;

  getTaskAndErrorListByDate = async (
    queryData: TaskAndErrorListByCriteriaRequest,
  ): Promise<TaskErrorListByCriteriaResponse[]> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/GetTaskAndErrorListByDate`,
      queryData,
    )) as unknown as TaskErrorListByCriteriaResponse[];
}
