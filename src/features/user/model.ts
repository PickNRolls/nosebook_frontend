export type Model = {
  id: string;
  firstName: string;
  lastName: string;
  nick: string;
  createdAt: string;
};

export function fullName(user: Model): string {
  return `${user.firstName} ${user.lastName}`
}

export function profilePageHref(user: Model): string {
  return `/users/${user.id}`
}
