import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import projectManagementAndCRMCore from '../core';
import SearchablePicker from '../components/SearchablePicker';
import {
  convertIntToDateTime,
  getPriorityColor,
  convertPriorityCodeToName,
  convertUserOidToName,
} from '../utils';
import { TaskAndErrorListByCriteriaRequest } from '../core/Models/TaskInterfaces';
import { UserResponse } from '../core/Models/UserInterfaces';
import {
  CompanyListResponse,
  GetGeneralParameterListResponse,
  GetProjectListResponse,
  ModuleResponse,
} from '../core/Models/ParameterInterfaces';
import { GeneralParameters } from '../constants/parameters';

// Sabit öncelik listesi
const priorityList2 = [
  { ParameterCode: '1', ParameterName: 'Düşük' },
  { ParameterCode: '2', ParameterName: 'Normal' },
  { ParameterCode: '3', ParameterName: 'Yüksek' },
  { ParameterCode: '4', ParameterName: 'Kritik' },
];

export default function UserRequestsScreen({ navigation }: any) {
  const { theme } = useTheme();
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [selectedUserOid, setSelectedUserOid] = useState<number | null>(null);
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Tüm servis listeleri
  const [priorityList, setPriorityList] = useState<
    GetGeneralParameterListResponse[] | null
  >(null);
  const [requestStatusList, setRequestStatusList] = useState<
    GetGeneralParameterListResponse[] | null
  >(null);
  const [projectList, setProjectList] = useState<
    GetProjectListResponse[] | null
  >(null);
  const [institutionList, setInstitutionList] = useState<
    CompanyListResponse[] | null
  >(null);
  const [allModuleList, setAllModuleList] = useState<ModuleResponse[] | null>(
    null,
  );
  const [userList, setUserList] = useState<UserResponse[]>([]);

  useEffect(() => {
    fetchUsersAndLists();
  }, []);

  useEffect(() => {
    if (selectedUserOid) fetchRequests(selectedUserOid);
    else setRequests([]);
  }, [selectedUserOid]);

  const fetchUsersAndLists = async () => {
    try {
      setLoading(true);
      const users_ =
        await projectManagementAndCRMCore.services.authServices.getUserList();
      const priorities =
        await projectManagementAndCRMCore.services.parameterServices.getGeneralParameterList(
          GeneralParameters.PRIORITY,
        );
      const requestStatuses =
        await projectManagementAndCRMCore.services.parameterServices.getGeneralParameterList(
          GeneralParameters.REQUEST_STATUS,
        );
      const companies =
        await projectManagementAndCRMCore.services.parameterServices.getCompanyList();
      const projects =
        await projectManagementAndCRMCore.services.parameterServices.getProjectList();
      const modules =
        await projectManagementAndCRMCore.services.parameterServices.getAllModuleList();

      setUsers(users_);
      setUserList(users_);
      setPriorityList(priorities);
      setRequestStatusList(requestStatuses);
      setInstitutionList(companies);
      setProjectList(projects);
      setAllModuleList(modules);
    } catch (error) {
      Alert.alert('Hata', 'Veriler alınamadı.');
    } finally {
      setLoading(false);
    }
  };

  const fetchRequests = async (userOid: number) => {
    try {
      setLoading(true);
      const query: TaskAndErrorListByCriteriaRequest = { UserOid: userOid };
      let list =
        await projectManagementAndCRMCore.services.taskAndErrorService.getUserTaskAndErrorListByCriteria(
          query,
        );
      list = list.sort((a: any, b: any) => b.No - a.No);
      setRequests(list);
    } catch (error) {
      Alert.alert('Hata', 'Kullanıcıya ait talepler alınamadı.');
    } finally {
      setLoading(false);
    }
  };

  const onDetailButtonClicked = async (item: any) => {
    try {
      setLoading(true);
      let detailData: any;
      let screenName = '';

      const allPageServices = {
        priorityList,
        errorStatus: requestStatusList,
        projectList,
        institutionList,
        moduleList: allModuleList,
        userList,
      };

      if (item.Type === '2') {
        detailData =
          await projectManagementAndCRMCore.services.taskService.getTaskInfo(
            item.Oid,
          );
        screenName = 'RequestDetail';
      } else if (item.Type === '1') {
        detailData =
          await projectManagementAndCRMCore.services.errorService.getErrorInfo(
            item.Oid,
          );
        screenName = 'ErrorDetail';
      }

      navigation.navigate(screenName, { detailData, allPageServices });
    } catch (error) {
      Alert.alert('Hata', 'Detay alınamadı.');
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={[styles.itemContainer, { backgroundColor: theme.cardBackground }]}
      onPress={() => onDetailButtonClicked(item)}
    >
      <View style={{ flex: 1 }}>
        <Text style={[styles.title, { color: theme.text }]}>
          {item.Type === '1' ? 'HATA' : 'TALEP'} - {item.No}
        </Text>
        <Text style={[styles.subtitle, { color: theme.text }]}>
          {item.Title}
        </Text>
        <Text style={[styles.subtitle, { color: theme.text }]}>
          Oluşturan: {convertUserOidToName(item.CreatedUserOid, userList)}
        </Text>
      </View>
      <View
        style={{
          backgroundColor: getPriorityColor(item.Priority),
          width: 70,
          height: 30,
          borderRadius: 6,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={{ color: '#fff' }}>
          {convertPriorityCodeToName(item.Priority, priorityList2)}
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.background,
          },
        ]}
      >
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <SearchablePicker
        items={users.map(u => ({
          label: `${u.Name} ${u.SurName}`,
          value: u.Oid,
        }))}
        selectedValue={selectedUserOid}
        onValueChange={setSelectedUserOid}
        placeholder="Kullanıcı Seçiniz..."
      />

      <FlatList
        data={requests}
        keyExtractor={item => item.Oid.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  itemContainer: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
    elevation: 2,
  },
  title: { fontSize: 16, fontWeight: 'bold' },
  subtitle: { fontSize: 14 },
});
