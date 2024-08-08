export type Register = {
  firstName: string;
  lastName: string;
  nick: string;
  password: string;
};

export type RegisterResponse = {
  user: {
    id: string;
  };
  session: {
    sessionId: string;
  }
}
