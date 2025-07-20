import React from 'react';
import imageSrc from '../assets/food-waste.svg'; // Adjust the path as necessary

export default function DescriptionBox(){
    return (
        <div className='description-box'>
            <img className='description-image' src={imageSrc} alt="Food Waste" />
            <h2 className='description-title'>Food Waste</h2>
            <p className='description-text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure fuga itaque nemo nisi, id assumenda doloremque ipsa aut voluptas blanditiis repellat deserunt consequuntur minima ab neque odio eius quasi obcaecati est! Praesentium hic nesciunt blanditiis esse corporis, qui fuga nisi quam atque iste autem maiores ipsum corrupti architecto minima cupiditate!</p>
            <div className='description-data'>
                <div className='description-data-points'>
                    <span>5</span>
                    <p>Projects</p>
                </div>
                <div className='description-data-points'>
                    <span>5</span>
                    <p>Projects</p>
                </div>
                <div className='description-data-points'>
                    <span>5</span>
                    <p>Projects</p>
                </div>
            </div>
        </div>
    );
}