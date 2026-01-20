import { FileText, Settings, ArrowRight } from 'lucide-react';
import { documentTypes } from '../../data/mockData';

export function ActionCards({ onCreatePretrained, onCreateCustom }) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Pretrained Documents Card */}
      <button
        onClick={onCreatePretrained}
        className="bg-white border-2 border-slate-200 hover:border-purple-400 hover:shadow-lg rounded-xl p-6 transition-all text-left group"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">Pretrained Documents</h3>
          </div>
          <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
        </div>

        <p className="text-slate-600 mb-3">
          Process common document types with pre-configured models
        </p>

        <p className="text-sm text-slate-500">
          <span className="font-medium text-slate-600">Supported: </span>
          {documentTypes.join(', ')}
        </p>
      </button>

      {/* Custom Documents Card */}
      <button
        onClick={onCreateCustom}
        className="bg-white border-2 border-slate-200 hover:border-purple-400 hover:shadow-lg rounded-xl p-6 transition-all text-left group"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Settings className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">Custom Documents</h3>
          </div>
          <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
        </div>

        <p className="text-slate-600 mb-3">
          Define your own data structure or use custom prompts
        </p>

        <p className="text-sm text-slate-500">
          <span className="font-medium text-slate-600">Flexibility: </span>
          Unique document layouts, Industry-specific forms, Custom extraction needs
        </p>
      </button>
    </div>
  );
}
