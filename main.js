document.addEventListener("DOMContentLoaded", () => {
    const heroCarousel = document.querySelector("#heroCarousel");
    if (heroCarousel) {
      new bootstrap.Carousel(heroCarousel, {
        interval: 3000,
        pause: false,
        ride: "carousel",
        wrap: true
      });
    }
  
    /* ===============================
       AOS ANIMATIONS
    ================================ */
    AOS.init({
      duration: 1000,
      once: true
    });
  
    /* ===============================
       CONTACT FORM SUBMISSION
    ================================ */
    const form = document.getElementById("contactForm");
    const status = document.getElementById("formStatus");
  
    if (!form) return;
  
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      status.innerHTML = `<span class="text-info">Sending message...</span>`;
  
      const formData = new FormData(form);
  
      try {
        const response = await fetch(
          "https://mzizii-arts-production.onrender.com/submit-form",
          {
            method: "POST",
            body: formData
          }
        );
  
        if (response.ok) {
          status.innerHTML = `<span class="text-success">Message sent successfully. Thank you!</span>`;
          form.reset();
        } else {
          throw new Error("Failed to send message");
        }
      } catch (error) {
        status.innerHTML = `<span class="text-danger">Something went wrong. Please try again later.</span>`;
        console.error(error);
      }
    });
  
  });
 