import React from "react";
import PropTypes from "prop-types";
import { MdUpdate, MdClose, MdDeleteOutline } from "react-icons/md";
import { GrMapLocation } from "react-icons/gr";
import moment from "moment";

const ViewEvent = ({ eventInfo, onClose, onEditClick, onDeleteClick }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md sm:max-w-lg lg:max-w-2xl p-5 relative h-[90vh] flex flex-col">
        
        {/* Header with Actions */}
        <div className="flex justify-between items-center pb-3 border-b">
          <div className="flex gap-2">
            <button
              className="flex items-center gap-1 text-sm px-3 py-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
              onClick={onEditClick}
            >
              <MdUpdate className="text-lg" /> Update Story
            </button>
            <button
              className="flex items-center gap-1 text-sm px-3 py-1.5 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
              onClick={onDeleteClick}
            >
              <MdDeleteOutline className="text-lg" /> Delete
            </button>
          </div>
          <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>
            <MdClose className="text-xl" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-grow custom-scrollbar pr-2">
          
          {/* Title */}
          <h1 className="text-2xl font-semibold text-gray-900 mt-4">{eventInfo?.title || "Event Title"}</h1>

          {/* Image */}
          {eventInfo?.imageUrl ? (
            <img
              src={eventInfo.imageUrl}
              alt="Event"
              className="w-full h-52 object-cover rounded-lg mt-4 shadow-md"
            />
          ) : (
            <div className="w-full h-52 bg-gray-200 flex items-center justify-center rounded-lg mt-4">
              <p className="text-gray-500">No image available</p>
            </div>
          )}

          {/* Description */}
          <div className="mt-4">
            <span className="font-semibold text-gray-700">Description:</span>
            <p className="text-gray-700">{eventInfo?.description || "No description available."}</p>
          </div>

          {/* Date & Time */}
          <div className="mt-4 flex gap-4">
            <div className="w-1/2">
              <span className="font-semibold text-gray-700">Date:</span>
              <p className="text-gray-600">{eventInfo?.date ? moment(eventInfo.date).format("DD MMM YYYY") : "N/A"}</p>
            </div>
            <div className="w-1/2">
              <span className="font-semibold text-gray-700">Time:</span>
              <p className="text-gray-600">{eventInfo?.time || "N/A"}</p>
            </div>
          </div>

          {/* Location */}
          <div className="mt-4">
            <span className="font-semibold text-gray-700">Location:</span>
            <p className="text-gray-600 flex items-center gap-2">
              <GrMapLocation className="text-lg text-gray-500" />
              {eventInfo?.location || "Location not specified"}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

ViewEvent.propTypes = {
  eventInfo: PropTypes.shape({
    title: PropTypes.string,
    imageUrl: PropTypes.string,
    description: PropTypes.string,
    date: PropTypes.string,
    time: PropTypes.string,
    location: PropTypes.string,
  }),
  onClose: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};

export default ViewEvent;
