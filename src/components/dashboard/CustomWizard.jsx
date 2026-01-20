import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Check, AlertCircle, X, Plus, Trash2 } from 'lucide-react';
import { Modal, Button, Input, TextArea, Select } from '../shared';
import { dataTypes } from '../../data/mockData';
import { useApp } from '../../context/AppContext';

export function CustomWizard({ isOpen, onClose }) {
  const navigate = useNavigate();
  const { addBatch } = useApp();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    model: 'flagship',
    processingMethod: 'structure',
    customFields: [
      { name: '', type: 'Auto Detect' },
      { name: '', type: 'Auto Detect' },
      { name: '', type: 'Auto Detect' },
    ],
    customPrompt: '',
    files: [],
  });

  const resetForm = () => {
    setStep(1);
    setFormData({
      name: '',
      model: 'flagship',
      processingMethod: 'structure',
      customFields: [
        { name: '', type: 'Auto Detect' },
        { name: '', type: 'Auto Detect' },
        { name: '', type: 'Auto Detect' },
      ],
      customPrompt: '',
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

  const addField = () => {
    if (formData.customFields.length < 50) {
      setFormData({
        ...formData,
        customFields: [...formData.customFields, { name: '', type: 'Auto Detect' }],
      });
    }
  };

  const removeField = (index) => {
    const newFields = [...formData.customFields];
    newFields.splice(index, 1);
    setFormData({ ...formData, customFields: newFields });
  };

  const updateField = (index, key, value) => {
    const newFields = [...formData.customFields];
    newFields[index] = { ...newFields[index], [key]: value };
    setFormData({ ...formData, customFields: newFields });
  };

  const handleCreateBatch = () => {
    // Create mock documents (10-12 to showcase scrolling in picker)
    const mockDocCount = Math.floor(Math.random() * 3) + 10; // 10-12 documents
    const documents = Array.from({ length: mockDocCount }, (_, i) => ({
      id: `doc-${Date.now()}-${i}`,
      filename: `custom_document_${String(i + 1).padStart(3, '0')}.pdf`,
      fileType: 'pdf',
      fileSize: Math.floor(Math.random() * 5000000) + 500000,
      status: i === 0 ? 'completed' : (i < 3 ? 'processing' : 'completed'), // First doc always completed
      uploadDate: new Date(),
      processedDate: i === 0 || i >= 3 ? new Date() : null,
      extractedData: i === 0 || i >= 3 ? generateCustomMockData(formData, i) : null,
      documentType: 'Custom Document',
    }));

    const newBatch = addBatch({
      name: formData.name,
      type: 'custom',
      documentType: 'Custom Document',
      processingMethod: formData.processingMethod,
      customFields: formData.processingMethod === 'structure' ? formData.customFields : undefined,
      customPrompt: formData.processingMethod === 'prompt' ? formData.customPrompt : undefined,
      model: formData.model,
      documents,
    });

    handleClose();
    navigate(`/batch/${newBatch.id}`);
  };

  // Mock file handling for UI demo
  const handleFileDrop = (e) => {
    e.preventDefault();
    const mockFiles = [
      { name: 'custom_doc_001.pdf', size: 2345678, valid: true },
      { name: 'custom_doc_002.pdf', size: 1234567, valid: true },
      { name: 'custom_doc_003.jpg', size: 987654, valid: true },
    ];
    setFormData({ ...formData, files: mockFiles });
  };

  const removeFile = (index) => {
    const newFiles = [...formData.files];
    newFiles.splice(index, 1);
    setFormData({ ...formData, files: newFiles });
  };

  const isStep3Valid = () => {
    if (formData.processingMethod === 'structure') {
      return formData.customFields.some((f) => f.name.trim());
    }
    return formData.customPrompt.trim().length > 0;
  };

  const stepTitles = {
    1: 'Name Your Batch',
    2: 'Model Selection',
    3: 'Processing Method',
    4: 'Upload Documents',
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      supertitle={`Step ${step} of 4`}
      title={stepTitles[step]}
      subtitle="Custom Documents"
      size="md"
    >
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="h-1 bg-slate-100 rounded-full">
          <div
            className="h-full bg-purple-600 rounded-full transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>
      </div>

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

      {/* Step 2: Model Selection */}
      {step === 2 && (
        <div className="space-y-6">
          <div className="p-4 bg-slate-50 rounded-lg">
            <p className="text-sm font-medium text-slate-700">Document Type</p>
            <p className="text-slate-900">Custom Document</p>
          </div>

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

      {/* Step 3: Processing Method */}
      {step === 3 && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">
              Choose how to extract data:
            </label>
            <div className="space-y-3">
              <label
                className={`flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                  formData.processingMethod === 'structure'
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <input
                  type="radio"
                  name="processingMethod"
                  value="structure"
                  checked={formData.processingMethod === 'structure'}
                  onChange={(e) => setFormData({ ...formData, processingMethod: e.target.value })}
                  className="mt-1"
                />
                <div>
                  <p className="font-medium text-slate-900">Define Data Structure</p>
                  <p className="text-sm text-slate-500">Specify fields and data types</p>
                </div>
              </label>
              <label
                className={`flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                  formData.processingMethod === 'prompt'
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <input
                  type="radio"
                  name="processingMethod"
                  value="prompt"
                  checked={formData.processingMethod === 'prompt'}
                  onChange={(e) => setFormData({ ...formData, processingMethod: e.target.value })}
                  className="mt-1"
                />
                <div>
                  <p className="font-medium text-slate-900">Custom Prompt</p>
                  <p className="text-sm text-slate-500">Write instructions for extraction</p>
                </div>
              </label>
            </div>
          </div>

          {/* Data Structure Fields */}
          {formData.processingMethod === 'structure' && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">
                Define Fields
              </label>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {formData.customFields.map((field, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <input
                      type="text"
                      placeholder="Field Name"
                      value={field.name}
                      onChange={(e) => updateField(index, 'name', e.target.value)}
                      className="flex-1 px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                    />
                    <select
                      value={field.type}
                      onChange={(e) => updateField(index, 'type', e.target.value)}
                      className="px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                    >
                      {dataTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => removeField(index)}
                      className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                      disabled={formData.customFields.length <= 1}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={addField}
                className="mt-3 flex items-center gap-2 text-sm text-purple-600 hover:text-purple-700"
                disabled={formData.customFields.length >= 50}
              >
                <Plus className="w-4 h-4" />
                Add Field
              </button>
            </div>
          )}

          {/* Custom Prompt */}
          {formData.processingMethod === 'prompt' && (
            <TextArea
              label="Custom Prompt"
              placeholder="Describe what information you want to extract..."
              value={formData.customPrompt}
              onChange={(e) => setFormData({ ...formData, customPrompt: e.target.value })}
              maxLength={2000}
              required
            />
          )}

          <div className="flex gap-3 justify-end">
            <Button variant="secondary" onClick={handleBack}>
              Back
            </Button>
            <Button onClick={handleNext} disabled={!isStep3Valid()}>
              Next
            </Button>
          </div>
        </div>
      )}

      {/* Step 4: Upload Files */}
      {step === 4 && (
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
                      className="p-1 text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-4 h-4" />
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
            <Button onClick={handleCreateBatch}>Create Batch</Button>
          </div>
        </div>
      )}
    </Modal>
  );
}

// Helper function to generate mock data for custom documents
function generateCustomMockData(formData, index) {
  if (formData.processingMethod === 'prompt') {
    // Return a natural language response
    return `Based on the document analysis, the extracted information includes: Item ${index + 1} with reference number REF-${1000 + index}, dated ${new Date().toLocaleDateString()}, containing total amount of $${(100 + index * 50).toFixed(2)}. Additional details show standard processing was completed with verification code VER-${String(index + 1).padStart(4, '0')}.`;
  }

  // Return structured data based on defined fields
  const result = {};
  formData.customFields.forEach((field, i) => {
    if (field.name.trim()) {
      switch (field.type) {
        case 'Number':
          result[field.name] = 100 + index * 10 + i;
          break;
        case 'Currency':
          result[field.name] = `$${(50 + index * 25 + i * 10).toFixed(2)}`;
          break;
        case 'Date':
          result[field.name] = new Date(Date.now() - index * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
          break;
        case 'Boolean':
          result[field.name] = index % 2 === 0 ? 'Yes' : 'No';
          break;
        case 'Email':
          result[field.name] = `user${index + 1}@example.com`;
          break;
        case 'Phone':
          result[field.name] = `+1 (555) ${String(100 + index).padStart(3, '0')}-${String(1000 + i).padStart(4, '0')}`;
          break;
        case 'Percentage':
          result[field.name] = `${(10 + index * 5 + i * 2).toFixed(1)}%`;
          break;
        default:
          result[field.name] = `Value_${index + 1}_${i + 1}`;
      }
    }
  });
  return result;
}
