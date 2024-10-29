import React, { useState, useEffect } from "react";
import { Typography, Modal, Box, Button } from "@mui/material";
import { deletePayment, getAllPayments, postPayment, updatePayment } from "../services/getApi.js";

const Payment = () => {
  const [allPayments, setAllPayments] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [post, setPost] = useState({ price: '', paymentMethod: '', paymentDate: '', userId: '', bookingId: '' });
  const [put, setPut] = useState({ id: '', price: '', paymentMethod: '', paymentDate: '', userId: '', bookingId: '' });
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    getAllPayments()
      .then((res) => {
        setAllPayments(res.data);
      })
      .catch((error) => console.error('Error fetching payments:', error));
  }, []);

  const handlePostChange = (e) => {
    const { id, value } = e.target;
    setPost((prev) => ({ ...prev, [id]: value }));
  };

  const handlePutChange = (e) => {
    const { id, value } = e.target;
    setPut((prev) => ({ ...prev, [id]: value }));
  };

  const submit = (e) => {
    e.preventDefault();
    if (!post.price || !post.paymentMethod || !post.paymentDate || !post.userId || !post.bookingId) {
      alert('Please fill in all fields');
      return;
    }

    postPayment(post)
      .then((res) => {
        alert('Payment successfully created! Please refresh the page.');
        setAllPayments([...allPayments, res.data]);
      })
      .catch((error) => {
        console.error('Error creating payment:', error);
        alert('An error occurred while creating payment. Please try again later.');
      });
  };

  const deletePaymentById = (id) => {
    deletePayment(id)
      .then(() => {
        alert('Payment successfully deleted!');
        setAllPayments(allPayments.filter((payment) => payment.id !== id));
      })
      .catch((error) => {
        console.error('Error deleting payment:', error);
      });
  };

  const updateData = (e) => {
    e.preventDefault();
    updatePayment(put, put.id)
      .then((res) => {
        alert('Payment successfully updated! Please refresh the page.');
        setModalOpen(false);
        setAllPayments((prevPayments) =>
          prevPayments.map((payment) =>
            payment.id === put.id ? { ...put } : payment
          )
        );
      })
      .catch((error) => {
        console.error('Error updating payment:', error);
      });
  };

  return (
    <div className="flex flex-col gap-2 justify-center items-center">
      <div className="w-[90%] flex items-center justify-between">
        <Typography sx={{ fontSize: "1.5rem", fontWeight: "600" }}>
          <h1>PAYMENT</h1>
        </Typography>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Add Payment
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
            Add Payment
          </Typography>
          <form onSubmit={submit}>
            <div className="flex flex-col gap-2 my-2">
            <select
                onChange={handlePostChange}
                id="price"
                value={post.price}
              className="w-full outline outline-2 flex rounded-md outline-blue-600 p-2 text-blue-600">
               <option value="">Pilih Harga</option>
               <option value="100000">100,000</option>
               <option value="150000">150,000</option>
               <option value="200000">200,000</option>
              </select>

              <input
                onChange={handlePostChange}
                id="paymentMethod"
                value={post.paymentMethod}
                type="text"
                placeholder="Payment Method"
                className="w-full outline outline-2 flex rounded-md outline-blue-600 p-2 text-blue-600"
              />
              <input
                onChange={handlePostChange}
                id="paymentDate"
                value={post.paymentDate}
                type="date"
                className="w-full outline outline-2 flex rounded-md outline-blue-600 p-2 text-blue-600"
              />
              <input
                onChange={handlePostChange}
                id="userId"
                value={post.userId}
                type="number"
                placeholder="User ID"
                className="w-full outline outline-2 flex rounded-md outline-blue-600 p-2 text-blue-600"
              />
              <input
                onChange={handlePostChange}
                id="bookingId"
                value={post.bookingId}
                type="number"
                placeholder="Booking ID"
                className="w-full outline outline-2 flex rounded-md outline-blue-600 p-2 text-blue-600"
              />
            </div>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </form>
        </Box>
      </Modal>

      <div className='w-full max-h-[500px] m-auto h-screen flex justify-center p-2 lg:max-w-[1300px] md:max-w-[800px] sm:max-w-[700px] gap-5 overflow-x-auto'>
        <div className='w-full overflow-x-auto'>
          <table className='shadow-lg w-full min-w-[600px]'>
            <thead className='text-white rounded-t-lg'>
              <tr>
                <th className='py-3 bg-blue-600 rounded-tl-lg'>Id</th>
                <th className='py-3 bg-blue-600'>Price</th>
                <th className='py-3 bg-blue-600'>Payment Method</th>
                <th className='py-3 bg-blue-600'>Payment Date</th>
                <th className='py-3 bg-blue-600'>User ID</th>
                <th className='py-3 bg-blue-600'>Booking ID</th>
                <th className='py-3 bg-blue-600 rounded-tr-lg'>Action</th>
              </tr>
            </thead>
            <tbody>
              {allPayments.map((payment) => (
                <tr key={payment.id} className='bg-white'>
                  <td className='py-3 px-6'>{payment.id}</td>
                  <td className='py-3 px-6'>{payment.price}</td>
                  <td className='py-3 px-6'>{payment.paymentMethod}</td>
                  <td className='py-3 px-6'>{new Date(payment.paymentDate).toLocaleDateString()}</td>
                  <td className='py-3 px-6'>{payment.userId}</td>
                  <td className='py-3 px-6'>{payment.bookingId}</td>
                  <td className='py-3 px-6 flex justify-center gap-2'>
                    <button
                      onClick={() => {
                        setPut(payment);
                        setOpen(true);
                      }}
                      className="bg-yellow-500 p-2 rounded text-white"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deletePaymentById(payment.id)}
                      className="bg-red-500 p-2 rounded text-white"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Payment;


