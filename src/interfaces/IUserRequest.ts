export interface IUserBody {
  nome?: string;
  email?: string;
  senha?: string;
}

export interface IChangePasswordBody {
  currentPassword?: string;
  newPassword?: string;
}