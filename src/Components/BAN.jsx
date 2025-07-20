

export default function BAN({ imgSrc, value, label, isSelected, onClick }) {
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
            </div>
        </div>
    );
}