const cardContainer = document.getElementById("card-container");
const searchField = document.getElementById("search");
const loadingSpinner = document.getElementById("loading-spinner");
const showAll = document.getElementById("show-all");
const noResult = document.getElementById("no-result");
const modalSection = document.getElementById("modal-section");
const searchTracker = ["a"];

const card = (inputValue = "a", isAll) => {
  loadingSpinner.style.display = "flex";
  cardContainer.innerHTML = "";
  fetch(`https://openapi.programming-hero.com/api/phones?search=${inputValue}`)
    .then((res) => res.json())
    .then((data) => {
      let phoneData = data.data;
      if (!isAll && phoneData.length > 12) {
        phoneData = phoneData.slice(0, 12);
        showAll.style.display = "inline-flex";
      } else {
        showAll.style.display = "none";
      }
      if (!phoneData.length) noResult.style.display = "flex";
      else noResult.style.display = "none";
      phoneData.forEach((phone) => {
        const cardElement = document.createElement("div");
        cardElement.classList =
          "card-element flex flex-col justify-center items-center p-6 border border-gray-300 rounded-lg";
        cardElement.innerHTML = `
          <div class="bg-[rgba(13,110,253,0.05)] w-full p-6 flex justify-center items-center mb-6">
            <img class="block w-full max-w-[250px]" src="${phone.image}" alt="Phone Image">
          </div>
          <h2 class="text-black text-2xl font-bold mb-1">${phone.phone_name}</h2>
          <p class="text-gray-500 max-w-[500px] mx-auto text-center mb-2">There are many variations of passages of available, but the majority have suffered</p>
          <span class="block text-2xl font-bold mb-4">$999</span>
          <a href="#/" id="${phone.slug}" class="btn btn-primary h-auto min-h-[40px]">Show Details</a>
      `;
        cardContainer.appendChild(cardElement);
      });

      const allCardElement = document.getElementsByClassName("card-element");
      for (let item of allCardElement) {
        item.lastElementChild.addEventListener("click", function () {
          modal(this.getAttribute("id"));
        });
      }

      loadingSpinner.style.display = "none";
    });
};
card();

document.getElementById("search-btn").addEventListener("click", () => {
  if (searchField.value) {
    card(searchField.value);
    searchTracker[0] = searchField.value;
  }
});

showAll.addEventListener("click", () => {
  card(searchTracker[0], true);
});

const modal = (slug) => {
  fetch(`https://openapi.programming-hero.com/api/phone/${slug}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.data);
      modalSection.innerHTML = "";
      modalSection.innerHTML = `
      <dialog id="my_modal_1" class="modal">
      <form method="dialog" class="modal-box">
        <div class="p-4 bg-[rgba(13,110,253,0.05)] rounded mb-4">
          <img src="${
            data.data.image
          }" alt="Phone Image" class="block w-full max-w-[100px] mx-auto">
        </div>
        <h2 class="text-2xl font-bold mb-1">${data.data.name}</h2>
        <p class="text-gray-500 mb-4">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
        <span class="block font-bold">Storage: <span class="font-normal">${
          data.data.mainFeatures.storage
        }</span></span>
        <span class="block font-bold">Display Size: <span class="font-normal">${
          data.data.mainFeatures.displaySize
        }</span></span>
        <span class="block font-bold">Chipset: <span class="font-normal">${
          data.data.mainFeatures.chipSet
        }</span></span>
        <span class="block font-bold">Memory: <span class="font-normal">${
          data.data.mainFeatures.memory
        }</span></span>
        <span class="block font-bold">Slug: <span class="font-normal">${
          data.data.slug
        }</span></span>
        <span class="block font-bold">Release Data: <span class="font-normal">${
          data.data.releaseDate
        }</span></span>
        <span class="block font-bold">Brand: <span class="font-normal">${
          data.data.brand
        }</span></span>
        <span class="block font-bold">GPS: <span class="font-normal">${
          data.data?.others?.GPS ? data.data.others.GPS : "Unknown"
        }</span></span>
        <div class="modal-action">
          <button class="btn btn-primary">Close</button>
        </div>
      </form>
    </dialog>
    `;
      my_modal_1.showModal();
    });
};
