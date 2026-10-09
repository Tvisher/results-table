import axios from "axios";

export const getFirstStepData = () => {
  return axios.post(`/ajax/stap1stat.php`);
};

export const getExel = (payload) => {
  return axios.post(`/ajax/excel.php`, payload);
};
