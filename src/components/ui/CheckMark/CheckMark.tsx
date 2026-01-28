'use client';

interface Props {
    trigger: boolean;
}

export const AnimatedCheckmark = ({ trigger }: Props) => {
    // If not triggered, we don't render the animated version to reset the state
    if (!trigger) return <div className="h-24" />; 

    return (
        <div className="flex justify-center items-center py-4">
            <svg
                className="w-24 h-24 stroke-green-500 fill-none"
                viewBox="0 0 52 52"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Background Circle - Starts after modal is mostly visible (500ms) */}
                <circle
                    className="animate-[stroke_0.6s_cubic-bezier(0.65,0,0.45,1)_300ms_forwards]"
                    cx="26"
                    cy="26"
                    r="25"
                    strokeWidth="2"
                    strokeDasharray="157"
                    strokeDashoffset="157"
                />
                
                {/* Checkmark - Starts after circle is halfway done (1000ms total) */}
                <path
                    className="animate-[stroke_0.3s_cubic-bezier(0.65,0,0.45,1)_800ms_forwards]"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray="48"
                    strokeDashoffset="48"
                    d="M14.1 27.2l7.1 7.2 16.7-16.8"
                />
            </svg>

            <style jsx global>{`
                @keyframes stroke {
                    100% {
                        stroke-dashoffset: 0;
                    }
                }
            `}</style>
        </div>
    );
};