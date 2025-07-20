

export default function BAN({ imgSrc, value, label, isSelected, onClick, isIndividualSDG = false }) {
    // Define target values for each metric
    const getTargetValue = (label) => {
        if (isIndividualSDG) {
            // Individual SDG targets (smaller, more achievable)
            switch(label) {
                case 'Student Participation':
                    return 500; // 500 students per SDG
                case 'CAS Projects':
                    return 75; // 75 projects per SDG
                case 'Funds Raised':
                    return 30000; // $30,000 per SDG
                default:
                    return 100;
            }
        } else {
            // Aggregate targets (larger, overall goals)
            switch(label) {
                case 'Student Participation':
                    return 30000;
                case 'CAS Projects':
                    return 750;
                case 'Funds Raised':
                    return 500000; // $500,000
                default:
                    return 1000;
            }
        }
    };

    // Calculate progress percentage
    const numericValue = typeof value === 'string' ? 
        parseInt(value.replace(/[$,]/g, '')) : value;
    const targetValue = getTargetValue(label);
    const progressPercentage = Math.min((numericValue / targetValue) * 100, 100);

    return (
        <div 
            className={`ban ${isSelected ? 'selected' : ''}`}
            onClick={onClick}
            style={{ cursor: 'pointer' }}
        >
            <img className="ban-icon" src={imgSrc} alt="BAN Icon" />
            <div className="ban-text">
                <h1>{value}</h1>
                <p>{label}</p>
                <div className="progress-container">
                    <div className="progress-bar">
                        <div 
                            className="progress-fill" 
                            style={{ width: `${progressPercentage}%` }}
                        ></div>
                    </div>
                    <p className="target-text">
                        Target: {label === 'Funds Raised' ? 
                            `$${targetValue.toLocaleString()}` : 
                            targetValue.toLocaleString()
                        }
                    </p>
                </div>
            </div>
        </div>
    );
}