import React from 'react';
import PropTypes from 'prop-types';

const EmptyEvent = ({ message }) => {
    return (
        <div className='flex  items-center justify-center mt-20'>
            <p className='w-1/2 text-2xl font-bold text-slate-700 text-center leading-7'>{message}</p>
        </div>
    );
};

// Define PropTypes
EmptyEvent.propTypes = {
    message: PropTypes.string, // Optional string prop
};

export default EmptyEvent;
