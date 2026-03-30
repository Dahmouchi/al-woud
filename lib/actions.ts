"use server";

import sendEmail from "./sendemail";

export async function handleContactForm(formData: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}) {
  const { name, email, phone, subject, message } = formData;
  const targetEmail = "hassandahmouchi0@gmail.com";

  const emailSubject = `Nouveau Message: ${subject} (de ${name})`;

  const html = `
    <div style="font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 20px auto; border: 1px solid #eee; border-radius: 8px; overflow: hidden;">
      <div style="background-color: #6d7b5f; color: white; padding: 20px; text-align: center;">
        <h1 style="margin: 0; font-size: 24px;">Al Woud - Message de Contact</h1>
      </div>
      <div style="padding: 20px;">
        <p style="margin-bottom: 20px; border-bottom: 1px solid #eee; padding-bottom: 10px;">
          <strong>Nom :</strong> ${name}
        </p>
        <p style="margin-bottom: 20px; border-bottom: 1px solid #eee; padding-bottom: 10px;">
          <strong>Email :</strong> ${email}
        </p>
        <p style="margin-bottom: 20px; border-bottom: 1px solid #eee; padding-bottom: 10px;">
          <strong>Téléphone :</strong> ${phone}
        </p>
        <p style="margin-bottom: 20px; border-bottom: 1px solid #eee; padding-bottom: 10px;">
          <strong>Sujet :</strong> ${subject}
        </p>
        <div style="margin-top: 20px; background-color: #f9f9f9; padding: 15px; border-radius: 4px;">
          <h3 style="margin-top: 0; color: #6d7b5f;">Message :</h3>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      </div>
      <div style="background-color: #f4f4f4; padding: 15px; text-align: center; color: #999; font-size: 12px;">
        Ce message a été envoyé depuis le formulaire de contact du site Al Woud.
      </div>
    </div>
  `;

  try {
    await sendEmail(targetEmail, emailSubject, html, email);
    return { success: true };
  } catch (error) {
    console.error("Error in contact form action:", error);
    return {
      success: false,
      error:
        "Impossible d'envoyer votre message pour le moment. Veuillez réessayer plus tard.",
    };
  }
}
