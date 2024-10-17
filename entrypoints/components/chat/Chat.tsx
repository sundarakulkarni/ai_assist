import { useRef, useState } from "react";
import Modal from "../modal/modal";
import "./chat.css";
import React from "react";

type props = {
  closeModal: () => void;
  onInsert: (text: string) => void;
};

const aiReply =
  "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.";

const Chat: React.FC<props> = (props) => {
  const [propmts, setPropmts] = useState<
    { tpye: "user" | "ai"; message: string }[]
  >([]);

  const inputRef = useRef<HTMLInputElement>(null);

  const onGenerateClick = () =>
    inputRef.current?.value &&
    setPropmts((prevState) => {
      return [
        ...prevState,
        {
          tpye: "user",
          message: inputRef.current?.value as string,
        },
        {
          tpye: "ai",
          message: aiReply,
        },
      ];
    });

  const onInsertClick = () => {
    props.onInsert(aiReply);
    props.closeModal();
  };

  return (
    <Modal onOverClick={props.closeModal}>
      <div className="ai-chat-container">
        {propmts.map((prompt) => (
          <div
            className={`${
              prompt.tpye === "user" ? "user-prompt" : "ai-prompt"
            } prompt`}
          >
            {prompt.message}
          </div>
        ))}
        <input
          type="text"
          className="input-prompt"
          ref={inputRef}
          placeholder="Your prompt"
        />
        <div className="buttons-container">
          {propmts.length ? (
            <>
              <button className="secondary-button" onClick={onInsertClick}>
                <img src={browser.runtime.getURL("/icon/insert.svg")} alt="" />
                Insert
              </button>
              <button className="primary-button">
                <img
                  src={browser.runtime.getURL("/icon/regenerate.svg")}
                  alt=""
                />
                Regenerate
              </button>
            </>
          ) : (
            <button className="primary-button" onClick={onGenerateClick}>
              <img src={browser.runtime.getURL("/icon/generate.svg")} alt="" />
              Generate
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default Chat;
