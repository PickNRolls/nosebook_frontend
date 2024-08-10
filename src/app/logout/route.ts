import { logout } from "@/components/logout";

export const GET = async () => {
  await logout();
};
