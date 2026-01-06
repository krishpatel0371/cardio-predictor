"use client";

import { motion } from "framer-motion";
import {
  Activity,
  HeartPulse,
  Database,
  Brain,
} from "lucide-react";

export default function Insights() {
  const features = [
    {
      icon: <Database className="text-blue-600" />,
      title: "Demographic Factors",
      items: ["Age", "Gender", "Height", "Weight"],
    },
    {
      icon: <Activity className="text-orange-500" />,
      title: "Clinical Measurements",
      items: ["Systolic BP", "Diastolic BP", "Cholesterol", "Glucose"],
    },
    {
      icon: <HeartPulse className="text-red-500" />,
      title: "Lifestyle Indicators",
      items: ["Smoking", "Alcohol Intake", "Physical Activity"],
    },
  ];

  return (
    <section className="relative py-20 px-6">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-white to-blue-50 -z-10" />

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block bg-red-100 text-red-600 px-4 py-1 rounded-full text-sm font-medium mb-4">
            📊 Clinical Data Insights
          </span>

          <h2 className="text-4xl font-extrabold mb-4">
            Understanding the <span className="text-red-600">Data Behind</span>{" "}
            Heart Disease
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            This system is trained on structured medical records combining
            demographic details, examination results, and lifestyle habits to
            identify cardiovascular risk patterns.
          </p>
        </motion.div>

        {/* Insight Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((block, i) => (
            <motion.div
              key={block.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-gray-100 rounded-xl">
                  {block.icon}
                </div>
                <h3 className="font-semibold text-lg">
                  {block.title}
                </h3>
              </div>

              <ul className="space-y-2 text-gray-600 text-sm">
                {block.items.map(item => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* EDA Explanation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-100 rounded-xl">
              <Brain className="text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold">
              Exploratory Data Analysis (EDA)
            </h3>
          </div>

          <p className="text-gray-600 leading-relaxed">
            Exploratory Data Analysis was conducted to visualize feature
            distributions, identify anomalies such as abnormal blood pressure
            values, and determine the most influential risk factors. These
            insights guided feature selection, preprocessing, and model
            training—ensuring reliable and interpretable cardiovascular risk
            predictions.
          </p>

          <div className="mt-6 grid sm:grid-cols-3 gap-4 text-center text-sm">
            <div className="bg-red-50 p-4 rounded-xl">
              <b className="text-red-600">High Impact</b>
              <p className="text-gray-600 mt-1">Blood Pressure</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-xl">
              <b className="text-orange-600">Moderate Impact</b>
              <p className="text-gray-600 mt-1">Cholesterol & BMI</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-xl">
              <b className="text-blue-600">Supporting Factors</b>
              <p className="text-gray-600 mt-1">Lifestyle Habits</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
