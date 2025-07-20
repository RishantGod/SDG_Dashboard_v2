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
import mainIcon from '../assets/SDG.png';

export default function Dashboard(){
  // Calculate totals for both individual SDGs and grand totals
  const { totals, grandTotals } = calculateTotal(data);
  
  // State to track which SDG is being hovered (null means show grand totals)
  const [hoveredSDG, setHoveredSDG] = useState(null);
  
  // Determine which values to display in BAN components
  const displayTotals = hoveredSDG ? totals[hoveredSDG] : grandTotals;

  // Default description details when no SDG is hovered
  const defaultDetails = {
    action: "SDG Dashboard Overview",
    description: "This dashboard showcases our campus's commitment to the United Nations Sustainable Development Goals through various student-led initiatives. Each project contributes to creating a more sustainable, equitable, and inclusive environment. Hover over any SDG icon to explore specific projects and their impact on our community.",
    image: mainIcon,
    leader: "Student Council",
    startDate: "2023-01-01",
    location: "Campus Wide"
  };

  // Get the current SDG data or use default
  const currentSDGData = hoveredSDG ? data.find(item => item.id === hoveredSDG) : null;
  const displayDetails = currentSDGData ? {
    action: currentSDGData.action,
    description: currentSDGData.description,
    image: currentSDGData.image.startsWith('./') 
      ? currentSDGData.image.replace('./', '/') 
      : currentSDGData.image, // Convert ./assets/ to /assets/
    leader: currentSDGData.leader,
    startDate: currentSDGData.startDate,
    location: currentSDGData.location
  } : defaultDetails;

  // Handlers for SDG hover
  const handleSDGHover = (sdgId) => {
    setHoveredSDG(sdgId);
  };

  const handleSDGLeave = () => {
    setHoveredSDG(null);
  };

  return (
    <>
    <h1 className='dashboard-title'>Sustainable Development Goals Dashboard</h1>
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
            <DescriptionBox 
              illustration={displayDetails.image}
              action_title={displayDetails.action}
              action_description={displayDetails.description}
              ledBy={displayDetails.leader}
              date={displayDetails.startDate}
              location={displayDetails.location}
            />
       </div>
    </div>
    </>
  )
}
