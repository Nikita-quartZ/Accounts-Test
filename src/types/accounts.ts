export interface Account {
  tags: string,
  type: string,
  login: string | null,
  password: string | null,
}

export interface AccountData extends Account {
  id: string | null,
}
