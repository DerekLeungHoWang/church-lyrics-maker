import { Button, Modal, Paper } from "@material-ui/core";
import React, { useState, useMemo } from "react";
import UploaderMain from "./UploaderMain";

const useModal = () => {
  const [imgModalOn, setImgModalOn] = useState(false);
  const toggle = useMemo(() => setImgModalOn(!imgModalOn), [imgModalOn]);
  const ModalBtn = (props) => (
    <Button
      color="primary"
      style={{ marginTop: "10px" }}
      variant="outlined"
      onClick={toggle}
    >
      Upload an image
    </Button>
  );

  const ImageModal = useMemo(() => {
    return (
      <Modal
        //hideBackdrop
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        open={imgModalOn}
        onClose={setImgModalOn(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
          <div>
              <h1>hi</h1>
          </div>
        
      </Modal>
    );
  }, [imgModalOn, toggle]);

  return(
    {
        imgModalOn,
        toggle,
        ModalBtn,
        ImageModal,
      }
  );
};

export default useModal;

// <Modal
// //hideBackdrop
//   style={{
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//   }}
//   open={openImageModal}
//   onClose={handleClose}
//   aria-labelledby="simple-modal-title"
//   aria-describedby="simple-modal-description"
// >
//   <Paper
//     style={{
//       position: "relative",
//       height: "90%",
//       minWidth: "90%",
//       padding: "15px",
//     }}
//   >

//       <UploaderMain
//       selectFromUpload={selectFromUpload}
//       handleChangeURL={handleChangeURL}
//       confirmImageURL={confirmImageURL}
//       selectedFile={selectedFile}
//       cropper={cropper}
//       setCropper={setCropper}

//       />

//   </Paper>
// </Modal>
