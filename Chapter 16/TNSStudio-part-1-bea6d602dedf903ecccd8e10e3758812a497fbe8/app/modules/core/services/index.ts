import { AuthService } from './auth.service';
import { DatabaseService } from './database.service';
import { LogService } from './log.service';

export const PROVIDERS: any[] = [
  AuthService,
  DatabaseService,
  LogService
];

export * from './auth.service';
export * from './database.service';
export * from './log.service';