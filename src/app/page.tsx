import { redirect } from "next/navigation";
import { getFirstSlug } from "@/lib/menu-config";

export default function Home() {
  redirect(`/${getFirstSlug()}`);
}
