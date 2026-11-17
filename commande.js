
document.addEventListener("DOMContentLoaded", () => {
  const name = document.getElementById("customer-name");
  const email = document.getElementById("customer-email");
  const service = document.getElementById("service");
  const details = document.getElementById("order-details");
  const button = document.getElementById("booking-button");
  const feedback = document.getElementById("order-feedback");
  const appointmentType = document.getElementById("appointment-type");
  const year = document.getElementById("year");

  const bookingUrl =
    "https://calendar.app.google/g55Wh5du6b4amngw6";

  // Vérification des éléments HTML
  if (
    !name ||
    !email ||
    !service ||
    !details ||
    !button ||
    !feedback ||
    !appointmentType
  ) {
    console.error("NEXORA : un élément HTML est introuvable.");
    return;
  }

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // Empêcher plusieurs envois simultanés
  let isSending = false;

  button.addEventListener("click", async (event) => {
    event.preventDefault();

    if (isSending) return;

    feedback.textContent = "";

    // Vérification des champs
    if (
      !name.value.trim() ||
      !email.value.trim() ||
      !service.value ||
      !appointmentType.value
    ) {
      feedback.textContent =
        "Merci de remplir votre nom, votre e-mail, votre prestation et votre type de rendez-vous.";
      return;
    }

    if (!email.checkValidity()) {
      feedback.textContent =
        "Veuillez saisir une adresse e-mail valide.";
      return;
    }

    isSending = true;

    button.textContent = "Envoi en cours...";
    button.style.pointerEvents = "none";
    button.style.opacity = "0.6";

    try {
      const formData = new FormData();

      // Remplacer par ta NOUVELLE clé Web3Forms
      // après avoir régénéré l'ancienne.
      formData.append("access_key", "72bd1a24-81e1-4744-a778-1f9d56d21d0f");

      formData.append("subject", "Nouvelle demande NEXORA");
      formData.append("from_name", "NEXORA - Commande");

      formData.append("Nom du client", name.value.trim());
      formData.append("E-mail du client", email.value.trim());
      formData.append("Prestation", service.value);
      formData.append(
        "Type de rendez-vous",
        appointmentType.value
      );

      formData.append(
        "Description du projet",
        details.value.trim() || "Non renseignée"
      );

      formData.append(
        "Rendez-vous",
        "Le client doit réserver sur Google Calendar."
      );

      const response = await fetch(
        "https://api.web3forms.com/submit",
        {
          method: "POST",
          body: formData
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Échec de l'envoi de la demande."
        );
      }

      // L'envoi est confirmé : afficher le message.
      feedback.textContent =
        "Demande envoyée avec succès ! Redirection vers Google Calendar...";

      button.textContent = "Demande envoyée";

      // Redirection après confirmation de Web3Forms.
      window.location.assign(bookingUrl);

    } catch (error) {
      console.error("Erreur NEXORA :", error);

      feedback.textContent =
        "L'envoi a échoué. Vérifiez votre connexion et réessayez.";

      button.textContent = "Choisir mon créneau";
      button.style.pointerEvents = "auto";
      button.style.opacity = "1";

      isSending = false;
    }
  });
});
