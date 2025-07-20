import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';

export default function LineChart({ sdgData, sdgId }) {
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
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    // Convert monthly data to array format for easier manipulation
    const lineData = months.map(month => ({
        month,
        value: sdgData.StudentParticipation[month] || 0
    }));

    const getMonth = d => d.month;
    const getValue = d => d.value;

    // * 3. Create Scales using D3 (for calculations only)

    // xScale for the line chart
    const xScale = d3.scalePoint()
        .domain(months)
        .range([0, boundedWidth])
        .padding(0.1);

    // yScale for the line chart
    const yScale = d3.scaleLinear()
        .domain([0, d3.max(lineData, getValue)])
        .range([boundedHeight, 0])
        .nice();

    // * 4. Create line path using D3 line generator
    const lineGenerator = d3.line()
        .x(d => xScale(getMonth(d)))
        .y(d => yScale(getValue(d)))
        .curve(d3.curveMonotoneX); // Smooth curve

    const linePath = lineGenerator(lineData);

    // * 5. Create axis ticks data
    const xAxisTicks = xScale.domain();
    const yAxisTicks = yScale.ticks(5);

    return (
        <div ref={containerRef} className="bar-chart-container">
            <h3 className="chart-title">SDG {sdgId} - Monthly Student Participation</h3>
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
                                    x1={xScale(tick)}
                                    y1={boundedHeight}
                                    x2={xScale(tick)}
                                    y2={boundedHeight + 6}
                                    stroke="#333"
                                    strokeWidth="2"
                                />
                                <text
                                    x={xScale(tick)}
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

                    {/* Line Path */}
                    <path
                        d={linePath}
                        fill="none"
                        stroke={sdgData.color || "#3498db"}
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />

                    {/* Data Points */}
                    {lineData.map((point, index) => (
                        <circle
                            key={index}
                            cx={xScale(getMonth(point))}
                            cy={yScale(getValue(point))}
                            r="4"
                            fill={sdgData.color || "#3498db"}
                            stroke="#fff"
                            strokeWidth="2"
                        />
                    ))}
                </g>
            </svg>
        </div>
    );
}
