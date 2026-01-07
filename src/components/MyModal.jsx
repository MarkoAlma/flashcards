import * as React from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Stack from '@mui/joy/Stack';
import { useContext } from 'react';
import { MyAuthContext } from '../context/AuthContext';
import { useState } from 'react';

export default function MyModal({open, setOpen, onSuccess, atVigyenE}) {

    const {submitKey, msg, setMsg} = useContext(MyAuthContext)
    const [key, setKey] = useState("")

    const futtatto = async()=> {
      const joE = await submitKey(key)
      if (joE && atVigyenE) {
        onSuccess()
      }
    }

  return (
    <React.Fragment>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <DialogTitle>Titkos kulcs szükséges</DialogTitle>
          <DialogContent>Add meg a kulcsot a művelet folytatásához.</DialogContent>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setOpen(false);
              setKey("")
            }}
          >
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Kulcs</FormLabel>
                <Input type='password' value={key} onChange={(e)=>setKey(e.target.value)} autoFocus />
              </FormControl>
              <Button type="submit" onClick={futtatto}>Belépés</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}