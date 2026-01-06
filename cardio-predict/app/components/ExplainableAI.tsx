type ExplainFeature = {
    name: string;
    impact: number;
    direction: "increase" | "decrease";
};

const explainData: ExplainFeature[] = [
    { name: "Systolic Blood Pressure", impact: 0.42, direction: "increase" },
    { name: "Cholesterol Level", impact: 0.28, direction: "increase" },
    { name: "BMI", impact: 0.18, direction: "increase" },
    { name: "Physical Activity", impact: 0.12, direction: "decrease" },
];

export default function ExplainableAI() {
    return (
        <div className="bg-white rounded-3xl shadow-xl p-8">
            <h3 className="text-xl font-bold mb-2">🧠 Why this risk?</h3>

            <p className="text-gray-600 mb-6">
                The AI model identified the following factors as the most influential
                for your cardiovascular risk score.
            </p>

            <div className="space-y-4">
                {explainData.map((f) => (
                    <div key={f.name}>
                        <div className="flex justify-between text-sm mb-1">
                            <span>{f.name}</span>
                            <span className="font-semibold">
                                {Math.round(f.impact * 100)}%
                            </span>
                        </div>

                        <div className="h-3 bg-gray-200 rounded-full">
                            <div
                                className={`h-full rounded-full ${f.direction === "increase"
                                        ? "bg-red-500"
                                        : "bg-green-500"
                                    }`}
                                style={{ width: `${f.impact * 100}%` }}
                            />
                        </div>

                        <p className="text-xs mt-1 text-gray-500">
                            {f.direction === "increase"
                                ? "This factor increased overall risk"
                                : "This factor helped reduce overall risk"}
                        </p>
                    </div>
                ))}
            </div>

            <div className="mt-6 bg-blue-50 p-4 rounded-xl text-sm text-blue-700">
                ℹ️ Explanation simplified from Random Forest feature importance.
            </div>
        </div>
    );
}
