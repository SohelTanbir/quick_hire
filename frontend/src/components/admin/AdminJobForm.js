// Admin Job Form Component
import { useState } from 'react';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import { CATEGORIES, LOCATIONS } from '@/constants';

export default function AdminJobForm({ onSubmit, initialData = null }) {
    const [formData, setFormData] = useState(
        initialData || {
            title: '',
            company: '',
            location: '',
            category: '',
            description: '',
            salary: '',
            jobType: 'Full-time',
            requirements: '',
        }
    );
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const requirements = formData.requirements
                .split('\n')
                .filter((r) => r.trim());
            await onSubmit({ ...formData, requirements });
        } catch (error) {
            console.error('Submission error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">
                {initialData ? 'Edit Job' : 'Create New Job'}
            </h2>

            <Input
                label="Job Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
            />

            <Input
                label="Company Name"
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
            />

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                </label>
                <select
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="w-full border rounded px-3 py-2"
                >
                    <option value="">Select Location</option>
                    {LOCATIONS.map((loc) => (
                        <option key={loc} value={loc}>
                            {loc}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                </label>
                <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full border rounded px-3 py-2"
                >
                    <option value="">Select Category</option>
                    {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Job Type
                </label>
                <select
                    name="jobType"
                    value={formData.jobType}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                >
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Contract</option>
                    <option>Internship</option>
                </select>
            </div>

            <Input
                label="Salary (Optional)"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
            />

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Job Description
                </label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Requirements (one per line)
                </label>
                <textarea
                    name="requirements"
                    value={formData.requirements}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="5+ years experience&#10;Bachelor's degree&#10;etc."
                />
            </div>

            <Button type="submit" disabled={loading}>
                {loading ? 'Saving...' : initialData ? 'Update Job' : 'Create Job'}
            </Button>
        </form>
    );
}
