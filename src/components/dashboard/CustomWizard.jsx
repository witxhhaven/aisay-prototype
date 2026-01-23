import { useState, useMemo, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Check, AlertCircle, X, Plus, Trash2 } from 'lucide-react';
import { Modal, Button, Input, TextArea, Select } from '../shared';
import { dataTypes } from '../../data/mockData';
import { useApp } from '../../context/AppContext';

export function CustomWizard({ isOpen, onClose, editBatch = null }) {
  const navigate = useNavigate();
  const { addBatch, updateBatch, batches } = useApp();
  const isEditMode = !!editBatch;

  // For edit mode, start at step 2 (Configuration) since name is already set
  const initialStep = isEditMode ? 2 : 1;
  const [step, setStep] = useState(initialStep);
  const [selectedBatchId, setSelectedBatchId] = useState('');
  const fieldsContainerRef = useRef(null);
  const newFieldRef = useRef(null);
  const [newlyAddedIndex, setNewlyAddedIndex] = useState(null);

  const getInitialFormData = () => {
    if (editBatch) {
      return {
        name: editBatch.name,
        model: editBatch.model || 'flagship',
        processingMethod: editBatch.processingMethod || 'structure',
        customFields: editBatch.customFields?.map(f => ({ ...f })) || [
          { name: '', type: 'Auto Detect' },
          { name: '', type: 'Auto Detect' },
          { name: '', type: 'Auto Detect' },
        ],
        customPrompt: editBatch.customPrompt || '',
        files: [],
      };
    }
    return {
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
    };
  };

  const [formData, setFormData] = useState(getInitialFormData);

  // Filter custom batches by processing method
  const availableBatches = useMemo(() => {
    return batches.filter(
      (batch) =>
        batch.type === 'custom' && batch.processingMethod === formData.processingMethod
    );
  }, [batches, formData.processingMethod]);

  // Handle loading configuration from a previous batch
  const handleLoadBatch = (batchId) => {
    setSelectedBatchId(batchId);
    if (!batchId) {
      // Reset to defaults if "None" selected
      setFormData((prev) => ({
        ...prev,
        customFields: [
          { name: '', type: 'Auto Detect' },
          { name: '', type: 'Auto Detect' },
          { name: '', type: 'Auto Detect' },
        ],
        customPrompt: '',
      }));
      return;
    }

    const selectedBatch = batches.find((b) => b.id === batchId);
    if (selectedBatch) {
      setFormData((prev) => ({
        ...prev,
        model: selectedBatch.model || prev.model,
        customFields: selectedBatch.customFields
          ? selectedBatch.customFields.map((f) => ({ ...f }))
          : prev.customFields,
        customPrompt: selectedBatch.customPrompt || '',
      }));
    }
  };

  // Reset form when modal opens/closes or editBatch changes
  const resetForm = () => {
    setStep(1);
    setSelectedBatchId('');
    setFormData(getInitialFormData());
  };

  // Reset when editBatch changes or modal opens
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setSelectedBatchId('');
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
          model: editBatch.model || 'flagship',
          processingMethod: editBatch.processingMethod || 'structure',
          customFields: editBatch.customFields?.map(f => ({ ...f })) || [
            { name: '', type: 'Auto Detect' },
            { name: '', type: 'Auto Detect' },
            { name: '', type: 'Auto Detect' },
          ],
          customPrompt: editBatch.customPrompt || '',
          files: existingFiles,
        });
      } else {
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
      }
    }
  }, [isOpen, editBatch]);

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
      const newIndex = formData.customFields.length;
      setFormData({
        ...formData,
        customFields: [...formData.customFields, { name: '', type: 'Auto Detect' }],
      });
      setNewlyAddedIndex(newIndex);
    }
  };

  // Focus and scroll to newly added field
  useEffect(() => {
    if (newlyAddedIndex !== null && newFieldRef.current) {
      newFieldRef.current.focus();
      newFieldRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      setNewlyAddedIndex(null);
    }
  }, [newlyAddedIndex, formData.customFields.length]);

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
    if (isEditMode) {
      // Update existing batch and regenerate extracted data
      const updatedDocuments = editBatch.documents.map((doc, i) => ({
        ...doc,
        status: i < 3 ? 'processing' : 'completed',
        extractedData: i >= 3 ? generateCustomMockData(formData, i) : null,
        processedDate: i >= 3 ? new Date() : null,
      }));

      updateBatch(editBatch.id, {
        name: formData.name,
        model: formData.model,
        processingMethod: formData.processingMethod,
        customFields: formData.processingMethod === 'structure' ? formData.customFields : undefined,
        customPrompt: formData.processingMethod === 'prompt' ? formData.customPrompt : undefined,
        documents: updatedDocuments,
        modifiedDate: new Date(),
      });

      handleClose();
      // Stay on the same page, just close the modal
      return;
    }

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

  const isStep3Valid = () => {
    if (formData.processingMethod === 'structure') {
      return formData.customFields.some((f) => f.name.trim());
    }
    return formData.customPrompt.trim().length > 0;
  };

  const stepTitles = {
    1: 'Name Your Batch',
    2: 'Configuration',
    3: formData.processingMethod === 'structure' ? 'Define Fields' : 'Custom Prompt',
    4: 'Upload Documents',
  };

  const totalSteps = 4;

  // Only use xl width for step 3 (Define Fields/Custom Prompt)
  const modalSize = step === 3 ? 'xl' : 'md';

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      supertitle={`Custom Documents (Step ${step} of ${totalSteps})`}
      title={stepTitles[step]}
      size={modalSize}
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

      {/* Step 2: Model Selection + Processing Method */}
      {step === 2 && (
        <div className="space-y-6">
          {/* Model Selection */}
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

          {/* Processing Method */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">
              Processing Method <span className="text-red-500">*</span>
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
                  onChange={(e) => {
                    setFormData({ ...formData, processingMethod: e.target.value });
                    setSelectedBatchId('');
                  }}
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
                  onChange={(e) => {
                    setFormData({ ...formData, processingMethod: e.target.value });
                    setSelectedBatchId('');
                  }}
                  className="mt-1"
                />
                <div>
                  <p className="font-medium text-slate-900">Custom Prompt</p>
                  <p className="text-sm text-slate-500">Write instructions for extraction</p>
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

      {/* Step 3: Load from Previous Batch + Define Fields/Prompt */}
      {step === 3 && (
        <div className="space-y-6">
          {/* Load from Previous Batch Dropdown */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Load configuration from previous batch
            </label>
            <select
              value={selectedBatchId}
              onChange={(e) => handleLoadBatch(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
            >
              <option value="">None (start fresh)</option>
              {availableBatches.map((batch) => (
                <option key={batch.id} value={batch.id}>
                  {batch.name}
                </option>
              ))}
            </select>
            {availableBatches.length === 0 && (
              <p className="mt-1 text-xs text-slate-500">
                No previous {formData.processingMethod === 'structure' ? 'structured' : 'prompt-based'} batches found
              </p>
            )}
          </div>

          {/* Data Structure Fields */}
          {formData.processingMethod === 'structure' && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">
                Define Fields
              </label>
              <div ref={fieldsContainerRef} className="space-y-2 max-h-60 overflow-y-auto p-2">
                {formData.customFields.map((field, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <input
                      ref={index === formData.customFields.length - 1 ? newFieldRef : null}
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
