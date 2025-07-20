import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import data from '../data.json'; // Assuming data is in JSON format
import { calculateTotal } from './calculateTotal.js';

export default function BarChart() {
    const containerRef = useRef();
    const [dimensions, setDimensions] = useState({
        width: 500,
        height: 600,
        marginTop: 40,
        marginRight: 30,
        marginBottom: 80,
        marginLeft: 80,
    });

    // Update dimensions based on container size
    useEffect(() => {
        const updateDimensions = () => {
            if (containerRef.current) {
                const containerRect = containerRef.current.getBoundingClientRect();
                const padding = 32; // Account for container padding (1rem * 2 = 32px)
                const titleHeight = 40; // Approximate height of title + margin
                
                setDimensions(prev => ({
                    ...prev,
                    width: containerRect.width - padding,
                    height: containerRect.height - padding - titleHeight,
                }));
            }
        };

        // Update dimensions on mount and resize
        updateDimensions();
        window.addEventListener('resize', updateDimensions);
        
        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    // Calculate bounded dimensions
    const boundedWidth = dimensions.width - dimensions.marginLeft - dimensions.marginRight;
    const boundedHeight = dimensions.height - dimensions.marginTop - dimensions.marginBottom;

    // * 1. Getting all the data and accessor functions 

    const { totals: allTotalsObj, grandTotals } = calculateTotal(data);
    // Convert object to array for easier manipulation
    const allTotals = Object.entries(allTotalsObj).map(([id, values]) => ({
        id,
        ...values
    }));
    
    const getStudentParticipation = d => d.studentParticipation;
    const getCasProjects = d => d.casProjects;
    const getFundsRaised = d => d.fundsRaised;
    const getColor = d => d.color;

    // * 3. Create Scales using D3 (for calculations only)

    // xScale for the bar chart
    const xScale = d3.scaleBand()
        .domain(allTotals.map(d => String(d.id)))
        .range([0, boundedWidth])
        .padding(0.7);

    // yScale for the bar chart
    const yScale = d3.scaleLinear()
        .domain([0, d3.max(allTotals, d => d.studentParticipation)])
        .range([boundedHeight, 0]);

    // * 4. Create axis ticks data
    const xAxisTicks = xScale.domain();
    const yAxisTicks = yScale.ticks(5);

    return (
        <div ref={containerRef} className="bar-chart-container">
            <h3 className="chart-title">Student Participation by SDG</h3>
            <svg 
                className="bar-chart"
                width={dimensions.width}
                height={dimensions.height}
            >
                <g transform={`translate(${dimensions.marginLeft}, ${dimensions.marginTop})`}>
                    {/* Y Axis */}
                    <g className="y-axis">
                        {/* Y axis line */}
                        <line
                            x1={0}
                            y1={0}
                            x2={0}
                            y2={boundedHeight}
                            stroke="#333"
                            strokeWidth="2"
                        />
                        {/* Y axis ticks and labels */}
                        {yAxisTicks.map(tick => (
                            <g key={tick}>
                                <line
                                    x1={-6}
                                    y1={yScale(tick)}
                                    x2={0}
                                    y2={yScale(tick)}
                                    stroke="#333"
                                    strokeWidth="2"
                                />
                                <text
                                    x={-10}
                                    y={yScale(tick)}
                                    dy="0.32em"
                                    textAnchor="end"
                                    fontSize="12"
                                    fontWeight="bold"
                                    fill="#333"
                                >
                                    {tick}
                                </text>
                            </g>
                        ))}
                    </g>

                    {/* X Axis */}
                    <g className="x-axis">
                        {/* X axis line */}
                        <line
                            x1={0}
                            y1={boundedHeight}
                            x2={boundedWidth}
                            y2={boundedHeight}
                            stroke="#333"
                            strokeWidth="2"
                        />
                        {/* X axis ticks and labels */}
                        {xAxisTicks.map(tick => (
                            <g key={tick}>
                                <line
                                    x1={xScale(tick) + xScale.bandwidth() / 2}
                                    y1={boundedHeight}
                                    x2={xScale(tick) + xScale.bandwidth() / 2}
                                    y2={boundedHeight + 6}
                                    stroke="#333"
                                    strokeWidth="2"
                                />
                                <text
                                    x={xScale(tick) + xScale.bandwidth() / 2}
                                    y={boundedHeight + 20}
                                    textAnchor="middle"
                                    fontSize="12"
                                    fontWeight="bold"
                                    fill="#333"
                                >
                                    {tick}
                                </text>
                            </g>
                        ))}
                    </g>

                    {/* Bars */}
                    {allTotals.map((item) => (
                        <rect
                            key={item.id}
                            x={xScale(String(item.id))}
                            y={yScale(getStudentParticipation(item))}
                            width={xScale.bandwidth()}
                            height={boundedHeight - yScale(getStudentParticipation(item))}
                            fill={getColor(item)}
                        />
                    ))}
                </g>
            </svg>
        </div>
    );
}