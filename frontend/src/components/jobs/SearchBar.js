// Search Bar Component
export default function SearchBar({ onSearch }) {
  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Search jobs by title, company, or keywords..."
        onChange={(e) => onSearch(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
