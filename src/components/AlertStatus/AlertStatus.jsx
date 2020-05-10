import React, { useState, useEffect } from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import { Snackbar, Dialog, DialogTitle, DialogContentText, DialogContent, DialogActions, Button } from '@material-ui/core';


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}



export default ({ alert: { status, menssage, code } }) => {
  const [open, setOpen] = useState(false);
  let aux = code

  useEffect(() => {
    setOpen(status)
  }, [menssage])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      {code != 203 ? <Snackbar open={open} autoHideDuration={2500} onClose={handleClose}>
        <Alert onClose={handleClose} severity={code == 400 ? "error" : "success"}>
          {menssage}
        </Alert>
      </Snackbar> : <Dialog open={open} onClose={handleClose} >
          <DialogTitle >Oops, usuário inativo</DialogTitle>
          <DialogContent>
            <DialogContentText >
              {menssage}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Fechar
          </Button>
          </DialogActions>

        </Dialog>


      }
    </>
  )
}



