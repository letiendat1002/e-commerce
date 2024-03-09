import axiosClient4 from '../API/axiosCustom';

const categoryApi = {
  async getAllCategory() {
    const categoryListFilter = await axiosClient4.get(`https://linkking.onrender.com/api/v1/categories`);
    // console.log(categoryListFilter)
    return categoryListFilter;
  },
};

export default categoryApi;
