import { z } from 'zod';

export const GroupSessionSchema = z.object({
  id: z.string(),
  date: z.string(),
  time: z.string().optional(),
  name: z.string().min(1, 'Group name is required'),
  patientIds: z.array(z.string()).default([]),
  // Denormalized snapshots for UI performance
  participants: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        attendance: z.enum(['present', 'absent', 'excused']).default('present'),
      }),
    )
    .default([]),
  notes: z.string().optional(),
  therapistId: z.string().optional(),
  status: z.enum(['scheduled', 'completed', 'cancelled']).default('scheduled'),
  // Recurrence link matches individual session logic
  recurrenceId: z.string().optional(),

  // Extended Fields (Synced from UI Requirements)
  phase: z.number().int().min(1).default(1),
  location: z.string().optional(),
  price: z.number().optional(),
  paid: z.boolean().default(false),
  activities: z.array(z.string()).default([]),
  methodology: z.string().optional(),
  observations: z.string().optional(),
  groupName: z.string().optional(),
  groupId: z.string().optional(),

  // Metrics
  engagementScore: z.number().min(0).max(10).optional(),
  cohesionScore: z.number().min(0).max(10).optional(),
  energyLevel: z.enum(['High', 'Medium', 'Low']).optional(),
  domainsWorked: z.array(z.string()).optional(),
});

export type GroupSession = z.infer<typeof GroupSessionSchema>;
