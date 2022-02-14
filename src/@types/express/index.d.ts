declare namespace Express {
  interface Request {
    user: any;
    recoverCode: string | boolean;
  }
}
