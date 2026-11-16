
// Menu mobile
const menuToggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", () => {
  nav.classList.toggle("open");

  menuToggle.textContent = nav.classList.contains("open") ? "✕" : "☰";
});

// Fermer le menu après avoir cliqué sur un lien
document.querySelectorAll(".nav a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.textContent = "☰";
  });
});

// Année automatique dans le footer
document.getElementById("year").textContent = new Date().getFullYear();

// Préremplir le formulaire avec l'offre sélectionnée
document.querySelectorAll("[data-service]").forEach((button) => {
  button.addEventListener("click", () => {
    const service = button.dataset.service;
    const serviceSelect = document.getElementById("service");

    const matchingOption = [...serviceSelect.options].find((option) =>
      option.text.toLowerCase().includes(service.toLowerCase())
    );

    if (matchingOption) {
      serviceSelect.value = matchingOption.value;
    } else if (service.toLowerCase().includes("serveur")) {
      serviceSelect.value = "Création de serveur Discord";
    } else {
      serviceSelect.value = "Création de bot Discord";
    }
  });
});

// Formulaire de contact
const contactForm = document.getElementById("contact-form");
const formNote = document.getElementById("form-note");

// IMPORTANT : remplace cette adresse par ton adresse professionnelle.
const contactEmail = "contact@ton-domaine.fr";

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(contactForm);

  const name = formData.get("name").trim();
  const email = formData.get("email").trim();
  const service = formData.get("service");
  const message = formData.get("message").trim();

  if (!name || !email || !service || !message) {
    formNote.textContent = "Merci de remplir tous les champs.";
    return;
  }

  const subject = encodeURIComponent("Demande de devis NEXORA - " + service);

  const body = encodeURIComponent(
    "Bonjour NEXORA,\n\n" +
    "Nom : " + name + "\n" +
    "Adresse e-mail : " + email + "\n" +
    "Prestation : " + service + "\n\n" +
    "Description du projet :\n" + message + "\n\n" +
    "Envoyé depuis le site NEXORA."
  );

  const mailtoLink =
    "mailto:" + contactEmail +
    "?subject=" + subject +
    "&body=" + body;

  formNote.textContent =
    "Votre application e-mail va s'ouvrir avec votre demande préremplie.";

  window.location.href = mailtoLink;
});
