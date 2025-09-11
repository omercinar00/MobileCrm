/* eslint-disable node/prefer-global/process */
import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import axios from 'axios';

import projectManagementAndCRMCore from '..';
import PersistentStore from '../PersistentStore';
import {
  ConflictError,
  ForbiddenError,
  NotFoundError,
  ServerError,
  UnauthenticatedError,
} from './Errors';

type Method = 'get' | 'post' | 'put' | 'delete';

export default class Api {
  axios: AxiosInstance;

  constructor() {
    this.axios = axios.create({
      baseURL:
        process.env.NODE_ENV === 'development'
          ? 'https://bys.belsoft.com.tr:1005/Service'
          : `https://bys.belsoft.com.tr:1005//Service`,
      // baseURL: process.env.NODE_ENV === 'development' ? 'https://localhost:44395/' : `${window.location.origin}/Service`,
      // baseURL: '/Service',
      headers: {
        'Content-type': 'application/json',
      },
    });
    this.init();
  }

  init() {
    const persistentStore = new PersistentStore();
    const jwtToken = persistentStore.getUser()?.jwtToken;
    if (jwtToken) {
      this.axios.interceptors.request.use(
        (config: InternalAxiosRequestConfig) => {
          config.headers.Authorization = jwtToken;
          return config;
        },
      );
    }
    this.axios.interceptors.response.use(
      this.onSuccess.bind(this),
      this.onFailed.bind(this),
    );
  }

  onSuccess(response: AxiosResponse): AxiosResponse {
    if (
      typeof response.data !== 'string' &&
      (response.data || response.data === false)
    )
      return response.data;

    throw new ServerError();
  }

  onFailed(error: AxiosError): Error {
    switch (error.response?.status) {
      case 401: {
        throw new UnauthenticatedError();
      }
      case 403: {
        throw new ForbiddenError();
      }
      case 404: {
        throw new NotFoundError();
      }
      case 409: {
        throw new ConflictError();
      }
      default: {
        throw new ServerError(error.response?.data as string);
      }
    }
  }

  async request(
    method: Method = 'get',
    endPoint: string,
    data: any,
    config?: AxiosRequestConfig,
    cache?: boolean,
    key?: string,
  ) {
    let response = null;

    data = { ...data };

    switch (method) {
      case 'get':
        for (const [key, value] of Object.entries(data)) {
          endPoint =
            value === ''
              ? endPoint
              : // eslint-disable-next-line unicorn/prefer-includes
              endPoint.indexOf('?') > -1
              ? `${endPoint}&${key}=${value}`
              : `${endPoint}?${key}=${value}`;
        }
        response = await this.axios.get(endPoint, config);
        break;
      case 'post':
        response = await this.axios.post(endPoint, data, config);
        break;
      case 'put':
        response = await this.axios.put(endPoint, data, config);
        break;
      case 'delete':
        response = await this.axios.delete(endPoint, config);
        break;
      default:
        break;
    }
    if (cache && key && response)
      projectManagementAndCRMCore.persistentStore.setItem(key, response);

    return response;
  }
}
