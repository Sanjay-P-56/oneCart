import React, { createContext, useState, useContext, useEffect } from "react";
import { authDataContext } from "./AuthContext";
import axios from "axios";

export const adminDataContext = createContext();

function AdminContext({ children }) {
  const [adminData, setAdminData] = useState(null);
  const { serverUrl } = useContext(authDataContext);

  const getAdmin = async () => {
    try {
      const res = await axios.get(`${serverUrl}/api/user/getAdmin`, {
        withCredentials: true, // send cookie
      });
      setAdminData(res.data);
      console.log("Admin Data:", res.data);
    } catch (err) {
      console.log("Error fetching admin:", err.response?.data || err.message);
    }
  };

  // Only fetch admin if token cookie exists
  useEffect(() => {
    if (document.cookie.includes("token")) {
      getAdmin();
    }
  }, []);

  const value = {
    adminData,
    setAdminData,
    getAdmin,
  };

  return (
    <adminDataContext.Provider value={value}>
      {children}
    </adminDataContext.Provider>
  );
}

export default AdminContext;
