const galleryItems = [...document.querySelectorAll(".gallery-item")];
const filterButtons = document.querySelectorAll(".filter-btn");

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxCaption = document.getElementById("lightboxCaption");

const closeBtn = document.getElementById("closeBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let visibleItems = [...galleryItems];
let currentIndex = 0;

// Filter images by category
filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        const category = button.dataset.category;

        galleryItems.forEach(item => {
            item.style.display =
                category === "all" || item.dataset.category === category
                    ? ""
                    : "none";
        });

        visibleItems = galleryItems.filter(
            item => item.style.display !== "none"
        );
    });
});

// Display image in lightbox
function showImage(index) {
    if (visibleItems.length === 0) return;

    currentIndex =
        (index + visibleItems.length) % visibleItems.length;

    const item = visibleItems[currentIndex];
    const img = item.querySelector("img");
    const caption = item.querySelector(".caption");

    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = caption.textContent;
}

// Open lightbox when an image is clicked
galleryItems.forEach(item => {
    item.addEventListener("click", () => {
        visibleItems = galleryItems.filter(
            galleryItem => galleryItem.style.display !== "none"
        );

        currentIndex = visibleItems.indexOf(item);

        showImage(currentIndex);
        lightbox.classList.add("show");
    });
});

// Next and previous buttons
nextBtn.addEventListener("click", () => {
    showImage(currentIndex + 1);
});

prevBtn.addEventListener("click", () => {
    showImage(currentIndex - 1);
});

// Close lightbox
function closeLightbox() {
    lightbox.classList.remove("show");
}

closeBtn.addEventListener("click", closeLightbox);

// Close when clicking the dark background
lightbox.addEventListener("click", event => {
    if (event.target === lightbox) {
        closeLightbox();
    }
});

// Keyboard navigation
document.addEventListener("keydown", event => {
    if (!lightbox.classList.contains("show")) return;

    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowRight") showImage(currentIndex + 1);
    if (event.key === "ArrowLeft") showImage(currentIndex - 1);
});