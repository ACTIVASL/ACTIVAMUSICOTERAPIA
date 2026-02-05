import { describe, it, expect } from 'vitest';
import { GroupSessionSchema } from '@monorepo/shared';

describe('Titanium Schema Validation: GroupSession', () => {
  it('should validate a full titanium session with business fields', () => {
    const validSession = {
      id: 'GS-123',
      date: '2025-05-20',
      name: 'Grupo de Habilidades Sociales',
      // New Fields Added in Cluster 4
      location: 'Sala Mercurio',
      price: 45,
      paid: true,
      activities: ['Improvisación', 'Análisis Lírico'],
      engagementScore: 8.5,
      energyLevel: 'High',
      domainsWorked: ['Cognitivo', 'Social'],
      // Defaults
      patientIds: [],
      participants: [],
    };

    const result = GroupSessionSchema.safeParse(validSession);

    if (!result.success) {
      console.error(result.error);
      throw new Error('Validation failed');
    }

    expect(result.success).toBe(true);
    expect(result.data.location).toBe('Sala Mercurio');
  });

  it('should enforce business rules on scores', () => {
    const invalidSession = {
      id: 'GS-FAIL',
      date: '2025-05-20',
      name: 'Grupo Fallido',
      engagementScore: 11, // Error: Max 10
    };

    const result = GroupSessionSchema.safeParse(invalidSession);

    if (result.success) {
      throw new Error('Should have failed');
    }

    expect(result.success).toBe(false);
    // Verify specifically that engagementScore failed
    expect(result.error?.issues.some((i) => i.path.includes('engagementScore'))).toBe(true);
  });

  it('should default paid status to false', () => {
    const minimalSession = {
      id: 'GS-MIN',
      date: '2025-05-20',
      name: 'Grupo Minimal',
    };

    const result = GroupSessionSchema.safeParse(minimalSession);

    if (!result.success) throw new Error('Validation failed'); // Guard
    expect(result.success).toBe(true);
    expect(result.data.paid).toBe(false);
  });
});
