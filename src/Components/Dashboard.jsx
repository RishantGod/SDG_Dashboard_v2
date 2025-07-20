import React, { useState } from 'react';
import BAN from './BAN';
import BarChart from './BarChart';
import SDGBox from './SDGBox';
import DescriptionBox from './DescriptionBox';
import studentParticipationIcon from '../assets/student-participation.svg';
import casProjectIcon from '../assets/cas.svg';
import fundsRaisedIcon from '../assets/funds-raised.svg';
import data from '../data.json';
import { calculateTotal } from './calculateTotal.js';

export default function Dashboard(){
  // Calculate totals for both individual SDGs and grand totals
  const { totals, grandTotals } = calculateTotal(data);
  
  // State to track which SDG is being hovered (null means show grand totals)
  const [hoveredSDG, setHoveredSDG] = useState(null);
  
  // Determine which values to display in BAN components
  const displayTotals = hoveredSDG ? totals[hoveredSDG] : grandTotals;

  // Handlers for SDG hover
  const handleSDGHover = (sdgId) => {
    setHoveredSDG(sdgId);
  };

  const handleSDGLeave = () => {
    setHoveredSDG(null);
  };

  return (
    <div className="dashboard">
       <div className='left-section'>
        <div className='ban-section'>
            <BAN 
            imgSrc={studentParticipationIcon}
            value={displayTotals.studentParticipation}
            label="Student Participation"
            />
            <BAN 
            imgSrc={casProjectIcon}
            value={displayTotals.casProjects}
            label="CAS Projects"
            />
            <BAN 
            imgSrc={fundsRaisedIcon}
            value={`$${displayTotals.fundsRaised.toLocaleString()}`}
            label="Funds Raised"
            />
        </div>
        <div className='sdg-section'>
            <SDGBox 
              onSDGHover={handleSDGHover}
              onSDGLeave={handleSDGLeave}
            />
        </div>
       </div>
       <div className='right-section'>
            <BarChart />
            <DescriptionBox />
       </div>
    </div>
  )
}
