import React from "react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import CustomTooltip from "../utils/CustomTooltip";

export default function AreaMatchProgress({ data }: any) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Match Score Improvement Potential</h3>
            <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="score" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                </AreaChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                <div>
                    <div className="text-2xl font-bold text-blue-600">78%</div>
                    <div className="text-xs text-slate-600">Current</div>
                </div>
                <div>
                    <div className="text-2xl font-bold text-green-600">+7%</div>
                    <div className="text-xs text-slate-600">Add Skills</div>
                </div>
                <div>
                    <div className="text-2xl font-bold text-purple-600">+14%</div>
                    <div className="text-xs text-slate-600">All Changes</div>
                </div>
            </div>
        </div>
    );
}
