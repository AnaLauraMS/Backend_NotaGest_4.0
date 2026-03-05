export interface IUserBody {
    nome?: string;
    emai?: string;
    senha?: string;
}

export interface IChangePasswordBody {
    currentPassword?: string;
    newPassword?: string;
}