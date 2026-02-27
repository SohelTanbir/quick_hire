// Job Filters Component
import { CATEGORIES, LOCATIONS } from '@/constants';

export default function JobFilters({ onFilterChange }) {
    return (
        <div className="bg-white p-4 rounded-lg shadow mb-6">
            <h3 className="text-lg font-semibold mb-4">Filters</h3>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-2">Category</label>
                    <select
                        onChange={(e) => onFilterChange('category', e.target.value)}
                        className="w-full border rounded px-3 py-2"
                    >
                        <option value="">All Categories</option>
                        {CATEGORIES.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Location</label>
                    <select
                        onChange={(e) => onFilterChange('location', e.target.value)}
                        className="w-full border rounded px-3 py-2"
                    >
                        <option value="">All Locations</option>
                        {LOCATIONS.map((loc) => (
                            <option key={loc} value={loc}>
                                {loc}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}
