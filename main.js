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
       CONTACT FORM SUBMISSION (JSON)
    ================================ */
    const form = document.getElementById("contactForm");
    const status = document.getElementById("formStatus");
  
    if (!form || !status) return;
  
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      status.innerHTML = `<span class="text-info">Sending message...</span>`;
  
      const payload = {
        name: form.name.value.trim(),
        email: form.email.value.trim(),
        subject: form.subject.value.trim(),
        message: form.message.value.trim()
      };
  
      try {
        const response = await fetch(
          "https://mzizii-arts-production.onrender.com/submit-form",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
          }
        );
  
        const result = await response.json();
  
        if (response.ok && result.success) {
          status.innerHTML = `<span class="text-success">Message sent successfully. Thank you!</span>`;
          form.reset();
        } else {
          throw new Error(result.message || "Failed to send message");
        }
  
      } catch (error) {
        console.error("Form error:", error);
        status.innerHTML = `<span class="text-danger">Something went wrong. Please try again later.</span>`;
      }
    });
  
  });