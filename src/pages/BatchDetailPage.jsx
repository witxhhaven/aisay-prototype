import { useState, useRef, useEffect, Fragment } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  LayoutGrid,
  Download,
  ArrowLeft,
  Loader2,
  GripVertical,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Move,
  Settings2,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { DocumentPreview } from '../components/batch/DocumentPreview';
import { DocumentPicker } from '../components/batch/DocumentPicker';
import { CustomWizard } from '../components/dashboard/CustomWizard';
import { PretrainedWizard } from '../components/dashboard/PretrainedWizard';
import { Button } from '../components/shared';
import { exportToCSV, exportSingleDocument } from '../utils/export';
import { getBatchStats } from '../data/mockData';

export function BatchDetailPage() {
  const { batchId, docId } = useParams();
  const navigate = useNavigate();
  const { getBatch } = useApp();
  const batch = getBatch(batchId);

  // Find document index from URL param or default to 0
  const getInitialDocIndex = () => {
    if (!batch || !docId) return 0;
    const index = batch.documents.findIndex(d => d.id === docId);
    return index >= 0 ? index : 0;
  };

  const [currentDocIndex, setCurrentDocIndex] = useState(getInitialDocIndex);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [configureOpen, setConfigureOpen] = useState(false);
  const [leftPanelWidth, setLeftPanelWidth] = useState(60); // percentage
  const [zoom, setZoom] = useState(1);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const previewContainerRef = useRef(null);
  const isDragging = useRef(false);

  const zoomIn = () => setZoom((z) => Math.min(z + 0.25, 3));
  const zoomOut = () => setZoom((z) => Math.max(z - 0.25, 0.5));
  const resetZoom = () => {
    setZoom(1);
    setPanPosition({ x: 0, y: 0 });
  };

  // Sync currentDocIndex when docId in URL changes
  useEffect(() => {
    if (batch && docId) {
      const index = batch.documents.findIndex(d => d.id === docId);
      if (index >= 0 && index !== currentDocIndex) {
        setCurrentDocIndex(index);
      }
    }
  }, [docId, batch]);

  // Update URL when document changes (only if URL doesn't match)
  useEffect(() => {
    if (batch && batch.documents[currentDocIndex]) {
      const newDocId = batch.documents[currentDocIndex].id;
      if (newDocId !== docId) {
        navigate(`/batch/${batchId}/${newDocId}`, { replace: true });
      }
    }
  }, [currentDocIndex, batchId, batch, navigate, docId]);

  // Handle resize dragging and panning
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Handle resize dragging
      if (isDragging.current && containerRef.current) {
        const container = containerRef.current;
        const containerRect = container.getBoundingClientRect();
        const newWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100;

        // Calculate min width as percentage (400px min)
        const minWidthPercent = (400 / containerRect.width) * 100;
        const maxWidthPercent = 100 - minWidthPercent;

        setLeftPanelWidth(Math.min(Math.max(newWidth, minWidthPercent), maxWidthPercent));
        return;
      }

      // Handle pan dragging
      if (isPanning) {
        const deltaX = e.clientX - panStart.x;
        const deltaY = e.clientY - panStart.y;
        setPanPosition((prev) => ({
          x: prev.x + deltaX,
          y: prev.y + deltaY,
        }));
        setPanStart({ x: e.clientX, y: e.clientY });
      }
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      setIsPanning(false);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isPanning, panStart]);

  // Start panning
  const startPanning = (e) => {
    // Only start panning on the preview area, not on zoom controls
    if (e.target.closest('.zoom-controls')) return;
    setIsPanning(true);
    setPanStart({ x: e.clientX, y: e.clientY });
    document.body.style.cursor = 'grabbing';
    document.body.style.userSelect = 'none';
  };

  const startDragging = () => {
    isDragging.current = true;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  };

  if (!batch) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-slate-900 mb-2">Batch not found</h1>
          <p className="text-slate-500 mb-4">The batch you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/dashboard')}>Return to Dashboard</Button>
        </div>
      </div>
    );
  }

  const documents = batch.documents;
  const currentDoc = documents[currentDocIndex];
  const stats = getBatchStats(batch);
  const hasProcessing = stats.processing > 0;

  const goToPrevious = () => {
    if (currentDocIndex > 0) {
      setCurrentDocIndex(currentDocIndex - 1);
      setZoom(1); // Reset zoom when changing documents
      setPanPosition({ x: 0, y: 0 }); // Reset pan position
    }
  };

  const goToNext = () => {
    if (currentDocIndex < documents.length - 1) {
      setCurrentDocIndex(currentDocIndex + 1);
      setZoom(1); // Reset zoom when changing documents
      setPanPosition({ x: 0, y: 0 }); // Reset pan position
    }
  };

  return (
    <div className="h-screen bg-slate-50 flex flex-col overflow-hidden">
      {/* Fixed Header */}
      <header className="z-40 h-16 bg-white border-b border-slate-200 shadow-sm shrink-0">
        <div className="h-full px-4 flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center gap-4">
            <Link
              to="/dashboard"
              className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Back</span>
            </Link>

            <div className="h-6 w-px bg-slate-200" />

            {/* Batch Info - Now comes before navigation */}
            <div>
              <h1 className="text-sm font-semibold text-slate-900 truncate max-w-[200px] sm:max-w-none">
                {batch.name}
              </h1>
              <p className="text-xs text-slate-500">
                Document {currentDocIndex + 1} of {documents.length}
              </p>
            </div>

            <div className="h-6 w-px bg-slate-200" />

            {/* Navigation - Now comes after batch info */}
            <div className="flex items-center gap-2">
              <button
                onClick={goToPrevious}
                disabled={currentDocIndex === 0}
                className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                title="Previous document"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={goToNext}
                disabled={currentDocIndex === documents.length - 1}
                className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                title="Next document"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => setPickerOpen(true)}
                className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
                title="Document picker"
              >
                <LayoutGrid className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Center Section - Processing Indicator */}
          {hasProcessing && (
            <div className="hidden md:flex items-center gap-2 text-slate-500">
              <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
              <span className="text-sm">
                Processing: {stats.processing} of {stats.total}
              </span>
            </div>
          )}

          {/* Right Section - Configure & Export */}
          <div className="flex items-center gap-2">
            {/* Configure Button */}
            <button
              onClick={() => setConfigureOpen(true)}
              className="flex items-center gap-2 px-3 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <Settings2 className="w-4 h-4" />
              <span className="hidden sm:inline">Configure</span>
            </button>

          <Menu as="div" className="relative">
            <Menu.Button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export</span>
              <ChevronDown className="w-4 h-4" />
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg ring-1 ring-black/5 py-1 z-10">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => exportSingleDocument(currentDoc, batch.name)}
                      disabled={currentDoc.status === 'processing'}
                      className={`w-full text-left px-4 py-2 text-sm ${
                        active ? 'bg-purple-50 text-purple-900' : 'text-slate-700'
                      } ${currentDoc.status === 'processing' ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      Export Current Document
                    </button>
                  )}
                </Menu.Item>
                <div className="border-t border-slate-100 my-1" />
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => !hasProcessing && exportToCSV(batch)}
                      disabled={hasProcessing}
                      className={`w-full text-left px-4 py-2 text-sm ${
                        active ? 'bg-purple-50 text-purple-900' : 'text-slate-700'
                      } ${hasProcessing ? 'cursor-not-allowed' : ''}`}
                    >
                      <div className="flex items-center gap-2">
                        {hasProcessing && (
                          <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
                        )}
                        <span className={hasProcessing ? 'text-slate-400' : ''}>Export All</span>
                      </div>
                      {hasProcessing && (
                        <p className="text-xs text-slate-400 mt-1">
                          Please wait while documents are being processed
                        </p>
                      )}
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
          </div>
        </div>
      </header>

      {/* Main Content with Resizable Split View */}
      <main ref={containerRef} className="flex-1 flex relative overflow-hidden min-h-0">
        {/* Left Panel - Document Preview */}
        <div
          className="bg-slate-100 relative flex flex-col h-full overflow-hidden"
          style={{ width: `${leftPanelWidth}%` }}
        >
          {/* Zoom Controls - Fixed at top */}
          <div className="zoom-controls z-20 bg-slate-100/95 backdrop-blur-sm border-b border-slate-200 px-4 py-2 flex items-center gap-2 shrink-0">
            <button
              onClick={zoomOut}
              disabled={zoom <= 0.5}
              className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-sm"
              title="Zoom out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-sm font-medium text-slate-600 min-w-[4rem] text-center">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={zoomIn}
              disabled={zoom >= 3}
              className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-sm"
              title="Zoom in"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={resetZoom}
              disabled={zoom === 1 && panPosition.x === 0 && panPosition.y === 0}
              className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-sm ml-1"
              title="Reset zoom and position"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <div className="h-4 w-px bg-slate-300 mx-1" />
            <div className="flex items-center gap-1 text-xs text-slate-400">
              <Move className="w-3 h-3" />
              <span>Drag to pan</span>
            </div>
          </div>

          {/* Zoomable & Pannable Preview Container */}
          <div
            ref={previewContainerRef}
            className="flex-1 overflow-auto relative min-h-0"
            onMouseDown={startPanning}
            style={{ cursor: isPanning ? 'grabbing' : 'grab' }}
          >
            <div
              className="min-h-full"
              style={{
                transform: `scale(${zoom}) translate(${panPosition.x / zoom}px, ${panPosition.y / zoom}px)`,
                transformOrigin: 'top center',
              }}
            >
              <DocumentPreview document={currentDoc} />
            </div>
          </div>
        </div>

        {/* Resize Handle */}
        <div
          className="w-1 bg-slate-200 hover:bg-purple-400 cursor-col-resize flex items-center justify-center group transition-colors shrink-0"
          onMouseDown={startDragging}
        >
          <div className="w-4 h-8 bg-slate-300 group-hover:bg-purple-500 rounded flex items-center justify-center transition-colors">
            <GripVertical className="w-3 h-3 text-slate-500 group-hover:text-white" />
          </div>
        </div>

        {/* Right Panel - Extracted Data */}
        <div
          className="bg-white h-full overflow-hidden flex flex-col"
          style={{ width: `${100 - leftPanelWidth}%` }}
        >
          <div className="flex-1 overflow-auto">
            <ExtractedDataPanel document={currentDoc} batch={batch} />
          </div>
        </div>
      </main>

      {/* Document Picker Modal */}
      <DocumentPicker
        isOpen={pickerOpen}
        onClose={() => setPickerOpen(false)}
        documents={documents}
        currentIndex={currentDocIndex}
        onSelect={setCurrentDocIndex}
      />

      {/* Configure Wizard Modal */}
      {batch.type === 'custom' ? (
        <CustomWizard
          isOpen={configureOpen}
          onClose={() => setConfigureOpen(false)}
          editBatch={batch}
        />
      ) : (
        <PretrainedWizard
          isOpen={configureOpen}
          onClose={() => setConfigureOpen(false)}
          editBatch={batch}
        />
      )}
    </div>
  );
}

// Skeleton loader component
function SkeletonLoader() {
  return (
    <div className="p-6 animate-pulse">
      {/* Title skeleton */}
      <div className="mb-6 pb-6 border-b border-slate-200">
        <div className="h-7 bg-slate-200 rounded w-3/4 mb-2" />
        <div className="h-4 bg-slate-200 rounded w-1/2" />
      </div>

      {/* Section title skeleton */}
      <div className="h-4 bg-slate-200 rounded w-1/4 mb-4" />

      {/* Field skeletons */}
      <div className="space-y-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex justify-between py-2 border-b border-slate-100">
            <div className="h-4 bg-slate-200 rounded w-1/3" />
            <div className="h-4 bg-slate-200 rounded w-1/4" />
          </div>
        ))}
      </div>
    </div>
  );
}

function ExtractedDataPanel({ document, batch }) {
  if (document.status === 'processing') {
    return <SkeletonLoader />;
  }

  const data = document.extractedData;
  const isPromptResponse = typeof data === 'string';

  // Helper to render a value (handles arrays and objects)
  const renderValue = (value) => {
    if (Array.isArray(value)) {
      return (
        <div className="text-sm text-slate-900">
          <span className="text-slate-500">{value.length} items</span>
        </div>
      );
    }
    if (typeof value === 'object' && value !== null) {
      return <span className="text-slate-500 text-sm">[Object]</span>;
    }
    return <span className="font-medium text-slate-900">{String(value)}</span>;
  };

  // Separate items array from other fields for long receipts
  const items = data?.items;
  const otherFields = data ? Object.entries(data).filter(([key]) => key !== 'items') : [];

  return (
    <div className="p-6">
      {/* Document Title */}
      <div className="mb-6 pb-6 border-b border-slate-200">
        <h2 className="text-2xl font-semibold text-slate-900 mb-1">
          {document.filename}
        </h2>
        <p className="text-sm text-slate-500">
          {document.documentType} • {batch.model === 'flagship' ? 'Flagship Model' : 'Local Model'}
        </p>
      </div>

      {/* Extracted Data */}
      {isPromptResponse ? (
        /* Natural Language Response */
        <div>
          <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide mb-4">
            Extraction Results
          </h3>
          <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{data}</p>
        </div>
      ) : data ? (
        /* Structured Data */
        <div>
          <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide mb-4">
            Extracted Fields
          </h3>
          <div className="space-y-3">
            {otherFields.map(([key, value]) => (
              <div key={key} className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500 text-sm capitalize mb-1 sm:mb-0">
                  {formatFieldName(key)}
                </span>
                {renderValue(value)}
              </div>
            ))}
          </div>

          {/* Items Table for Long Receipts */}
          {items && Array.isArray(items) && items.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide mb-4">
                Line Items ({items.length})
              </h3>
              <div className="border border-slate-200 rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="text-left px-3 py-2 font-medium text-slate-600">Item</th>
                      <th className="text-center px-3 py-2 font-medium text-slate-600 w-16">Qty</th>
                      <th className="text-right px-3 py-2 font-medium text-slate-600 w-20">Price</th>
                      <th className="text-right px-3 py-2 font-medium text-slate-600 w-20">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {items.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="px-3 py-2 text-slate-900">{item.name}</td>
                        <td className="px-3 py-2 text-center text-slate-600">{item.qty}</td>
                        <td className="px-3 py-2 text-right text-slate-600">${item.price?.toFixed(2)}</td>
                        <td className="px-3 py-2 text-right font-medium text-slate-900">${item.total?.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center text-slate-400 py-12">
          <p>No extracted data available</p>
        </div>
      )}
    </div>
  );
}

// Helper to format field names
function formatFieldName(key) {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
}
