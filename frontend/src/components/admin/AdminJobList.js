// Admin Job List Component
import Button from '@/components/common/Button';

export default function AdminJobList({ jobs, onDelete, loading }) {
    if (loading) return <div>Loading...</div>;
    if (!jobs || jobs.length === 0) return <p>No jobs found</p>;

    return (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="w-full">
                <thead className="bg-gray-200 border-b">
                    <tr>
                        <th className="px-4 py-2 text-left">Title</th>
                        <th className="px-4 py-2 text-left">Company</th>
                        <th className="px-4 py-2 text-left">Location</th>
                        <th className="px-4 py-2 text-left">Category</th>
                        <th className="px-4 py-2 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {jobs.map((job) => (
                        <tr key={job._id} className="border-b hover:bg-gray-50">
                            <td className="px-4 py-2">{job.title}</td>
                            <td className="px-4 py-2">{job.company}</td>
                            <td className="px-4 py-2">{job.location}</td>
                            <td className="px-4 py-2">{job.category}</td>
                            <td className="px-4 py-2 text-center space-x-2">
                                <Button
                                    variant="danger"
                                    onClick={() => onDelete(job._id)}
                                    className="text-sm px-2 py-1"
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
