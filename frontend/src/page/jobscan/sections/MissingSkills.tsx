import React from 'react';
import { AlertCircle } from 'lucide-react';

interface MissingSkillsProps {
    skills: string[];
}

const MissingSkills: React.FC<MissingSkillsProps> = ({ skills }) => (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
            <AlertCircle className="w-5 h-5 text-orange-500 mr-2" />
            Missing Skills
        </h3>
        <div className="space-y-2">
            {skills.map((skill, idx) => (
                <div key={idx} className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <div className="font-medium text-orange-900">{skill}</div>
                    <div className="text-xs text-orange-700 mt-1">High priority for this role</div>
                </div>
            ))}
        </div>
    </div>
);

export default MissingSkills;
