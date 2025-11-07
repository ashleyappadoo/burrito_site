// /api/contact.js
import nodemailer from "nodemailer";

export default async function handler(req, res) {
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
      secure: true,
      auth: {
        user: "contact@senseiburrito.com",
        pass: process.env.MAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    await transporter.verify();
    console.log("✅ SMTP connecté avec succès !");

    await transporter.sendMail({
      from: `"Formulaire Sensei Burrito" <contact@senseiburrito.com>`,
      to: "contact@senseiburrito.com",
      subject: `Nouveau message de ${name}`,
      text: `
      Nom : ${name}
      Email : ${email}
      Téléphone : ${phone}
      
      Message :
      ${message}
            `,
          });
      
          return res.status(200).json({ message: "✅ Message envoyé avec succès !" });
        } catch (error) {
          console.error("Erreur d’envoi :", error);
          return res.status(500).json({ message: "❌ Erreur lors de l’envoi du message." });
        }
      }
