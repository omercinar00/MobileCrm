export interface TrainingProgramDetailList {
  PersonnelOid: number
  ModuleOid: number
  Explanation: string
}

export interface SaveTrainingProgramRequest {
  CompanyOid: number
  StartDate: number
  FinishDate: number
  LicencePlate: string
  GeneralExplanation: string
  IsTrainingFinished: boolean
  IsDelete: boolean
  TrainingProgramDetailList: TrainingProgramDetailList[]
}

export interface UpdateTrainingProgramRequest {
  Oid: number
  CompanyOid: number
  StartDate: number
  FinishDate: number
  LicencePlate: string
  GeneralExplanation: string
  IsTrainingFinished: boolean
  IsDelete: boolean
  TrainingProgramDetailList: TrainingProgramDetailList[]
}

export interface TrainingProgramDetailListResponse {
  Oid: number
  TrainingProgramOid: number
  PersonnelOid: number
  ModuleOid: number
  Explanation: string
}

export interface TrainingProgramResponse {
  Oid: number
  CreatedDate: number
  LastUpdatedDate: number
  CompanyOid: number
  StartDate: number
  FinishDate: number
  LicencePlate: string
  GeneralExplanation: string
  IsTrainingFinished: boolean
  IsDelete: boolean
  TrainingProgramDetailList: TrainingProgramDetailListResponse[]
}
