import studentParticipationIcon from '../assets/student-participation.svg';

export default function BAN() {
    return (
        <div className="ban">
            <img className="ban-icon" src={studentParticipationIcon} alt="BAN Icon" />
            <div className="ban-text">
                <h1>45</h1>
                <p>Student Participation</p>
            </div>
        </div>
    );
}