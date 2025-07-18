export default function Footer() {
  return (
    <footer className="bg-indigo-900 text-yellow-400 py-6 mt-12">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="font-display text-xl font-bold">Saat Phere</div>
        <div className="text-sm mt-2 md:mt-0 text-gray-200">&copy; {new Date().getFullYear()} Saat Phere. All rights reserved.</div>
      </div>
    </footer>
  );
} 