export type Model = {
  id: string;
  firstName: string;
  lastName: string;
  nick: string;
  createdAt: string;
  avatar?: {
    url: string;
    updatedAt: string;
  };

  lastOnlineAt: string;
  online: boolean;
};

export function fullName(user: Model): string {
  return `${user.firstName} ${user.lastName}`
}

export function profilePageHref(userId: string): string {
  return `/users/${userId}`
}
