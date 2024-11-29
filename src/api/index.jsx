import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});


const request = async (method, route, data = null) => {
  try {
    const response = await api({
      method: method,
      url: route,
      data: data,
    });
    return response.data;
  } catch (error) {
    console.error('Erro na requisição API:', error);
    throw error; 
  }
};


export const get = async (route) => {
  return await request('GET', route);
};

export const post = async (route, data) => {
  return await request('POST', route, data);
};

export const put = async (route, data) => {
  return await request('PUT', route, data);
};

export const del = async (route) => {
  return await request('DELETE', route);
};
