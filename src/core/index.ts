import Api from './Api'
import PersistentStore from './PersistentStore'
import Services from './Services'

class ProjectManagementAndCRMCore {
  api: Api

  persistentStore: PersistentStore

  services: Services

  constructor() {
    this.api = new Api()
    this.persistentStore = new PersistentStore()
    this.services = new Services()
  }
}

const projectManagementAndCRMCore = new ProjectManagementAndCRMCore()
export default projectManagementAndCRMCore
