import "./globals.css";
import Link from "next/link";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-100 text-slate-800">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-2 text-xl font-bold text-blue-600">
              <Link
                href="/"
                className="flex items-center gap-2 hover:opacity-80 transition"
              >
                ❤️ CardioML
              </Link>
            </div>

            <nav className="flex gap-6 text-sm font-medium">
              <Link href="/insights">Data Insights</Link>
              <Link href="/model">Model Info</Link>
              <Link href="/disclaimer">Disclaimer</Link>
            </nav>

            <Link
              href="/predict"
              className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm hover:bg-orange-600"
            >
              Predict Now →
            </Link>
          </div>
        </header>

        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
