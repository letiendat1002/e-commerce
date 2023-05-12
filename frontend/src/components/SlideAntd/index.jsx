import { Slider } from 'antd'
import React from 'react'
import './style.scss'
const index = (props) => {
    const value = props.values
  return (
    <div className="sider">
        <Slider disabled value = {value}/>
    </div>
  )
}

export default index