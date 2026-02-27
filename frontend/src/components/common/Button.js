// Reusable Button Component
export default function Button({ children, variant = 'primary', ...props }) {
    const baseClass = 'px-4 py-2 rounded font-medium transition';
    const variants = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700',
        secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
        danger: 'bg-red-600 text-white hover:bg-red-700',
    };

    return (
        <button className={`${baseClass} ${variants[variant]}`} {...props}>
            {children}
        </button>
    );
}
