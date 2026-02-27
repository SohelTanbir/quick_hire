// Application Form Component
import { useState } from 'react';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';

export default function ApplicationForm({ jobId, onSubmit }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        resumeLink: '',
        coverNote: '',
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await onSubmit({ ...formData, jobId });
        } catch (error) {
            console.error('Submission error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">Apply for this Job</h2>

            <Input
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                error={errors.name}
            />

            <Input
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                error={errors.email}
            />

            <Input
                label="Resume Link (URL)"
                type="url"
                name="resumeLink"
                value={formData.resumeLink}
                onChange={handleChange}
                required
                error={errors.resumeLink}
            />

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cover Note
                </label>
                <textarea
                    name="coverNote"
                    value={formData.coverNote}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.coverNote && (
                    <p className="text-red-500 text-sm mt-1">{errors.coverNote}</p>
                )}
            </div>

            <Button type="submit" disabled={loading}>
                {loading ? 'Submitting...' : 'Submit Application'}
            </Button>
        </form>
    );
}
