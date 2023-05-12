import React, { useState } from 'react';
import './style.css';
import { Space, Table } from 'antd';

function AlertCard(props) {
  const AlertData = props.data
  return (
    <Space className="alert-card-container">
      <div className="card-header" style={{color: "#f8540e", paddingBottom: "2rem!important", fontWeight: "bolder"}}><h3 style={{padding: "0 0 2rem 0"}}>KHÁCH HÀNG TIỀM NĂNG</h3></div>
      <div className="card-info" style={{marginTop: "1rem!important"}}>
        <WarningTable data={AlertData} />   
      </div>
    </Space>
  );
}

export default AlertCard;

function WarningTable({ data }) {
  return (
    <div className="warning-data-table-container" style={{marginTop : "1rem"}}>
      <div className="data-table-header" style={{color: "#ffffff", borderBottom: "1px solid #ffffff"}}>
            <h5>Thời gian</h5>
            <h5>Họ Tên</h5>
            <h5>Đơn Hàng</h5>
            <h5>Vị trí</h5>
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
      <div className="col container-id-col" style={{fontSize :"16px", color: "#000000", fontWeight: "550", textAlign: "center"}}>{item.fullName}</div>
      <div className="col container-id-col" style={{fontSize :"16px", color: "#000000", fontWeight: "550", textAlign: "center"}}><p style={{marginLeft :"2rem ", textAlign: "center"}}>{item.count}</p></div>
      <div className="col content-col" style={{fontSize :"16px", color: "#000000", fontWeight: "550", textAlign: "center" }}><p style={{marginLeft :"5rem "}}>{item.step}</p></div>
    </div>
  );
}