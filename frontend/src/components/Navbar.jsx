import React from 'react';
import PropTypes from 'prop-types';
import LOGO from "../assets/image/LOGO.png";
import ProfileInfo from "./Cards/ProfileInfo";
import { useNavigate } from 'react-router-dom';
import SearchBar from "../components/input/SearchBar";

const Navbar = ({ userInfo, searchQuery, setSearchQuery, onSearchNote, handleClearSearch }) => {
  const isToken = localStorage.getItem("token");
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleSearch = () => { 
    if (searchQuery.trim()) {  // Trim to avoid empty spaces issue
      onSearchNote(searchQuery.trim()); 
    }
  };

  const onClearSearch = () => {
    setSearchQuery("");
    handleClearSearch(); // Ensure events reset properly
  };

  return (
    <div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow sticky top-0 z-10'>
      <img src={LOGO} alt="event-management" className='h-12' />
      {isToken && (
        <>
          <SearchBar 
            value={searchQuery}
            onChange={({ target }) => setSearchQuery(target.value)}
            handleSearch={handleSearch}
            onClearSearch={onClearSearch}
          />
          <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
        </>
      )}
    </div>
  );
};

// ✅ Adding PropTypes validation
Navbar.propTypes = {
  userInfo: PropTypes.object, 
  searchQuery: PropTypes.string.isRequired, 
  setSearchQuery: PropTypes.func.isRequired,
  onSearchNote: PropTypes.func.isRequired, 
  handleClearSearch: PropTypes.func.isRequired,
};

export default Navbar;
