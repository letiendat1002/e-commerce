import React from 'react'
import { ReactComponent as YourSvg } from './test.svg'
import './SubHeader.scss'
export default function SubHeader() {
  return (
    <div>
      <p className='text'>
      <YourSvg style={{width:'30px',height:'30px'}}/> Samsung Galaxy S23 Ultra giảm đến 9.5 triệu 
      </p>
    </div>
  )
}
