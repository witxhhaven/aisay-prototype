import { useState } from 'react';
import { Header } from '../components/dashboard/Header';
import { ActionCards } from '../components/dashboard/ActionCards';
import { BatchList } from '../components/dashboard/BatchList';
import { PretrainedWizard } from '../components/dashboard/PretrainedWizard';
import { CustomWizard } from '../components/dashboard/CustomWizard';

export function DashboardPage() {
  const [pretrainedWizardOpen, setPretrainedWizardOpen] = useState(false);
  const [customWizardOpen, setCustomWizardOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-slate-900 mb-2">Welcome!</h1>
          <p className="text-slate-600">
            Create batches to process your documents using OCR and KIE
          </p>
        </div>

        {/* Action Cards */}
        <div className="mb-12">
          <ActionCards
            onCreatePretrained={() => setPretrainedWizardOpen(true)}
            onCreateCustom={() => setCustomWizardOpen(true)}
          />
        </div>

        {/* Batch List */}
        <BatchList />
      </main>

      {/* Wizards */}
      <PretrainedWizard
        isOpen={pretrainedWizardOpen}
        onClose={() => setPretrainedWizardOpen(false)}
      />
      <CustomWizard
        isOpen={customWizardOpen}
        onClose={() => setCustomWizardOpen(false)}
      />
    </div>
  );
}
