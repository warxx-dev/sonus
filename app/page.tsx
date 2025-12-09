import { Header } from "@/components/header";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 font-sans dark:bg-black">
      <Header />
      <main className="flex min-h-screen w-full flex-col items-center justify-center bg-white dark:bg-black"></main>
    </div>
  );
}
