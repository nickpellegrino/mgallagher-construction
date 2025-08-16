export default function Footer() {
  return (
    <footer className="bg-black text-sm text-white">
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center">
        <p>&copy; {new Date().getFullYear()} Michael Gallagher Construction</p>
        <p>Serving South Jersey with custom decks & remodeling</p>
      </div>
    </footer>
  );
}
