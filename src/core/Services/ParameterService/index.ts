import type {
  CompanyListResponse,
  CompanyStatisticsResponse,
  DeveloperStatisticsResponse,
  GetCompanyListByCompanyOidResponse,
  GetGeneralParameterListResponse,
  GetGeneralParameterTypeListResponse,
  GetProjectListResponse,
  MeetingsResponse,
  ModuleListResponse,
  ModuleResponse,
  ParentModulePesponse,
  RoleListResponse,
  SaveCompanyRequest,
  SaveGeneralParameterRequest,
  SaveGeneralParameterResponse,
  SaveGeneralParameterTypeRequest,
  SaveGeneralParameterTypeResponse,
  SaveMeetingsRequest,
  SaveModuleRequest,
  SaveOrUpdateCompanyModuleRequest,
  SaveProjectRequest,
  SaveRoleRequest,
  SaveTitleRequest,
  TitleListResponse,
  UpdateCompanyRequest,
  UpdateGeneralParameterRequest,
  UpdateGeneralParameterResponse,
  UpdateGeneralParameterTypeRequest,
  UpdateGeneralParameterTypeResponse,
  UpdateMeetingsRequest,
  UpdateModuleRequest,
  UpdateProjectRequest,
  UpdateRoleRequest,
  UpdateTitleRequest,
} from '../../Models/ParameterInterfaces';
import projectManagementAndCRMCore from '../../index';

export default class ParameterService {
  endPoint: string;

  constructor() {
    this.endPoint = '/Parameter';
  }

  // #general parameters
  getNextParameterTypeCode = async (): Promise<number> =>
    (await projectManagementAndCRMCore.api.request(
      'get',
      `${this.endPoint}/GetNextParameterTypeCode`,
      {},
    )) as unknown as number;

  getGeneralParameterTypeList = async (): Promise<
    GetGeneralParameterTypeListResponse[]
  > =>
    (await projectManagementAndCRMCore.api.request(
      'get',
      `${this.endPoint}/GetGeneralParameterTypeList`,
      {},
    )) as unknown as GetGeneralParameterTypeListResponse[];

