document.addEventListener("DOMContentLoaded", function () {
  // Get video elements
  const video1 = document.getElementById("projectvideo1");
  const video2 = document.getElementById("projectvideo2");
  const video3 = document.getElementById("projectvideo3");
  const hoverSign = document.querySelector(".hover-sign");
  const videoList = [video1, video2, video3];

  videoList.forEach(function (video) {
    if (video) {
      // Set required attributes for autoplay
      video.muted = true;
      video.playsInline = true;

      // Hover events
      video.addEventListener("mouseover", function () {
        video.play();
        if (hoverSign) hoverSign.classList.add("active");
      });

      video.addEventListener("mouseout", function () {
        video.pause();
        if (hoverSign) hoverSign.classList.remove("active");
      });
    }
  });

  // Navigation Hover Sound Effect
  // Navigation Hover Sound Effect
  const navLinks = document.querySelectorAll("nav a");
  let audioEnabled = false;
  let hoverSound = null;

  // Preload the audio with correct relative path
  function loadAudio() {
    const audioPath = "sounds/pop.wav"; // Remove the leading dot-slash
    try {
      hoverSound = new Audio(audioPath);
      hoverSound.volume = 0.5;
      hoverSound.preload = "auto";

      // Test if audio can load
      hoverSound.addEventListener(
        "canplaythrough",
        () => {
          console.log("Audio loaded successfully");
        },
        { once: true }
      );

      hoverSound.addEventListener(
        "error",
        (e) => {
          console.error(
            "Audio loading failed - check if sounds/pop.wav exists in your repo"
          );
          hoverSound = null;
        },
        { once: true }
      );

      hoverSound.load();
    } catch (error) {
      console.log("Audio loading error:", error);
      hoverSound = null;
    }
  }

  loadAudio();

  // Enable audio on first user interaction
  function enableAudio() {
    audioEnabled = true;
    if (hoverSound) {
      hoverSound
        .play()
        .then(() => {
          hoverSound.pause();
          hoverSound.currentTime = 0;
          console.log("Audio enabled and ready");
        })
        .catch((err) => {
          console.log("Audio enable error:", err);
        });
    }
  }

  document.addEventListener("click", enableAudio, { once: true });
  document.addEventListener("touchstart", enableAudio, { once: true });
  document.addEventListener("keydown", enableAudio, { once: true });

  navLinks.forEach((link) => {
    link.addEventListener("mouseenter", function () {
      if (!audioEnabled || !hoverSound) return;

      try {
        // Clone and play for multiple rapid hovers
        const soundClone = hoverSound.cloneNode();
        soundClone.volume = 0.5;
        soundClone.play().catch((error) => {
          console.log("Sound play error:", error);
        });
      } catch (error) {
        console.log("Audio error:", error);
      }
    });
  });

  // Update copyright year
  const yearElement = document.getElementById("currentYear");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // One-time click to enable autoplay on browsers that require interaction
  document.addEventListener(
    "click",
    function () {
      videoList.forEach((video) => {
        if (video) {
          video.play().then(() => video.pause());
        }
      });
    },
    { once: true }
  );
});

// Mouse tracking effect for cards
document.querySelectorAll(".card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--x", `${e.clientX - rect.left}px`);
    card.style.setProperty("--y", `${e.clientY - rect.top}px`);
  });
});

// Improved scroll behavior for the About section
document.querySelector(".scroll-down").addEventListener("click", () => {
  document.querySelector(".info-section").scrollIntoView({
    behavior: "smooth",
  });
});

// Add navigation functionality
document.querySelectorAll("nav a").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const target = link.textContent.trim().toLowerCase();

    switch (target) {
      case "about":
        document
          .querySelector(".info-section")
          .scrollIntoView({ behavior: "smooth" });
        break;
      case "skills":
        document.querySelector(".tech").scrollIntoView({ behavior: "smooth" });
        break;
      case "project":
        document
          .querySelector(".my-projects")
          .scrollIntoView({ behavior: "smooth" });
        break;

      case "contact":
        document
          .querySelector(".contact-section")
          .scrollIntoView({ behavior: "smooth" });
        break;
    }
  });
});

// Add animation to cards on scroll
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  },
  { threshold: 0.1 }
);

// Observe all cards for scroll animation
document.querySelectorAll(".card").forEach((card) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(20px)";
  card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  observer.observe(card);
});

