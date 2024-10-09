import React, { useState, useEffect } from "react";
import { Typography, Modal, Box, Button } from "@mui/material";
import { deleteRoom, getAllRoom, postRoom, updateRoom } from "../services/getApi.js";
import { Modals } from "../components/editModal";

const Room = () => {
  const [allRooms, setAllRooms] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const openModals = () => setModalOpen(true);
  const closeModals = () => setModalOpen(false);

  useEffect(() => {
    getAllRoom()
      .then((res) => {
        setAllRooms(res);
      })
      .catch((error) => console.error("Error fetching rooms:", error));
  }, []);

  const [post, setPost] = useState({
    room_number: '',
    type: '',
    harga: ''
  });
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const submit = (e) => {
    e.preventDefault();
    if (!post.room_number || !post.type || !post.harga) {
      alert('Please fill in all fields');
      return;
    }

    postRoom(post)
      .then((res) => {
        console.log(res);
        alert('Room successfully created, please refresh the page!');
        handleClose();
      })
      .catch((error) => {
        console.error('Error :', error);
        alert('An error occurred while creating the room. Please try again later.');
      });
  };

  const handle = (e) => {
    const newPost = { ...post };
    newPost[e.target.id] = e.target.value;
    setPost(newPost);
  };

  const deletedRoom = async (id) => {
    try {
      await deleteRoom(id);
      const updatedRooms = allRooms.filter(room => room.id !== id);
      setAllRooms(updatedRooms);
      alert('Room successfully deleted!');
    } catch (error) {
      console.error('Error deleting room: ', error);
    }
  };

  const [put, setPut] = useState({
    id: '',
    room_number: '',
    type: '',
    harga: '',
  });

  const getDataId = () => {
    updateRoom(put, put.id)
      .then(res => {
        console.log(res);
        alert('Room successfully edited! Please refresh the page');
        closeModals();
      })
      .catch(error => console.error('Error:', error));
  };

  function handleData(e) {
    const newPut = { ...put };
    newPut[e.target.id] = e.target.value;
    setPut(newPut);
  }

  return (
    <div className="flex flex-col gap-2 justify-center items-center">
      <div className="w-[90%] flex items-center justify-between">
        <Typography sx={{ fontSize: "1.5rem", fontWeight: "600" }}>
          <h1>ROOMS</h1>
        </Typography>

        <Button variant="contained" color="primary" onClick={handleOpen}>
          Add Room
        </Button>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: '8px',
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Input Room Details
          </Typography>
          <form onSubmit={(e) => submit(e)}>
            <div className="flex flex-col gap-2 my-2">
            <input
                onChange={(e) => handle(e)}
                id="id"
                value={post.id}
                type="text"
                placeholder="id..."
                className="w-full outline outline-2 flex rounded-md outline-blue-600 p-2 text-blue-600"
              />
              <input
                onChange={(e) => handle(e)}
                id="room_number"
                value={post.room_number}
                type="text"
                placeholder="Room Number..."
                className="w-full outline outline-2 flex rounded-md outline-blue-600 p-2 text-blue-600"
              />
              <input
                onChange={(e) => handle(e)}
                id="type"
                value={post.type}
                type="text"
                placeholder="Room Type..."
                className="w-full outline outline-2 flex rounded-md outline-blue-600 p-2 text-blue-600"
              />
              <input
                onChange={(e) => handle(e)}
                id="harga"
                value={post.harga}
                type="number"
                placeholder="Price..."
                className="w-full outline outline-2 flex rounded-md outline-blue-600 p-2 text-blue-600"
              />
            </div>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </form>
        </Box>
      </Modal>

      <div className='w-full max-h-[500px] m-auto h-screen flex justify-center p-2 lg:max-w-[1300px] md:max-w-[800px] sm:max-w-[700px] gap-5 overflow-x-auto' style={{ scrollbarWidth: '6px' }}>
        <div className='w-full overflow-x-auto'>
          <table className='shadow-lg w-full min-w-[600px]'>
            <thead className='text-white rounded-t-lg'>
              <tr>
                <th className='py-3 bg-blue-600 rounded-tl-lg'>Id</th>
                <th className='py-3 bg-blue-600'>Room Number</th>
                <th className='py-3 bg-blue-600'>Type</th>
                <th className='py-3 bg-blue-600'>Price</th>
                <th className='py-3 bg-blue-600 rounded-tr-lg'>Action</th>
              </tr>
            </thead>
            <tbody className='text-center'>
              {allRooms.map((room, key) => (
                <tr className='bg-white cursor-pointer' key={key}>
                  <td className='py-3 px-6 rounded-bl-lg'>{room.id}</td>
                  <td className='py-3 px-6'>{room.room_number}</td>
                  <td className='py-3 px-6'>{room.type}</td>
                  <td className='py-3 px-6'>{room.harga}</td>
                  <td className='py-3 px-6 rounded-br-lg gap-x-2 flex justify-center items-center'>
                    <button className='bg-yellow-500 p-2 rounded font-md font-semibold text-white' onClick={() => {                   
                      openModals();
                      setPut(room);
                    }}>Edit</button>
                    <button onClick={() => { deletedRoom(room.id) }} className="bg-red-500 p-2 rounded font-md font-semibold text-white">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modals
        isBuka={modalOpen}
        onTutup={closeModals}
        judul="Edit Room"
      >
        <form onSubmit={(e) => { e.preventDefault(); getDataId(); }}>
          <div className='flex flex-col gap-y-3'>
            <input onChange={(e) => handleData(e)} id='id' value={put.id} type="text" placeholder='Enter Id...' className='w-full outline outline-2 flex rounded-md outline-blue-600 p-2 text-blue-600' readOnly />
            <input onChange={(e) => handleData(e)} id='room_number' value={put.room_number} type="text" placeholder='Room Number...' className='w-full outline outline-2 flex rounded-md outline-blue-600 p-2 text-blue-600' />
            <input onChange={(e) => handleData(e)} id='type' value={put.type} type="text" placeholder='Room Type...' className='w-full outline outline-2 flex rounded-md outline-blue-600 p-2 text-blue-600' />
            <input onChange={(e) => handleData(e)} id='harga' value={put.harga} type="number" placeholder='Price...' className='w-full outline outline-2 flex rounded-md outline-blue-600 p-2 text-blue-600' />
          </div>
          <Button type="submit" variant="contained" color="primary" style={{ marginTop: '10px' }}>
            Update Room
          </Button>
        </form>
      </Modals>
    </div>
  );
};

export default Room;

 