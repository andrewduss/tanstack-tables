import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
      <Link href="/basic-table">Basic Table</Link>
      <Link href="/sortable-table">Sortable Table</Link>
      <Link href="/column-filterable-table">Column Filterable Table</Link>
      <Link href="/global-filterable-table">Global Filterable Table</Link>
      </div>    
    </main>
  );
}
