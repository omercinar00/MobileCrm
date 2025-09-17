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