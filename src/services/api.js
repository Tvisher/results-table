import axios from "axios";

export const getFirstStepData = () => {
  return axios.post(`/ajax/stap1stat.php`);
};
