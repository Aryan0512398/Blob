import { getDatabase } from './database';

export interface Topic {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  created_at: number;
  updated_at: number;
}

export interface TopicInput {
  id: string;
  userId: string;
  title: string;
  description?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Insert a topic into mobile SQLite.
 * Call this after successful createTopic tRPC response.
 */
export async function insertTopic(topic: TopicInput): Promise<void> {
  const db = await getDatabase();
  await db.runAsync(
    `INSERT OR REPLACE INTO topics (id, user_id, title, description, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      topic.id,
      topic.userId,
      topic.title,
      topic.description ?? null,
      topic.createdAt.getTime(),
      topic.updatedAt.getTime(),
    ]
  );
}

/**
 * Get all topics for a user from mobile SQLite.
 */
export async function getTopicsByUserId(userId: string): Promise<Topic[]> {
  const db = await getDatabase();
  return db.getAllAsync<Topic>(
    'SELECT * FROM topics WHERE user_id = ? ORDER BY created_at DESC',
    [userId]
  );
}

/**
 * Get a single topic by ID from mobile SQLite.
 */
export async function getTopicById(topicId: string): Promise<Topic | null> {
  const db = await getDatabase();
  return db.getFirstAsync<Topic>('SELECT * FROM topics WHERE id = ?', [topicId]);
}
