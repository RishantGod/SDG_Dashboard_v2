import React from 'react';
import BAN from './BAN';
import BarChart from './BarChart';
import SDGBox from './SDGBox';
import DescriptionBox from './DescriptionBox';

export default function Dashboard(){
  return (
    <div className="dashboard">
       <div className='left-section'>
        <div className='ban-section'>
            <BAN />
            <BAN />
            <BAN />
        </div>
        <div className='sdg-section'>
            <SDGBox />
        </div>
       </div>
       <div className='right-section'>
            <BarChart />
            <DescriptionBox />
       </div>
    </div>
  )
}
