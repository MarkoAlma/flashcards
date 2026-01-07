// AuthContext.jsx
import axios from "axios";
import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router";

export const MyAuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [hasAccess, setHasAccess] = useState(false);
  const [loading, setLoading] = useState(true)

const [msg, setMsg] = useState({})

useEffect(()=>{
    const checkAuth = async ()=> {
        try {
            await axios.get(`${import.meta.env.VITE_API_URL}/protected`, {withCredentials:true})
            setHasAccess(true)
            // setMsg({jo:"Helyes jelszót adtál meg"})
        } catch (error) {
            console.log(error);
            setHasAccess(false)
            // setMsg({nemjo:"Helytelen jelszót adtál meg"})
        }finally {
            setLoading(false)
        }
    }
    console.log("LAMLMDKHBWFRKI");
    
    checkAuth()
},[])

// const submitKey = async (key) => {
//   const hash = await sha1(key);
//   const ok = hash === STORED_HASH;
//   if (ok) setHasAccess(true);
//   console.log(ok);
//   if (ok) {
//     setMsg({jo:"Helyes jelszót adtál meg"})
//   }else {
//     setMsg({nemjo:"Helytelen jelszót adtál meg"})
//     }
//   return ok;  // fontos → modal ebből tudja, hogy sikerült-e
// };

const submitKey = async (key)=> {
    try {
        await axios.post(`${import.meta.env.VITE_API_URL}/login`, {key}, {withCredentials:true})
        setHasAccess(true)
        setMsg({jo:"Helyes jelszót adtál meg"})
        return true
    } catch (error) {
        console.log(error);
        setMsg({nemjo:"Helytelen jelszót adtál meg"}) // ez lehet nem kell
        return false
    }
}

const clearKey = async () => {
    await axios.post(`${import.meta.env.VITE_API_URL}/logout`, {}, {withCredentials:true})
    setHasAccess(false);
    //navigate('/')
  };

  return (
    <MyAuthContext.Provider value={{msg, setMsg, hasAccess, submitKey,clearKey }}>
      {children}
    </MyAuthContext.Provider>
  );
};
