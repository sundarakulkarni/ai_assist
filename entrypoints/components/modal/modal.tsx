import { ReactNode } from "react";
import "./modal.css";

type ModalProps = {
  onOverClick?: () => void;
  children: ReactNode;
};

export default function Modal(props: ModalProps) {
  return (
    <>
      <div
        className="modal-overlay"
        onClick={props.onOverClick ? props.onOverClick : () => {}}
      />

      <div className="custom-modal">{props.children}</div>
    </>
  );
}
