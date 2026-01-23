import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X } from 'lucide-react';

export function Modal({ isOpen, onClose, title, subtitle, supertitle, children, size = 'md', progress = null }) {
  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-xl',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  const hasProgress = progress !== null;

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
              <Dialog.Panel
                className={`w-full ${sizes[size]} transform overflow-hidden rounded-xl bg-white shadow-xl transition-all`}
              >
                <div className={`flex items-start justify-between px-6 py-4 ${!hasProgress ? 'border-b border-slate-200' : ''}`}>
                  <div>
                    {supertitle && (
                      <p className="text-sm text-slate-500 mb-0.5">{supertitle}</p>
                    )}
                    <Dialog.Title className="text-lg font-semibold text-slate-900">
                      {title}
                    </Dialog.Title>
                    {subtitle && (
                      <p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>
                    )}
                  </div>
                  <button
                    onClick={onClose}
                    className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                {hasProgress && (
                  <div className="h-1 bg-slate-100">
                    <div
                      className="h-full bg-purple-600 transition-all duration-300"
                      style={{ width: `${progress * 100}%` }}
                    />
                  </div>
                )}
                <div className="px-6 py-4">{children}</div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
