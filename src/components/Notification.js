import React from "react";
import miniLogo from "../minilogo.png";
import { Toast } from "react-bootstrap";

export default function Notification(props) {
  return (
    <div
      style={{
        position: "absolute",
        top: 20,
        right: 20,
        zIndex: 100,
      }}
    >
      <Toast
        className="border-success text-success bg-success"
        show={props.toastSuccess}
        onClose={() => props.setToastSuccess(false)}
      >
        <Toast.Header className="border-success">
          <img
            src={miniLogo}
            className="rounded mr-2"
            style={{ height: "20px" }}
            alt="vms"
          />
          <strong className="mr-auto text-success">VMS</strong>
        </Toast.Header>
        <Toast.Body className="text-white">{props.successMessage}</Toast.Body>
      </Toast>
      <Toast
        className="border-danger text-danger bg-danger"
        show={props.toastError}
        onClose={() => props.setToastError(false)}
      >
        <Toast.Header>
          <img
            src={miniLogo}
            className="rounded mr-2"
            style={{ height: "20px" }}
            alt="vms"
          />
          <strong className="mr-auto text-danger">VMS</strong>
        </Toast.Header>
        <Toast.Body className="text-white">{props.errorMessage}</Toast.Body>
      </Toast>
    </div>
  );
}
