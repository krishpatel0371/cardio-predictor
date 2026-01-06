"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    HeartPulse,
    AlertTriangle,
    CheckCircle,
    Activity,
    Info,
} from "lucide-react";


type ResultType = {
    risk: string;
    risk_score: number;
    bmi: number;
};
import ExplainableAI from "@/app/components/ExplainableAI";
import { generatePDF } from "../utils/generatePDF";

export default function ResultPage() {
    const [result, setResult] = useState<ResultType | null>(null);
    const [percent, setPercent] = useState(0);

    useEffect(() => {
        const stored = localStorage.getItem("cardioResult");
        if (!stored) return;

        const data = JSON.parse(stored);
        setResult(data);

        let p = 0;
        const target = Math.round(data.risk_score * 100);
        const timer = setInterval(() => {
            p++;
            setPercent(p);
            if (p >= target) clearInterval(timer);
        }, 18);
    }, []);

    if (!result) {
        return (
            <p className="text-center mt-20 text-gray-500">
                No assessment result found.
            </p>
        );
    }

    const riskLevel =
        percent >= 75 ? "HIGH" : percent >= 45 ? "MODERATE" : "LOW";

    const riskColor =
        riskLevel === "HIGH"
            ? "text-red-600"
            : riskLevel === "MODERATE"
                ? "text-orange-500"
                : "text-green-600";

    const strokeColor =
        riskLevel === "HIGH"
            ? "#dc2626"
            : riskLevel === "MODERATE"
                ? "#f59e0b"
                : "#16a34a";

    const bmiLabel =
        result.bmi >= 30
            ? "Obese"
            : result.bmi >= 25
                ? "Overweight"
                : "Normal";

    const bmiColor =
        bmiLabel === "Obese"
            ? "bg-red-100 text-red-700"
            : bmiLabel === "Overweight"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-green-100 text-green-700";

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 px-6 py-16">
            <div className="max-w-6xl mx-auto space-y-10">

                {/* HEADER */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                >
                    <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-sm mb-4">
                        <HeartPulse size={16} /> AI Health Result
                    </div>

                    <h1 className="text-3xl font-extrabold mb-2">
                        Cardiovascular Risk Assessment
                    </h1>

                    <p className="text-gray-600">
                        This report summarizes your cardiovascular health based on clinical
                        and lifestyle data.
                    </p>
                </motion.div>

                {/* MAIN GRID */}
                <div className="grid md:grid-cols-2 gap-8">

                    {/* RISK GAUGE */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-white rounded-3xl shadow-xl p-8 text-center"
                    >
                        <div className="relative w-44 h-44 mx-auto mb-4">
                            <svg className="w-full h-full -rotate-90">
                                <circle
                                    cx="88"
                                    cy="88"
                                    r="75"
                                    stroke="#e5e7eb"
                                    strokeWidth="12"
                                    fill="none"
                                />
                                <circle
                                    cx="88"
                                    cy="88"
                                    r="75"
                                    stroke={strokeColor}
                                    strokeWidth="12"
                                    fill="none"
                                    strokeDasharray={2 * Math.PI * 75}
                                    strokeDashoffset={
                                        2 * Math.PI * 75 * (1 - percent / 100)
                                    }
                                    strokeLinecap="round"
                                />
                            </svg>

                            <span className="absolute inset-0 flex items-center justify-center text-4xl font-bold">
                                {percent}%
                            </span>
                        </div>

                        <p className={`font-semibold text-lg ${riskColor}`}>
                            {riskLevel} RISK
                        </p>
                    </motion.div>
                    <button
                        onClick={() => generatePDF(result)}
                        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
                    >
                        📄 Download Medical Report (PDF)
                    </button>
                    {/* CONCLUSION */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`rounded-3xl shadow-xl p-8 text-white ${riskLevel === "HIGH"
                            ? "bg-red-600"
                            : riskLevel === "MODERATE"
                                ? "bg-orange-500"
                                : "bg-green-600"
                            }`}
                    >
                        <h3 className="text-sm uppercase tracking-wide mb-2">
                            Clinical Summary
                        </h3>

                        <h2 className="text-2xl font-bold mb-3">
                            {riskLevel === "LOW" && "Low Cardiovascular Risk"}
                            {riskLevel === "MODERATE" && "Moderate Cardiovascular Risk"}
                            {riskLevel === "HIGH" && "High Cardiovascular Risk"}
                        </h2>

                        <p className="opacity-95">
                            {riskLevel === "LOW" &&
                                "Your current indicators suggest a low risk of cardiovascular disease. Continue maintaining healthy habits."}
                            {riskLevel === "MODERATE" &&
                                "Some risk factors are elevated. Lifestyle improvements and periodic monitoring are recommended."}
                            {riskLevel === "HIGH" &&
                                "Multiple risk factors are elevated. Immediate consultation with a healthcare professional is strongly advised."}
                        </p>
                    </motion.div>

                    {/* HEALTH SUMMARY */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-slate-900 text-white rounded-3xl shadow-xl p-6"
                    >
                        <h3 className="flex items-center gap-2 font-semibold mb-4">
                            <Activity size={18} /> Health Summary
                        </h3>

                        <span
                            className={`inline-block px-4 py-1 rounded-full text-sm mb-4 ${bmiColor}`}
                        >
                            BMI: {result.bmi} ({bmiLabel})
                        </span>

                        <ul className="text-sm list-disc pl-4 space-y-2 opacity-90">
                            <li>Maintain blood pressure below 130/80 mmHg</li>
                            <li>Engage in physical activity 5 days per week</li>
                            <li>Follow a balanced, heart-healthy diet</li>
                        </ul>
                    </motion.div>
                    <ExplainableAI />


                    {/* INFO CARDS */}
                    <InfoCard
                        title="Risk Score"
                        text="Represents the probability of developing cardiovascular disease based on AI prediction."
                    />
                    <InfoCard
                        title="BMI"
                        text="Body Mass Index estimates body fat using height and weight."
                    />
                    <InfoCard
                        title="AI Insight"
                        text="Prediction generated using a Random Forest model trained on medical datasets (~73% accuracy)."
                    />
                </div>

                {/* DISCLAIMER */}
                <div className="flex items-start gap-2 text-sm text-gray-500 max-w-3xl mx-auto">
                    <AlertTriangle size={16} className="mt-0.5" />
                    <p>
                        This assessment is for educational and decision-support purposes
                        only. It does not replace professional medical advice.
                    </p>
                </div>
            </div>
        </main>
    );
}

/* Small reusable card */
function InfoCard({ title, text }: { title: string; text: string }) {
    return (
        <div className="bg-white rounded-2xl shadow p-6">
            <h4 className="flex items-center gap-1 font-semibold mb-2">
                {title} <Info size={14} className="text-blue-500" />
            </h4>
            <p className="text-gray-600 text-sm">{text}</p>
        </div>
    );
}
