import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Check, AlertCircle, X, FileText, Trash2 } from 'lucide-react';
import { Modal, Button, Input, Select } from '../shared';
import { documentTypes } from '../../data/mockData';
import { useApp } from '../../context/AppContext';

export function PretrainedWizard({ isOpen, onClose, editBatch = null }) {
  const navigate = useNavigate();
  const { addBatch, updateBatch } = useApp();
  const isEditMode = !!editBatch;

  const [step, setStep] = useState(isEditMode ? 2 : 1);
  const [formData, setFormData] = useState({
    name: '',
    documentType: 'Passport',
    model: 'flagship',
    files: [],
  });

  // Reset when modal opens or editBatch changes
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      if (editBatch) {
        // Convert existing documents to file format for display
        const existingFiles = editBatch.documents?.map(doc => ({
          name: doc.filename,
          size: doc.fileSize || 1000000,
          valid: true,
          isExisting: true,
          id: doc.id,
        })) || [];

        setFormData({
          name: editBatch.name,
          documentType: editBatch.documentType || 'Passport',
          model: editBatch.model || 'flagship',
          files: existingFiles,
        });
      } else {
        setFormData({
          name: '',
          documentType: 'Passport',
          model: 'flagship',
          files: [],
        });
      }
    }
  }, [isOpen, editBatch]);

  const resetForm = () => {
    setStep(1);
    setFormData({
      name: editBatch?.name || '',
      documentType: editBatch?.documentType || 'Passport',
      model: editBatch?.model || 'flagship',
      files: [],
    });
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleCreateBatch = () => {
    if (isEditMode) {
      // Update existing batch and regenerate extracted data
      const updatedDocuments = editBatch.documents.map((doc, i) => ({
        ...doc,
        status: i < 3 ? 'processing' : 'completed',
        extractedData: i >= 3 ? generateMockData(formData.documentType, i) : null,
        processedDate: i >= 3 ? new Date() : null,
        documentType: formData.documentType,
      }));

      updateBatch(editBatch.id, {
        name: formData.name,
        documentType: formData.documentType,
        model: formData.model,
        documents: updatedDocuments,
        modifiedDate: new Date(),
      });

      handleClose();
      return;
    }

    // Create mock documents based on document type
    const mockDocCount = Math.floor(Math.random() * 8) + 3; // 3-10 documents
    const documents = Array.from({ length: mockDocCount }, (_, i) => ({
      id: `doc-${Date.now()}-${i}`,
      filename: `${formData.documentType.toLowerCase().replace(/\s+/g, '_')}_${String(i + 1).padStart(3, '0')}.pdf`,
      fileType: 'pdf',
      fileSize: Math.floor(Math.random() * 5000000) + 500000,
      status: i === 0 ? 'completed' : (i < 3 ? 'processing' : 'completed'), // First doc always completed, then 2 processing
      uploadDate: new Date(),
      processedDate: i === 0 || i >= 3 ? new Date() : null,
      extractedData: i === 0 || i >= 3 ? generateMockData(formData.documentType, i) : null,
      documentType: formData.documentType,
    }));

    const newBatch = addBatch({
      name: formData.name,
      type: 'pretrained',
      documentType: formData.documentType,
      model: formData.model,
      documents,
    });

    handleClose();
    navigate(`/batch/${newBatch.id}`);
  };

  // Mock file handling for UI demo
  const handleFileDrop = (e) => {
    e.preventDefault();
    // In a real app, we would process the files here
    // For the mock, we add a new fake file
    const newMockFiles = [
      { name: `new_document_${Date.now()}.pdf`, size: 2345678, valid: true, isExisting: false },
    ];
    setFormData({ ...formData, files: [...formData.files, ...newMockFiles] });
  };

  const removeFile = (index) => {
    const newFiles = [...formData.files];
    newFiles.splice(index, 1);
    setFormData({ ...formData, files: newFiles });
  };

  const stepTitles = {
    1: 'Name Your Batch',
    2: 'Document Type & Model',
    3: 'Upload Documents',
  };

  const totalSteps = 3;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      supertitle={`Pretrained Documents (Step ${step} of ${totalSteps})`}
      title={stepTitles[step]}
      size="md"
      progress={step / totalSteps}
    >
      {/* Step 1: Batch Name */}
      {step === 1 && (
        <div className="space-y-6">
          <Input
            label="Batch Name"
            placeholder="Enter a name for your batch"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            maxLength={100}
            required
            autoFocus
          />
          <div className="flex gap-3 justify-end">
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={handleNext} disabled={!formData.name.trim()}>
              Next
            </Button>
          </div>
        </div>
      )}

      {/* Step 2: Document Type & Model */}
      {step === 2 && (
        <div className="space-y-6">
          <Select
            label="Document Type"
            value={formData.documentType}
            onChange={(value) => setFormData({ ...formData, documentType: value })}
            options={documentTypes}
            required
          />

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">
              Model Selection <span className="text-red-500">*</span>
            </label>
            <div className="space-y-3">
              <label
                className={`flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                  formData.model === 'flagship'
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <input
                  type="radio"
                  name="model"
                  value="flagship"
                  checked={formData.model === 'flagship'}
                  onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                  className="mt-1"
                />
                <div>
                  <p className="font-medium text-slate-900">Flagship Models</p>
                  <p className="text-sm text-slate-500">High accuracy, cloud-based</p>
                </div>
              </label>
              <label
                className={`flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                  formData.model === 'local'
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <input
                  type="radio"
                  name="model"
                  value="local"
                  checked={formData.model === 'local'}
                  onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                  className="mt-1"
                />
                <div>
                  <p className="font-medium text-slate-900">Locally Hosted Models</p>
                  <p className="text-sm text-slate-500">Fast processing, on-premise</p>
                </div>
              </label>
            </div>
          </div>

          <div className="flex gap-3 justify-end">
            <Button variant="secondary" onClick={handleBack}>
              Back
            </Button>
            <Button onClick={handleNext}>Next</Button>
          </div>
        </div>
      )}

      {/* Step 3: Upload Files */}
      {step === 3 && (
        <div className="space-y-6">
          {/* Drop Zone */}
          <div
            className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-purple-400 transition-colors cursor-pointer"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleFileDrop}
            onClick={handleFileDrop}
          >
            <Upload className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <p className="text-slate-600 mb-1">Drag files here or click to browse</p>
            <p className="text-sm text-slate-400">Supported: PDF, JPG, PNG • Max: 50 files, 200 pages each</p>
          </div>

          {/* File List */}
          {formData.files.length > 0 && (
            <div>
              <p className="text-sm font-medium text-slate-700 mb-2">
                Uploaded Files ({formData.files.length}):
              </p>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {formData.files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 bg-slate-50 rounded-lg"
                  >
                    <div className="flex items-center gap-2">
                      {file.valid ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-yellow-500" />
                      )}
                      <span className="text-sm text-slate-700">{file.name}</span>
                      <span className="text-xs text-slate-400">
                        ({(file.size / 1024 / 1024).toFixed(1)} MB)
                      </span>
                    </div>
                    <button
                      onClick={() => removeFile(index)}
                      className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-3 justify-end">
            <Button variant="secondary" onClick={handleBack}>
              Back
            </Button>
            <Button onClick={handleCreateBatch}>
              {isEditMode ? 'Re-run Batch' : 'Create Batch'}
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
}

// Helper function to generate mock data based on document type
function generateMockData(documentType, index) {
  switch (documentType) {
    case 'Passport':
      return {
        documentNumber: `P${10000000 + index}`,
        givenNames: ['John Michael', 'Jane Elizabeth', 'Alex Wei'][index % 3],
        surname: ['Doe', 'Smith', 'Wong'][index % 3],
        dateOfBirth: `${1980 + (index % 20)}-${String((index % 12) + 1).padStart(2, '0')}-${String((index % 28) + 1).padStart(2, '0')}`,
        placeOfBirth: ['New York, USA', 'London, UK', 'Singapore'][index % 3],
        dateOfIssue: '2020-03-20',
        dateOfExpiry: '2030-03-20',
        nationality: ['United States of America', 'United Kingdom', 'Singapore'][index % 3],
        sex: index % 2 === 0 ? 'M' : 'F',
      };
    case 'Identity Card':
      return {
        idNumber: `S${1000000 + index}${String.fromCharCode(65 + (index % 26))}`,
        fullName: ['Jane Smith', 'John Doe', 'Alex Wong'][index % 3],
        dateOfBirth: `${1985 + (index % 15)}-${String((index % 12) + 1).padStart(2, '0')}-${String((index % 28) + 1).padStart(2, '0')}`,
        address: `${100 + index} Main Street, Singapore ${100000 + index}`,
        dateOfIssue: '2019-07-10',
        dateOfExpiry: '2029-07-10',
        sex: index % 2 === 0 ? 'F' : 'M',
      };
    case 'Tax Document':
      return {
        taxYear: '2023',
        taxpayerName: ['Michael Johnson', 'Emily Davis', 'Christopher Brown'][index % 3],
        ssn: `***-**-${5000 + index}`,
        filingStatus: ['Single', 'Married Filing Jointly', 'Head of Household'][index % 3],
        totalIncome: `$${(75000 + index * 5000).toLocaleString()}`,
        taxableIncome: `$${(62000 + index * 4000).toLocaleString()}`,
        totalTax: `$${(11000 + index * 800).toLocaleString()}`,
        refundAmount: `$${(1000 + index * 100).toLocaleString()}`,
      };
    default:
      return {
        extractedField1: `Value ${index + 1}`,
        extractedField2: `Data ${index + 1}`,
      };
  }
}
