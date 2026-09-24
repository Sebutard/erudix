import type { LearningSession } from '@/types';
import { storage } from '@/services/storage';

export async function persistSession(session: LearningSession): Promise<void> {
  await storage.saveSession(session);
}
