import type { Metadata } from "next";
import HomeCanvas from "@/components/HomeCanvas";

export const metadata: Metadata = {
  title: "Lusano — Heirloom-Quality Furniture",
  description:
    "Heirloom-quality furniture designed in Los Angeles. Sleep, Live, Eat, Work — made to order, built to last.",
};

export default function Home() {
  return <HomeCanvas />;
}
