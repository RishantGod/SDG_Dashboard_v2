import React from 'react';
import * as d3 from 'd3';
import data from '../data.json'; // Assuming data is in JSON format
import { calculateTotal } from './calculateTotal.js';
export default function BarChart() {

    // * 1. Getting all the data and accessor functions 

    const allTotalsObj = calculateTotal(data);
    // Convert object to array for easier manipulation
    const allTotals = Object.entries(allTotalsObj).map(([id, values]) => ({
        id,
        ...values
    }));
    
    const getStudentParticipation = d => d.studentParticipation;
    const getCasProjects = d => d.casProjects;
    const getFundsRaised = d => d.fundsRaised;
    const getColor = d => d.color;


    // * 2. Create Dimensions 

    const dimensions = {
        width: 500,
        height: 300,
        marginTop: 20,
        marginRight: 30,
        marginBottom: 40,
        marginLeft: 40,
    };

    dimensions.boundedWidth = dimensions.width - dimensions.marginLeft - dimensions.marginRight;
    dimensions.boundedHeight = dimensions.height - dimensions.marginTop - dimensions.marginBottom;

    // * 3. Create Scales

    // xScale for the bar chart
    const xScale = d3.scaleBand()
        .domain(allTotals.map(d => d.id))
        .range([0, dimensions.boundedWidth])
        .padding(0.7); // Increased padding to make bars thinner

    // yScale for the bar chart
    const yScale = d3.scaleLinear()
        .domain([0, d3.max(allTotals, d => d.studentParticipation)])
        .range([dimensions.boundedHeight, 0]); // Inverted: height to 0

    // Creating scaled accessor functions
    const xAccessorScaled = d => xScale(d.id);
    const yAccessorScaled = d => yScale(getStudentParticipation(d));
    

    return (
        <svg 
            className="bar-chart"
            width={dimensions.width}
            height={dimensions.height}
        >
            <g transform={`translate(${dimensions.marginLeft}, ${dimensions.marginTop})`}>
                {allTotals.map((item, index) => (
                    <rect
                        key={item.id}
                        x={xAccessorScaled(item)}
                        y={yAccessorScaled(item)}
                        width={xScale.bandwidth()}
                        height={dimensions.boundedHeight - yAccessorScaled(item)}
                        fill={getColor(item)}
                    />
                ))}
            </g>
        </svg>
    );
}