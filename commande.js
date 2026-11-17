
document.addEventListener("DOMContentLoaded", () => {
  const name = document.getElementById("customer-name");
  const email = document.getElementById("customer-email");
  const service = document.getElementById("service");
  const details = document.getElementById("order-details");
  const button = document.getElementById("booking-button");
  const feedback = document.getElementById("order-feedback");
  const appointmentType = document.getElementById("appointment-type");

  const bookingUrl =
    "https://calendar.app.google/g55Wh5du6b4amngw6";

  document.getElementById("year").textContent =
    new Date().getFullYear();

  // Empêche la réservation avant l'envoi de la demande.
  button.addEventListener("click", async (event) => {
    event.preventDefault();
    feedback.textContent = "";

    if (
      !name.value.trim() ||
      !email.value.trim() ||
      !service.value
    ) {
      feedback.textContent =
        "Merci de remplir votre nom, votre e-mail et votre prestation.";
      return;
    }

    if (!email.checkValidity()) {
      feedback.textContent =
        "Veuillez saisir une adresse e-mail valide.";
      return;
    }

    button.textContent = "Envoi en cours...";
    button.style.pointerEvents = "none";
    button.style.opacity = "0.6";

    try {
      const formData = new FormData();

      // Réutilise la clé Web3Forms du formulaire principal.
      // Remplace cette valeur par la même clé que dans index.html.
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
        "À réserver sur Google Calendar"
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
        throw new Error("L'envoi de la demande a échoué.");
      }

      // Conserve les informations pour le suivi sur cette page.
      sessionStorage.setItem(
        "nexora_order",
        JSON.stringify({
          name: name.value.trim(),
          email: email.value.trim(),
          service: service.value,
          appointmentType: appointmentType.value,
          details: details.value.trim()
        })
      );

      feedback.textContent =
        "Demande envoyée ! Redirection vers la réservation...";

      button.textContent = "Demande envoyée";

      // Redirection seulement après confirmation de Web3Forms.
      setTimeout(() => {
      window.location.assign(bookingUrl);
      }, 1500);

    } catch (error) {
      console.error(error);

      feedback.textContent =
        "Impossible d'envoyer votre demande. Réessayez.";

      button.textContent = "Choisir mon créneau";
      button.style.pointerEvents = "auto";
      button.style.opacity = "1";
    }
  });
});
