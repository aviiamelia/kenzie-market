export interface IUser {
  name: string;
  password: string;
  email: string;
  isAdm: boolean;
  id?: string;
  createOn?: Date;
  updatedOn?: Date;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IEmail {
  from?: string;
  to: string;
  subject: string;
  text: string;
}
