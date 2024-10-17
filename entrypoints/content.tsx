import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import Chat from "./components/chat/chat";

function openReactModal() {
  // Check if modal container already exists
  let modalContainer = document.querySelector("#react-modal-container");

  if (!modalContainer) {
    // Create a container for the modal
    modalContainer = document.createElement("div");
    modalContainer.id = "react-modal-container";
    document.body.appendChild(modalContainer);
  }

  // Function to close the modal
  const closeModal = () => {
    ReactDOM.unmountComponentAtNode(modalContainer as HTMLElement);
    modalContainer?.remove();
  };

  //Function to insert text into text box
  const onInsertClick = (reply: string) => {
    document
      .getElementsByClassName("msg-form__placeholder")[0]
      .classList.remove("msg-form__placeholder");
    document.getElementsByClassName(
      "msg-form__contenteditable"
    )[0].innerHTML = `<p>${reply}</p>`;
  };

  // Render the React modal inside the container
  createRoot(document.getElementById("react-modal-container")!).render(
    <Chat closeModal={closeModal} onInsert={onInsertClick} />
  );
}

export default defineContentScript({
  matches: ["https://*/*"], // Apply to all URLs or specific ones if necessary
  main() {
    document.addEventListener("click", (event) => {
      const target = event.target as HTMLElement;

      if (target.classList.contains("msg-form__contenteditable")) {
        // Remove existing icon if present
        document.querySelector(".xyz-extension-icon")?.remove();

        // Create the icon
        const icon = document.createElement("img");
        icon.src = browser.runtime.getURL("/icon/app-icon.svg");
        icon.classList.add("xyz-extension-icon");
        icon.style.position = "absolute";
        icon.style.left = `${target.getBoundingClientRect().right}px`;
        icon.style.top = `${
          target.getBoundingClientRect().bottom + window.scrollY
        }px`;
        icon.style.transform = `translate(-150%, -150%)`;
        icon.style.cursor = "pointer";
        icon.style.zIndex = "1000";

        // Append the icon to the body
        document.body.appendChild(icon);

        // Handle icon click event
        icon.addEventListener("click", openReactModal);
      } else {
        if (document.querySelector(".xyz-extension-icon")) {
          document.querySelector(".xyz-extension-icon")?.remove();
        }
      }
    });
  },
});
