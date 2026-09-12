import { createFileRoute } from "@tanstack/react-router";
import { LifesCurveSite } from "@/components/lifes-curve";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <LifesCurveSite />;
}
