import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Register route
  app.post(api.registrations.create.path, async (req, res) => {
    try {
      const input = api.registrations.create.input.parse(req.body);
      const registration = await storage.createRegistration(input);
      
      // Send email notification via Resend (if API key is configured)
      if (resend) {
        try {
          await resend.emails.send({
          from: "Shacko Whitelist <onboarding@resend.dev>",
          to: process.env.RESEND_TO_EMAIL || "degenerativeshack@gmail.com",
          subject: "New Shacko Whitelist Registration",
          html: `
            <h2>New Whitelist Registration</h2>
            <p><strong>Wallet Address:</strong> ${registration.walletAddress}</p>
            <p><strong>X Username:</strong> ${registration.xUsername || "Not provided"}</p>
            <p><strong>Discord Username:</strong> ${registration.discordUsername || "Not provided"}</p>
            <p><strong>Registered At:</strong> ${registration.createdAt}</p>
          `,
        });
          console.log(`[RESEND] Email sent for registration: ${registration.walletAddress}`);
        } catch (emailErr) {
          console.error("[RESEND] Failed to send email:", emailErr);
        }
      }
      
      res.status(201).json(registration);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  return httpServer;
}
