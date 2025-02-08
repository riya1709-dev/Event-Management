import React from 'react';
import PropTypes from 'prop-types';
import moment from "moment/moment";
import { GrMapLocation } from "react-icons/gr";
import { BsClock } from "react-icons/bs"; // Clock icon for time display

const EventStoryCard = ({ imageUrl, title, description, date, time, location, onClick }) => {
    return (
        <div className='bg-white shadow-md hover:shadow-lg rounded-xl overflow-hidden transition-all ease-in-out cursor-pointer'>
            {/* Event Image */}
            <img 
                src={imageUrl}
                alt={title} 
                className='w-full h-56 object-cover' 
                onClick={onClick} 
            />

            {/* Card Content */}
            <div className='p-4' onClick={onClick}>
                {/* Title */}
                <h6 className='text-sm font-semibold text-gray-800'>{title}</h6>

                {/* Description */}
                <p className='text-xs text-gray-600 mt-2'>
                    {description ? description.slice(0, 60) + "..." : "No description available"}
                </p>

                {/* Date & Time Below Description */}
                <div className='flex items-center gap-2 text-xs text-gray-500 mt-3'>
                    <span>{date ? moment(date).format("DD MMM YYYY") : "-"}</span> 
                    <span className="flex items-center gap-1"><BsClock className='text-red-500' /> {time}</span>
                </div>

                {/* Location Badge */}
                <div className='inline-flex items-center gap-2 text-[13px] text-cyan-600 bg-cyan-100 rounded-lg px-3 py-1 mt-3'>
                    <GrMapLocation className='text-sm' />
                    {location}
                </div>
            </div>
        </div>
    );
}

EventStoryCard.propTypes = {
    imageUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
    time: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};

export default EventStoryCard;
