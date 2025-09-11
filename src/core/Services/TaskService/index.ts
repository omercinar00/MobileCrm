import type {
  AddFavoriteTaskRequest,
  CloseTaskRequest,
  CloseTaskResponse,
  DeleteTaskDocumentRequest,
  DeleteTaskNoteRequest,
  GetFavoriteInfoByTaskOidRequest,
  GetTaskDocumentListResponse,
  GetTaskScriptByTaskOidResponse,
  SaveAssignTaskRequest,
  SaveAssignTaskResponse,
  SaveTaskDetailRequest,
  SaveTaskDetailResponse,
  SaveTaskDocumentRequset,
  SaveTaskNoteRequest,
  SaveTaskNoteResponse,
  SaveTaskRequest,
  SaveTaskScriptRequest,
  TaskAndErrorListByCriteriaRequest,
  TaskErrorListByCriteriaResponse,
  TaskFavoriteResponse,
  TaskInfoResponse,
  TaskListResponse,
  TaskNoteListResonse,
  UpdateTaskScriptRequest,
} from '../../Models/TaskInterfaces';
import projectManagementAndCRMCore from '../../index';

export default class TaskService {
  endPoint: string;

  constructor() {
    this.endPoint = '/Task';
  }

  saveTask = async (savedData: SaveTaskRequest): Promise<TaskListResponse> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/SaveTask`,
      savedData,
    )) as unknown as TaskListResponse;

  updateTask = async (savedData: SaveTaskRequest): Promise<TaskListResponse> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/UpdateTask`,
      savedData,
    )) as unknown as TaskListResponse;

  // Tüm Talepler
  getTaskList = async (): Promise<TaskListResponse[]> =>
    (await projectManagementAndCRMCore.api.request(
      'get',
      `${this.endPoint}/GetTaskList`,
      {},
    )) as unknown as TaskListResponse[];

  getAssignedTaskListByUserOid = async (
    userOid: number,
    showClosedTask?: boolean,
  ): Promise<TaskListResponse[]> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/GetAssignedTaskListByUserOid`,
      { userOid, showClosedTask },
    )) as unknown as TaskListResponse[];

  getTaskInfo = async (taskOid: number): Promise<TaskInfoResponse[]> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/GetTaskInfo`,
      { taskOid },
    )) as unknown as TaskInfoResponse[];

  saveTaskDetail = async (
    savedData: SaveTaskDetailRequest,
  ): Promise<SaveTaskDetailResponse[]> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/SaveTaskDetail`,
      savedData,
    )) as unknown as SaveTaskDetailResponse[];

  saveAssignTask = async (
    savedData: SaveAssignTaskRequest,
  ): Promise<SaveAssignTaskResponse[]> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/SaveAssignTask`,
      savedData,
    )) as unknown as SaveAssignTaskResponse[];

  saveTaskDocument = async (
    savedData: SaveTaskDocumentRequset,
  ): Promise<any[]> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/SaveTaskDocument`,
      savedData,
    )) as unknown as any[];

  getTaskDocumentList = async (
    taskOid: number,
  ): Promise<GetTaskDocumentListResponse[]> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/GetTaskDocumentList`,
      { taskOid },
    )) as unknown as GetTaskDocumentListResponse[];

  deleteTaskDocument = async (
    data: DeleteTaskDocumentRequest,
  ): Promise<any[]> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/DeleteTaskDocument`,
      data,
    )) as unknown as any[];

  saveTaskNote = async (
    savedData: SaveTaskNoteRequest,
  ): Promise<SaveTaskNoteResponse[]> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/SaveTaskNote`,
      savedData,
    )) as unknown as SaveTaskNoteResponse[];

  deleteTaskNote = async (
    deletedData: DeleteTaskNoteRequest,
  ): Promise<TaskNoteListResonse[]> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/DeleteTaskNote`,
      deletedData,
    )) as unknown as TaskNoteListResonse[];

  // # Task List By Criteria
  getTaskAndErrorListByCriteria = async (
    queryData: TaskAndErrorListByCriteriaRequest,
  ): Promise<TaskErrorListByCriteriaResponse[]> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/GetTaskAndErrorListByCriteria`,
      queryData,
    )) as unknown as TaskErrorListByCriteriaResponse[];

  closeTask = async (data: CloseTaskRequest): Promise<CloseTaskResponse[]> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/CloseTask`,
      data,
    )) as unknown as CloseTaskResponse[];

  saveTaskScript = async (savedData: SaveTaskScriptRequest): Promise<any[]> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/SaveTaskScript`,
      savedData,
    )) as unknown as any[];

  updateTaskScript = async (
    updatedData: UpdateTaskScriptRequest,
  ): Promise<any[]> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/UpdateTaskScript`,
      updatedData,
    )) as unknown as any[];

  getTaskScriptByTaskOid = async (
    taskOid: number,
  ): Promise<GetTaskScriptByTaskOidResponse> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/GetTaskScriptByTaskOid`,
      { taskOid },
    )) as unknown as GetTaskScriptByTaskOidResponse;

  getAllErrorsAndTasks = async (): Promise<TaskErrorListByCriteriaResponse[]> =>
    (await projectManagementAndCRMCore.api.request(
      'get',
      `${this.endPoint}/GetAllErrorsAndTasks`,
      {},
    )) as unknown as TaskErrorListByCriteriaResponse[];

  addFavoriteTask = async (
    savedData: AddFavoriteTaskRequest,
  ): Promise<TaskFavoriteResponse> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/AddFavoriteTask`,
      savedData,
    )) as unknown as TaskFavoriteResponse;

  getFavoriteInfoByTaskOid = async (
    queryData: GetFavoriteInfoByTaskOidRequest,
  ): Promise<TaskFavoriteResponse> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/GetFavoriteInfoByTaskOid`,
      queryData,
    )) as unknown as any;

  getUserTaskList = async (
    queryData: TaskAndErrorListByCriteriaRequest,
  ): Promise<TaskErrorListByCriteriaResponse[]> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/GetUserTaskList`,
      queryData,
    )) as unknown as TaskErrorListByCriteriaResponse[];

  getCompanyTaskList = async (): Promise<TaskErrorListByCriteriaResponse[]> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/GetCompanyTaskList`,
      {},
    )) as unknown as TaskErrorListByCriteriaResponse[];

  getCompanyTaskInfo = async (taskOid: number): Promise<TaskInfoResponse[]> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/GetCompanyTaskInfo`,
      { taskOid },
    )) as unknown as TaskInfoResponse[];

  updateCompanyTaskApprovalStatus = async (
    savedData: SaveTaskRequest | any,
  ): Promise<any> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/UpdateCompanyTaskApprovalStatus`,
      savedData,
    )) as unknown as any;
}
