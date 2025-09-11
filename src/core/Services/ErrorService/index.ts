import type {
  AddFavoriteErrorRequest,
  AddFavoriteErrorResponse,
  CloseErrorRequest,
  CloseErrorResponse,
  DeleteErrorDocumentRequest,
  DeleteErrorNoteRequest,
  DeleteErrorNoteResponse,
  ErrorListResponse,
  GetErrorScriptByErrorOidResponse,
  GetFavoriteInfoByErrorOidRequest,
  GetFavoriteInfoByErrorOidResponse,
  SaveAssignErrorRequest,
  SaveAssignErrorResponse,
  SaveErrorDocumentRequest,
  SaveErrorDocumentResponse,
  SaveErrorNoteRequest,
  SaveErrorNoteResponse,
  SaveErrorRequest,
  SaveErrorScriptRequest,
  SaveErrorScriptResponse,
  UpdateErrorScriptRequest,
  UpdateErrorScriptResponse,
} from '../../Models/ErrorInterfaces';
import projectManagementAndCRMCore from '../../index';
import type {
  TaskAndErrorListByCriteriaRequest,
  TaskErrorListByCriteriaResponse,
} from '../../Models/TaskInterfaces';

export default class ErrorService {
  endPoint: string;

  constructor() {
    this.endPoint = '/Error';
  }

  saveError = async (savedData: SaveErrorRequest): Promise<ErrorListResponse> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/SaveError`,
      savedData,
    )) as unknown as ErrorListResponse;

  updateError = async (
    savedData: SaveErrorRequest,
  ): Promise<ErrorListResponse> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/UpdateError`,
      savedData,
    )) as unknown as ErrorListResponse;

  getAssignedErrorListByUserOid = async (
    userOid: number,
  ): Promise<ErrorListResponse[]> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/GetAssignedErrorListByUserOid`,
      { userOid },
    )) as unknown as ErrorListResponse[];

  saveErrorDocument = async (
    savedData: SaveErrorDocumentRequest,
  ): Promise<SaveErrorDocumentResponse[]> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/SaveErrorDocument`,
      savedData,
    )) as unknown as SaveErrorDocumentResponse[];

  getErrorDocumentList = async (
    errorOid: number,
  ): Promise<SaveErrorDocumentResponse[]> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/GetErrorDocumentList`,
      { errorOid },
    )) as unknown as SaveErrorDocumentResponse[];

  deleteErrorDocument = async (
    data: DeleteErrorDocumentRequest,
  ): Promise<SaveErrorDocumentResponse[]> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/DeleteErrorDocument`,
      data,
    )) as unknown as SaveErrorDocumentResponse[];

  saveErrorNote = async (
    saveData: SaveErrorNoteRequest,
  ): Promise<SaveErrorNoteResponse[]> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/SaveErrorNote`,
      saveData,
    )) as unknown as SaveErrorNoteResponse[];

  deleteErrorNote = async (
    deletedData: DeleteErrorNoteRequest,
  ): Promise<DeleteErrorNoteResponse[]> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/DeleteErrorNote`,
      deletedData,
    )) as unknown as DeleteErrorNoteResponse[];

  getErrorInfo = async (errorOid: number): Promise<ErrorListResponse> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/GetErrorInfo`,
      { errorOid },
    )) as unknown as ErrorListResponse;

  saveAssignError = async (
    saveData: SaveAssignErrorRequest,
  ): Promise<SaveAssignErrorResponse[]> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/SaveAssignError`,
      saveData,
    )) as unknown as SaveAssignErrorResponse[];

  closeError = async (
    saveData: CloseErrorRequest,
  ): Promise<CloseErrorResponse[]> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/CloseError`,
      saveData,
    )) as unknown as CloseErrorResponse[];

  saveErrorScript = async (
    savedData: SaveErrorScriptRequest,
  ): Promise<SaveErrorScriptResponse> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/SaveErrorScript`,
      savedData,
    )) as unknown as SaveErrorScriptResponse;

  updateErrorScript = async (
    updatedData: UpdateErrorScriptRequest,
  ): Promise<UpdateErrorScriptResponse[]> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/UpdateErrorScript`,
      updatedData,
    )) as unknown as UpdateErrorScriptResponse[];

  getErrorScriptByErrorOid = async (
    errorOid: number,
  ): Promise<GetErrorScriptByErrorOidResponse> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/GetErrorScriptByErrorOid`,
      { errorOid },
    )) as unknown as GetErrorScriptByErrorOidResponse;

  getFavoriteInfoByErrorOid = async (
    queryData: GetFavoriteInfoByErrorOidRequest,
  ): Promise<GetFavoriteInfoByErrorOidResponse> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/GetFavoriteInfoByErrorOid`,
      queryData,
    )) as unknown as GetFavoriteInfoByErrorOidResponse;

  addFavoriteError = async (
    data: AddFavoriteErrorRequest,
  ): Promise<AddFavoriteErrorResponse> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/AddFavoriteError`,
      data,
    )) as unknown as AddFavoriteErrorResponse;

  getUserErrorList = async (
    queryData: TaskAndErrorListByCriteriaRequest,
  ): Promise<TaskErrorListByCriteriaResponse[]> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/GetUserErrorList`,
      queryData,
    )) as unknown as TaskErrorListByCriteriaResponse[];

  updateCompanyErrorApprovalStatus = async (
    savedData: SaveErrorRequest | any,
  ): Promise<any> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/UpdateCompanyErrorApprovalStatus`,
      savedData,
    )) as unknown as any;
}
