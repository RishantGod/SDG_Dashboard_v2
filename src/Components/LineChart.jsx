import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';

export default function LineChart({ sdgData, sdgId, selectedMetric = 'studentParticipation' }) {
    const containerRef = useRef();
    const [isInitialRender, setIsInitialRender] = useState(true);
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

    // Handle initial render flag for animations
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsInitialRender(false);
        }, 100);
        return () => clearTimeout(timer);
    }, [selectedMetric]); // Reset animation when metric changes

    // Calculate bounded dimensions
    const boundedWidth = dimensions.width - dimensions.marginLeft - dimensions.marginRight;
    const boundedHeight = dimensions.height - dimensions.marginTop - dimensions.marginBottom;

    // * 1. Getting all the data and accessor functions 
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    // Get the correct data property based on selected metric
    const getDataProperty = () => {
        switch(selectedMetric) {
            case 'casProjects':
                return 'CASProjects';
            case 'fundsRaised':
                return 'FundsRaised';
            default:
                return 'StudentParticipation';
        }
    };

    // Get chart title based on selected metric
    const getChartTitle = () => {
        switch(selectedMetric) {
            case 'casProjects':
                return `SDG ${sdgId} - Monthly CAS Projects`;
            case 'fundsRaised':
                return `SDG ${sdgId} - Monthly Funds Raised`;
            default:
                return `SDG ${sdgId} - Monthly Student Participation`;
        }
    };

    // Dynamic y-axis label based on selected metric
    const getYAxisLabel = () => {
        switch(selectedMetric) {
            case 'casProjects':
                return 'Number of CAS projects';
            case 'fundsRaised':
                return 'Amount of funds raised';
            default:
                return 'Number of students';
        }
    };
    
    // Convert monthly data to array format for easier manipulation
    const dataProperty = getDataProperty();
    const lineData = months.map(month => ({
        month,
        value: sdgData[dataProperty][month] || 0
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

    // * 5. Create area path using D3 area generator
    const areaGenerator = d3.area()
        .x(d => xScale(getMonth(d)))
        .y0(boundedHeight) // Bottom of the area (x-axis)
        .y1(d => yScale(getValue(d))) // Top of the area (data points)
        .curve(d3.curveMonotoneX); // Same curve as line

    const areaPath = areaGenerator(lineData);

    // * 6. Create axis ticks data
    const xAxisTicks = xScale.domain();
    const yAxisTicks = yScale.ticks(5);

    return (
        <div ref={containerRef} className="bar-chart-container">
            <h3 className="chart-title">{getChartTitle()}</h3>
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
                        {/* Y axis label */}
                        <text
                            x={-50}
                            y={boundedHeight / 2}
                            textAnchor="middle"
                            fontSize="14"
                            fontWeight="bold"
                            fontFamily="Lato, sans-serif"
                            fill="#333"
                            transform={`rotate(-90, -50, ${boundedHeight / 2})`}
                        >
                            {getYAxisLabel()}
                        </text>
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

                    {/* Area Fill */}
                    <defs>
                        <clipPath id={`areaClip-${sdgId}`}>
                            <rect 
                                x="0" 
                                y="0" 
                                width={isInitialRender ? 0 : boundedWidth} 
                                height={boundedHeight}
                                style={{
                                    transition: 'width 1.5s ease-out 0.3s'
                                }}
                            />
                        </clipPath>
                    </defs>
                    
                    <path
                        d={areaPath}
                        fill={sdgData.color || "#3498db"}
                        fillOpacity="0.3"
                        clipPath={`url(#areaClip-${sdgId})`}
                        style={{
                            transition: 'd 0.6s ease'
                        }}
                    />

                    {/* Line Path */}
                    <path
                        d={linePath}
                        fill="none"
                        stroke={sdgData.color || "#3498db"}
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeDasharray={isInitialRender ? `1000` : 'none'}
                        strokeDashoffset={isInitialRender ? 1000 : 0}
                        style={{
                            transition: isInitialRender 
                                ? 'stroke-dashoffset 1.2s ease-out 0.1s' 
                                : 'd 0.6s ease'
                        }}
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
                            style={{
                                transition: 'cx 0.6s ease, cy 0.6s ease'
                            }}
                        />
                    ))}
                </g>
            </svg>
        </div>
    );
}
