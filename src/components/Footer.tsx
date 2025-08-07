export default function Footer() {
  return (
    <footer className="bg-gray-100 text-sm text-gray-600 mt-12 border-t">
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center">
        <p>&copy; {new Date().getFullYear()} Michael Gallagher Construction</p>
        <p>Serving South Jersey with custom decks & remodeling</p>
      </div>
    </footer>
  );
}
