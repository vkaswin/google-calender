import { z } from "zod";

let EventSchema = z.object({
  title: z.string(),
  time: z.string(),
  description: z.string(),
  date: z.string(),
  userId: z.string().optional(),
  completed: z.boolean().optional(),
});

export { EventSchema };
