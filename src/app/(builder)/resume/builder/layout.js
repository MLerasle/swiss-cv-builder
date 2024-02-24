import { redirect } from "next/navigation";
import { BuilderLayout } from "@/components/builder/BuilderLayout";
import { getUser } from "@/lib/actions";

export default async function RootLayout(props) {
  const { data } = await getUser();
  if (!data.user) {
    return redirect("/login");
  }

  return <BuilderLayout props={props} />;
}
