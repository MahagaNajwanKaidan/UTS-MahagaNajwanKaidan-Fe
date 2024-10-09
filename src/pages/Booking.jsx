import React, { useState, useEffect } from "react";
import { Typography, Modal, Box, Button } from "@mui/material";
import { deleteBooking, getAllBookings, postBooking, updateBooking } from "../services/getApi.js";
import { Modals } from "../components/editModal";

const Booking = () => {
  const [allBooking, setAllBooking] = useState()

  const [modalOpen, setModalOpen] = useState(false);
  const openModals = () => setModalOpen(true);
  const closeModals = () => setModalOpen(false);

  useEffect(() => {
    getAllBookings(allBooking)
      .then((res) => {
        setAllBooking(res.data)
      })
  }, [])
  console.log(allBooking);

  const [post, setPost] = useState({
    type: '',
    checkindate: '',
    checkoutdate: '',
    total: '',
    userId: '',
    roomId: ''
  });
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const submit = (e) => {
    e.preventDefault();
    if (!post.type || !post.checkindate || !post.checkoutdate || !post.total || !post.userId || !post.roomId) {
      alert('Isi form data dengan lengkap');
      return;
    }

    postBooking(post)
      .then((res) => {
        console.log(res);
        if (post) {
          alert('Booking successfully created, please refresh the page!');
        }
        return res.data;
      })
      .catch((error) => {
        console.error('Error :', error);
        alert('An error occurred while creating Booking. Please try again later.');
      });
  };

  const handle = (e) => {
    const newPost = { ...post };
    newPost[e.target.id] = e.target.value;
    setPost(newPost);
  };

  const deletedBooking = async (id) => {
    try {
      await deleteBooking(id)
      const updatedBooking = allBooking.filter(booking => booking.id !== id);
      if (updatedBooking) {
        alert('Booking successfully deleted!')
      }
      setAllBooking(updatedBooking)
    } catch (error) {
      console.error('error deleting booking: ', error)
    }
  }

  const [put, setPut] = useState({
    id: '',
    type: '',
    checkindate: '',
    checkoutdate: '',
    total: '',
    userId: '',
    roomId: '',
  });

  const getDataId = () => {
    updateBooking(put, put.id)
      .then(res => {
        console.log(res);
        if (put) {
          alert('Booking successfully edited! Please refresh the page')
        }
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
          <h1>BOOKING</h1>
        </Typography>

        <Button variant="contained" color="primary" onClick={handleOpen}>
          Tambah Booking
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
            Input Booking Details
          </Typography>
          <form onSubmit={(e) => submit(e)}>
            <div className="flex flex-col gap-2 my-2">
              <input
                onChange={(e) => handle(e)}
                id="type"
                value={post.type}
                type="text"
                placeholder="Type..."
                className="w-full outline outline-2 flex rounded-md outline-blue-600 p-2 text-blue-600"
              />
              <input
                onChange={(e) => handle(e)}
                id="checkindate"
                value={post.checkindate}
                type="date"
                placeholder="Check-in Date..."
                className="w-full outline outline-2 flex rounded-md outline-blue-600 p-2 text-blue-600"
              />
              <input
                onChange={(e) => handle(e)}
                id="checkoutdate"
                value={post.checkoutdate}
                type="date"
                placeholder="Check-out Date..."
                className="w-full outline outline-2 flex rounded-md outline-blue-600 p-2 text-blue-600"
              />
              <input
                onChange={(e) => handle(e)}
                id="total"
                value={post.total}
                type="number"
                placeholder="Total..."
                className="w-full outline outline-2 flex rounded-md outline-blue-600 p-2 text-blue-600"
              />
              <input
                onChange={(e) => handle(e)}
                id="userId"
                value={post.userId}
                type="number"
                placeholder="User ID..."
                className="w-full outline outline-2 flex rounded-md outline-blue-600 p-2 text-blue-600"
              />
              <input
                onChange={(e) => handle(e)}
                id="roomId"
                value={post.roomId}
                type="number"
                placeholder="Room ID..."
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
                <th className='py-3 bg-blue-600'>Type</th>
                <th className='py-3 bg-blue-600'>Check-in Date</th>
                <th className='py-3 bg-blue-600'>Check-out Date</th>
                <th className='py-3 bg-blue-600'>Total</th>
                <th className='py-3 bg-blue-600'>User ID</th>
                <th className='py-3 bg-blue-600'>Room ID</th>
                <th className='py-3 bg-blue-600 rounded-tr-lg'>Action</th>
              </tr>
            </thead>
            {
              allBooking?.map((items, key) => {
                return (
                  <tbody className='text-center' key={key}>
                    <tr className='bg-white cursor-pointer'>
                      <td className='py-3 px-6 rounded-bl-lg'>{items.id}</td>
                      <td className='py-3 px-6'>{items.type}</td>
                      <td className='py-3 px-6'>{items.checkindate}</td>
                      <td className='py-3 px-6'>{items.checkoutdate}</td>
                      <td className='py-3 px-6'>{items.total}</td>
                      <td className='py-3 px-6'>{items.userId}</td>
                      <td className='py-3 px-6'>{items.roomId}</td>
                      <td className='py-3 px-6 rounded-br-lg gap-x-2 flex justify-center items-center'>
                        <button className='bg-yellow-500 p-2 rounded font-md font-semibold text-white ' onClick={openModals}>Edit</button>
                        <form onSubmit={(e) => { e.preventDefault(); getDataId(); }}>
                          <Modals
                            isBuka={modalOpen}
                            onTutup={closeModals}
                            judul="Edit Booking"
                          >
                            <div className='flex flex-col gap-y-3'>
                              <input onChange={(e) => handleData(e)} id='id' value={put.id} type="text" placeholder='Enter Id...' className='w-full outline outline-2 flex rounded-md outline-blue-600 p-2 text-blue-600' />
                              <input onChange={(e) => handleData(e)} id='type' value={put.type} type="text" placeholder='Type...' className='w-full outline outline-2 flex rounded-md outline-blue-600 p-2 text-blue-600' />
                              <input onChange={(e) => handleData(e)} id='checkindate' value={put.checkindate} type="date" placeholder='Check-in Date...' className='w-full outline outline-2 flex rounded-md outline-blue-600 p-2 text-blue-600' />
                              <input onChange={(e) => handleData(e)} id='checkoutdate' value={put.checkoutdate} type="date" placeholder='Check-out Date...' className='w-full outline outline-2 flex rounded-md outline-blue-600 p-2 text-blue-600' />
                              <input onChange={(e) => handleData(e)} id='total' value={put.total} type="number" placeholder='Total...' className='w-full outline outline-2 flex rounded-md outline-blue-600 p-2 text-blue-600' />
                              <input onChange={(e) => handleData(e)} id='userId' value={put.userId} type="number" placeholder='User ID...' className='w-full outline outline-2 flex rounded-md outline-blue-600 p-2 text-blue-600' />
                              <input onChange={(e) => handleData(e)} id='roomId' value={put.roomId} type="number" placeholder='Room ID...' className='w-full outline outline-2 flex rounded-md outline-blue-600 p-2 text-blue-600' />
                            </div>
                          </Modals>
                        </form>
                        <button onClick={() => { deletedBooking(items.id) }} className="bg-red-500 p-2 rounded font-md font-semibold text-white">Delete</button>
                      </td>
                    </tr>
                  </tbody>
                )
              })
            }
          </table>
        </div>
      </div>
    </div>
  );
};

export default Booking;
