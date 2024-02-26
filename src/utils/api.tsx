import { SERVER_URL } from '../constants/server.ts';
import { APIMethod } from '../types';

const callApi = async (directory: string, params?: APIMethod) => {

  const betterParams = {
    method: params?.method || 'get',
  }
  if (betterParams?.method === 'get') {
    return await (await fetch(`${SERVER_URL}${directory}`, betterParams)).json();
  } else if (betterParams?.method === 'delete') {
    return await (await fetch(`${SERVER_URL}${directory}`, betterParams)).json();
  }
};

export {
  callApi,
}