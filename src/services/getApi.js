import axios from "axios";

//user

export const postUser = async (ax) => {
    return await axios.post('http://localhost:3001/user/create', ax)
    .then(response => response)
    .catch(error => {
        console.error("Error posting user:", error);
        throw error;
    });
};

export const getAllUser = () => {
    return axios.get('http://localhost:3001/user')
    .then(response => response)
}

export const updateUser = async (data, id) => {
    return await axios.put(`http://localhost:3001/user/update/` + id, data)
    .then(res => res.data)
}

export const deleteUser = async (id) => {
    return await axios.delete(`http://localhost:3001/user/delete/${id}`)
    .then(res => res.data)
}

// Booking

export const postBooking = async (bookingData) => {
    return await axios.post('http://localhost:3001/booking/create', bookingData)
    .then(response => response)
    .catch(error => {
        console.error("Error posting booking:", error);
        throw error;
    });
};

export const getAllBookings = () => {
    return axios.get('http://localhost:3001/booking/')
    .then(response => response)
    .catch(error => {
        console.error("Error fetching bookings:", error);
        throw error;
    });
};

export const getBookingById = async (id) => {
    return await axios.get(`http://localhost:3001/booking/find/${id}`)
    .then(response => response.data)
    .catch(error => {
        console.error("Error fetching booking by id:", error);
        throw error;
    });
};

export const updateBooking = async (data, id) => {
    return await axios.put(`http://localhost:3001/booking/update${id}`, data)
    .then(response => response.data)
    .catch(error => {
        console.error("Error updating booking:", error);
        throw error;
    });
};

export const deleteBooking = async (id) => {
    return await axios.delete(`http://localhost:3001/booking/delete${id}`)
    .then(response => response.data)
    .catch(error => {
        console.error("Error deleting booking:", error);
        throw error;
    });
};

//room

// Fungsi untuk mendapatkan semua data Room
export const getAllRoom = () => {
    return axios.get('http://localhost:3001/room')
        .then(response => response.data)
        .catch(error => {
            console.error("Error fetching rooms:", error);
            throw error;
        });
};

// Fungsi untuk menambahkan Room baru
export const postRoom = async (roomData) => {
    return await axios.post('http://localhost:3001/room/create', roomData)
        .then(response => response.data)
        .catch(error => {
            console.error("Error posting room:", error);
            throw error;
        });
};

// Fungsi untuk mengupdate Room
export const updateRoom = async (data, id) => {
    return await axios.put(`http://localhost:3001/room/update/${id}`, data)
        .then(res => res.data)
        .catch(error => {
            console.error("Error updating room:", error);
            throw error;
        });
};

// Fungsi untuk menghapus Room
export const deleteRoom = async (id) => {
    return await axios.delete(`http://localhost:3001/room/delete/${id}`)
        .then(res => res.data)
        .catch(error => {
            console.error("Error deleting room:", error);
            throw error;
        });
};

//Rating Room


// API functions for reviews
export const postReview = async (reviewData) => {
    return await axios.post('http://localhost:3001/reviews/create', reviewData)
    .then(response => response)
    .catch(error => {
        console.error("Error creating review:", error);
        throw error;
    });
};

export const getAllReviews = () => {
    return axios.get('http://localhost:3001/reviews')
    .then(response => response)
};

export const updateReview = async (data, id) => {
    return await axios.put(`http://localhost:3001/reviews/update/${id}`, data)
    .then(res => res.data)
};

export const deleteReview = async (id) => {
    return await axios.delete(`http://localhost:3001/reviews/delete/${id}`)
    .then(res => res.data)
};

//payment

// POST: Create a new payment
export const postPayment = async (paymentData) => {
    return await axios.post('http://localhost:3001/payment/create/', paymentData)
    .then(response => response)
    .catch(error => {
        console.error("Error posting payment:", error);
        throw error;
    });
};

// GET: Fetch all payments
export const getAllPayments = () => {
    return axios.get('http://localhost:3001/payment')
    .then(response => response)
    .catch(error => {
        console.error("Error fetching payments:", error);
        throw error;
    });
};

// PUT: Update a payment by ID
export const updatePayment = async (data, id) => {
    return await axios.put(`http://localhost:3001/payment/update/` + id, data)
    .then(response => response.data)
    .catch(error => {
        console.error("Error updating payment:", error);
        throw error;
    });
};

// DELETE: Delete a payment by ID
export const deletePayment = async (id) => {
    return await axios.delete(`http://localhost:3001/payment/delete/${id}`)
    .then(response => response.data)
    .catch(error => {
        console.error("Error deleting payment:", error);
        throw error;
    });
};

//Admin

