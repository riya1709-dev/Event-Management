import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import { useNavigate } from 'react-router-dom';
import EventStoryCard from "../../components/Cards/EventStoryCard"
import axiosInstance from '../../utils/axiosinstance';
import { MdAdd } from "react-icons/md"
import Modal from "react-modal"
import EmptyEvent from "../../components/Cards/EmptyEvent"
import ViewEvent from "../Home/ViewEvent"
import AddEditEvent from "../Home/AddEditEvent"
import { toast, ToastContainer } from "react-toastify"

const Home = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [allevents, setAllevents] = useState([]);

 const [searchQuery, setSearchQuery] = useState("");
 const [FilterType,setFilterType]=useState("")

  const [openAddEditModel, setopenAddEditModel] = useState({
    isShown: false,
    type: "add",
    data: null
  });
  const [openViewModal, setopenViewModal] = useState({
    isShown: false,
    data: null
  })

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get('/event/get-user');
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.clear();
        navigate('/login');
      }
    }
  };


  //get al events
  const getAllevents = async () => {
    try {
      const response = await axiosInstance.get('/event/get-event');
      console.log("API Response:", response.data); // ✅ Check if data is received in frontend

      if (response.data && response.data.events.length > 0) {
        console.log("Setting Events in State:", response.data.events);
        setAllevents(response.data.events);
      } else {
        console.warn("No events found in API response.");
      }
    } catch (err) {
      console.error("Error fetching events:", err);
    }
  };
  const handleEdit = (data) => {
    setopenAddEditModel({ isShown: true, type: "edit", data: data })
  }
  //handle event click
  const handleViewEvent = (data) => {
    setopenViewModal({ isShown: true, data })
  }

  //delete event
  const deleteEvent = async (data) => {
    if (!data || !data._id) {
        console.error("Invalid event data:", data);
        return;
    }

    const Eventid = data._id;
    console.log("Deleting event with ID:", Eventid);

    try {
      const response = await axiosInstance.delete(`/event/delete-event/${Eventid}`);

        console.log("Delete Response:", response.data); // Debugging API response

        if (response.status === 200 || response.status === 204) {
            toast.error("Event deleted successfully!");

            // Close view modal before updating events
            setopenViewModal({ isShown: false, data: null });

            await getAllevents();  // Ensure frontend updates
        } else {
            console.warn("Unexpected response:", response);
        }
    } catch (error) {
        console.error("Error deleting event:", error);
        toast.error("Failed to delete event");
    }
};
//search event
const onSearchEvent=async(query)=>{
  try{
    const response = await axiosInstance.get("/event/search-event",{
      params:{
        query:query
      }
    });
    if(response.data && response.data.events){
      setFilterType(response.data.events);
      setAllevents(response.data.events)
    }
  }catch(err){
    console.error("Error searching events:", err);
  }
}

const handleClearSearch=()=>{
  setFilterType("");
  getAllevents()
}
  useEffect(() => {
    getUserInfo();
    getAllevents();
  }, []);
  return (
    <>
      <Navbar userInfo={userInfo} searchQuery={searchQuery} setSearchQuery={setSearchQuery}
      onSearchNote={onSearchEvent}
      handleClearSearch={handleClearSearch} />
      <div className="container mx-auto py-6 md:py-10 flex justify-center px-4 md:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 w-full">
          {allevents.length > 0 ? (
            allevents.map((item) => (
              <EventStoryCard
                key={item._id}
                imageUrl={item.imageUrl}
                title={item.title}
                description={item.description}
                date={item.date}
                time={item.time}
                location={item.location}
                onClick={() => handleViewEvent(item)}
              />
            ))
          ) : (
            <EmptyEvent  message={'Start creating your fisrt Event! Click "Add" button to create event...Lets get started'}/>
          )}
        </div>
      </div>

      {/* add and edit event */}
      <Modal isOpen={openAddEditModel.isShown}
        onRequestClose={() => { }}
        style={{
          overlay: {
            backgroundColor: 'rgba(0,0,0,0.2)',
            zIndex: 999,
          },
        }}
        appElement={document.getElementById("root")}
        className="model-box">
        <AddEditEvent
          type={openAddEditModel.type}
          eventInfo={openAddEditModel.data}
          onClose={() => {
            setopenAddEditModel({ isShown: false, type: "add", data: null })
          }}
          getAllevents={getAllevents}
        />
      </Modal>

      {/* view event */}
      <Modal isOpen={openViewModal.isShown}
        onRequestClose={() => { }}
        style={{
          overlay: {
            backgroundColor: 'rgba(0,0,0,0.2)',
            zIndex: 999,
          },
        }}
        appElement={document.getElementById("root")}
        className="model-box">
        <ViewEvent
          eventInfo={openViewModal.data || null}
          onClose={() => {
            setopenViewModal((prevState) => ({ ...prevState, isShown: false }))
          }}
          onEditClick={() => {
            setopenViewModal((prevState) => ({ ...prevState, isShown: false }))
            handleEdit(openViewModal.data || null)
          }}
          onDeleteClick={() => {
            deleteEvent(openViewModal.data);
        }}
        
        />
      </Modal>
      <button className='w-16 h-16 flex items-center justify-center rounded-full bg-cyan-400 hover:bg-cyan-500 fixed right-10 bottom-10' onClick={() => {
        setopenAddEditModel({ isShown: true, type: "add", data: null })
      }}>
        <MdAdd className="text-[32px] text-white" />
      </button>
      <ToastContainer />
    </>
  );
};

export default Home;
