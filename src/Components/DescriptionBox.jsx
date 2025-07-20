import React from 'react';



export default function DescriptionBox({illustration, action_title, action_description, ledBy, date, location}) {
    return (
        <div className='description-box'>
            <img className='description-image' src={illustration} alt={action_title} />
            <h2 className='description-title'>{action_title}</h2>
            <p className='description-text'>{action_description}</p>
            <div className='description-data'>
                <div className='description-data-points'>
                    <p>Led by</p>
                    <span>{ledBy}</span>
                </div>
                <div className='description-data-points'>
                    <p>Date</p>
                    <span>{date}</span>
                </div>
                <div className='description-data-points'>
                    <p>Location</p>
                    <span>{location}</span>
                </div>
            </div>
        </div>
    );
}