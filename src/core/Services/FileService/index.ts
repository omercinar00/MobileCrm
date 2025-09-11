import projectManagementAndCRMCore from '../../index';
import type {
  GetFileByPathResponse,
  UploadFileRequest,
} from '../../Models/FileInterfaces';

export default class FileService {
  endPoint: string;

  constructor() {
    this.endPoint = '/File';
  }

  uploadFile = async (savedData: UploadFileRequest): Promise<any[]> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/UploadFile`,
      savedData,
    )) as unknown as any[];

  getFileByOid = async (oid: number): Promise<any[]> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/GetFileByOid`,
      { oid },
    )) as unknown as any[];

  getFileByPath = async (FileUrl: string): Promise<GetFileByPathResponse> => {
    try {
      const response = await projectManagementAndCRMCore.api.request(
        'post',
        `${this.endPoint}/GetFileByPath`,
        { FileUrl },
      );
      return response as unknown as GetFileByPathResponse;
    } catch (error) {
      console.error('Error fetching file by path:', error);
      return null as unknown as GetFileByPathResponse;
    }
  };
}
