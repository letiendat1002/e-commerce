import './style.css';

import { Card } from 'antd';

import React from 'react';

function CardOutLiner({ element, className }) {
  return (
    <Card
      className={className+' alarm-card'}
    >
      <span className='dash-light dash-top'></span>
      <span className='dash-light dash-bottom'></span>

      {element}
    </Card>
  )
}

export default CardOutLiner;