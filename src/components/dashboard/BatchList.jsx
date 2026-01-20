import { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import {
  MoreVertical,
  Loader2,
  Edit3,
  Download,
  Trash2,
  ChevronDown,
  FileText,
  FileCheck,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Modal, Button, Input } from '../shared';
import { getBatchStats } from '../../data/mockData';
import { exportToCSV, exportToExcel } from '../../utils/export';

const sortOptions = [
  { label: 'Latest Modified', value: 'latest' },
  { label: 'Oldest Modified', value: 'oldest' },
  { label: 'Name (A-Z)', value: 'name-asc' },
  { label: 'Name (Z-A)', value: 'name-desc' },
];

export function BatchList() {
  const { batches, updateBatch, deleteBatch } = useApp();
  const [sortBy, setSortBy] = useState('latest');
  const [renameModal, setRenameModal] = useState({ open: false, batch: null });
  const [deleteModal, setDeleteModal] = useState({ open: false, batch: null });
  const [newName, setNewName] = useState('');

  const sortedBatches = [...batches].sort((a, b) => {
    switch (sortBy) {
      case 'latest':
        return new Date(b.modifiedDate) - new Date(a.modifiedDate);
      case 'oldest':
        return new Date(a.modifiedDate) - new Date(b.modifiedDate);
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  const handleRename = () => {
    if (newName.trim() && renameModal.batch) {
      updateBatch(renameModal.batch.id, { name: newName.trim() });
      setRenameModal({ open: false, batch: null });
      setNewName('');
    }
  };

  const handleDelete = () => {
    if (deleteModal.batch) {
      deleteBatch(deleteModal.batch.id);
      setDeleteModal({ open: false, batch: null });
    }
  };

  const openRenameModal = (batch) => {
    setNewName(batch.name);
    setRenameModal({ open: true, batch });
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  if (batches.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FileText className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-lg font-medium text-slate-900 mb-2">No batches yet</h3>
        <p className="text-slate-500">Create your first batch to get started with document processing</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-slate-900">Your Batches</h2>

        {/* Sort Dropdown */}
        <Menu as="div" className="relative">
          <Menu.Button className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-lg hover:border-slate-300 transition-colors">
            Sort By
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
            <Menu.Items className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg ring-1 ring-black/5 py-1 z-10">
              {sortOptions.map((option) => (
                <Menu.Item key={option.value}>
                  {({ active }) => (
                    <button
                      onClick={() => setSortBy(option.value)}
                      className={`w-full text-left px-4 py-2 text-sm ${
                        active ? 'bg-purple-50 text-purple-900' : 'text-slate-700'
                      } ${sortBy === option.value ? 'font-medium' : ''}`}
                    >
                      {option.label}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Transition>
        </Menu>
      </div>

      {/* Batch List */}
      <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100">
        {sortedBatches.map((batch) => {
          const stats = getBatchStats(batch);
          const isProcessing = stats.processing > 0;

          return (
            <div
              key={batch.id}
              className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors"
            >
              <Link
                to={`/batch/${batch.id}`}
                className="flex-1 min-w-0"
              >
                <div className="flex items-center gap-3">
                  {isProcessing ? (
                    <Loader2 className="w-5 h-5 text-slate-400 animate-spin flex-shrink-0" />
                  ) : (
                    <FileCheck className="w-5 h-5 text-green-500 flex-shrink-0" />
                  )}
                  <div className="min-w-0">
                    <h3
                      className={`font-medium truncate ${
                        isProcessing ? 'text-slate-400' : 'text-slate-900'
                      }`}
                    >
                      {batch.name}
                    </h3>
                    <p className="text-sm text-slate-500">
                      {stats.total}/50 documents • Modified: {formatDate(batch.modifiedDate)}
                    </p>
                  </div>
                </div>
              </Link>

              {/* Actions Menu */}
              <Menu as="div" className="relative">
                <Menu.Button className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
                  <MoreVertical className="w-5 h-5" />
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
                  <Menu.Items className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg ring-1 ring-black/5 py-1 z-10">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => openRenameModal(batch)}
                          className={`w-full flex items-center gap-2 px-4 py-2 text-sm ${
                            active ? 'bg-purple-50 text-purple-900' : 'text-slate-700'
                          }`}
                        >
                          <Edit3 className="w-4 h-4" />
                          Rename
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => exportToCSV(batch)}
                          className={`w-full flex items-center gap-2 px-4 py-2 text-sm ${
                            active ? 'bg-purple-50 text-purple-900' : 'text-slate-700'
                          }`}
                        >
                          <Download className="w-4 h-4" />
                          Export as CSV
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => exportToExcel(batch)}
                          className={`w-full flex items-center gap-2 px-4 py-2 text-sm ${
                            active ? 'bg-purple-50 text-purple-900' : 'text-slate-700'
                          }`}
                        >
                          <Download className="w-4 h-4" />
                          Export as Excel
                        </button>
                      )}
                    </Menu.Item>
                    <div className="border-t border-slate-100 my-1" />
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => setDeleteModal({ open: true, batch })}
                          className={`w-full flex items-center gap-2 px-4 py-2 text-sm ${
                            active ? 'bg-red-50 text-red-700' : 'text-red-600'
                          }`}
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </button>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          );
        })}
      </div>

      {/* Rename Modal */}
      <Modal
        isOpen={renameModal.open}
        onClose={() => setRenameModal({ open: false, batch: null })}
        title="Rename Batch"
        size="sm"
      >
        <div className="space-y-4">
          <Input
            label="Batch Name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            maxLength={100}
            autoFocus
          />
          <div className="flex gap-3 justify-end">
            <Button
              variant="secondary"
              onClick={() => setRenameModal({ open: false, batch: null })}
            >
              Cancel
            </Button>
            <Button onClick={handleRename} disabled={!newName.trim()}>
              Save
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, batch: null })}
        title="Delete Batch?"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-slate-600">
            This will permanently delete <strong>{deleteModal.batch?.name}</strong> and all its
            documents. This action cannot be undone.
          </p>
          <div className="flex gap-3 justify-end">
            <Button
              variant="secondary"
              onClick={() => setDeleteModal({ open: false, batch: null })}
            >
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
