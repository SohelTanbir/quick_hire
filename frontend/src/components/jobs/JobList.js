// Job List Component - displays multiple jobs
import JobCard from './JobCard';

export default function JobList({ jobs, loading }) {
  if (loading) return <div>Loading...</div>;
  if (!jobs || jobs.length === 0) return <p>No jobs found</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {jobs.map((job) => (
        <JobCard key={job._id} job={job} />
      ))}
    </div>
  );
}
