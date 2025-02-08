import React from 'react';
import PropTypes from 'prop-types';
import { getInitials } from "../../utils/helper";

const ProfileInfo = ({ userInfo, onLogout }) => {
  return (
    userInfo && (
    <div className='flex items-center gap-3'>
      <div className='w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100'>
        {getInitials(userInfo?.fullName || "")} 
      </div>
      <p className='text-sm font-medium'>{userInfo?.fullName || ""}</p>
      <button className='text-sm text-sla underline' onClick={onLogout}>
        Logout
      </button>
    </div>
  )
)
};

// ✅ Adding prop validation
ProfileInfo.propTypes = {
  userInfo: PropTypes.shape({
    fullName: PropTypes.string, 
  }),
  onLogout: PropTypes.func.isRequired, 
};

export default ProfileInfo;
