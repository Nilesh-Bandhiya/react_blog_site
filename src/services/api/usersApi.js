import axios from "axios";
import { toast } from "react-toastify";
import { APIS } from "../../constants/constants";

export const registerUser = async (user) => {
  try {
    const res = await axios.get(
      `${APIS.USERS_API}?email=${user.email}`
    );
    const existUser = await res.data[0];
    if (existUser) {
      toast.error("Email is already exist try with another email");
    } else {
      const response = await axios.post(`${APIS.USERS_API}`, user);
      const registeredUser = await response?.data;

      if (registeredUser) {
        toast.success("User Registered Successfully");
        return true;
      }
    }
  } catch (error) {
    toast.error(error.message);
  }
};

export const loginUser = async (user) => {
  try {
    const response = await axios.get(
      `${APIS.USERS_API}?email=${user.email}&password=${user.password}`
    );
    const loggedinUser = await response?.data[0];

    if (loggedinUser) {
      if (loggedinUser.active) {
        toast.success("Loggedin Successfully");
        return loggedinUser;
      } else {
        toast.error("Sorry You can't Loggedin");
      }
    } else {
      toast.error("Invalid Credentials");
    }
  } catch (error) {
    toast.error(error.message);
  }
};

export const updateUser = async (user, key) => {
  try {
    const response = await axios.put(
      `${APIS.USERS_API}/${user.id}`,
      user
    );
    const updatedUser = await response?.data;

    if (updatedUser) {
      if (key === "role") {
        toast.success(
          `Now ${user.firstName} is ${updatedUser.role}`
        );
        return true;
      } else if (key === "status") {
        toast.success(`Now ${user.firstName} is ${updatedUser.active ? "Active" : "Inactive"}`)
        return true;
      } else {
        toast.success("Profile Updated Successfully");
        return true;
      }
    }
  } catch (error) {
    toast.error(error.message);
  }
};

export const deleteUser = async (user) => {
  try {
    const response = await axios.delete(
      `${APIS.USERS_API}/${user.id}`
    );

    if (response.status === 200) {
      toast.success(`${user.firstName} Deleted Successfully`);
    }
  } catch (error) {
    toast.error(error.message);
  }
};
