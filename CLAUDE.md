# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

OCR/KIE (Key Information Extraction) prototype app - a React-based document processing UI that demonstrates batch creation, document upload workflows, and extracted data visualization. This is a **frontend-only prototype** with no backend; all data is mocked and persisted to localStorage.

## Commands

```bash
npm run dev      # Start development server (Vite)
npm run build    # Production build
npm run lint     # ESLint
npm run preview  # Preview production build
```

## Architecture

### Tech Stack
- React 19 + Vite + Tailwind CSS v4 (via @tailwindcss/vite plugin)
- React Router v7 for routing
- HeadlessUI for accessible modals/dropdowns
- lucide-react for icons
- papaparse/xlsx for CSV/Excel export

### State Management
Global state via React Context (`src/context/AppContext.jsx`):
- `user` - authentication state (email stored in localStorage as `userEmail`)
- `batches` - array of batch objects with documents (persisted to localStorage as `batches`)
- Provides: `login`, `logout`, `addBatch`, `updateBatch`, `deleteBatch`, `getBatch`

### Routing Structure
```
/login           → LoginPage (public, redirects to /dashboard if logged in)
/dashboard       → DashboardPage (protected)
/batch/:batchId  → BatchDetailPage (protected)
```

Route protection via `ProtectedRoute` and `PublicRoute` wrappers in `App.jsx`.

### Key Data Structures

**Batch object:**
```js
{
  id, name, type ('pretrained'|'custom'), documentType, model ('flagship'|'local'),
  documents: [], modifiedDate, createdDate,
  // For custom batches:
  processingMethod ('structure'|'prompt'), customFields, customPrompt
}
```

**Document object:**
```js
{
  id, filename, fileType, fileSize, status ('processing'|'completed'),
  uploadDate, processedDate, extractedData, documentType
}
```

### Component Organization
- `components/shared/` - Reusable UI: Button, Modal, Input, Select, Spinner
- `components/dashboard/` - Header, ActionCards, BatchList, PretrainedWizard, CustomWizard
- `components/batch/` - DocumentPreview (CSS-styled mock documents), DocumentPicker

### Mock Data
`src/data/mockData.js` contains:
- Mock email addresses for login
- Document type and data type options
- Generator functions for realistic extracted data (passports, IDs, tax docs, etc.)
- Initial batches with pre-populated documents

### Document Preview System
`DocumentPreview.jsx` renders CSS-styled visual representations of documents based on `documentType`. Each document type (Passport, Identity Card, Tax Document, Invoice, Receipt) has a dedicated preview component that displays mock data in a realistic format.

## Design Tokens
- Primary color: Tailwind purple-600/700
- Gray scale: Tailwind slate
- Refer to `instructions/OCR_KIE_App_Specifications.md` for detailed UI specifications
