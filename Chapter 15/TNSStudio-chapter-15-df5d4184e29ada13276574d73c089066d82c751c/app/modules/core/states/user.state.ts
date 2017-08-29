export interface IUserState {
  recentUsername?: string;
  current?: any;
  loginCanceled?: boolean;
}

export const userInitialState: IUserState = {};