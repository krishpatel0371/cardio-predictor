"use client";

import { useEffect, useState } from "react";
import {
  HeartPulse,
  ShieldCheck,
  Zap,
  BarChart3,
} from "lucide-react";

export default function Home() {
  const [accuracy, setAccuracy] = useState(0);

  // Smooth counter animation
  useEffect(() => {
    let start = 0;
    const end = 73.18;
    const timer = setInterval(() => {
      start += 1.2;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setAccuracy(Number(start.toFixed(1)));
    }, 30);

    return () => clearInterval(timer);
  }, []);

  const cards = [
    {
      title: `${accuracy}% Accuracy`,
      desc: "Trained on 70,000+ medical records",
      icon: <BarChart3 className="text-blue-600" />,
    },
    {
      title: "Instant Results",
      desc: "Predictions delivered in seconds",
      icon: <Zap className="text-orange-500" />,
    },
    {
      title: "Secure & Private",
      desc: "End-to-end encrypted processing",
      icon: <ShieldCheck className="text-green-600" />,
    },
    {
      title: "Clinical Confidence",
      desc: "Probability-based risk scoring",
      icon: <HeartPulse className="text-red-500" />,
    },
  ];

  return (
    <section className="relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-orange-50 -z-10" />

      <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16">
        {/* LEFT */}
        <div className="flex flex-col justify-center">
          <span className="w-fit bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-sm font-medium mb-6">
            AI-Powered Early Warning System
          </span>

          <h1 className="text-5xl font-extrabold leading-tight mb-6">
            Cardiovascular <br />
            <span className="text-blue-600">
              Risk Intelligence
            </span>
          </h1>

          <p className="text-gray-600 text-lg mb-8 max-w-xl">
            An intelligent clinical decision support system that evaluates
            vital health indicators and predicts heart disease risks with
            medical-grade precision.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="/predict"
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-medium shadow-lg transition"
            >
              Start Assessment
            </a>

            <a
              href="/model"
              className="border border-gray-300 hover:border-blue-600 px-8 py-3 rounded-xl font-medium transition"
            >
              Learn How It Works
            </a>
          </div>

          {/* Trust badges */}
          <div className="mt-10 flex gap-6 text-sm text-gray-500">
            <span>✔ Clinically Inspired</span>
            <span>✔ Research-Backed</span>
            <span>✔ Privacy-First</span>
          </div>
        </div>

        {/* RIGHT */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {cards.map((item) => (
            <div
              key={item.title}
              className="group bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition hover:-translate-y-1"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-gray-100 rounded-xl group-hover:scale-110 transition">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-lg">
                  {item.title}
                </h3>
              </div>

              <p className="text-sm text-gray-500">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
