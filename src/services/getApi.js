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
