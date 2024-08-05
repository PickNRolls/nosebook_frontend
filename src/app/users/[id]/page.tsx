import { UserMainInfo } from "@/components/UserMainInfo";

export default function Page({ params }: {
  params: {
    id: string;
  }
}) {
  return (
    <div>
      <UserMainInfo />
    </div>
  );
}
