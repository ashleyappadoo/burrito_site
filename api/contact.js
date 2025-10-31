import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send({ message: "Méthode non autorisée" });
  }

  const { name, email, phone, message } = req.body;

  if (!name || !email || !phone || !message) {
    return res.status(400).send({ message: "Tous les champs sont obligatoires." });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: "ssl0.ovh.net",
      port: 465,
      secure: true,
      auth: {
        user: "contact@senseiburrito.fr",
        pass: "⚠️TON_MOT_DE_PASSE_ICI⚠️",
      },
    });

    await transporter.sendMail({
      from: `"Site Sensei Burrito" <ona.action@gmail.com>`,
      to: "contact@senseiburrito.fr",
      subject: "📩 Nouveau message via le site Sensei Burrito",
      html: `
        <h2>Nouveau message reçu</h2>
        <p><strong>Nom :</strong> ${name}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Téléphone :</strong> ${phone}</p>
        <p><strong>Message :</strong><br>${message}</p>
      `,
    });

    res.status(200).send({ message: "Message envoyé avec succès" });
  } catch (err) {
    console.error("Erreur envoi email:", err);
    res.status(500).send({ message: "Erreur serveur : impossible d'envoyer le message." });
  }
}
