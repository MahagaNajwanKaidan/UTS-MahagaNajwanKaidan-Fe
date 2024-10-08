import React, { useState, useEffect } from "react";
import { Typography, Modal, Box, Button } from "@mui/material";
import { deleteUser, getAllUser, postUser, updateUser } from "../services/getApi";
import { Modals } from "../components/editModal";

const Home = () => {
  const [allUser, setAllUser] = useState()

  const [modalOpen, setModalOpen] = useState(false);
    const openModals = () => setModalOpen(true);
    const closeModals = () => setModalOpen(false);

  useEffect(() => {
      getAllUser(allUser)
      .then((res) => {
          setAllUser(res.data)
      })
  }, [])
  console.log(allUser);

  const [post, setPost] = useState({
    name: '',
    email: '',
    phonenumber: ''
  });
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const submit = (e) => {
    e.preventDefault();
    if (!post.name || !post.email || !post.phonenumber) {
      alert('Isi form data dengan lengkap');
      return;
    }

    postUser(post)
      .then((res) => {
        console.log(res);
        if (post) {
          alert('Table successfully created, please refresh the page!');
        }
        return res.data;
      })
      .catch((error) => {
        console.error('Error :', error);
        alert('An error occurred while creating Table. Please try again later.');
      });
  };

  const handle = (e) => {
    const newPost = { ...post };
    newPost[e.target.id] = e.target.value;
    setPost(newPost);
  };

  const deletedUser = async (id) => {
    try{
        await deleteUser(id)
        const updatedPost = allUser.filter(post => post.id !== id);
        if(updatedPost){
            alert('Customer successfully deleted!')
        }
        setAllUser(updatedPost)
    }catch (error){
        console.error('error deleting post: ', error)
    }
}

const [put, setPut] = useState({
  id: '', // Add ID field to match API endpoint
  name: '',
  email:'',
  phonenumber:'',
});

const getDataId = () => {
  updateUser(put, put.id)
  .then(res => {
      console.log(res);
      if(put){
          alert('User successfully edited! Please refresh the page')
      }
      closeModals(); // Close the modal after successful PUT request
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
          <h1>USER</h1>
        </Typography>

        {/* Tombol untuk memunculkan modal */}
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Tambah User
        </Button>
      </div>

      {/* Modal */}
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
            Input User Details
          </Typography>
          <form onSubmit={(e) => submit(e)}>
            <div className="flex flex-col gap-2 my-2">
              <input
                onChange={(e) => handle(e)}
                id="name"
                value={post.name}
                type="text"
                placeholder="Name..."
                className="w-full outline outline-2 flex rounded-md outline-blue-600 p-2 text-blue-600"
              />
              <input
                onChange={(e) => handle(e)}
                id="email"
                value={post.email}
                type="text"
                placeholder="Email..."
                className="w-full outline outline-2 flex rounded-md outline-blue-600 p-2 text-blue-600"
              />
              <input
                onChange={(e) => handle(e)}
                id="phonenumber"
                value={post.phonenumber}
                type="text"
                placeholder="Phone Number..."
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
                      <th className='py-3 bg-blue-600'>Name</th>
                      <th className='py-3 bg-blue-600'>Email</th>
                      <th className='py-3 bg-blue-600'>Phone Number</th>
                      <th className='py-3 bg-blue-600 rounded-tr-lg'>Action</th>
                  </tr>
                  </thead>
                      {
                          allUser?.map((items, key) => {
                              return(                                        
                              <tbody className='text-center'>
                                  <tr className='bg-white cursor-pointer' key={key}>
                                      <td className='py-3 px-6 rounded-bl-lg'>{items.id}</td>
                                      <td className='py-3 px-6'>{items.name}</td>
                                      <td className='py-3 px-6'>{items.email}</td>
                                      <td className='py-3 px-6'>{items.phonenumber}</td>
                                      <td className='py-3 px-6 rounded-br-lg gap-x-2 flex justify-center items-center'>
                                          <button className='' onClick={openModals}>Edit</button>
                                          <form onSubmit={(e) => { e.preventDefault(); getDataId(); }}>        
                                          <Modals
                                              isBuka={modalOpen} 
                                              onTutup={closeModals} 
                                              judul="Edit Customer"
                                          >
                                              <div className='flex flex-col gap-y-3'>
                                                  <input onChange = {(e) => handleData(e)} id='id' value={put.id} type="text" placeholder='Enter Id...' className='w-full outline outline-2 flex rounded-md outline-blue-600 p-2 text-blue-600'/>

                                                  <input onChange = {(e) => handleData(e)} id='name' value={put.name} type="text" placeholder='Name...' className='w-full outline outline-2 flex rounded-md outline-blue-600 p-2 text-blue-600'/>

                                                  <input onChange = {(e) => handleData(e)} id='email' value={put.email} type="text" placeholder='Email...' className='w-full outline outline-2 flex rounded-md outline-blue-600 p-2 text-blue-600'/>

                                                  <input onChange = {(e) => handleData(e)} id='phonenumber' value={put.phonenumber} type="text" placeholder='phonenumber...' className='w-full outline outline-2 flex rounded-md outline-blue-600 p-2 text-blue-600'/>
                                              </div>
                                          </Modals>
                                          </form>
                                          <button onClick={() => {deletedUser(items.id)}} className="bg-red-500 p-2 rounded font-md font-semibold text-white">Delete</button>
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

export default Home;