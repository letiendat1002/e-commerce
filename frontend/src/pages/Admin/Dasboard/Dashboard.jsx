import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Dashboard.scss';
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

export const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
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
        {payload.name}
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
        fill='#333'>{`PV ${value}`}</text>
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

  return (
    <div className='dashboard-container'>
      <div className='dashboard-title'>{t('dashboard.title1')}</div>
      <div className='dashboard-content'>
        <div className='content-left'>
          <div className='item-right'>
            <div className='item-right-title'>{t('dashboard.item_right1')}</div>
            <div className='item-right-content'>
              <h5>$559.25K</h5>
              <div className='item-right-icon'>
                <MdAttachMoney />
              </div>
            </div>
            <div className='item-right-footer'>
              <h6>
                {t('dashboard.item_right_footer')} <span className='span-up'>+14%</span>
              </h6>
            </div>
          </div>
          <div className='item-right'>
            <div className='item-right-title'>{t('dashboard.item_right2')}</div>
            <div className='item-right-content'>
              <h5>36,894</h5>
              <div className='item-right-icon-bag'>
                <BsFillBagFill />
              </div>
            </div>
            <div className='item-right-footer'>
              <h6>
                {t('dashboard.item_right_footer')} <span className='span-down'>-5%</span>
              </h6>
            </div>
          </div>
          <div className='item-right'>
            <div className='item-right-title'>{t('dashboard.item_right3')}</div>
            <div className='item-right-content'>
              <h5>183.35M</h5>
              <div className='item-right-icon-avatar'>
                <RxAvatar />
              </div>
            </div>
            <div className='item-right-footer'>
              <h6>
                {t('dashboard.item_right_footer')} <span className='span-up'>+14%</span>
              </h6>
            </div>
          </div>
          <div className='item-right'>
            <div className='item-right-title'>{t('dashboard.item_right4')}</div>
            <div className='item-right-content'>
              <h5>$165.89k</h5>
              <div className='item-right-icon-wallet'>
                <BsWallet />
              </div>
            </div>
            <div className='item-right-footer'>
              <h6>
                {t('dashboard.item_right_footer')} <span className='span-down'>-4%</span>
              </h6>
            </div>
          </div>
        </div>
        <div className='content-right'>
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
                dataKey='pv'
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

      <div className='dashboard-content-2'>
        <div className='content-left-2'>
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
              <XAxis dataKey='name' />
              <YAxis />
              <Tooltip />
              <Area
                type='monotone'
                dataKey='pv'
                stroke='#82ca9d'
                fill='#82ca9d'
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className='content-right-2'>
          <ResponsiveContainer
            width='100%'
            height='100%'>
            <PieChart>
              <Pie
                activeIndex={activeIndex.activeIndex}
                activeShape={renderActiveShape}
                data={dataChart2}
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
  );
};

Dashboard.propTypes = {};

export default Dashboard;
