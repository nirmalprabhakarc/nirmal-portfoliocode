import { createFileRoute } from "@tanstack/react-router";
import { Portfolio } from "@/components/portfolio/Portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nirmal Prabhakar Chirukui — Full-Stack Developer & AI Specialist" },
      { name: "description", content: "Full-Stack Web Developer, AI Automation Specialist, Google Ads Expert and Data Analyst based in Berlin. Open to work and freelance projects." },
      { property: "og:title", content: "Nirmal Prabhakar Chirukui — Portfolio" },
      { property: "og:description", content: "Building modern web apps, AI automations and high-performing Google Ads campaigns." },
    ],
  }),
  component: Index,
});

function Index() {
  return <Portfolio />;
}
