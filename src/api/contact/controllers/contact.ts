/**
 * contact controller
 */

import { factories } from "@strapi/strapi";

// 이메일 유효성 검사
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// 필수 필드 검증
function validateContactData(data: any): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.name || typeof data.name !== "string" || data.name.trim() === "") {
    errors.push("Name is required");
  }

  if (!data.email || !isValidEmail(data.email)) {
    errors.push("Valid email is required");
  }

  if (!data.inquiryType) {
    errors.push("Inquiry type is required");
  }

  if (!data.country || typeof data.country !== "string" || data.country.trim() === "") {
    errors.push("Country is required");
  }

  if (!data.subject || typeof data.subject !== "string" || data.subject.trim() === "") {
    errors.push("Subject is required");
  }

  if (!data.message || typeof data.message !== "string" || data.message.trim() === "") {
    errors.push("Message is required");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export default factories.createCoreController(
  "api::contact.contact",
  ({ strapi }) => ({
    async create(ctx) {
      try {
        const { data } = ctx.request.body;

        // Validation
        const validation = validateContactData(data);
        if (!validation.valid) {
          return ctx.badRequest("Validation failed", {
            errors: validation.errors,
          });
        }

        // Create contact
        const entity = await strapi.entityService.create(
          "api::contact.contact",
          {
            data: {
              name: data.name.trim(),
              email: data.email.trim().toLowerCase(),
              inquiryType: data.inquiryType,
              inquiryProduct: data.inquiryProduct || null,
              country: data.country.trim(),
              company: data.company?.trim() || null,
              subject: data.subject.trim(),
              message: data.message.trim(),
            },
          },
        );

        // Send email notification to admin
        const adminEmail = process.env.ADMIN_EMAIL || "support@manprotek.com";

        try {
          await strapi.plugins["email"].services.email.send({
            to: adminEmail,
            subject: `[TRIFORCE] New Contact Inquiry - ${data.inquiryType}`,
            html: `
              <h2>New Contact Inquiry</h2>
              <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
                <tr>
                  <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Name</td>
                  <td style="padding: 8px; border: 1px solid #ddd;">${data.name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Email</td>
                  <td style="padding: 8px; border: 1px solid #ddd;">${data.email}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Inquiry Type</td>
                  <td style="padding: 8px; border: 1px solid #ddd;">${data.inquiryType}</td>
                </tr>
                ${data.inquiryProduct ? `
                <tr>
                  <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Inquiry Product</td>
                  <td style="padding: 8px; border: 1px solid #ddd;">${data.inquiryProduct}</td>
                </tr>
                ` : ""}
                <tr>
                  <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Country</td>
                  <td style="padding: 8px; border: 1px solid #ddd;">${data.country}</td>
                </tr>
                ${data.company ? `
                <tr>
                  <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Company</td>
                  <td style="padding: 8px; border: 1px solid #ddd;">${data.company}</td>
                </tr>
                ` : ""}
                <tr>
                  <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Subject</td>
                  <td style="padding: 8px; border: 1px solid #ddd;">${data.subject}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Message</td>
                  <td style="padding: 8px; border: 1px solid #ddd; white-space: pre-wrap;">${data.message}</td>
                </tr>
              </table>
              <p style="color: #666; margin-top: 20px;">
                This message was sent on ${new Date().toLocaleString()}.
              </p>
            `,
          });
        } catch (emailError) {
          console.error("Failed to send email notification:", emailError);
          // Don't fail the request if email fails
        }

        return {
          success: true,
          message: "문의가 접수되었습니다.",
        };
      } catch (error) {
        console.error("Error creating contact:", error);
        return ctx.badRequest(`Error: ${error.message}`);
      }
    },
  }),
);
