import './style.css';

import React, { useState } from 'react';
import { Skeleton, Space, Table } from 'antd';

import { useTranslation } from 'react-i18next';

function AlertCard(props) {
  const AlertData = props.data
  const { t } = useTranslation();
  return (
    <Space className="alert-card-container">
      <div className="card-header" style={{color: "#f8540e", paddingBottom: "1rem!important", fontWeight: "bolder"}}><h4 style={{padding: "-1rem 0 1rem 0"}}>{t('dashboard.item_title8')}</h4></div>
      <div className="card-info" style={{marginTop: "1rem!important"}}>
        {(AlertData) ? (<WarningTable data={AlertData} />) : (<Skeleton active paragraph={{ rows: 5 }}/>)}
      </div>
    </Space>
  );
}

export default AlertCard;

function WarningTable({ data }) {
  const { t } = useTranslation();
  return (
    <div className="warning-data-table-container" style={{marginTop : "0rem"}}>
      <div className="data-table-header" style={{color: "#ffffff", borderBottom: "1px solid #ffffff"}}>
            <h5>{t('dashboard.item_title9')}</h5>
            <h5>{t('dashboard.item_title10')}</h5>
            <h5>{t('dashboard.item_title11')}</h5>
            <h5>{t('dashboard.item_title12')}</h5>
      </div>

      <div className="data-table-body">
        {data.map((item, index) => {
          return <WarningTableRow key={index} item={item} />;
        })}
      </div>
    </div>
  );
}

function WarningTableRow({ item }) {
  return (
    <div className="data-table-row">
      <div className="col date-time-col">
        <div className="date" style={{fontSize :"16px", color: "#000000", fontWeight: "550"}}>{item.date}</div>
        <div className="time" style={{fontSize :"16px", color: "#000000", fontWeight: "550"}}>{item.time}</div>
      </div>
      <div className="col container-id-col" style={{fontSize :"16px", color: "#000000", fontWeight: "550", textAlign: "left", marginLeft: "-0.5rem"}}>{item.fullName}</div>
      <div className="col container-id-col" style={{fontSize :"16px", color: "#000000", fontWeight: "550", textAlign: "center", marginLeft: '2.8rem'}}><p style={{marginLeft :"2rem ", textAlign: "center"}}>{item.count}</p></div>
      <div className="col content-col" style={{fontSize :"16px", color: "#000000", fontWeight: "550", textAlign: "center" }}><p style={{marginLeft :"0rem "}}>{item.step}</p></div>
    </div>
  );
}