import axios from "../../../Common/InterCeptors";
const headers = {
  'Content-Type': 'application/json'
}

export const employeeList =(creds)=>{
  return axios.post('http://localhost:8082/employee/actlist',creds,{ headers });
};
export const employeeInActList =(creds)=>{
  return axios.post('http://localhost:8082/employee/inActlist',creds,{ headers });
};
export const updateToActvedEmp =(creds)=>{
  return axios.post('http://localhost:8082/employee/actEmp',creds,{ headers });
};
export const createEmp =(creds)=>{
  return axios.post('http://localhost:8082/employee/create',creds,{ headers });
};
export const updateEmp =(creds)=>{
  return axios.post('http://localhost:8082/employee/update',creds,{ headers });
};
export const inActiveEmp =(creds)=>{
  return axios.post('http://localhost:8082/employee/delete',creds,{ headers });
};