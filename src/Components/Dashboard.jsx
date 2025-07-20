import React from 'react';
import BAN from './BAN';
import BarChart from './BarChart';
import SDGBox from './SDGBox';
import DescriptionBox from './DescriptionBox';

export default function Dashboard(){
  return (
    <div className="dashboard">
       <div className='top-section'>
            <BAN />
            <BAN />
            <BAN />
            <BarChart />
       </div>
       <div className='bottom-section'>
            <SDGBox />
            <DescriptionBox />
        </div>
    </div>
  )
}
