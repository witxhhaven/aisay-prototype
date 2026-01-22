import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X, Loader2 } from 'lucide-react';
import { DocumentThumbnail } from './DocumentPreview';

export function DocumentPicker({ isOpen, onClose, documents, currentIndex, onSelect }) {
  const handleSelect = (index) => {
    onSelect(index);
    onClose();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-xl bg-white shadow-xl transition-all">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
                  <Dialog.Title className="text-lg font-semibold text-slate-900">
                    Document Picker
                  </Dialog.Title>
                  <button
                    onClick={onClose}
                    className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Grid */}
                <div className="p-6 max-h-[70vh] overflow-y-auto">
                  <div className="grid grid-cols-4 gap-4">
                    {documents.map((doc, index) => (
                      <div key={doc.id} className="flex flex-col">
                        <div className="relative">
                          <DocumentThumbnail
                            document={doc}
                            isSelected={index === currentIndex}
                            onClick={() => handleSelect(index)}
                          />
                          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 bg-black/60 text-white text-xs px-2 py-0.5 rounded">
                            {index + 1}
                          </div>
                        </div>
                        <p className="mt-1 text-xs text-slate-500 text-center truncate px-1" title={doc.filename}>
                          {doc.filename}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
