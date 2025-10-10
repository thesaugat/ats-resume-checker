import React, { memo } from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { CheckCircle, AlertCircle, Shield, TrendingUp } from "lucide-react";

// ATS Tooltip
const ATSTooltip = memo(({ active, payload }: any) => {
    if (!active || !payload || !payload.length) return null;
    const { name, value, payload: cellPayload } = payload[0];
    return (
        <div className="bg-white px-3 py-2 rounded-lg shadow-lg border border-slate-200">
            <p className="text-xs font-medium text-slate-700">{name}</p>
            <p className="text-lg font-bold" style={{ color: cellPayload.fill }}>
                {value}%
            </p>
        </div>
    );
});

// Performance Metrics Grid
const PerformanceMetrics = memo(({ data }: any) => (
    <div className="grid grid-cols-2 gap-3">
        {data.map((metric: any, idx: number) => (
            <div
                key={idx}
                className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors"
            >
                <div
                    className="w-1.5 h-12 rounded-full flex-shrink-0"
                    style={{ backgroundColor: metric.fill }}
                />
                <div className="flex flex-col min-w-0">
                    <span className="text-xs text-slate-500 truncate">{metric.name}</span>
                    <span className="text-xl font-bold text-slate-900">
                        {metric.value}
                        <span className="text-sm text-slate-400">%</span>
                    </span>
                </div>
            </div>
        ))}
    </div>
));

// Status Configuration
const statusConfig = {
    excellent: {
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        icon: CheckCircle,
        text: 'Excellent',
        description: 'Your resume is highly ATS-compatible'
    },
    good: {
        color: 'text-blue-600',
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200',
        icon: Shield,
        text: 'Good',
        description: 'Most ATS systems will parse correctly'
    },
    'needs-work': {
        color: 'text-orange-600',
        bgColor: 'bg-orange-50',
        borderColor: 'border-orange-200',
        icon: AlertCircle,
        text: 'Needs Work',
        description: 'Consider improving ATS compatibility'
    }
};

// Main Component
const ATSPerformanceDashboard = ({ atsCompatibility, radial }: any) => {
    const atsScore = atsCompatibility[0].value;
    const atsStatus = atsScore >= 80 ? 'excellent' : atsScore >= 60 ? 'good' : 'needs-work';
    const status = statusConfig[atsStatus];
    const StatusIcon = status.icon;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Left: ATS Score */}
                <div className="lg:col-span-2">
                    <div className="flex items-center gap-2 mb-4">
                        <Shield className="w-5 h-5 text-slate-700" />
                        <h3 className="text-lg font-semibold text-slate-900">ATS Compatibility</h3>
                    </div>

                    <div className="relative">
                        <ResponsiveContainer width="100%" height={180}>
                            <PieChart>
                                <Pie
                                    data={atsCompatibility}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={50}
                                    outerRadius={70}
                                    paddingAngle={2}
                                    dataKey="value"
                                    startAngle={90}
                                    endAngle={-270}
                                >
                                    {atsCompatibility.map((entry: any, idx: number) => (
                                        <Cell key={idx} fill={entry.fill} />
                                    ))}
                                </Pie>
                                <Tooltip content={<ATSTooltip />} />
                            </PieChart>
                        </ResponsiveContainer>

                        {/* Center Score */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-slate-900">{atsScore}%</div>
                                <div className="text-xs text-slate-500 mt-0.5">Score</div>
                            </div>
                        </div>
                    </div>


                </div>

                {/* Right: Performance Metrics */}
                <div className="lg:col-span-3 lg:border-l lg:border-slate-200 lg:pl-6">
                    <div className="flex items-center gap-2 mb-4">
                        <TrendingUp className="w-5 h-5 text-slate-700" />
                        <h3 className="text-lg font-semibold text-slate-900">Performance Metrics</h3>
                    </div>
                    <PerformanceMetrics data={radial} />
                </div>
            </div>
            {/* Status Badge */}
            <div className={`mt-6 p-3 rounded-lg border ${status.borderColor} ${status.bgColor}`}>
                <div className="flex items-center gap-2 mb-2">
                    <StatusIcon className={`w-4 h-4 ${status.color}`} />
                    <span className={`text-sm font-semibold ${status.color}`}>{status.text}</span>
                </div>
                <p className="text-xs text-slate-600 ">{status.description}</p>
            </div>
        </div>
    );
};

export default memo(ATSPerformanceDashboard);