  saveGeneralParameterType = async (
    savedData: SaveGeneralParameterTypeRequest,
  ): Promise<SaveGeneralParameterTypeResponse[]> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/SaveGeneralParameterType`,
      savedData,
    )) as unknown as SaveGeneralParameterTypeResponse[];

  updateGeneralParameterType = async (
    updatedData: UpdateGeneralParameterTypeRequest,
  ): Promise<UpdateGeneralParameterTypeResponse[]> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/UpdateGeneralParameterType`,
      updatedData,
    )) as unknown as UpdateGeneralParameterTypeResponse[];

  getNextParameterCode = async (parameterTypeCode: string): Promise<number> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/GetNextParameterCode`,
      { parameterTypeCode },
    )) as unknown as number;

  getGeneralParameterList = async (
    parameterTypeCode: string,
  ): Promise<GetGeneralParameterListResponse[]> => {
    return (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/GetGeneralParameterList`,
      { parameterTypeCode },
    )) as unknown as GetGeneralParameterListResponse[];
  };

  saveGeneralParameter = async (
    savedData: SaveGeneralParameterRequest,
  ): Promise<SaveGeneralParameterResponse[]> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/SaveGeneralParameter`,
      savedData,
    )) as unknown as SaveGeneralParameterResponse[];

  updateGeneralParameter = async (
    updatedData: UpdateGeneralParameterRequest,
  ): Promise<UpdateGeneralParameterResponse[]> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/UpdateGeneralParameter`,
      updatedData,
    )) as unknown as UpdateGeneralParameterResponse[];

  // #project definition

  getProjectList = async (): Promise<GetProjectListResponse[]> =>
    (await projectManagementAndCRMCore.api.request(
      'get',
      `${this.endPoint}/GetProjectList`,
      {},
    )) as unknown as GetProjectListResponse[];

  getNextProjectCode = async (): Promise<number> =>
    (await projectManagementAndCRMCore.api.request(
      'get',
      `${this.endPoint}/GetNextProjectCode`,
      {},
    )) as unknown as number;

  saveProject = async (
    savedData: SaveProjectRequest,
  ): Promise<GetProjectListResponse[]> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/SaveProject`,
      savedData,
    )) as unknown as GetProjectListResponse[];

  updateProject = async (
    updatedData: UpdateProjectRequest,
  ): Promise<GetProjectListResponse[]> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/UpdateProject`,
      updatedData,
    )) as unknown as GetProjectListResponse[];

  // #Module definition
  getModuleListByParentOid = async (
    parentModuleOid: number,
  ): Promise<ModuleListResponse[]> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/GetModuleListByParentOid`,
      { parentModuleOid },
    )) as unknown as ModuleListResponse[];

  getModuleList = async (): Promise<ParentModulePesponse[]> =>
    (await projectManagementAndCRMCore.api.request(
      'get',
      `${this.endPoint}/GetModuleList`,
      {},
    )) as unknown as ParentModulePesponse[];

  saveModule = async (
    savedData: SaveModuleRequest,
  ): Promise<ModuleResponse[]> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/SaveModule`,
      savedData,
    )) as unknown as ModuleResponse[];

  updateModule = async (
    updatedData: UpdateModuleRequest,
  ): Promise<ModuleResponse[]> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/UpdateModule`,
      updatedData,
    )) as unknown as ModuleResponse[];

  getAllModuleList = async (): Promise<ModuleResponse[]> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/GetAllModuleList`,
      {},
    )) as unknown as ModuleResponse[];

  // # Institution Definition
  getCompanyList = async (): Promise<CompanyListResponse[]> =>
    (await projectManagementAndCRMCore.api.request(
      'get',
      `${this.endPoint}/GetCompanyList`,
      {},
    )) as unknown as CompanyListResponse[];

  getCompanyInfoByCompanyCode = async (
    companyCode: string,
  ): Promise<CompanyListResponse> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/GetCompanyInfoByCompanyCode`,
      { companyCode },
    )) as unknown as CompanyListResponse;

  getCompanyListByProjectOid = async (
    projectOid: number,
  ): Promise<CompanyListResponse[]> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/GetCompanyListByProjectOid`,
      { projectOid },
    )) as unknown as CompanyListResponse[];

  saveCompany = async (
    savedData: SaveCompanyRequest,
  ): Promise<CompanyListResponse[]> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/SaveCompany`,
      savedData,
    )) as unknown as CompanyListResponse[];

  updateCompany = async (
    updatedData: UpdateCompanyRequest,
  ): Promise<CompanyListResponse[]> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/UpdateCompany`,
      updatedData,
    )) as unknown as CompanyListResponse[];

  // #Role definition
  getRoleList = async (): Promise<RoleListResponse[]> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/GetRoleList`,
      {},
    )) as unknown as RoleListResponse[];

  saveRole = async (savedData: SaveRoleRequest): Promise<RoleListResponse[]> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/SaveRole`,
      savedData,
    )) as unknown as RoleListResponse[];

  updateRole = async (
    updatedData: UpdateRoleRequest,
  ): Promise<RoleListResponse[]> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/UpdateRole`,
      updatedData,
    )) as unknown as RoleListResponse[];

  getNextRoleCode = async (): Promise<number> =>
    (await projectManagementAndCRMCore.api.request(
      'get',
      `${this.endPoint}/GetNextRoleCode`,
      {},
    )) as unknown as number;

  // #Title Definition
  getTitleList = async (): Promise<TitleListResponse[]> =>
    (await projectManagementAndCRMCore.api.request(
      'get',
      `${this.endPoint}/GetTitleList`,
      {},
    )) as unknown as TitleListResponse[];

  saveTitle = async (
    savedData: SaveTitleRequest,
  ): Promise<TitleListResponse[]> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/SaveTitle`,
      savedData,
    )) as unknown as TitleListResponse[];

  updateTitle = async (
    updatedData: UpdateTitleRequest,
  ): Promise<TitleListResponse[]> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/UpdateTitle`,
      updatedData,
    )) as unknown as TitleListResponse[];

  getNextTitleCode = async (): Promise<number> =>
    (await projectManagementAndCRMCore.api.request(
      'get',
      `${this.endPoint}/GetNextTitleCode`,
      {},
    )) as unknown as number;

  getCompanyListByCompanyOid = async (
    companyOid: number,
  ): Promise<GetCompanyListByCompanyOidResponse[]> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/GetCompanyListByCompanyOid`,
      { companyOid },
    )) as unknown as GetCompanyListByCompanyOidResponse[];

  saveOrUpdateCompanyModule = async (
    savedData: SaveOrUpdateCompanyModuleRequest,
  ): Promise<GetCompanyListByCompanyOidResponse[]> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/SaveOrUpdateCompanyModule`,
      savedData,
    )) as unknown as GetCompanyListByCompanyOidResponse[];

  getModuleListByProjectOid = async (projectOid: number): Promise<any[]> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/GetModuleListByProjectOid`,
      { projectOid },
    )) as unknown as any[];

  saveMeetings = async (
    data: SaveMeetingsRequest,
  ): Promise<MeetingsResponse[]> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/SaveMeetings`,
      data,
    )) as unknown as MeetingsResponse[];

  updateMeetings = async (data: UpdateMeetingsRequest): Promise<any[]> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/UpdateMeeting`,
      data,
    )) as unknown as any[];

  getMeetingList = async (): Promise<any[]> =>
    (await projectManagementAndCRMCore.api.request(
      'get',
      `${this.endPoint}/GetMeetingList`,
      {},
    )) as unknown as any[];

  getDeveloperStatistics = async (
    StartDate: number,
    EndDate: number,
  ): Promise<DeveloperStatisticsResponse[]> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/GetDeveloperStatistics`,
      { StartDate, EndDate },
    )) as unknown as DeveloperStatisticsResponse[];

  getCompanyStatistics = async (
    StartDate: number,
    EndDate: number,
  ): Promise<CompanyStatisticsResponse[]> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/GetCompanyStatistics`,
      { StartDate, EndDate },
    )) as unknown as CompanyStatisticsResponse[];
}
