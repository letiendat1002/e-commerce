import axiosClient4 from '../API/axiosCustom';

const categoryApi = {
  async getAllCategory() {
    const categoryListFilter = await axiosClient4.get(`https://5i5iavxp88.execute-api.ap-southeast-1.amazonaws.com/prod/api/v1/categories`);
    // console.log(categoryListFilter)
    return categoryListFilter;
  },
};

export default categoryApi;
