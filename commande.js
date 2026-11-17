
document.addEventListener("DOMContentLoaded", () => {
  const name = document.getElementById("customer-name");
  const email = document.getElementById("customer-email");
  const service = document.getElementById("service");
  const details = document.getElementById("order-details");
  const button = document.getElementById("order-button");
  const feedback = document.getElementById("order-feedback");

  document.getElementById("year").textContent =
    new Date().getFullYear();

  button.addEventListener("click", () => {
    feedback.textContent = "";

    if (!name.value.trim() || !email.value.trim() || !service.value) {
      feedback.textContent =
        "Merci de remplir votre nom, votre e-mail et votre prestation.";
      return;
    }

    if (!email.checkValidity()) {
      feedback.textContent =
        "Veuillez saisir une adresse e-mail valide.";
      return;
    }

    const subject = encodeURIComponent(
      "Demande de commande NEXORA"
    );

    const body = encodeURIComponent(
      `Nom : ${name.value}\n` +
      `E-mail : ${email.value}\n` +
      `Prestation : ${service.value}\n` +
      `Détails : ${details.value || "Non renseignés"}\n\n` +
      "Demande envoyée depuis la page commande NEXORA."
    );

    window.location.href =
      `mailto:contact.nexora756@gmail.com?subject=${subject}&body=${body}`;

    feedback.textContent =
      "Votre application e-mail va s'ouvrir pour préparer votre demande.";
  });
});
