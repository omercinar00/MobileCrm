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
import FilterModal from '../components/FilterModal';
import {
  convertIntToDateTime,
  getPriorityColor,
  convertPriorityCodeToName,
  convertUserOidToName,
} from '../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TaskAndErrorListByCriteriaRequest } from '../core/Models/TaskInterfaces';
import {
  CompanyListResponse,
  GetGeneralParameterListResponse,
  GetProjectListResponse,
  ModuleResponse,
} from '../core/Models/ParameterInterfaces';
import { UserResponse } from '../core/Models/UserInterfaces';
import { GeneralParameters } from '../constants/parameters';

// Sabit listeler
const priorityList2 = [
  { ParameterCode: '1', ParameterName: 'Düşük' },
  { ParameterCode: '2', ParameterName: 'Normal' },
  { ParameterCode: '3', ParameterName: 'Yüksek' },
  { ParameterCode: '4', ParameterName: 'Kritik' },
];

const statusList = [
  { ParameterCode: 1, ParameterName: 'Aktif' },
  { ParameterCode: 2, ParameterName: 'Kapalı' },
];

export default function RequestsScreen({ navigation }: any) {
  const { theme } = useTheme();
  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);

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
  const [userList, setUserList] = useState<any[]>([]);

  // Filtre state
  const [filterType, setFilterType] = useState<string | null>(null); // '1' = Hata, '2' = Talep
  const [filterStatus, setFilterStatus] = useState<number | null>(null); // 1 = Aktif, 2 = Kapalı
  const [filterPriority, setFilterPriority] = useState<string | null>(null); // '1', '2', '3'

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const requestStatus =
        await projectManagementAndCRMCore.services.parameterServices.getGeneralParameterList(
          GeneralParameters.REQUEST_STATUS,
        );
      const priority =
        await projectManagementAndCRMCore.services.parameterServices.getGeneralParameterList(
          GeneralParameters.PRIORITY,
        );
      const companyList =
        await projectManagementAndCRMCore.services.parameterServices.getCompanyList();
      const projects =
        await projectManagementAndCRMCore.services.parameterServices.getProjectList();
      const users =
        await projectManagementAndCRMCore.services.authServices.getUserList();
      const allModules =
        await projectManagementAndCRMCore.services.parameterServices.getAllModuleList();
      const queryRequest: TaskAndErrorListByCriteriaRequest = {};
      const storedUserDetail = await AsyncStorage.getItem('userDetail');
      if (storedUserDetail) {
        const parsedDetail = JSON.parse(storedUserDetail);
        queryRequest.UserOid = parsedDetail.Oid;
        let list =
          await projectManagementAndCRMCore.services.taskAndErrorService.getUserTaskAndErrorListByCriteria(
            queryRequest,
          );
        list = list.sort((a: any, b: any) => b.No - a.No);
        setData(list);
        setFilteredData(list);

        // State olarak set et
        setPriorityList(priority);
        setRequestStatusList(requestStatus);
        setInstitutionList(companyList);
        setProjectList(projects);
        setUserList(users);
        setAllModuleList(allModules);
      }
    } catch (error) {
      Alert.alert('Hata', (error as string) || 'Veri çekilemedi');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  const applyFilters = () => {
    let filtered = data;
    if (filterType)
      filtered = filtered.filter(item => item.Type === filterType);
    if (filterStatus)
      filtered = filtered.filter(item => item.StatusCode === filterStatus);
    if (filterPriority)
      filtered = filtered.filter(item => item.Priority === filterPriority);
    setFilteredData(filtered);
    setFilterModalVisible(false);
  };

  const onDetailButtonClicked = async (rowData: any) => {
    if (!rowData) return;

    setLoading(true);
    try {
      let detailData: any;
      let screenName: string = '';
      let allPageServices: any = {
        priorityList: priorityList,
        errorStatus: requestStatusList,
        projectList: projectList,
        institutionList: institutionList,
        moduleList: allModuleList,
        userList: userList,
      };

      if (rowData.Type === '2') {
        // TASK
        detailData =
          await projectManagementAndCRMCore.services.taskService.getTaskInfo(
            rowData.Oid,
          );
        screenName = 'RequestDetail';
      } else if (rowData.Type === '1') {
        // ERROR
        detailData =
          await projectManagementAndCRMCore.services.errorService.getErrorInfo(
            rowData.Oid,
          );
        screenName = 'ErrorDetail';
      }

      // Navigation
      navigation.navigate(screenName, {
        detailData: detailData,
        allPageServices: allPageServices,
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Alert.alert('Hata', (error as string) || 'Veri çekilemedi');
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
        <Text style={[styles.title, { color: theme.text }]}>{item.Title}</Text>
        <Text style={[styles.subtitle, { color: theme.text }]}>
          {convertIntToDateTime(item.CreatedDate)}
        </Text>
        <Text style={[styles.subtitle, { color: theme.text }]}>
          Oluşturan: {convertUserOidToName(item.CreatedUserOid, userList)}
        </Text>
        <Text style={[styles.subtitle, { color: theme.text }]}>
          Atayan: {convertUserOidToName(item.SenderUserOid, userList)}
        </Text>
      </View>
      <View
        style={{
          backgroundColor: getPriorityColor(item.Priority),
          width: 70, // Sabit genişlik
          height: 30, // Sabit yükseklik
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

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {loading && <ActivityIndicator size="large" color={theme.primary} />}

      <TouchableOpacity
        style={styles.filterButton}
        onPress={() => setFilterModalVisible(true)}
      >
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Filtrele</Text>
      </TouchableOpacity>

      <FlatList
        data={filteredData}
        keyExtractor={item => item.Oid.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 100 }}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />

      {/* Filtre Modal */}
      <FilterModal
        visible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        filterType={filterType}
        setFilterType={setFilterType}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        filterPriority={filterPriority}
        setFilterPriority={setFilterPriority}
        applyFilters={applyFilters}
        priorityList={priorityList2}
        statusList={statusList}
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
  filterButton: {
    backgroundColor: '#5898F1',
    padding: 10,
    borderRadius: 6,
    marginBottom: 10,
    alignItems: 'center',
  },
});
