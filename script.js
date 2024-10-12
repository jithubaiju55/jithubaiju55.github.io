// Array of background images from the 'images' folder
const images = [
  "images/chess.jpg",
  "images/smartphone.png",
  "images/website.jpg",

  "images/image3.jpg",
];

// Reference to the hero section
const heroSection = document.querySelector(".hero-section");

// Initialize the index for the images array
let imageIndex = 0;

// Function to change the background image automatically
function changeBackgroundImage() {
  heroSection.style.backgroundImage = `url(${images[imageIndex]})`;
  imageIndex = (imageIndex + 1) % images.length; // Loop through images
}

// Change background every 5 seconds
setInterval(changeBackgroundImage, 5000);

// Animated Typing Effect
const animatedText = document.querySelector(".animated-text");
const skills = [
  "Unity",
  "C#",
  "HTML",
  "Flutter",
  "Game Development",
  "Web Development",
];
const colors = [
  "#ff5722", // orange
  "#00aaff", // blue
  "#00ff88", // green
  "#ffcc00", // yellow
  "#ff33ff", // pink
  "#00ffaa", // teal
];
let skillIndex = 0;
let charIndex = 0;

function typeSkill() {
  animatedText.style.color = colors[skillIndex];

  if (charIndex < skills[skillIndex].length) {
    animatedText.innerHTML += skills[skillIndex].charAt(charIndex);
    charIndex++;
    setTimeout(typeSkill, 150);
  } else {
    setTimeout(eraseSkill, 1000);
  }
}

function eraseSkill() {
  if (charIndex > 0) {
    animatedText.innerHTML = skills[skillIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(eraseSkill, 100);
  } else {
    skillIndex = (skillIndex + 1) % skills.length;
    setTimeout(typeSkill, 500);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(typeSkill, 500);
  changeBackgroundImage(); // Start the background image change
});
// Smooth scroll to sections
document.querySelectorAll("a.nav-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const sectionID = link.getAttribute("href");
    document.querySelector(sectionID).scrollIntoView({ behavior: "smooth" });
  });
});
// Smooth Scroll for Navigation
// Smooth Scroll for Navigation
document.querySelectorAll("a.nav-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const sectionID = link.getAttribute("href");
    document.querySelector(sectionID).scrollIntoView({ behavior: "smooth" });
  });
});

// Animation on Scroll for Skills Section
const skillSections = document.querySelectorAll(".skill-category");

window.addEventListener("scroll", () => {
  skillSections.forEach((section) => {
    const sectionPosition = section.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.5;

    if (sectionPosition < screenPosition) {
      section.classList.add("visible");
    }
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".filter-buttons button");
  const projectCards = document.querySelectorAll(".filter");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filterValue = button.getAttribute("data-filter");

      projectCards.forEach((card) => {
        if (filterValue === "all" || card.classList.contains(filterValue)) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
});
function sendMail(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  const mailtoLink = `mailto:jithubaiju05@gmail.com?subject=Message from ${name}&body=Email: ${email}%0D%0A%0D%0AMessage:%0D%0A${message}`;
  window.location.href = mailtoLink;
}
// Dynamically set the current year in the footer
document.getElementById("current-year").textContent = new Date().getFullYear();
