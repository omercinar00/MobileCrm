import projectManagementAndCRMCore from '../../index';
import type {
  SaveTrainingProgramRequest,
  TrainingProgramDetailListResponse,
  TrainingProgramResponse,
  UpdateTrainingProgramRequest,
} from '../../Models/TrainingSuportInterfaces';

export default class TrainingSuportService {
  endPoint: string;

  constructor() {
    this.endPoint = '/TrainingSuport';
  }

  getTrainingProgramList = async (): Promise<TrainingProgramResponse[]> =>
    (await projectManagementAndCRMCore.api.request(
      'get',
      `${this.endPoint}/GetTrainingProgramList`,
      {},
    )) as unknown as TrainingProgramResponse[];

  saveTrainingProgram = async (
    savedData: SaveTrainingProgramRequest,
  ): Promise<TrainingProgramResponse[]> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/SaveTrainingProgram`,
      savedData,
    )) as unknown as TrainingProgramResponse[];

  updateTrainingProgram = async (
    updateData: UpdateTrainingProgramRequest,
  ): Promise<TrainingProgramResponse[]> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/UpdateTrainingProgram`,
      updateData,
    )) as unknown as TrainingProgramResponse[];

  deleteTrainingProgramDetail = async (
    oid: number,
  ): Promise<TrainingProgramDetailListResponse[]> =>
    (await projectManagementAndCRMCore.api.request(
      'post',
      `${this.endPoint}/DeleteTrainingProgramDetail`,
      { oid },
    )) as unknown as TrainingProgramDetailListResponse[];
}
