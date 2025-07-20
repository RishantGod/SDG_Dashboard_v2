
import goal01 from '../assets/goal-icons/01.png';
import goal02 from '../assets/goal-icons/02.png';
import goal03 from '../assets/goal-icons/03.png';
import goal04 from '../assets/goal-icons/04.png';
import goal05 from '../assets/goal-icons/05.png';
import goal06 from '../assets/goal-icons/06.png';
import goal07 from '../assets/goal-icons/07.png';
import goal08 from '../assets/goal-icons/08.png';
import goal09 from '../assets/goal-icons/09.png';
import goal10 from '../assets/goal-icons/10.png';
import goal11 from '../assets/goal-icons/11.png';
import goal12 from '../assets/goal-icons/12.png';
import goal13 from '../assets/goal-icons/13.png';
import goal14 from '../assets/goal-icons/14.png';
import goal15 from '../assets/goal-icons/15.png';
import goal16 from '../assets/goal-icons/16.png';
import goal17 from '../assets/goal-icons/17.png';

export default function SDGBox({ onSDGHover, onSDGLeave }){
    const goalIcons = [
        goal01, goal02, goal03, goal04, goal05, goal06, goal07, goal08, goal09,
        goal10, goal11, goal12, goal13, goal14, goal15, goal16, goal17
    ];

    return (
        <div className='box'>
            {goalIcons.map((icon, index) => {
                const sdgId = index + 1; // SDG IDs are 1-based
                return (
                    <div 
                        key={sdgId} 
                        className='goal-container'
                        onMouseEnter={() => onSDGHover(sdgId)}
                        onMouseLeave={onSDGLeave}
                        style={{ cursor: 'pointer' }}
                    >
                        <img 
                            className="goal" 
                            src={icon} 
                            alt={`SDG Goal ${sdgId}`}
                        />
                    </div>
                );
            })}
        </div>
    )
}