

export default function BAN({ imgSrc, value, label }) {
    return (
        <div className="ban">
            <img className="ban-icon" src={imgSrc} alt="BAN Icon" />
            <div className="ban-text">
                <h1>{value}</h1>
                <p>{label}</p>
            </div>
        </div>
    );
}