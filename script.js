const apiKey = "73XShKLLex6UicZdV2sjIpBNTXPIKWPbbH309QHn";

const form = document.getElementById("searchForm");
const dateInput = document.getElementById("dateInput");
const apodSection = document.getElementById("apodSection");
const favouritesContainer = document.getElementById("favouritesContainer");

dateInput.max = new Date().toISOString().split("T")[0];

let favourites = JSON.parse(localStorage.getItem("favourites")) || [];
displayFavourites();

form.addEventListener("submit", (e) => {
    e.preventDefault();
    getAPOD(dateInput.value);
});

async function getAPOD(date) {
    apodSection.innerHTML = "<p>Loading...</p>";

    const response = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`
    );

    const data = await response.json();
    displayAPOD(data);
}

function displayAPOD(data) {
    if (data.media_type !== "image") {
        apodSection.innerHTML = "<p>APOD is a video today. Image only allowed.</p>";
        return;
    }

    apodSection.innerHTML = `
        <h2>${data.title}</h2>
        <p>${data.date}</p>
        <img id="apodImg" src="${data.url}" alt="${data.title}">
        <p>${data.explanation}</p>
        <button id="saveBtn">Save to Favourites</button>
    `;

    document.getElementById("apodImg").addEventListener("click", () => {
        window.open(data.hdurl, "_blank");
    });

    document.getElementById("saveBtn").addEventListener("click", () => {
        saveFavourite(data);
    });
}

function saveFavourite(data) {
    if (!favourites.some(item => item.date === data.date)) {
        favourites.push(data);
        localStorage.setItem("favourites", JSON.stringify(favourites));
        displayFavourites();
    }
}

function displayFavourites() {
    favouritesContainer.innerHTML = "";

    favourites.forEach((fav, index) => {
        const div = document.createElement("div");
        div.classList.add("favourite-item");

        div.innerHTML = `
            <h3>${fav.title}</h3>
            <img src="${fav.url}" alt="${fav.title}">
            <p>${fav.date}</p>
            <button class="deleteBtn" data-index="${index}">Delete</button>
        `;

        favouritesContainer.appendChild(div);
    });

    document.querySelectorAll(".deleteBtn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const i = e.target.dataset.index;
            favourites.splice(i, 1);
            localStorage.setItem("favourites", JSON.stringify(favourites));
            displayFavourites();
        });
    });
}
