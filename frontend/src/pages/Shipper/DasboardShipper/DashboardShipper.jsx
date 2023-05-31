import './Dashboard.scss';

import { AiFillCar, AiFillCheckCircle } from 'react-icons/ai';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Sector,
  XAxis,
  YAxis
} from 'recharts';
import { BsFillBagFill, BsWallet } from 'react-icons/bs';
import React, { useEffect, useState } from 'react';
import { getAllOrder, getOrderWorker } from '../../../Redux/slice/paymentSlice';
import { useDispatch, useSelector } from "react-redux";

import AlertCard from '../../Admin/components/AlertCard/AlertCard'
import CardOutLiner from '../../Admin/components/Card'
import { Link } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';
import { MdAttachMoney } from 'react-icons/md';
import { RxAvatar } from 'react-icons/rx';
import { Tooltip } from 'antd';
import convertToUSD from '../../../Helper/convertUSD';
import { getAllCategories } from '../../../Redux/slice/categorySlice';
import { getAllProducts } from '../../../Redux/slice/productSlice';
import { getOrderDetail } from '../../../Redux/slice/orderDetailSlice';
import { useTranslation } from 'react-i18next';

export const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    name,
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text
        x={cx}
        y={cy}
        dy={8}
        textAnchor='middle'
        fill={fill}>
        Sản phẩm
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill='none'
      />
      <circle
        cx={ex}
        cy={ey}
        r={2}
        fill={fill}
        stroke='none'
      />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill='#333'>{`${name} ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill='#999'>
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};


const DashboardShipper = (props) => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState({
    activeIndex: 0,
  });

  const onPieEnter = (_, index) => {
    setActiveIndex({
      activeIndex: index,
    });
  };

  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.current)
  const userID = user[0]?.userID
  useEffect(() => {
    dispatch(getAllProducts())
    dispatch(getAllCategories())
    dispatch(getOrderDetail())
    dispatch(getOrderWorker(userID))
  }, [])

  const product = useSelector(state => state.product.data) || []

  const laptop = product?.filter(item => item.categoryID === 1) || []
  const phone = product?.filter(item => item.categoryID === 2) || []
  const tablet = product?.filter(item => item.categoryID === 3) || []
  const pc = product?.filter(item => item.categoryID === 4) || []
  const orderDetail = useSelector(state => state.orderDetail.data.data) || []
  const revenue = orderDetail.reduce((a,b) => a + b.purchasePrice * b.quantity, 0)
  const revenueTotal = Math.round(revenue / 25000)
  const AllOrder = useSelector(state => state.order.data.data) || []
  const orderTotal = AllOrder.length
  const data = [
    {
      name: "Laptop",
      cx: 300,
      cy: 120,
      midAngle: 50,
      innerRadius: 40,
      outerRadius: 60,
      startAngle: 300,
      endAngle: 360,
      fill: "#8884d8",
      payload : "",
      percent: (laptop.length / product.length),
      value: (laptop.length),
    },
    {
      name: "Phone",
      cx: 300,
      cy: 120,
      midAngle: 160,
      innerRadius: 40,
      outerRadius: 60,
      startAngle: 0,
      endAngle: 120,
      fill: "#8884d8",
      payload: "",
      percent: (phone.length / product.length) ,
      value: (phone.length),
    }, 
    {
      name: "Tablet",
      cx: 300,
      cy: 120,
      midAngle: 220,
      innerRadius: 40,
      outerRadius: 60,
      startAngle: 180,
      endAngle: 90,
      fill: "#8884d8",
      payload: "",
      percent: (tablet.length / product.length),
      value: (tablet.length),
    },
    {
      name: "PC - Linh Kiện",
      cx: 300,
      cy: 120,
      midAngle: 320,
      innerRadius: 40,
      outerRadius: 60,
      startAngle: 210,
      endAngle: 300,
      fill: "#8884d8",
      payload: "",
      percent: (pc.length / product.length),
      value: (pc.length),
    }
  ]

  const [dateOrder, setDateOrder] = useState([]);
  const [monthOrder, setMonthOrder] = useState([]);
  const [quyOrder, setQuyOrder] = useState([])

  const [sort, setSort] = useState('nam')
  let [quy, setQuy] = useState('01')
  let [month, setMonth] = useState(1)

  const orderForMonth = () => {
    const dates = [];
  
    for (let i = 0; i < AllOrder.length; i++) {
      const date = AllOrder[i].dateOrder?.split('-')[AllOrder[i].dateOrder?.split('-').length - 2];
      
      if (!dates.some(d => d.date === date)) {
        const count = AllOrder?.filter(o => o.dateOrder?.split('-')[o.dateOrder?.split('-').length - 2] == date).length;
        dates.push({ date, count });
      }
    }
  
    setMonthOrder(dates);
  } 


  const ordersForQuarter = () => {
    const quarters = [];
    
    for (let i = 0; i < AllOrder.length; i++) {
      const orderDate = new Date(AllOrder[i].dateOrder);
      const quarter = Math.floor((orderDate.getMonth() + 3) / 3);
    
      if (!quarters.some(q => q.quarter === quarter)) {
        const count = AllOrder?.filter(o => {
          const oDate = new Date(o.dateOrder);
          const oQuarter = Math.floor((oDate.getMonth() + 3) / 3);
          return oQuarter === quarter;
        }).length;
        
        quarters.push({ quarter, count });
      }
    }
    
    setQuyOrder(quarters);
  }

  const orderDateSame = () => {
  const ordersByDate = {};

  for (let i = 0; i < AllOrder.length; i++) {
    const orderDate = new Date(AllOrder[i].dateOrder);
    
    if (orderDate.getMonth() === month - 1) {
      const date = orderDate.getDate();
      const orderId = AllOrder[i].orderId;
      const orderValue = AllOrder[i].orderValue;
      
      if (!ordersByDate[date]) {
        ordersByDate[date] = { orderCount: 1, orderValue: orderValue };
      } else {
        ordersByDate[date].orderCount++;
        ordersByDate[date].orderValue += orderValue;
      }
    }
  }

  const dates = Object.keys(ordersByDate).map(date => {
    return { date: `${date}/${month}`, count: ordersByDate[date].orderCount, value: ordersByDate[date].orderValue };
  });

  setDateOrder(dates);
}
  
  useEffect(() => {
    orderForMonth()
  }, [AllOrder]);

  useEffect(() => {
    orderDateSame();
  }, [month])

  useEffect(() => {
    ordersForQuarter()
  }, [AllOrder, quy])

  const dataChart3 = dateOrder
  const dataChartMonth = monthOrder
  const dataChartQuater = quyOrder
  const handleChageSort = (e) => {
    setSort(e.target.value)
    setMonth('01')
    setQuy('01')
  }

  const [orderSort, setOrderSort] = useState([])

  const getTenOrderTop = () => {
      const orderSelect = [];
      for(let i = 0; i < AllOrder.length; i++){
        const userId = AllOrder[i].userID
        if (!orderSelect.some(d => d.userId === userId)) {
          const count = AllOrder?.filter(o => o.userID == userId).length;
          orderSelect.push({ userId, count });
        }
      }
      setOrderSort(orderSelect)
  }

  const orderTop = orderSort?.sort((a,b) => b.count - a.count)
  const [infoOrder, setInfoOrder] = useState([])
  const getAllInfo = () => {
    const allInfo = [];
    const topCount = orderTop.slice(0, 10);
    for (let i = 0; i < orderTop.length; i++) {
      const userId = topCount[i].userId;
      const orderCount = topCount[i].count;
      const users = user?.find(u => u.userID === userId);
      const step = allInfo.length + 1
      const now = new Date(); 
      const time = now.toLocaleTimeString();
      const date = now.toLocaleDateString();
      if (user) {
        const fullName = userId;
        allInfo.push({ fullName, count: orderCount, step, time, date });
      }
    }
    setInfoOrder(allInfo);
  }

  useEffect(() => {
    getTenOrderTop()
  }, [AllOrder])

  useEffect(() => {
    getAllInfo()
  }, [orderTop])
  return (
    <div className='dashboard-container'>
      <div className='dashboard-title'><h2 style={{padding: "5px 10px"}}>SHIPPER</h2></div>
      <div className='container'>
        <div className='dashboard-content row'>
          <div className='content-left  col-lg-6 col-md-12 col-sm-12'>
            <div className='item-right'>
              <Link style={{color: "#000000"}} to = {"/shipper"}>
              <div className='item-right-title' style={{fontSize: "20px", fontWeight: '600', color: "#45cb85"}}>TÀI KHOẢN</div>
              <div className='item-right-content'>
              <h5>1</h5>
                <div className='item-right-icon'>
                  <RxAvatar />
                </div>
              </div>
              <div className='item-right-footer'>
                <h6>
                  <span className='span-up'>Tổng số lượng tài khoản</span>
                </h6>
              </div>
              </Link>
            </div>
            <div className='item-right'>
              <Link style={{color: "#000000"}} to = {"/shipper/manage-order"}>
              <div className='item-right-title' style={{fontSize: "20px", fontWeight: '600', color: "#299cdb"}}>ĐƠN HÀNG</div>
              <div className='item-right-content'>
              {(AllOrder.length > 0) ? (<h5>{AllOrder?.length}</h5>) : (<LoadingCircle />)}
                <div className='item-right-icon-bag'>
                  <BsFillBagFill />
                </div>
              </div>
              <div className='item-right-footer'>
                <h6>
                  <span className='span-down'>Tổng tất cả đơn hàng</span>
                </h6>
              </div>
              </Link>
            </div>
            <div className='item-right'>
              <Link style={{color: "#000000"}} to = {"/shipper/manage-order"}>
              <div className='item-right-title' style={{fontSize: "20px", fontWeight: '600', color: "#ffbe0b"}}>ĐÃ GIAO</div>
              <div className='item-right-content'>
              {(AllOrder.length > 0) ? (<h5>{AllOrder?.filter((item) => item.status == "SHIP_COMPLETED" || item.status === "USER_RECEIVED" || item.status === "CANCELLED").length}</h5>) : (<LoadingCircle />)}
                <div className='item-right-icon-avatar'>
                  <AiFillCheckCircle />
                </div>
              </div>
              <div className='item-right-footer'>
                <h6>
                  <span className='span-up'>Tổng số đơn hàng đã giao</span>
                </h6>
              </div>
              </Link>
            </div>
            <div className='item-right'>
              <Link style={{color: "#000000"}} to = {"/shipper/manage-order"}>
              <div className='item-right-title' style={{fontSize: "20px", fontWeight: '600', color: "#f06548"}}>ĐANG GIAO</div>
              <div className='item-right-content'>
                {(product?.length > 0)  ? (<h5>{AllOrder?.filter(item => item.status == "ON_SHIPPING").length}</h5>) : (<LoadingCircle />)}
                <div className='item-right-icon-wallet'>
                  <AiFillCar />
                </div>
              </div>
              <div className='item-right-footer'>
                <h6>
                  <span className='span-down'>Tổng số đơn hàng đang giao</span>
                </h6>
              </div>
              </Link>
            </div>      
          </div>
            <CardOutLiner className=' content-right col-lg-6 col-md-12 col-sm-12' style = {{padding: "0!important"}}
              element={<AlertCard data = {infoOrder}/>}
            />
          {/* </div> */}
        </div>
      </div>

      <div className='container'>
        <div className='dashboard-content-2 row'>
        <div style={{display: "flex", justifyContent: "space-between"}} className='col-lg-12 sortChart'>
            {(sort == "nam") ? (
              <h3 style={{padding: "2rem 0 0 0"}}>{t('dashboard.item_title1')}</h3>
            ): (sort == "quy") ? (
              <h3 style={{padding: "2rem 0 0 0"}}>{t('dashboard.item_title2')}</h3>
            ) : (
              <h3 style={{padding: "2rem 0 0 0"}}>{t('dashboard.item_title3')}</h3>
            )    
            }
            <div>
            <select onChange={(e) => handleChageSort(e)} style={{marginRight: "1rem"}}>
              <option value="nam" >{t('dashboard.item_title4')}</option>
              <option value="thang" >{t('dashboard.item_title5')}</option>
              <option value="quy" >{t('dashboard.item_title6')}</option>
            </select>
            { (sort == "thang") ? (
                <select onChange={(e) => setMonth(e.target.value)}>
                  <option value="01">{t('dashboard.item_title7')} 1</option>
                  <option value="02">{t('dashboard.item_title7')} 2</option>
                  <option value="03">{t('dashboard.item_title7')} 3</option>
                  <option value="04">{t('dashboard.item_title7')} 4</option>
                  <option value="05">{t('dashboard.item_title7')} 5</option>
                  <option value="07">{t('dashboard.item_title7')} 6</option>
                  <option value="07">{t('dashboard.item_title7')} 7</option>
                  <option value="08">{t('dashboard.item_title7')} 8</option>
                  <option value="09">{t('dashboard.item_title7')} 9</option>
                  <option value="10">{t('dashboard.item_title7')} 10</option>
                  <option value="11">{t('dashboard.item_title7')} 11</option>
                  <option value="12">{t('dashboard.item_title7')} 12</option>
                </select>
              ) : (<div></div>)
            }
            </div>
          </div>
          <div className='content-left-2 col-lg-12 col-md-12 col-sm-12'>
            <ResponsiveContainer
              width='100%'
              height='100%'>
              {
                (sort == "thang") ? (
                  <AreaChart
                  data={dataChart3}
                  syncId='anyId'
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}>
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='date' />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type='monotone'
                    dataKey='count'
                    stroke='#82ca9d'
                    fill='#82ca9d'
                  />
                </AreaChart>
                ) : (sort == "nam") ? (
                  <AreaChart
                  data={dataChartMonth.sort((a,b) => a.date - b.date)}
                  syncId='anyId'
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}>
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='date' />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type='monotone'
                    dataKey='count'
                    stroke='#82ca9d'
                    fill='#82ca9d'
                  />
                </AreaChart>
                ) : (
                  <AreaChart
                  data={dataChartQuater}
                  syncId='anyId'
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}>
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='quarter' />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type='monotone'
                    dataKey='count'
                    stroke='#82ca9d'
                    fill='#82ca9d'
                  />
                </AreaChart>
                )
              }
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

const LoadingCircle = () => {
  return (
    <LoadingOutlined
      style={{
        fontSize: 30  
      }}
      spin
    />
  );
};

DashboardShipper.propTypes = {};

export default DashboardShipper;
