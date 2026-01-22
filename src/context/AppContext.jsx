import { createContext, useContext, useState, useEffect } from 'react';
import { initialBatches } from '../data/mockData';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [user, setUser] = useState(() => {
    const email = localStorage.getItem('userEmail');
    return email ? { email } : null;
  });

  const [batches, setBatches] = useState(() => {
    const stored = localStorage.getItem('batches');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Restore Date objects
        const storedBatches = parsed.map(batch => ({
          ...batch,
          modifiedDate: new Date(batch.modifiedDate),
          createdDate: new Date(batch.createdDate),
          documents: batch.documents.map(doc => ({
            ...doc,
            uploadDate: new Date(doc.uploadDate),
            processedDate: doc.processedDate ? new Date(doc.processedDate) : null,
          })),
        }));
        // Merge with initialBatches to include any new demo batches
        const storedIds = new Set(storedBatches.map(b => b.id));
        const newInitialBatches = initialBatches.filter(b => !storedIds.has(b.id));
        return [...storedBatches, ...newInitialBatches];
      } catch {
        return initialBatches;
      }
    }
    return initialBatches;
  });

  // Persist batches to localStorage
  useEffect(() => {
    localStorage.setItem('batches', JSON.stringify(batches));
  }, [batches]);

  const login = (email) => {
    localStorage.setItem('userEmail', email);
    setUser({ email });
  };

  const logout = () => {
    localStorage.removeItem('userEmail');
    setUser(null);
  };

  const addBatch = (batch) => {
    const newBatch = {
      ...batch,
      id: `batch-${Date.now()}`,
      createdDate: new Date(),
      modifiedDate: new Date(),
    };
    setBatches(prev => [newBatch, ...prev]);
    return newBatch;
  };

  const updateBatch = (batchId, updates) => {
    setBatches(prev =>
      prev.map(batch =>
        batch.id === batchId
          ? { ...batch, ...updates, modifiedDate: new Date() }
          : batch
      )
    );
  };

  const deleteBatch = (batchId) => {
    setBatches(prev => prev.filter(batch => batch.id !== batchId));
  };

  const getBatch = (batchId) => {
    return batches.find(batch => batch.id === batchId);
  };

  const value = {
    user,
    batches,
    login,
    logout,
    addBatch,
    updateBatch,
    deleteBatch,
    getBatch,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
