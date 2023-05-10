import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Dashboard.scss';
import { useSelector , useDispatch} from "react-redux";
import {
  BarChart,
  CartesianGrid,
  Bar,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
  PieChart,
  Pie,
  Sector,
  Area,
  AreaChart,
} from 'recharts';
import { IconName, MdAttachMoney } from 'react-icons/md';
import { BsFillBagFill } from 'react-icons/bs';
import { RxAvatar } from 'react-icons/rx';
import { BsWallet } from 'react-icons/bs';
import { useTranslation, Trans } from 'react-i18next';
import { dataChart, dataChart2, dataChart3 } from './data.js';
import { getAllProducts } from '../../../Redux/slice/productSlice';
import { getAllCategories } from '../../../Redux/slice/categorySlice';
import { getAllUser } from '../../../Redux/slice/usersSlice';
import { getOrderDetail } from '../../../Redux/slice/orderDetailSlice';
import convertToUSD from '../../../Helper/convertUSD';
import { getAllOrder } from '../../../Redux/slice/paymentSlice';
import { Link } from 'react-router-dom';

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


const Dashboard = (props) => {
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

  useEffect(() => {
    dispatch(getAllProducts())
    dispatch(getAllCategories())
    dispatch(getAllUser())
    dispatch(getOrderDetail())
    dispatch(getAllOrder())
  }, [])

  const product = useSelector(state => state.product.data) || []

  const laptop = product?.filter(item => item.categoryID === 1) || []
  const phone = product?.filter(item => item.categoryID === 2) || []
  const tablet = product?.filter(item => item.categoryID === 3) || []
  const pc = product?.filter(item => item.categoryID === 4) || []
  const orderDetail = useSelector(state => state.orderDetail.data.data) || []
  const revenue = orderDetail.reduce((a,b) => a + b.purchasePrice * b.quantity, 0)
  const revenueTotal = Math.round(revenue / 25000)
  const AllOrder = useSelector(state => state.order.data) || []
  const orderTotal = AllOrder.length
  const user = useSelector(state => state.userAPI.data)
  const Alluser = user.filter((item) => item.roles.includes("ROLE_CUSTOMER"))?.length
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
      midAngle: 240,
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

  const orderDateSame = () => {
    const dates = [];
  
    for (let i = 0; i < AllOrder.length; i++) {
      const date = AllOrder[i].dateOrder;
      
      if (!dates.some(d => d.date === date)) {
        const count = AllOrder.filter(o => o.dateOrder === date).length;
        dates.push({ date, count });
      }
    }
  
    setDateOrder(dates);
  }
  
  useEffect(() => {
    orderDateSame();
  }, [AllOrder]);
  console.log(dateOrder)
  const dataChart3 = dateOrder
  // const keys = Object.keys(groupedOrders);
  // const firstKey = keys[0];
  // const firstItemLength = groupedOrders[firstKey].length;
  
  // console.log(`First key: ${firstKey}`);
  // console.log(`Length of array for first key: ${firstItemLength}`);

  return (
    <div className='dashboard-container '>
      <div className='dashboard-title'><h1 style={{padding: "1rem 10px"}}>Trang Chủ</h1></div>
      <div className='container'>
        <div className='dashboard-content row'>
          <div className='content-left  col-lg-6 col-md-12 col-sm-12'>
            <div className='item-right'>
              <Link style={{color: "#000000"}} to = {"/admin/manage-orders"}>
              <div className='item-right-title' style={{fontSize: "20px", fontWeight: '600', color: "#45cb85"}}>DOANH THU</div>
              <div className='item-right-content'>
              <h5>{convertToUSD(revenueTotal)}</h5>
                <div className='item-right-icon'>
                  <MdAttachMoney />
                </div>
              </div>
              <div className='item-right-footer'>
                <h6>
                  {t('dashboard.item_right_footer')} <span className='span-up'>+14%</span>
                </h6>
              </div>
              </Link>
            </div>
            <div className='item-right'>
              <Link style={{color: "#000000"}} to = {"/admin/manage-orders"}>
              <div className='item-right-title' style={{fontSize: "20px", fontWeight: '600', color: "#299cdb"}}>ĐƠN HÀNG</div>
              <div className='item-right-content'>
                <h5>{orderTotal}</h5>
                <div className='item-right-icon-bag'>
                  <BsFillBagFill />
                </div>
              </div>
              <div className='item-right-footer'>
                <h6>
                  {t('dashboard.item_right_footer')} <span className='span-down'>-5%</span>
                </h6>
              </div>
              </Link>
            </div>
            <div className='item-right'>
              <Link style={{color: "#000000"}} to = {"/admin/manage-user"}>
              <div className='item-right-title' style={{fontSize: "20px", fontWeight: '600', color: "#ffbe0b"}}>KHÁCH HÀNG</div>
              <div className='item-right-content'>
                <h5>{Alluser}</h5>
                <div className='item-right-icon-avatar'>
                  <RxAvatar />
                </div>
              </div>
              <div className='item-right-footer'>
                <h6>
                  {t('dashboard.item_right_footer')} <span className='span-up'>+14%</span>
                </h6>
              </div>
              </Link>
            </div>
            <div className='item-right'>
              <Link style={{color: "#000000"}} to = {"/admin/manage-products"}>
              <div className='item-right-title' style={{fontSize: "20px", fontWeight: '600', color: "#f06548"}}>SẢN PHẨM</div>
              <div className='item-right-content'>
                <h5>{product?.length}</h5>
                <div className='item-right-icon-wallet'>
                  <BsWallet />
                </div>
              </div>
              <div className='item-right-footer'>
                <h6>
                  {t('dashboard.item_right_footer')} <span className='span-down'>-4%</span>
                </h6>
              </div>
              </Link>
            </div>      
          </div>
          <div className='content-right col-lg-6 col-md-12 col-sm-12'>
            <ResponsiveContainer
              width='100%'
              height='100%'>
              <BarChart
                width={'100%'}
                height={250}
                data={dataChart}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='name' />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey={`Laptop ${laptop.length}`}
                  fill='#8884d8'
                />
                <Bar
                  dataKey='uv'
                  fill='#82ca9d'
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className='container'>
        <div className='dashboard-content-2 row'>
          <h3 style={{padding: "1rem 0 0.5rem 0"}}>Thống kê đơn hàng trong tháng</h3>
          <div className='content-left-2 col-lg-7 col-md-12 col-sm-12'>
            <ResponsiveContainer
              width='100%'
              height='100%'>
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
            </ResponsiveContainer>
          </div>
          <div className='content-right-2 col-lg-5 col-md-12 col-sm-12'> 
            <ResponsiveContainer
              width='100%'
              height='100%'>
              <PieChart>
                <Pie
                  activeIndex={activeIndex.activeIndex}
                  activeShape={renderActiveShape}
                  data = {data}
                  cx='50%'
                  cy='50%'
                  innerRadius={60}
                  outerRadius={80}
                  fill='#8884d8'
                  dataKey='value'
                  onMouseEnter={onPieEnter}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

Dashboard.propTypes = {};

export default Dashboard;
