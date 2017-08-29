import { DatabaseService } from './database.service';
import { DialogService } from './dialog.service';
import { LogService } from './log.service';
import { UserService } from './user.service';

export const PROVIDERS: any[] = [
  DatabaseService,
  DialogService,
  LogService,
  UserService,
];

export * from './database.service';
export * from './dialog.service';
export * from './log.service';
export * from './user.service';