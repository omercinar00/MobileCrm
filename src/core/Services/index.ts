import AuthService from './AuthService'
import ErrorService from './ErrorService'
import FileService from './FileService'
import ParameterService from './ParameterService'
import QueryExemptionService from './QueryExemptionService'
import TaskService from './TaskService'
import TrainingSuportService from './TrainingSuportService'
import TaskAndErrorService from './TaskAndErrorService'
import VersionService from './VersionService'
import CrmService from './CrmService'
import FirebaseService from './FirebaseService'

export default class Services {
  authServices: AuthService
  parameterServices: ParameterService
  fileService: FileService
  fireBaseService: FirebaseService
  taskService: TaskService
  queryExemptionService: QueryExemptionService
  errorService: ErrorService
  trainingSuportService: TrainingSuportService
  taskAndErrorService: TaskAndErrorService
  versionService: VersionService
  crmService: CrmService

  constructor() {
    this.authServices = new AuthService()
    this.parameterServices = new ParameterService()
    this.fileService = new FileService()
    this.fireBaseService = new FirebaseService()
    this.taskService = new TaskService()
    this.queryExemptionService = new QueryExemptionService()
    this.errorService = new ErrorService()
    this.trainingSuportService = new TrainingSuportService()
    this.taskAndErrorService = new TaskAndErrorService()
    this.versionService = new VersionService()
    this.crmService = new CrmService()
  }
}
