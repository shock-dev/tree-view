import axios from '../core/axios';
import { IBranch } from '../types/branch';

class BranchApi {
  all = async () => {
    const { data } = await axios.get('/brands');
    return data;
  }

  update = async (id: string, formData: IBranch) => {
    const { data } = await axios.put(`/brand/${id}`, formData);
    return data;
  }

  delete = async (id: string) => {
    const { data } = await axios.delete(`/brand/${id}`);
    return data;
  }
}

export default new BranchApi();
