import projectManagementAndCRMCore from '../../index';
import type { ErrorListResponse } from '../../Models/ErrorInterfaces';

export default class CrmService {
  endPoint: string;

  constructor() {
    this.endPoint = '/Crm';
  }

  getErrorListComingFromCompany = async (): Promise<ErrorListResponse[]> =>
    (await projectManagementAndCRMCore.api.request(
      'get',
      `${this.endPoint}/GetErrorListComingFromCompany`,
      {},
    )) as unknown as ErrorListResponse[];
}
