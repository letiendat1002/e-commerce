import axiosClient4 from '../API/axiosCustom';

const categoryApi = {
  async getAllCategory() {
    const categoryListFilter = await axiosClient4.get(`http://localhost:8080/api/v1/categories`);
    // console.log(categoryListFilter)
    return categoryListFilter;
  },
};

export default categoryApi;
