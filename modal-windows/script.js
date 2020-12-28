"use strict";

// select modal windows (see html)
const modal = document.querySelector(".modal");
// select overlay (blur effect)
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");
// If we use query selector that matches multiple elements,
// only the first one will be selected. See example:
/* const btnsOpenModal = document.querySelector(".show-modal"); */
// Instead:
const btnsOpenModal = document.querySelectorAll(".show-modal");

console.log(btnsOpenModal);

// Define open modal functionality
const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

// Attach event handler to each modal button:
for (let i = 0; i < btnsOpenModal.length; i++) {
  btnsOpenModal[i].addEventListener("click", openModal);
}

// Define a close modal functionality
const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

// Add event listener to the close window button
btnCloseModal.addEventListener("click", closeModal);

// Also close when clicking outside modal
overlay.addEventListener("click", closeModal);

// Key press event: when we press esc, also close modals
// add event listener that is active for whole document
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    // if modals are shown, make them hidden again
    if (!modal.classList.contains("hidden")) {
      closeModal();
    }
  }
});
