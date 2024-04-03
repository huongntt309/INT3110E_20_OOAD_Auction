import Admin from "../models/Admin";
import bcrypt from "bcrypt";
import Complaint from "../models/Complaint";

const getAllAdmins = async () => {
  try {
    const result = await Admin.find({});


    return {
      errorCode: 0,
      data: result,
      message: "Get all users successfully",
    };
  } catch (error) {
    return {
      errorCode: -1,
      data: error.message,
      message: "Something's wrong",
    };
  }
};

const getAllComplaints = async () => {
  try {
    const result = await Complaint.find({});
    return {
      errorCode: 0,
      data: result,
      message: "Get all users successfully",
    };
  } catch (error) {
    return {
      errorCode: -1,
      data: error.message,
      message: "Something's wrong",
    };
  }
};
const respondAComplaint = async () => {
  try {
    const result = await Complaint.find({});
    return {
      errorCode: 0,
      data: result,
      message: "Get all users successfully",
    };
  } catch (error) {
    return {
      errorCode: -1,
      data: error.message,
      message: "Something's wrong",
    };
  }
};
const getAComplaint = async (id) => {
  try {
    const result = await Complaint.find({ _id: id });
    return {
      errorCode: 0,
      data: result,
      message: "Get Complaint successfully",
    };
  } catch (error) {
    return {
      errorCode: -1,
      data: error.message,
      message: "Something's wrong",
    };
  }
};


const loginAdmin = async (msv, password) => {
  try {
    const Admin = await Admin.findOne({ msv: msv });
    if (Admin) {
      const isValidPassword = await bcrypt.compare(password, Admin.password);
      if (isValidPassword) {

        return {
          errorCode: 0,
          data: Admin,
          message: "Login successfully!",
        };
      }
    }
    return {
      errorCode: 1,
      data: {},
      message: "msv or password was wrong",
    };
  } catch (error) {
    return {
      errorCode: -1,
      data: error.message,
      message: "Something's wrong with server",
    };
  }
};



export {
  getAllAdmins,
  loginAdmin,
  getAllComplaints,
  respondAComplaint,
  getAComplaint
};
