"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    HeartPulse,
    Activity,
    Ruler,
    Weight,
    Droplet,
    CheckCircle,
} from "lucide-react";

const steps = [
    "Basic Info",
    "Body Metrics",
    "Blood Pressure",
    "Lifestyle",
];

export default function PredictPage() {
    const router = useRouter();
    const [step, setStep] = useState(0);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        age: "",
        gender: "",
        height: "",
        weight: "",
        ap_hi: "",
        ap_lo: "",
        cholesterol: "",
        gluc: "",
        smoke: "",
        alco: "",
        active: "",
    });

    const validateInput = (data: any) => {
        if (data.age < 18 || data.age > 100) return "Age must be between 18–100";
        if (data.height < 120 || data.height > 220) return "Height must be 120–220 cm";
        if (data.weight < 30 || data.weight > 200) return "Weight must be 30–200 kg";
        if (data.ap_hi < 90 || data.ap_hi > 200) return "Systolic BP must be 90–200";
        if (data.ap_lo < 60 || data.ap_lo > 130) return "Diastolic BP must be 60–130";
        return null;
    };

    const handleChange = (e: any) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async () => {
        const error = validateInput(formData);
        if (error) return alert(error);

        setLoading(true);
        try {
            const res = await fetch("http://127.0.0.1:5000/predict", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            localStorage.setItem("cardioResult", JSON.stringify(data));
            router.push("/result");
        } catch {
            alert("❌ Server error");
        }
        setLoading(false);
    };

    return (
        <main className="min-h-screen flex items-center justify-center px-6 py-16 bg-gradient-to-br from-red-50 via-white to-blue-50">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-3xl bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-10"
            >
                {/* Header */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-4 py-1 rounded-full text-sm mb-4">
                        <HeartPulse size={16} /> Clinical AI Assessment
                    </div>
                    <h1 className="text-3xl font-extrabold mb-2">
                        Cardiovascular Risk Evaluation
                    </h1>
                    <p className="text-gray-600">
                        Please provide accurate information for best clinical insight.
                    </p>
                </div>

                {/* Progress */}
                <div className="flex items-center justify-between mb-10">
                    {steps.map((s, i) => (
                        <div key={i} className="flex-1 text-center">
                            <div
                                className={`h-2 rounded-full mx-1 ${i <= step ? "bg-green-500" : "bg-gray-200"
                                    }`}
                            />
                            <span className="text-xs text-gray-500">{s}</span>
                        </div>
                    ))}
                </div>

                {/* Step Content */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -40 }}
                        transition={{ duration: 0.4 }}
                        className="space-y-6"
                    >
                        {step === 0 && (
                            <Section title="Basic Information" icon={<Activity />}>
                                <Input name="age" placeholder="Age (18–100)" onChange={handleChange} />
                                <Select
                                    name="gender"
                                    onChange={handleChange}
                                    options={[
                                        { v: "1", l: "Male" },
                                        { v: "2", l: "Female" },
                                    ]}
                                />
                            </Section>
                        )}

                        {step === 1 && (
                            <Section title="Body Measurements" icon={<Ruler />}>
                                <Input name="height" placeholder="Height (cm)" onChange={handleChange} />
                                <Input name="weight" placeholder="Weight (kg)" onChange={handleChange} />
                            </Section>
                        )}

                        {step === 2 && (
                            <Section title="Blood Pressure" icon={<Droplet />}>
                                <Input name="ap_hi" placeholder="Systolic BP" onChange={handleChange} />
                                <Input name="ap_lo" placeholder="Diastolic BP" onChange={handleChange} />
                                <p className="text-xs text-gray-500 col-span-2">
                                    Normal BP is around 120/80 mmHg
                                </p>
                            </Section>
                        )}

                        {step === 3 && (
                            <Section title="Lifestyle Factors" icon={<Weight />}>
                                <Select name="cholesterol" onChange={handleChange} label="Cholesterol" />
                                <Select name="gluc" onChange={handleChange} label="Glucose" />
                                <Select name="smoke" onChange={handleChange} label="Smoking" />
                                <Select name="alco" onChange={handleChange} label="Alcohol" />
                                <Select
                                    name="active"
                                    onChange={handleChange}
                                    label="Physical Activity"
                                    full
                                />
                            </Section>
                        )}
                    </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <div className="flex justify-between mt-10">
                    <button
                        disabled={step === 0}
                        onClick={() => setStep(step - 1)}
                        className="px-6 py-2 rounded-lg border disabled:opacity-40"
                    >
                        Back
                    </button>

                    {step < steps.length - 1 ? (
                        <button
                            onClick={() => setStep(step + 1)}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg"
                        >
                            Next
                        </button>
                    ) : (
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="px-6 py-2 bg-green-600 text-white rounded-lg flex items-center gap-2"
                        >
                            {loading ? "Analyzing..." : <>Predict <CheckCircle size={18} /></>}
                        </button>
                    )}
                </div>
            </motion.div>
        </main>
    );
}

/* Reusable UI */
function Section({ title, icon, children }: any) {
    return (
        <div>
            <h3 className="flex items-center gap-2 font-semibold mb-4 text-gray-700">
                {icon} {title}
            </h3>
            <div className="grid grid-cols-2 gap-4">{children}</div>
        </div>
    );
}

function Input(props: any) {
    return <input {...props} className="input" required />;
}

function Select({ name, label, options, onChange, full }: any) {
    return (
        <select
            name={name}
            onChange={onChange}
            className={`input ${full ? "col-span-2" : ""}`}
        >
            <option value="">{label || "Select"}</option>
            {options
                ? options.map((o: any) => <option key={o.v} value={o.v}>{o.l}</option>)
                : (
                    <>
                        <option value="0">No / Normal</option>
                        <option value="1">Yes / Above Normal</option>
                        <option value="2">Well Above Normal</option>
                    </>
                )}
        </select>
    );
}
