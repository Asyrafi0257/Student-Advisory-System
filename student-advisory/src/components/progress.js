export default function Progress({ mentees, CS, IT }) {
    const total = mentees;

    const csPercent = total ? ((CS / total) * 100).toFixed(1) : 0;
    const itPercent = total ? ((IT / total) * 100).toFixed(1) : 0;

    const radius = 70;
    const stroke = 10;
    const circumference = 2 * Math.PI * radius;

    const csStroke = (csPercent / 100) * circumference;
    const itStroke = (itPercent / 100) * circumference;

    return (
        <div className="bg-white shadow-md rounded-lg col-span-2 p-5">

            <h3 className="text-lg font-semibold mb-4">Mentee Distribution</h3>

            <div className="relative w-[180px] h-[180px] mx-auto">
                <svg className="rotate-[-90deg]" width="180" height="180">

                    {/* background */}
                    <circle
                        cx="90"
                        cy="90"
                        r={radius}
                        stroke="#e5e7eb"
                        strokeWidth={stroke}
                        fill="none"
                    />

                    {/* CS */}
                    <circle
                        cx="90"
                        cy="90"
                        r={radius}
                        stroke="#3b82f6"
                        strokeWidth={stroke}
                        fill="none"
                        strokeDasharray={circumference}
                        strokeDashoffset={circumference - csStroke}
                        strokeLinecap="round"
                    />

                    {/* IT */}
                    <circle
                        cx="90"
                        cy="90"
                        r={radius}
                        stroke="#10b981"
                        strokeWidth={stroke}
                        fill="none"
                        strokeDasharray={circumference}
                        strokeDashoffset={circumference - itStroke}
                        strokeLinecap="round"
                        opacity="0.8"
                    />
                </svg>

                {/* center text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <p className="text-xl font-bold">{total}</p>
                    <p className="text-sm text-gray-500">Total Mentees</p>
                </div>
            </div>

            {/* percentage legend */}
            <div className="flex justify-center gap-6 mt-5 text-sm">

                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                    CS ({csPercent}%)
                </div>

                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                    IT ({itPercent}%)
                </div>

            </div>
        </div>
    );
}