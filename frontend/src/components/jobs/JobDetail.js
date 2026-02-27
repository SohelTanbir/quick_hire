// Job Detail Component - displays full job information
export default function JobDetail({ job }) {
  if (!job) return <p>Job not found</p>;

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
      <p className="text-xl text-gray-600 mb-4">{job.company}</p>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <h3 className="font-semibold">Location</h3>
          <p>{job.location}</p>
        </div>
        <div>
          <h3 className="font-semibold">Category</h3>
          <p>{job.category}</p>
        </div>
        <div>
          <h3 className="font-semibold">Job Type</h3>
          <p>{job.jobType}</p>
        </div>
        <div>
          <h3 className="font-semibold">Salary</h3>
          <p>{job.salary}</p>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Description</h3>
        <p className="text-gray-700 leading-relaxed">{job.description}</p>
      </div>

      {job.requirements && job.requirements.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-2">Requirements</h3>
          <ul className="list-disc list-inside space-y-1">
            {job.requirements.map((req, i) => (
              <li key={i}>{req}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
