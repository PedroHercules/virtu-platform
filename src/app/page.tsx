export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-8 bg-background">
      <h1 className="text-4xl font-semibold text-foreground">
        Plataforma Virtu
      </h1>
      <div className="flex gap-4">
        <button className="px-6 py-2 bg-primary hover:bg-primary-hover text-foreground rounded-md transition-colors">
          Primário
        </button>
        <button className="px-6 py-2 bg-secondary hover:bg-secondary-hover text-foreground rounded-md transition-colors">
          Secundário
        </button>
      </div>
    </main>
  );
}
