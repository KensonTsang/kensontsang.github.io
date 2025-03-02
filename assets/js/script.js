'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");
const modalTime = document.querySelector("[data-modal-time]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
    modalTime.innerHTML = this.querySelector("[data-testimonials-date]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);




// Portfolio variables
const portfolioItem = document.querySelectorAll("[portfolio-data-testimonials-item]");
const portfolioModalContainer = document.querySelector("[portfolio-data-modal-container]");
const portfolioModalCloseBtn = document.querySelector("[portfolio-data-modal-close-btn]");
const portfolioOverlay = document.querySelector("[portfolio-data-overlay]");

// modal variable
const portfolioModalImg = document.querySelector("[portfolio-data-modal-img]");
const portfolioModalTitle = document.querySelector("[portfolio-data-modal-title]");
const portfolioModalText = document.querySelector("[portfolio-data-modal-text]");
const portfolioModalTime = document.querySelector("[portfolio-data-modal-subtitle]");
const portfolioModalVideo = document.querySelector("[portfolio-data-modal-video]");

// modal toggle function
const portfolioModalFunc = function () {
  portfolioModalContainer.classList.toggle("active");
  portfolioOverlay.classList.toggle("active");
}



document.addEventListener("DOMContentLoaded", function () {
  let modal = document.getElementById("imageModal");
  let fullImage = document.getElementById("fullImage");
  let fullVideo = document.getElementById("fullVideo");
  let closeBtn = document.querySelector(".image-modal-close");
  let prevBtn = document.getElementById("prevButton");
  let nextBtn = document.getElementById("nextButton");
  
  let thumbnails = [];
  let currentIndex = -1;

  // Function to open the modal with the correct image/video
  function openModal(index) {
      let thumbnail = thumbnails[index];
      if (!thumbnail) return;

      let fullsizeUrl = thumbnail.getAttribute("data-fullsize");
      let videoUrl = thumbnail.getAttribute("data-video");

      modal.style.display = "flex";
      currentIndex = index;

      if (videoUrl) {
          // Show video
          fullVideo.src = videoUrl;
          fullVideo.style.display = "block";
          fullImage.style.display = "none";
      } else {
          // Show image
          fullImage.src = fullsizeUrl;
          fullImage.style.display = "block";
          fullVideo.style.display = "none";
      }

      prevBtn.style.display = (currentIndex == 0)? "none" : "block";

      nextBtn.style.display = (currentIndex == thumbnails.length - 1)? "none" : "block";

      setTimeout(() => {
          modal.classList.add("show");          
      }, 10);
  }

  // Attach click event to all screenshots
  document.addEventListener("click", function (event) {
      let thumbnail = event.target.closest(".screenshot-thumbnail");
      if (thumbnail) {
          event.preventDefault();
          thumbnails = Array.from(document.querySelectorAll(".screenshot-thumbnail"));
          currentIndex = thumbnails.indexOf(thumbnail);
          openModal(currentIndex);
      }
  });

  // Close modal function
  function closeModal() {
      modal.classList.remove("show");
      setTimeout(() => {
          modal.style.display = "none";          
          fullImage.src = "";
          fullVideo.src = ""; // Stop video playback
      }, 300);
  }

  closeBtn.addEventListener("click", closeModal);

  modal.addEventListener("click", function (event) {
      if (event.target === modal) {
          closeModal();
      }
  });

  // Navigate to previous screenshot
  prevBtn.addEventListener("click", function () {
      if (currentIndex > 0) {
          openModal(currentIndex - 1);
      }
  });

  // Navigate to next screenshot
  nextBtn.addEventListener("click", function () {
      if (currentIndex < thumbnails.length - 1) {
          openModal(currentIndex + 1);
      }
  });


  document.addEventListener("keydown", function (event) {
    if (modal.style.display === "flex") { // Only navigate if modal is open
        if (event.key === "ArrowLeft" && currentIndex > 0) {
            openModal(currentIndex - 1); // Go to previous image
        }
        if (event.key === "ArrowRight" && currentIndex < thumbnails.length - 1) {
            openModal(currentIndex + 1); // Go to next image
        }
        if (event.key === "Escape") {
            closeModal(); // Close modal with Esc key
        }
    }
  });
});



const stopYouTubeVideo = function () {
  if (portfolioModalVideo && portfolioModalVideo.contentWindow) {
    portfolioModalVideo.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');    
  }
}

// add click event to all modal items
for (let i = 0; i < portfolioItem.length; i++) {

  portfolioItem[i].addEventListener("click", function () {
    portfolioModalTitle.innerText = this.getAttribute("data-title");    
    portfolioModalTime.innerHTML = this.getAttribute("data-subtitle");
    portfolioModalText.innerHTML = this.getAttribute("data-description");    
    portfolioModalVideo.src = this.getAttribute("data-video");
    portfolioModalFunc();

  });

}

// add click event to modal close button
portfolioModalCloseBtn.addEventListener("click", function () {
  portfolioModalFunc();
  stopYouTubeVideo();
});
portfolioOverlay.addEventListener("click", function () {
  portfolioModalFunc();
  stopYouTubeVideo();
});


// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}