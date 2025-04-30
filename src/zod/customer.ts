import { z } from 'zod';

export const CustomerSchema = z.object({
  name: z.string().min(1),
  contactNumber: z.string().min(10),
  email: z.string().email().optional(),
  address: z.string().optional(),
  installedModel: z.string().optional(),
  price: z.number().nonnegative().optional(),
  invoiceNumber: z.string().optional(),
  serialNumber: z.string().optional(),
  warranty: z.number().int().min(0).max(5).optional(),
  amcRenewed: z.number().int().min(0).max(5).optional(),
  serviceHistory: z.array(z.string()).optional(),
  upcomingServices: z.array(z.string()).optional(),
});

// Optional: derive TypeScript type from the schema
export type CustomerInput = z.infer<typeof CustomerSchema>;
