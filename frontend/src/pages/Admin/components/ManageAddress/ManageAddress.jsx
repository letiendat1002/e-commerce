import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';
import { useState, useEffect } from 'react';
import axios from 'axios';

const { Option } = Select;

const ManageAddress = (props) => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState('');
  const [setListDistricts, setSetListDistricts] = useState([]);
  const [ward, setWard] = useState([]);
  const [idDistricts, setIdDistricts] = useState('');

  const handleCallDistrict = (districts) => {
    axios
      .get(`https://provinces.open-api.vn/api/p/${districts}?depth=2`)
      .then((res) => {
        const { data } = res;
        if (data) {
          const { districts } = data;
          setSetListDistricts(districts);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCallWards = async (idDistricts) => {
    const res = await axios
      .get(`https://provinces.open-api.vn/api/d/${idDistricts}?depth=2`)
      .then((res) => {
        const {
          data: { wards },
        } = res;
        if (wards) {
          setWard(wards);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    handleCallDistrict(districts);
    handleCallWards(idDistricts);
  }, [districts, idDistricts]);

  useEffect(() => {
    axios
      .get('https://provinces.open-api.vn/api/p')
      .then((res) => {
        if (res) {
          const { data, status } = res;
          if (status === 200) {
            setProvinces(data);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChangeProvinces = (valueDistricts) => {
    setDistricts(valueDistricts);
  };
  const handleChange = (value) => {
    setIdDistricts(value);
  };

 

  const handleChangeWard = (valueWard) => {
    console.log(valueWard);
  };

  const handleSelectProvince = (value) => {
    console.log(value)
  }

  return (
    <div>
      <Select
        showSearch
        style={{ width: 200 }}
        placeholder='Select a option'
        optionFilterProp='children'
        onSelect={handleSelectProvince}
        onChange={handleChangeProvinces}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }>
        {provinces.map((province) => (
          <Option
            key={province.codename}
            value={province.code}>
            {province.name}
          </Option>
        ))}
      </Select>
      <Select
        showSearch
        style={{ width: 200 }}
        placeholder='Select a option'
        optionFilterProp='children'
        onChange={handleChange}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }>
        {setListDistricts?.map((district) => (
          <Option
            key={district.codename}
            value={district.code}>
            {district.name}
          </Option>
        ))}
      </Select>

      <Select
        showSearch
        style={{ width: 200 }}
        placeholder='Select a option'
        optionFilterProp='children'
        onChange={handleChangeWard}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }>
        {ward.map((ward) => (
          <Option
            key={ward.code}
            value={ward.codename}>
            {ward.name}
          </Option>
        ))}
      </Select>
    </div>
  );
};

ManageAddress.propTypes = {};

export default ManageAddress;
