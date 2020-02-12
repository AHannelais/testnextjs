import React from "react";
import ReactDOM from "react-dom";
import { Modal } from "react-bootstrap";
import styled from "styled-components";
function myModal(props) {
  return ReactDOM.createPortal(
    <Ext onClick={props.onDismiss}>
      <Wrapper>
        <Modal.Dialog onClick={e => e.stopPropagation()}>
          <Modal.Header>
            <Modal.Title>{props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{props.content}</p>
          </Modal.Body>
          <Modal.Footer> {props.actions} </Modal.Footer>
        </Modal.Dialog>
      </Wrapper>
    </Ext>,
    document.querySelector("#modal")
  );
}
export default myModal;
const Ext = styled.div`
  position: fixed;
  z-index: 2;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: rgba(1, 1, 1, 0.2);
`;
const Wrapper = styled.div`
  position: fixed;
  z-index: 2;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
