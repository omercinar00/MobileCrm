export const genderList = [
  { GenderName: 'Erkek', GenderCode: '1' },
  { GenderName: 'Kız', GenderCode: '2' },
  { GenderName: 'Bilinmiyor', GenderCode: '3' },
]

export const GeneralParameters = {
  PRIORITY: '1',
  REQUEST_STATUS: '2',
  COMPANY_REQUEST_APPROVE_STATUS: '3',
  TITLE_TEAM_LEAD: 5,
  TITLE_MANAGEMENT: 1,
  TITLE_DEVELOPER: 2,
  TASK_ERROR_STATUS_COMPLETED: 4,
  TASK_ERROR_STATUS_PENDING: 1,

}

export const PriorityCodes = {
  HIHG: '3',
  CRITICAL: '4',
  TASK_IS_FINISHED: 4,
  TASK_REJECTED: '5',
}

export const Messages = {
  RequestDescription: 'Yeni Talep Açıldı',
  ErrorDescription: 'Yeni Hata',
}

export const OperationHistoryType = {
  QUERY_HISTORIES: '1',
  EXCEPTION_HISTORIES: '2',
  APPLICATION_HISTORIES: '3',
}

export const TaskErrorStatusCodes = {
  PROCESSED: 1,
}

export const ListTypes = {
  TASK: '2',
  ERROR: '1',
}

export const RowColorTypes = {
  CLOSED_TASK_OR_QUERY: '#7DCEA0', // YEŞİL
  HIGH_PRIORITY: '#F0B27A', // TURUNCU
  CRITICAL_PRIORITY: '#F1948A', // KIRMIZI
  COMPLETED_PRIORITY: '#AED6F1', // MAvi
  TRANSPARENT: 'transparent',
}

export const priorityColors = [
  { Name: 'Yüksek', Color: '#F0B27A' },
  { Name: 'Kritik', Color: '#EC7063' },
  { Name: 'Tamamlandı', Color: '#AED6F1' },
]

export const priorityColorsForAllList = [
  { Name: 'Yüksek', Color: '#F0B27A' },
  { Name: 'Kritik', Color: '#EC7063' },
  { Name: 'Tamamlandı', Color: '#AED6F1' },
  { Name: 'Kapalı', Color: '#7DCEA0' },
]

export const RoleTypeCodes = {
  ADMIN: 1,
  TRAINER: 2,
}
