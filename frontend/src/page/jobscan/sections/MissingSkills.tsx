import React from 'react';
import { Flame, Zap, Target } from 'lucide-react';

interface MissingSkillsProps {
    missing_skills: string[];
    missing_skills_priority: number[];
}

function getPriorityConfig(priority: number) {
    const configs = {
        1: {
            label: 'Critical',
            color: 'text-rose-600',
            bg: 'bg-rose-50',
            border: 'border-rose-200',
            icon: Flame
        },
        2: {
            label: 'High',
            color: 'text-amber-600',
            bg: 'bg-amber-50',
            border: 'border-amber-200',
            icon: Zap
        },
        3: {
            label: 'Medium',
            color: 'text-blue-600',
            bg: 'bg-blue-50',
            border: 'border-blue-200',
            icon: Target
        }
    };
    return configs[priority as keyof typeof configs] || configs[3];
}

export default function MissingSkills({
    missing_skills,
    missing_skills_priority
}: MissingSkillsProps) {
    // Group skills by priority
    const groupedSkills = missing_skills.reduce((acc, skill, idx) => {
        const priority = missing_skills_priority[idx];
        if (!acc[priority]) acc[priority] = [];
        acc[priority].push(skill);
        return acc;
    }, {} as Record<number, string[]>);

    const sortedPriorities = Object.keys(groupedSkills).map(Number).sort((a, b) => a - b);

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-900">Missing Skills</h3>
                <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full">
                    {missing_skills.length}
                </span>
            </div>

            {/* Horizontal Distribution Graph */}
            <div className="mb-4 bg-slate-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-slate-600">Priority Distribution</span>
                    <span className="text-xs text-slate-500">{missing_skills.length} total</span>
                </div>
                <div className="flex gap-1 h-1.5 rounded-full overflow-hidden bg-slate-200">
                    {sortedPriorities.map(priority => {
                        const config = getPriorityConfig(priority);
                        const skills = groupedSkills[priority];
                        const percentage = (skills.length / missing_skills.length) * 100;
                        const barColor =
                            priority === 1
                                ? 'bg-rose-400'
                                : priority === 2
                                    ? 'bg-amber-400'
                                    : 'bg-blue-400';

                        return (
                            <div
                                key={priority}
                                className={`${barColor} rounded-full transition-all duration-500 hover:opacity-80`}
                                style={{ width: `${percentage}%` }}
                                title={`${config.label}: ${skills.length} skills (${Math.round(percentage)}%)`}
                            ></div>
                        );
                    })}
                </div>
                <div className="flex items-center gap-4 mt-3">
                    {sortedPriorities.map(priority => {
                        const config = getPriorityConfig(priority);
                        const skills = groupedSkills[priority];
                        const dotColor =
                            priority === 1
                                ? 'bg-rose-400'
                                : priority === 2
                                    ? 'bg-amber-400'
                                    : 'bg-blue-400';

                        return (
                            <div key={priority} className="flex items-center gap-1.5">
                                <div className={`w-1.5 h-1.5 rounded-full ${dotColor}`}></div>
                                <span className="text-xs font-medium text-slate-600">{config.label}</span>
                                <span className="text-xs text-slate-400">{skills.length}</span>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="space-y-3">
                {sortedPriorities.map(priority => {
                    const config = getPriorityConfig(priority);
                    const Icon = config.icon;
                    const skills = groupedSkills[priority];

                    return (
                        <div
                            key={priority}
                            className="bg-white border border-slate-200 rounded-lg p-3 hover:border-slate-300 transition-colors"
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <Icon className={`w-4 h-4 ${config.color}`} />
                                <span className={`text-xs font-bold ${config.color} uppercase`}>
                                    {config.label}
                                </span>
                                <span className="text-xs text-slate-500 ml-auto">{skills.length}</span>
                            </div>

                            <div className="flex flex-wrap gap-1.5">
                                {skills.map((skill, idx) => (
                                    <span
                                        key={idx}
                                        className={`inline-flex items-center px-2.5 py-1 ${config.bg} rounded-md text-xs font-medium ${config.color} border ${config.border} hover:shadow-sm transition-all`}
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
