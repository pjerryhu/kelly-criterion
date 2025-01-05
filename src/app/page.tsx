import Calculator from "./components/calculator";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24">
      <h1 className="text-4xl font-bold mb-8">
        Static Calculator with Kelly Criterion
      </h1>
      <Calculator />
    </main>
  );
}
