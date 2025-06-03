import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { Request, Response, NextFunction } from 'express';
import { db } from './db';
import { admins, sessions } from '@shared/schema';
import { eq, and, gt, lt } from 'drizzle-orm';

const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours
const SALT_ROUNDS = 12;

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function createSession(adminId: number): Promise<string> {
  const sessionId = uuidv4();
  const expiresAt = new Date(Date.now() + SESSION_DURATION);
  
  await db.insert(sessions).values({
    id: sessionId,
    adminId,
    expiresAt,
  });
  
  return sessionId;
}

export async function validateSession(sessionId: string): Promise<number | null> {
  const [session] = await db
    .select()
    .from(sessions)
    .where(
      and(
        eq(sessions.id, sessionId),
        gt(sessions.expiresAt, new Date())
      )
    );
    
  return session ? session.adminId : null;
}

export async function deleteSession(sessionId: string): Promise<void> {
  await db.delete(sessions).where(eq(sessions.id, sessionId));
}

export async function cleanExpiredSessions(): Promise<void> {
  await db.delete(sessions).where(lt(sessions.expiresAt, new Date()));
}

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  const sessionId = req.cookies.admin_session;
  
  if (!sessionId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  
  const adminId = await validateSession(sessionId);
  
  if (!adminId) {
    // Clear invalid session cookie
    res.clearCookie('admin_session');
    return res.status(401).json({ message: 'Session expired' });
  }
  
  // Attach admin ID to request for use in protected routes
  (req as any).adminId = adminId;
  next();
}

export async function seedAdminUser(): Promise<void> {
  try {
    // Check if admin already exists
    const [existingAdmin] = await db.select().from(admins).limit(1);
    if (existingAdmin) {
      console.log('Admin user already exists');
      return;
    }
    
    // Use secure default password
    const adminPassword = 'Zz123456!';
    const hashedPassword = await hashPassword(adminPassword);
    
    await db.insert(admins).values({
      username: 'admin',
      password: hashedPassword,
    });
    
    console.log('Admin user created with username: admin');
    console.log('Password: Zz123456!');
  } catch (error) {
    console.error('Error seeding admin user:', error);
  }
}