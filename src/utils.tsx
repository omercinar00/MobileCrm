export function convertIntToDateTime(value: string | number): string {
  if (!value) return 'Bulunmadı';
  const str = value.toString();
  if (str.length < 8) return 'Bulunmadı'; // minimum YYYYMMDD

  const year = parseInt(str.substring(0, 4), 10);
  const month = parseInt(str.substring(4, 6), 10) - 1; // 0 tabanlı
  const day = parseInt(str.substring(6, 8), 10);
  let hours = 0,
    minutes = 0;

  if (str.length >= 10) hours = parseInt(str.substring(8, 10), 10);
  if (str.length >= 12) minutes = parseInt(str.substring(10, 12), 10);

  const date = new Date(year, month, day, hours, minutes);
  return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1)
    .toString()
    .padStart(2, '0')}.${date.getFullYear()} ${date
    .getHours()
    .toString()
    .padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
}

export function convertPriorityCodeToName(
  priorityCode: number,
  priorityList: any[],
) {
  if (!priorityList) return '';
  const p = priorityList.find(item => item.ParameterCode === priorityCode);
  return p ? p.ParameterName : '';
}

export function convertTaskStatusCodeToName(
  statusCode: number,
  statusList: any[],
) {
  if (!statusList) return '';
  const s = statusList.find(item => item.ParameterCode === statusCode);
  return s ? s.ParameterName : '';
}

export function getPriorityColor(
  priorityCode: string,
  isClosed: boolean = false,
): string {
  if (isClosed) return '#d3d3d3'; // kapalıysa gri

  switch (priorityCode) {
    case '1': // Çok Yüksek
      return '#73D13D';
    case '2': // Yüksek
      return '#FFEC3D';
    case '3': // Orta
      return '#FFA940';
    case '4': // Düşük
      return '#FF4D4F';
    default:
      return '#E0E0E0'; // bilinmeyen veya boş
  }
}

// utils.ts veya bu dosyanın üstüne ekle
export const priorityList = [
  { ParameterCode: '1', ParameterName: 'Düşük' },
  { ParameterCode: '2', ParameterName: 'Orta' },
  { ParameterCode: '3', ParameterName: 'Yüksek' },
];

export const formatDate = (value: string) => {
  if (!value || value.length !== 8) return '';
  const year = value.substr(0, 4);
  const month = value.substr(4, 2);
  const day = value.substr(6, 2);
  return `${day}.${month}.${year}`; // GG.AA.YYYY formatı
};

export const convertDateToNumber = (dateStr: string): number => {
  const [day, month, year] = dateStr.split('.');
  return Number(`${year}${month}${day}`);
};

export function convertUserOidToName(userOid: number, userList: any) {
  let userName = 'Bulunamadı';
  if (userList && userList.length > 0) {
    const userInfo = userList.find((item: any) => item.Oid === userOid);
    if (userInfo) return (userName = `${userInfo.Name} ${userInfo.SurName}`);
    else return userName;
  } else {
    return 'Bulunamadı';
  }
}

export function convertInstitutionOidToName(
  institutionOid: number,
  institutionList: any,
) {
  let institutionName = 'Bulunamadı';
  if (institutionList && institutionList.length > 0) {
    const projectInfo = institutionList.find(
      (item: any) => item.Oid === institutionOid,
    );
    if (projectInfo) return (institutionName = projectInfo.CompanyName);
    else return institutionName;
  } else {
    return 'Bulunamadı';
  }
}

export function convertProjectOidToName(projectOid: number, projectList: any) {
  let projectName = '';
  if (projectList) {
    const projectInfo = projectList.find(
      (item: any) => item.Oid === projectOid,
    );
    if (projectInfo) return (projectName = projectInfo.ProjectName);
    else return projectName;
  } else {
    return '';
  }
}

export function convertModuleOidToName(moduleOid: number, moduleList: any) {
  let moduleName = 'Bulunamadı';
  if (moduleList && moduleList.length > 0) {
    const projectInfo = moduleList.find((item: any) => item.Oid === moduleOid);
    if (projectInfo) return (moduleName = projectInfo.ModuleName);
    else return moduleName;
  } else {
    return 'Bulunamadı';
  }
}

export function formatDate2(date: number) {
  const dateString = date.toString();
  if (!dateString || dateString.length !== 14) return dateString;

  const year = dateString.slice(0, 4);
  const month = dateString.slice(4, 6);
  const day = dateString.slice(6, 8);
  const hour = dateString.slice(8, 10);
  const minute = dateString.slice(10, 12);

  const monthNames = [
    'Ocak',
    'Şubat',
    'Mart',
    'Nisan',
    'Mayıs',
    'Haziran',
    'Temmuz',
    'Ağustos',
    'Eylül',
    'Ekim',
    'Kasım',
    'Aralık',
  ];

  const monthName = monthNames[parseInt(month, 10) - 1];

  return `${day} ${monthName} ${year}, ${hour}:${minute}`;
}
