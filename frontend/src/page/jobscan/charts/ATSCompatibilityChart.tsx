import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

export default function ATSCompatibilityChart({ data }: any) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">ATS Compatibility Score</h3>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                        <Cell fill="#10b981" />
                        <Cell fill="#ef4444" />
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
            <div className="text-center mt-4">
                <div className="text-3xl font-bold text-green-600">85%</div>
                <div className="text-sm text-slate-600">ATS systems will likely parse your resume correctly</div>
            </div>
        </div>
    );
}


