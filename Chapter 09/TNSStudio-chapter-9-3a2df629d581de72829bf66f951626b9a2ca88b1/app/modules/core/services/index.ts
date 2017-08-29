import { AuthService } from './auth.service';
import { DatabaseService } from './database.service';
import { DialogService } from './dialog.service';
import { LogService } from './log.service';

export const PROVIDERS: any[] = [
  AuthService,
  DatabaseService,
  DialogService,
  LogService
];

export * from './auth.service';
export * from './database.service';
export * from './dialog.service';
export * from './log.service';