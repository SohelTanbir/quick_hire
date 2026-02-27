// Loading Skeleton Component
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function LoadingSkeleton({ count = 1, type = 'card' }) {
    if (type === 'card') {
        return (
            <div className="space-y-4">
                {Array.from({ length: count }).map((_, i) => (
                    <div key={i} className="p-4 bg-white rounded-lg shadow">
                        <Skeleton height={20} count={3} />
                    </div>
                ))}
            </div>
        );
    }

    return <Skeleton height={40} count={count} />;
}
