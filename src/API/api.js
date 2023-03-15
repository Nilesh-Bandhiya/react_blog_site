import axios from "axios"
import { toast } from 'react-toastify';

export const registerUser = async (user) => {
    try {
        const res = await axios.get(`http://localhost:5000/users?email=${user.email}`);
        const existUser = await res.data[0]
        if (existUser) {
            toast.error("Email is already exist try with another email")
        } else {
            const response = await axios.post(`http://localhost:5000/users`, user)
            const registeredUser = await response?.data;

            if (registeredUser) {
                toast.success("User Registered Successfully")
                return true;
            }
        }

    } catch (error) {
        toast.error(error.message)
    }
}

export const loginUser = async (user) => {
    try {
        const response = await axios.get(`http://localhost:5000/users?email=${user.email}&password=${user.password}`);
        const loggedinUser = await response?.data[0];

        if (loggedinUser) {
            if (loggedinUser.active) {
                toast.success("Loggedin Successfully")
                return loggedinUser
            } else {
                toast.error("Sorry You can't Loggedin")
            }
        } else {
            toast.error("Invalid Credentials")
        }

    } catch (error) {
        toast.error(error.message)
    }
}

export const deleteUser = async (id) => {
    await axios.post(`http://localhost:5000/users/${id}`)
        .then(console.log("deleted user successfully"))
        .catch(err => console.log(err.message))
}




// export const getAllUsers = async () => {
//     const response = await axios.get(`http://localhost:4000/users`);
//     if (response.data.length > 0) {
//         console.log("fetch user successfully");
//         return response

//     } else {
//         console.log("no user found");
//     }
// }


// export const getAllBlogs = async () => {
//     const response = await axios.get(`http://localhost:4000/blogs`);
//     if (response?.data.length > 0) {
//         console.log("fetch blogs successfully");
//         return response

//     } else {
//         console.log("no blog found");
//         return []
//     }
// }

export const addblogtoserver = async (blog) => {
    await axios.post(`http://localhost:5000/blogs`, blog)
        .then(console.log("blog successfully added"))
        .catch(err => console.log(err.message))
}

export const deleteblogfromserver = async (id) => {
    axios.delete(`http://localhost:5000/blogs/${id}`)
        .then(res => console.log("delete blog successfully"))
        .catch(err => console.log(err.message))
}

// export const getuserBlogs = async id => {
//     const response = await axios.get(`http://localhost:4000/blogs/?userid=${id}`);
//     if (response.data.length > 0) {
//         console.log("fetch user successfully");
//         console.log("userblogs", response.data);
//         return response

//     } else {
//         console.log("no user found");
//     }
// }