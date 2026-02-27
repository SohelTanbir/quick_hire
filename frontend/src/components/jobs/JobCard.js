// Job Card Component
export default function JobCard({ job }) {
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
      <h3 className="text-lg font-semibold">{job.title}</h3>
      <p className="text-gray-600">{job.company}</p>
      <p className="text-sm text-gray-500">{job.location}</p>
      <div className="mt-2 flex gap-2">
        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
          {job.category}
        </span>
        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
          {job.jobType}
        </span>
      </div>
    </div>
  );
}