// Add a hover effect to the contact buttons
document
  .querySelectorAll(".contact-me, .download-cv, .btn")
  .forEach((button) => {
    button.addEventListener("mouseenter", () => {
      button.style.transform = "translateY(-5px)";
      button.style.boxShadow = "0 0 20px rgba(124, 233, 230, 0.3)";
    });

    button.addEventListener("mouseleave", () => {
      button.style.transform = "";
      button.style.boxShadow = "";
    });
  });

// Initialize EmailJS with YOUR PUBLIC KEY
emailjs.init("lhIQh18Gh9AMB3TQl");

// Contact Form Handler with EmailJS
const contactForm = document.getElementById("contactForm");
const submitBtn = document.getElementById("submitBtn");
const btnText = document.getElementById("btnText");
const formMessage = document.getElementById("formMessage");

if (contactForm) {
  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    // Get form data
    const formData = {
      from_name: document.getElementById("name").value,
      from_email: document.getElementById("email").value,
      message: document.getElementById("message").value,
    };

    // Disable button and show loading state
    submitBtn.disabled = true;
    btnText.textContent = "Sending...";
    formMessage.style.display = "block";

    try {
      // Send email using EmailJS
      const response = await emailjs.send(
        "service_1o40yg3",
        "template_lcvimg4",
        formData
      );

      console.log("SUCCESS!", response.status, response.text);

      // Show success message
      formMessage.textContent =
        "Message sent successfully! I'll get back to you soon.";
      formMessage.className = "form-message success";
      formMessage.style.display = "block";

      // Reset form
      contactForm.reset();

      // Hide message after 5 seconds
      setTimeout(() => {
        formMessage.style.display = "none";
      }, 5000);
    } catch (error) {
      console.error("FAILED...", error);
      // Show error message
      formMessage.textContent =
        "Oops! Something went wrong. Please try again or email me directly.";
      formMessage.className = "form-message error";
      formMessage.style.display = "block";
    } finally {
      // Re-enable button
      submitBtn.disabled = false;
      btnText.textContent = "Send Message";
    }
  });
}

// Initialize 3D Contact Canvas
initContact3D();

// 3D Contact Canvas with Three.js and Computer Model
function initContact3D() {
  const canvas = document.getElementById("contactCanvas");
  if (!canvas) return;

  // Scene setup
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    45,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    1000
  );
  camera.position.set(0, 3, 7);

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
  });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  // Lights
  const ambientLight = new THREE.AmbientLight(0xfff4e6, 0.5);
  scene.add(ambientLight);

  const directionalLight1 = new THREE.DirectionalLight(0xffd9b3, 2.5);
  directionalLight1.position.set(5, 5, 3);
  scene.add(directionalLight1);

  const directionalLight2 = new THREE.DirectionalLight(0xffd9b3, 2.5);
  directionalLight2.position.set(5, 9, 1);
  directionalLight2.castShadow = true;
  scene.add(directionalLight2);

  // Ground plane
  const planeGeometry = new THREE.PlaneGeometry(30, 30);
  const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xa46b2d });
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = -Math.PI / 2;
  plane.position.y = -1.5;
  plane.receiveShadow = true;
  scene.add(plane);

  // Load Computer Model
  const loader = new THREE.GLTFLoader();
  let computerModel = null;

  loader.load(
    "models/computer-optimized.glb",
    function (gltf) {
      computerModel = gltf.scene;
      computerModel.scale.set(0.03, 0.03, 0.03);
      computerModel.position.set(0, -1.49, -2);

      // Enable shadows for the model
      computerModel.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

      scene.add(computerModel);
    },
    function (xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    function (error) {
      console.error("Error loading model:", error);
      // Fallback: create a simple box if model fails to load
      const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
      const boxMaterial = new THREE.MeshStandardMaterial({ color: 0xa46b2d });
      const box = new THREE.Mesh(boxGeometry, boxMaterial);
      box.position.set(0, 0, -2);
      box.castShadow = true;
      box.receiveShadow = true;
      scene.add(box);
      computerModel = box;
    }
  );

  // OrbitControls
  const controls = new THREE.OrbitControls(camera, canvas);
  controls.enableZoom = false;
  controls.minPolarAngle = Math.PI / 5;
  controls.maxPolarAngle = Math.PI / 2;
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);

    // Update controls
    controls.update();

    // Rotate computer model slightly for visual interest
    if (computerModel) {
      computerModel.rotation.y += 0.002;
    }

    renderer.render(scene, camera);
  }

  animate();

  // Handle resize
  window.addEventListener("resize", () => {
    if (canvas.clientWidth && canvas.clientHeight) {
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    }
  });
}
