import React, { useState } from 'react';
import BAN from './BAN';
import BarChart from './BarChart';
import LineChart from './LineChart';
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
  
  // State to track which SDG is being selected (null means show grand totals)
  const [selectedSDG, setSelectedSDG] = useState(null);
  
  // State to track which metric is selected for the bar chart
  const [selectedMetric, setSelectedMetric] = useState('studentParticipation');
  
  // Determine which values to display in BAN components
  const displayTotals = selectedSDG ? totals[selectedSDG] : grandTotals;

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
  const currentSDGData = selectedSDG ? data.find(item => item.id === selectedSDG) : null;
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

  // Handlers for SDG click
  const handleSDGClick = (sdgId) => {
    // If clicking the same SDG, deselect it; otherwise select the new one
    setSelectedSDG(selectedSDG === sdgId ? null : sdgId);
  };

  // Handler for BAN click to change metric
  const handleMetricClick = (metric) => {
    setSelectedMetric(metric);
  };

  return (
    <>
    <div className="header-section">
      <img 
        src="/assets/instituition_logo.png" 
        alt="Institutional Logo" 
        className="institutional-logo"
      />
      <h1 className='dashboard-title'>Sustainable Development Goals Dashboard</h1>
    </div>
      <div className="dashboard">
       <div className='left-section'>
        <div className='ban-section'>
            <BAN 
            imgSrc={studentParticipationIcon}
            value={displayTotals.studentParticipation.toLocaleString()}
            label="Student Participation"
            isSelected={selectedMetric === 'studentParticipation'}
            onClick={() => handleMetricClick('studentParticipation')}
            isIndividualSDG={selectedSDG !== null}
            />
            <BAN 
            imgSrc={casProjectIcon}
            value={displayTotals.casProjects.toLocaleString()}
            label="CAS Projects"
            isSelected={selectedMetric === 'casProjects'}
            onClick={() => handleMetricClick('casProjects')}
            isIndividualSDG={selectedSDG !== null}
            />
            <BAN 
            imgSrc={fundsRaisedIcon}
            value={`$${displayTotals.fundsRaised.toLocaleString()}`}
            label="Funds Raised"
            isSelected={selectedMetric === 'fundsRaised'}
            onClick={() => handleMetricClick('fundsRaised')}
            isIndividualSDG={selectedSDG !== null}
            />
        </div>
        <div className='sdg-section'>
            <SDGBox 
              onSDGClick={handleSDGClick}
              selectedSDG={selectedSDG}
            />
        </div>
       </div>
       <div className='right-section'>
            {selectedSDG ? (
              <LineChart 
                sdgData={currentSDGData} 
                sdgId={selectedSDG}
                selectedMetric={selectedMetric}
              />
            ) : (
              <BarChart selectedMetric={selectedMetric} />
            )}
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
