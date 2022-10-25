import { useEffect, useState } from "react";
import { useContext, createContext } from "react";
import jwt from "jwt-decode";

const Context = createContext();

export const Contextprovider = ({ children }) => {
  const [lodder, setlodder] = useState(false);
  const [currentUser, setcurrentUser] = useState({});
  const getuser = () => {
    const user = localStorage.getItem("user");
    if (user) {
      const userdata = jwt(user);
      setcurrentUser(userdata);
      console.log(userdata);
    }
  };
  useEffect(() => {
    getuser();
  }, [lodder]);

  return (
    <Context.Provider value={{ lodder, setlodder, currentUser }}>
      {children}
    </Context.Provider>
  );
};

export const Usercontext = () => {
  return useContext(Context);
};
