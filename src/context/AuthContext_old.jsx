// AuthContext.jsx
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router";

export const MyAuthContext = createContext();

const STORED_HASH = "5f5ea3800d9a62bc5a008759dbbece9cad5db58f"; 

const  sha1=async (str)=>{
  return crypto.subtle.digest("SHA-1", new TextEncoder().encode(str))
    .then(buf => Array.from(new Uint8Array(buf))
      .map(b => b.toString(16).padStart(2, "0"))
      .join(""));
}

export const AuthProvider = ({ children }) => {
  const [hasAccess, setHasAccess] = useState(false);

    const [msg, setMsg] = useState({})
const submitKey = async (key) => {
  const hash = await sha1(key);
  const ok = hash === STORED_HASH;
  if (ok) setHasAccess(true);
  console.log(ok);
  if (ok) {
    setMsg({jo:"Helyes jelszót adtál meg"})
  }else {
    setMsg({nemjo:"Helytelen jelszót adtál meg"})
    }
  return ok;  // fontos → modal ebből tudja, hogy sikerült-e
};
const clearKey = () => {
    setHasAccess(false);
    //navigate('/')
  };

  return (
    <MyAuthContext.Provider value={{msg, setMsg, hasAccess, submitKey,clearKey }}>
      {children}
    </MyAuthContext.Provider>
  );
};
