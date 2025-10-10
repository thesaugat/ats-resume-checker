import React from "react";
import { ResponsiveContainer, RadialBarChart, RadialBar, Legend, Tooltip, PolarGrid } from "recharts";
import CustomTooltip from "../utils/CustomTooltip";

export default function RadialScoreChart({ data }: any) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Overall Performance Metrics</h3>
            <ResponsiveContainer width="100%" height={300}>
                <RadialBarChart cx="50%" cy="50%" innerRadius="10%" outerRadius="90%" data={data} startAngle={90} endAngle={-270}>
                    <PolarGrid gridType="circle" />
                    <RadialBar minAngle={15} background clockWise dataKey="value" cornerRadius={10} />
                    <Legend iconSize={10} layout="vertical" verticalAlign="middle" align="right" />
                    <Tooltip content={<CustomTooltip />} />
                </RadialBarChart>
            </ResponsiveContainer>
        </div>
    );
}
