import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import IndiaChapter from "@/components/IndiaChapter";
import HistoryTimeline from "@/components/HistoryTimeline";
import GenZChapter from "@/components/GenZChapter";
import PeopleMosaic from "@/components/PeopleMosaic";
import CultureChapter from "@/components/CultureChapter";
import ProgressChapter from "@/components/ProgressChapter";
import CivicChapter from "@/components/CivicChapter";
import SystemNotCountry from "@/components/SystemNotCountry";
import HeritageChapter from "@/components/HeritageChapter";
import OpenQuestions from "@/components/OpenQuestions";
import FutureChapter from "@/components/FutureChapter";
import FinalTransformation from "@/components/FinalTransformation";
import Credits from "@/components/Credits";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <IndiaChapter />
      <HistoryTimeline />
      <GenZChapter />
      <PeopleMosaic />
      <CultureChapter />
      <ProgressChapter />
      <CivicChapter />
      <SystemNotCountry />
      <HeritageChapter />
      <OpenQuestions />
      <FutureChapter />
      <FinalTransformation />
      <Credits />
    </main>
  );
}
