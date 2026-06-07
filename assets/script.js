const body = document.body;
const toggle = document.querySelector("[data-menu-toggle]");
const navLinks = document.querySelectorAll(".nav-links a");

if (toggle) {
  toggle.addEventListener("click", () => {
    const isOpen = body.classList.toggle("menu-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    body.classList.remove("menu-open");
    if (toggle) toggle.setAttribute("aria-expanded", "false");
  });
});

const observer = "IntersectionObserver" in window
  ? new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 })
  : null;

document.querySelectorAll(".reveal").forEach((el) => {
  if (observer) {
    observer.observe(el);
  } else {
    el.classList.add("visible");
  }
});

const inquiryForm = document.querySelector("[data-inquiry-form]");

if (inquiryForm) {
  inquiryForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(inquiryForm);
    const subject = encodeURIComponent(`Velora Studio Inquiry - ${data.get("service") || "New Project"}`);
    const bodyLines = [
      `Name: ${data.get("name") || ""}`,
      `Business Name: ${data.get("business") || ""}`,
      `Email: ${data.get("email") || ""}`,
      `Client Location: ${data.get("location") || ""}`,
      `Service Needed: ${data.get("service") || ""}`,
      `Budget Range: ${data.get("budget") || ""}`,
      "",
      "Project Details:",
      data.get("details") || ""
    ];
    const emailBody = encodeURIComponent(bodyLines.join("\n"));
    window.location.href = `mailto:velorastudio.philippines@gmail.com?subject=${subject}&body=${emailBody}`;
  });
}
