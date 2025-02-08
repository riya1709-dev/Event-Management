import React from 'react';
import PropTypes from 'prop-types';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { IoMdClose } from "react-icons/io";

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
  return (
    <div className='w-80 flex items-center px-4 bg-slate-100 rounded-md relative'>
      <input 
        type='text'
        placeholder='Search Events'
        className='w-full text-xs bg-transparent py-[11px] outline-none'
        value={value}
        onChange={onChange}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()} // Allow Enter key search
      />
      {value && (
        <IoMdClose 
          className='text-lg text-slate-500 cursor-pointer hover:text-black absolute right-10'
          onClick={onClearSearch}
        />
      )}
      <FaMagnifyingGlass 
        className="text-lg text-gray-600 cursor-pointer hover:text-black absolute right-4" 
        onClick={handleSearch} 
      />
    </div>
  );
};

// ✅ Adding PropTypes validation
SearchBar.propTypes = {
  value: PropTypes.string.isRequired,  
  onChange: PropTypes.func.isRequired, 
  handleSearch: PropTypes.func.isRequired, 
  onClearSearch: PropTypes.func.isRequired, 
};

export default SearchBar;
