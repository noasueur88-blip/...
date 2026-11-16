
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

// Formulaire de contact avec Web3Forms
const contactForm = document.getElementById("contact-form");
const formNote = document.getElementById("form-note");

contactForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(contactForm);

  const name = (formData.get("name") || "").trim();
  const email = (formData.get("email") || "").trim();
  const service = formData.get("service") || "";
  const message = (formData.get("message") || "").trim();

  if (!name || !email || !service || !message) {
    formNote.textContent = "Merci de remplir tous les champs.";
    return;
  }

  // Remplace cette valeur par ta clé Web3Forms
  formData.append("access_key", "72bd1a24-81e1-4744-a778-1f9d56d21d0f");

  formData.set("subject", "Demande de devis NEXORA - " + service);
  formData.set(
    "from_name",
    "NEXORA - Formulaire du site"
  );

  formNote.textContent = "Envoi de votre demande...";
  
  const submitButton = contactForm.querySelector('[type="submit"]');
  if (submitButton) submitButton.disabled = true;

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const result = await response.json();

    if (result.success) {
      formNote.textContent =
        "Merci ! Votre demande a bien été envoyée à NEXORA.";
      contactForm.reset();
    } else {
      formNote.textContent =
        "L'envoi a échoué. Vérifiez la configuration et réessayez.";
    }
  } catch (error) {
    formNote.textContent =
      "Impossible d'envoyer votre demande. Réessayez plus tard.";
  } finally {
    if (submitButton) submitButton.disabled = false;
  }
});
