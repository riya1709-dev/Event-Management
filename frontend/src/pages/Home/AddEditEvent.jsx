import React, { useState } from 'react';
import { MdAdd, MdDeleteOutline, MdUpdate, MdClose } from 'react-icons/md';
import PropTypes from 'prop-types';
import moment from "moment"
import DataSelector from "../../components/input/DataSelector";
import ImageSelector from "../../components/input/ImageSelector";
import axiosInstance from '../../utils/axiosinstance';
import { toast } from 'react-toastify';
import uploadImage from "../../utils/uploadImage"

const AddEditEvent = ({ eventInfo, type, onClose, getAllevents }) => {
    const [title, setTitle] = useState(eventInfo?.title || "");
    const [description, setDescription] = useState(eventInfo?.description || "");
    const [image, setImage] = useState(eventInfo?.imageUrl || "");
    const [date, setDate] = useState(eventInfo?.date || "");
    const [time, setTime] = useState(eventInfo?.time || "");
    const [location, setLocation] = useState(eventInfo?.location || "");

    const [error, setError]=useState("")


    const updateEvent = async () => {
        const EventId = eventInfo._id;
        let imageUrl = eventInfo?.imageUrl || "";

        try {
            if (typeof image === "object") {
                const imageUpload = await uploadImage(image);
                imageUrl = imageUpload.imageUrl || "";
            }
    
            const postData = {
                title,
                description,
                imageUrl,
                date: date ? moment(date).valueOf() : moment().valueOf(),
                time,
                location,
            };
    
    
            const response = await axiosInstance.put(`/event/edit-event/${EventId}`, postData);
    
            if (response?.data) { 
                toast.success("Event updated successfully!");
                await getAllevents();  
                onClose(); 
            }
            
        } catch (error) {
            console.error("Update Event Error:", error);
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError(error.message);
            }
        }
    };
    
    const addNewevent=async () => {
        try {
            let imageUrl=""
            if(image){
                const imageUpload=await uploadImage(image)
                imageUrl=imageUpload.imageUrl || "";
            }
            const response = await axiosInstance.post("/event/add-event",{
                title:title,
                description:description,
                imageUrl:imageUrl || "",
                date:date? moment(date).valueOf():moment().valueOf(),
                time:time,
                location:location,
                })
                if(response.data && response.data.event){
                    toast.success("story added successfully")
                    getAllevents()
                    onClose()
                }
            } catch (error) {
                  if(error.response && error.response.data && error.response.data.message){
                    setError(error.response.data.message)
                  }else{
                    setError(error.message)
                  }
        }
    }

    const handleAddOrUpdateClick = () => {
        console.log("Input Data:", { title, description, image, date, time, location });
        // Add or update event logic here

        if(!title){
            setError("please enter title")
            return
        }
        if(!description){
            setError("please enter description")
            return
            }
            setError("")
            if(type === "edit"){
                updateEvent();
            }else{
                addNewevent()
            }
        
    };

    const handleDeleteEventImg = async() => {
        const deleteimagRes= await axiosInstance.delete("/event/delete-image",{
            params:{
                imageUrl : eventInfo.imageUrl,
            },
        })
        if(deleteimagRes.data){
            const Eventid= eventInfo._id;
            const postData={
                title,
                description,
                imageUrl:"",
                date: date ? moment(date).valueOf() : moment().valueOf(),
                time,
                location,
            }
            const response= await axiosInstance.put("/event/edit-event/"+Eventid,postData)
            setImage(null)
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/20">
            {/* Outer White Box */}
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl max-h-[90vh] overflow-y-auto">
                
                {/* Header */}
                

                {/* Scrollable Content */}
                <div className="p-4 overflow-y-auto max-h-[75vh] custom-scrollbar">
                <div className="flex items-center justify-between px-4 py-3 border-b">
                    <h5 className="text-lg font-medium text-slate-700">
                        {type === 'add' ? 'Add Event' : 'Update Event'}
                    </h5>
                    <button className="text-gray-500" onClick={onClose}>
                        <MdClose className="text-xl" />
                    </button>
                </div>
                {error && (
                    <p className='text-red-500 text-xs pt-2 text-right'>{error}</p>
                )}
                    {/* Title */}
                    <div>
                        <label className="text-sm font-semibold text-gray-600">TITLE</label>
                        <input 
                            type="text"
                            className="w-full p-2 text-sm border border-gray-300 rounded"
                            placeholder="Event Name"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    {/* Image Selector */}
                    <ImageSelector 
                        image={image}
                        setImage={setImage}
                        handleDeleteImg={handleDeleteEventImg}
                    />

                    {/* Description */}
                    <div>
                        <label className="text-sm font-semibold text-gray-600">DESCRIPTION</label>
                        <textarea
                            className="w-full p-2 text-sm border border-gray-300 rounded resize-none"
                            placeholder="Description"
                            rows={3}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    {/* Date Selector */}
                    <div>
                        <label className="text-sm font-semibold text-gray-600">EVENT DATE</label>
                        <DataSelector date={date} setdate={setDate} />
                    </div>

                    {/* Time & Location - Side by Side */}
                    <div className="flex gap-2">
                        <div className="w-1/2">
                            <label className="text-sm font-semibold text-gray-600">TIME</label>
                            <input
                                type="time"
                                className="w-full p-2 text-sm border border-gray-300 rounded"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                            />
                        </div>
                        <div className="w-1/2">
                            <label className="text-sm font-semibold text-gray-600">LOCATION</label>
                            <input
                                type="text"
                                className="w-full p-2 text-sm border border-gray-300 rounded"
                                placeholder="Enter location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="p-4 border-t">
                    <button 
                        className="w-full p-2 text-white bg-blue-500 rounded-lg"
                        onClick={handleAddOrUpdateClick}
                    >
                        {type === 'add' ? <><MdUpdate className="inline" /> ADD EVENT</> : <><MdAdd className="inline" /> UPDATE EVENT</>}
                    </button>
                </div>
                </div>

                {/* Submit Button */}
                
            </div>
        </div>
    );
};

AddEditEvent.propTypes = {
    eventInfo: PropTypes.shape({
        _id: PropTypes.string, 
        imageUrl: PropTypes.string,
        title: PropTypes.string,
        description: PropTypes.string,
        date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
        time: PropTypes.string,
        location: PropTypes.string,
    }),
    type: PropTypes.oneOf(['add', 'edit']).isRequired,
    onClose: PropTypes.func.isRequired,
    getAllevents: PropTypes.func.isRequired,
};

export default AddEditEvent;
