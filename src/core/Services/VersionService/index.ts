import axios from 'axios';
import projectManagementAndCRMCore from '../../index';
import type {
  SaveProjectMenuRequest,
  SaveVersionRequest,
  ScriptsOfErrorsAndTasksRequest,
  ScriptsOfErrorsAndTasksResponse,
  UpdateProjectMenuRequest,
  UpdateVersionRequest,
  VersionListResponse,
} from '../../Models/VersionInterfaces';

export default class VersionService {
  endPoint: string;

  constructor() {
    this.endPoint = '/Version';
  }

  getScriptsOfErrorsAndTasks = async (
    query: ScriptsOfErrorsAndTasksRequest,
  ): Promise<ScriptsOfErrorsAndTasksResponse[]> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/GetScriptsOfErrorsAndTasks`,
      query,
    )) as unknown as ScriptsOfErrorsAndTasksResponse[];

  saveVersion = async (saveData: SaveVersionRequest): Promise<any[]> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/SaveVersion`,
      saveData,
    )) as unknown as any[];

  getVersionList = async (): Promise<VersionListResponse[]> =>
    (await projectManagementAndCRMCore.api.request(
      'get',
      `${this.endPoint}/GetVersionList`,
      {},
    )) as unknown as VersionListResponse[];

  updateVersion = async (
    updateData: UpdateVersionRequest,
  ): Promise<VersionListResponse[]> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/UpdateVersion`,
      updateData,
    )) as unknown as VersionListResponse[];

  deleteVersion = async (Oid: number): Promise<VersionListResponse[]> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/DeleteVersion`,
      { Oid },
    )) as unknown as VersionListResponse[];

  getTaskAndErrorScriptsByCriteria = async (
    query: ScriptsOfErrorsAndTasksRequest,
  ): Promise<ScriptsOfErrorsAndTasksResponse[]> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/GetTaskAndErrorScriptsByCriteria`,
      query,
    )) as unknown as ScriptsOfErrorsAndTasksResponse[];

  getProjectMenuList = async (projectOid: number): Promise<any[]> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/GetProjectMenuList`,
      { projectOid },
    )) as unknown as any[];

  saveProjectMenu = async (saveData: SaveProjectMenuRequest): Promise<any[]> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/SaveProjectMenu`,
      saveData,
    )) as unknown as any[];

  updateProjectMenu = async (
    saveData: UpdateProjectMenuRequest,
  ): Promise<any[]> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/UpdateProjectMenu`,
      saveData,
    )) as unknown as any[];

  sendMenuRequestToCompany = async (
    saveData: SaveProjectMenuRequest,
  ): Promise<any[]> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/SendMenuRequestToCompany`,
      saveData,
    )) as unknown as any[];

  createProjectMenuOnCompany = async (
    url: string,
    menu: SaveProjectMenuRequest,
    userName: string,
  ): Promise<any[]> =>
    (await axios.post(`${url}/api/CreateMenu`, {
      userName,
      menu,
    })) as unknown as any[];
}
