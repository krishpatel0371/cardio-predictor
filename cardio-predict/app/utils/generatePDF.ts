import jsPDF from "jspdf";

export function generatePDF(result: any) {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Cardiovascular Risk Assessment Report", 14, 20);

    doc.setFontSize(12);
    doc.text(`Risk Level: ${result.risk}`, 14, 40);
    doc.text(`Risk Score: ${Math.round(result.risk_score * 100)}%`, 14, 50);
    doc.text(`BMI: ${result.bmi}`, 14, 60);

    doc.text("AI Explanation:", 14, 80);
    doc.text("- Elevated blood pressure", 18, 90);
    doc.text("- Cholesterol impact", 18, 100);
    doc.text("- Body Mass Index contribution", 18, 110);

    doc.setFontSize(10);
    doc.text(
        "Disclaimer: This AI-generated report is for educational purposes only "
        + "and does not replace professional medical advice.",
        14,
        140,
        { maxWidth: 180 }
    );

    doc.save("Cardio_Risk_Report.pdf");
}
