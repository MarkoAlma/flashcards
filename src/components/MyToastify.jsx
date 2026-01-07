import { useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { MyAuthContext } from '../context/AuthContext';

export const MyToastify = () => {
  const { msg, setMsg } = useContext(MyAuthContext);

  useEffect(() => {
    if (!msg) return; // ha nincs üzenet, ne csináljon semmit

    if (msg.nemjo) {
      toast.error(msg.nemjo, { position: "top-center", autoClose:1250 });
      setMsg(null);
    }else if (msg.jo) {
      toast.success(msg.jo, { position: "top-center", autoClose:1250 });
      setMsg(null);
    }

  }, [msg, setMsg]);

  return null;
};

