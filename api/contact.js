const nodemailer = require("nodemailer");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Méthode non autorisée" });
  }

  const { name, email, phone, message } = req.body;

  if (!name || !email || !phone || !message) {
    return res.status(400).json({ message: "Tous les champs sont obligatoires." });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.mail.ovh.net",
      port: 465,
      secure: true, // SSL/TLS
      auth: {
        user: "contact@senseiburrito.com",
        pass: process.env.MAIL_PASSWORD, // définie dans Vercel → Settings > Environment Variables
      },
      tls: {
        rejectUnauthorized: false, // important sur Vercel pour éviter les certificats auto-signés
      },
    });

    await transporter.verify();
    console.log("✅ SMTP connecté avec succès !");

    await transporter.sendMail({
      from: `"Site Sensei Burrito" <contact@senseiburrito.com>`,
      to: "contact@senseiburrito.fr",
      subject: "📩 Nouveau message via le site Sensei Burrito",
      html: `
        <h3>Nouveau message reçu depuis le site :</h3>
        <p><strong>Nom :</strong> ${name}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Téléphone :</strong> ${phone}</p>
        <p><strong>Message :</strong><br>${message}</p>
      `,
    });

    return res.status(200).json({ message: "Votre message a bien été envoyé !" });
  } catch (error) {
    console.error("Erreur Nodemailer :", error);
    return res.status(500).json({ message: "Erreur serveur : impossible d'envoyer l'email." });
  }
};
