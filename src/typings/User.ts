import { mockUuid } from "@/mockUuid";

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  nick: string;
  createdAt: string;
};

export function mockUser(): User {
  return {
    id: mockUuid(),
    firstName: 'Mocked first name ' + Math.ceil(Math.random() * 10),
    lastName: 'Mocked last name ' + Math.ceil(Math.random() * 10),
    nick: 'Mocked nick ' + Math.ceil(Math.random() * 10),
    createdAt: new Date().toISOString(),
  };
}
