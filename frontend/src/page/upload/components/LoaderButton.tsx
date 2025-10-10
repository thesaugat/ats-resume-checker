import React from 'react';
import { Zap } from 'lucide-react';

interface LoaderButtonProps {
    loading: boolean;
    disabled?: boolean;
    onClick: () => void;
    children: React.ReactNode;
}

export default function LoaderButton({ loading, disabled, onClick, children }: LoaderButtonProps) {
    return (
        <button
            onClick={onClick}
            disabled={disabled || loading}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center space-x-3"
        >
            {loading ? (
                <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                    <span>Analyzing...</span>
                </>
            ) : (
                <>
                    <Zap className="w-5 h-5" />
                    <span>{children}</span>
                </>
            )}
        </button>
    );
}
