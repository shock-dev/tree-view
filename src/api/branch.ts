import axios from '../core/axios';
import { CreateIBranch, IBranch } from '../types/branch';

class BranchApi {
  all = async () => {
    const { data } = await axios.get('/brands');
    return data;
  }

  create = async (formData: CreateIBranch) => {
    const { data } = await axios.post('/brands', formData);
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
