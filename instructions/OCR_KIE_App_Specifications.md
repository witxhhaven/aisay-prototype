# OCR/KIE Prototype App - Technical Specifications

## 1. Technical Stack

### Core Technologies
- **Framework**: React 18+
- **Styling**: Tailwind CSS
- **State Management**: React Context API or useState/useReducer
- **Routing**: React Router v6
- **Icons**: Lucide React or Heroicons

### Design Tokens
- **Primary Color**: Tailwind Purple (`purple-600`, `purple-700`, etc.)
- **Gray Scale**: Tailwind Slate (`slate-50` through `slate-900`)
- **Typography**: Tailwind default font stack
- **Spacing**: Tailwind default spacing scale

### Browser Support
- **Platforms**: Desktop and Tablet only
- **Minimum Width**: 768px (tablet breakpoint)
- **Dark Mode**: Not required for prototype

---

## 2. Authentication Flow

### 2.1 Login Screen (Route: `/login`)

#### Email Input Step
**Layout:**
- Centered vertically and horizontally
- White card container with shadow
- 400px width max

**Components:**
1. **Logo/Title**: "OCR/KIE App" centered at top
2. **Email Dropdown**: 
   - Searchable/filterable dropdown (use Combobox pattern)
   - Prefilled with mock email addresses
   - Placeholder: "Select or type your email"
3. **Continue Button**: 
   - Purple (`bg-purple-600 hover:bg-purple-700`)
   - Full width
   - Text: "Continue"

**Mock Email Addresses (minimum 5):**
```
john.doe@company.com
jane.smith@company.com
alex.wong@company.com
sarah.johnson@company.com
mike.chen@company.com
```

#### OTP Input Step
**Transition:** Replace email step (slide/fade animation optional)

**Components:**
1. **Back Arrow**: Top left to return to email step
2. **Email Display**: "OTP sent to [email]" in gray text
3. **OTP Input Field**: 
   - 6-digit input (can be styled as separate boxes or single field)
   - Placeholder: "Enter OTP"
4. **Login Button**:
   - Purple, full width
   - Text: "Login"
   - **Behavior**: Click without validation (prototype only)

**Post-Login:**
- Navigate to `/dashboard`
- Store email in localStorage with key `userEmail`
- No session timeout for prototype

---

## 3. Dashboard Layout (Route: `/dashboard`)

### 3.1 Header (Sticky Top)
**Height**: 64px
**Background**: White with bottom border (`border-slate-200`)

**Components (Left to Right):**
1. **Logo/App Name**: "OCR/KIE App" - clickable, returns to dashboard
2. **Spacer** (flex-grow)
3. **User Email Display**: Show logged-in email with user icon
4. **Logout Button**: 
   - Icon button (ghost style)
   - Click → clears localStorage → redirects to `/login`

### 3.2 Main Content Container
**Layout**: Max width 1280px, centered, padding 32px

### 3.3 Welcome Section
```
┌─────────────────────────────────┐
│ Welcome!                         │
│ Create batches to process your  │
│ documents using OCR and KIE      │
└─────────────────────────────────┘
```
- **Heading**: "Welcome!" (text-2xl, font-semibold)
- **Subtext**: Brief description in gray

### 3.4 Action Section
**Layout**: Two cards side-by-side (responsive: stack on tablet if needed)

#### Card 1: Pretrained Documents
```
┌────────────────────────────────┐
│ 📄 Pretrained Documents        │
│                                │
│ Process common document types  │
│ with pre-configured models     │
│                                │
│ Supported documents:           │
│ • Passport                     │
│ • Identity Card                │
│ • Driver's License             │
│ • Birth Certificate            │
│ • Tax Document                 │
│ • Bank Statement               │
│ • Invoice                      │
│ • Receipt                      │
│ • Utility Bill                 │
│ • Medical Record               │
│                                │
│ [Create Batch] ───────────────►│
└────────────────────────────────┘
```

**Styling:**
- Border: `border-2 border-slate-200`
- Hover: `border-purple-400`
- Padding: 24px
- Background: White

**Button**: Purple, full width at bottom

#### Card 2: Custom Documents
```
┌────────────────────────────────┐
│ ⚙️ Custom Documents            │
│                                │
│ Define your own data structure │
│ or use custom prompts          │
│                                │
│ Flexibility to process:        │
│ • Unique document layouts      │
│ • Industry-specific forms      │
│ • Custom extraction needs      │
│                                │
│                                │
│                                │
│                                │
│ [Create Batch] ───────────────►│
└────────────────────────────────┘
```

### 3.5 Batch List Section

#### Section Header
```
┌──────────────────────────────────────────┐
│ Your Batches                 [Sort By ▼] │
└──────────────────────────────────────────┘
```

**Sort Options:**
- Latest Modified (default)
- Oldest Modified
- Name (A-Z)
- Name (Z-A)

#### Batch Row (Table/List View)
```
┌───────────────────────────────────────────────────────────┐
│ [🔄] Batch Name (gray if processing)         [⋮]         │
│      XX/50 documents • Modified: Jan 19, 2026             │
└───────────────────────────────────────────────────────────┘
```

**Components:**
1. **Processing Spinner**: Animated spinner icon (only if processing)
2. **Batch Name**: 
   - Font: text-lg, font-medium
   - Color: `text-slate-900` (normal) or `text-slate-400` (processing)
   - Clickable → navigate to batch detail page
3. **Document Count**: `XX/50 documents`
4. **Modified Date**: `Modified: MMM DD, YYYY`
5. **Three-Dot Menu** (right-aligned):
   - Rename
   - Export Results (CSV, Excel options)
   - Delete

**States:**
- **Hover**: Light gray background (`hover:bg-slate-50`)
- **Processing**: Batch name grayed out, spinner visible
- **Empty State**: "No batches yet. Create your first batch to get started."

#### Three-Dot Menu Actions

**Rename:**
- Opens modal with input field
- Pre-filled with current name
- Confirm/Cancel buttons

**Export Results:**
- Dropdown submenu
- Options: "Export as CSV" | "Export as Excel"
- Downloads file with batch name

**Delete:**
- Opens confirmation modal
- Title: "Delete Batch?"
- Message: "This will permanently delete [Batch Name] and all its documents. This action cannot be undone."
- Buttons: "Cancel" (ghost) | "Delete" (red)

---

## 4. Pretrained Document Wizard

### Modal Specifications
- **Size**: 600px width, auto height
- **Overlay**: Dark with backdrop blur
- **Close**: X button top-right, ESC key, click outside

### Step 1: Batch Name
```
┌──────────────────────────────────────┐
│ Create Pretrained Document Batch     │
│ ──────────────────────────────────── │
│ Step 1 of 3: Name Your Batch         │
│                                      │
│ Batch Name                           │
│ [                              ]     │
│                                      │
│              [Cancel] [Next]         │
└──────────────────────────────────────┘
```

**Validation:**
- Required field
- Max 100 characters
- Next button disabled until valid

### Step 2: Document Type & Model Selection
```
┌──────────────────────────────────────┐
│ Create Pretrained Document Batch     │
│ ──────────────────────────────────── │
│ Step 2 of 3: Document Type & Model   │
│                                      │
│ Document Type *                      │
│ [Passport                      ▼]    │
│                                      │
│ Model Selection *                    │
│ ○ Flagship Models                    │
│   High accuracy, cloud-based         │
│                                      │
│ ○ Locally Hosted Models              │
│   Fast processing, on-premise        │
│                                      │
│              [Back] [Next]           │
└──────────────────────────────────────┘
```

**Document Type Dropdown Options:**
1. Passport
2. Identity Card
3. Driver's License
4. Birth Certificate
5. Tax Document
6. Bank Statement
7. Invoice
8. Receipt
9. Utility Bill
10. Medical Record

**Model Options:**
- Radio button selection (single choice)
- Flagship selected by default
- Help text under each option

### Step 3: Upload Files
```
┌──────────────────────────────────────┐
│ Create Pretrained Document Batch     │
│ ──────────────────────────────────── │
│ Step 3 of 3: Upload Documents        │
│                                      │
│ ┌────────────────────────────────┐  │
│ │    Drag files here or click    │  │
│ │         [Browse Files]          │  │
│ │                                 │  │
│ │   Supported: PDF, JPG, PNG      │  │
│ │   Max: 50 files, 200 pages each │  │
│ └────────────────────────────────┘  │
│                                      │
│ Uploaded Files (3):                  │
│ ✓ document1.pdf (2.3 MB)      [×]    │
│ ✓ document2.jpg (1.1 MB)      [×]    │
│ ⚠ document3.pdf (TOO LARGE)   [×]    │
│                                      │
│              [Back] [Create Batch]   │
└──────────────────────────────────────┘
```

**File Upload Area:**
- Dashed border (`border-2 border-dashed border-slate-300`)
- Hover: `border-purple-400`
- Drag active: `bg-purple-50`

**File List:**
- Show filename, size
- ✓ Valid files (green check)
- ⚠ Invalid files (yellow warning icon)
- × Remove button per file

**Validation Rules:**
1. **File Count**: 1-50 files
2. **File Type**: .pdf, .jpg, .jpeg, .png only
3. **File Size**: Max 200 pages for PDF (estimate ~20MB per 200 pages)
4. **Error Display**: 
   - Show error message below invalid file
   - "Create Batch" button disabled with gray tooltip if errors exist
   - Errors: "File exceeds 200 pages" | "Unsupported file type" | "Max 50 files allowed"

**On Success:**
- Close modal
- Navigate to `/batch/[batchId]`
- Show processing state

---

## 5. Custom Document Wizard

### Step 1: Batch Name
(Same as Pretrained Step 1)

### Step 2: Document Type & Model Selection
(Same as Pretrained Step 2, but dropdown shows "Custom Document" as selected and disabled)

### Step 3: Processing Method
```
┌──────────────────────────────────────┐
│ Create Custom Document Batch         │
│ ──────────────────────────────────── │
│ Step 3 of 4: Processing Method       │
│                                      │
│ Choose how to extract data:          │
│                                      │
│ ○ Define Data Structure              │
│   Specify fields and data types      │
│                                      │
│ ○ Custom Prompt                      │
│   Write instructions for extraction  │
│                                      │
│              [Back] [Next]           │
└──────────────────────────────────────┘
```

#### Option A: Define Data Structure
```
┌──────────────────────────────────────┐
│ Define Data Structure                │
│                                      │
│ Field Name        Data Type     [×]  │
│ [Invoice Number] [Auto Detect ▼] ×  │
│ [Total Amount  ] [Currency    ▼] ×  │
│ [Invoice Date  ] [Date        ▼] ×  │
│                                      │
│ [+ Add Field]                        │
│                                      │
│              [Back] [Next]           │
└──────────────────────────────────────┘
```

**Data Type Options:**
- Auto Detect (default)
- String
- Number
- Date
- Boolean
- Currency
- Email
- Phone
- Address
- Percentage

**Features:**
- Start with 3 empty rows
- Add up to 50 fields total
- Remove individual rows with × button
- Validation: No duplicate field names

#### Option B: Custom Prompt
```
┌──────────────────────────────────────┐
│ Custom Prompt                        │
│                                      │
│ ┌──────────────────────────────────┐│
│ │ Extract the following information││
│ │ from each invoice:               ││
│ │ - Invoice number                 ││
│ │ - Vendor name                    ││
│ │ - Total amount                   ││
│ │ - Due date                       ││
│ │                                  ││
│ └──────────────────────────────────┘│
│                                      │
│              [Back] [Next]           │
└──────────────────────────────────────┘
```

**Text Area:**
- Min height: 200px
- Placeholder: "Describe what information you want to extract..."
- Max 2000 characters
- Character counter

### Step 4: Upload Files
(Same as Pretrained Step 3)

---

## 6. Batch Detail Page (Route: `/batch/:batchId`)

### 6.1 Sticky Header
**Height**: 64px
**Background**: White with shadow
**Z-index**: 50

```
┌────────────────────────────────────────────────────────┐
│ [◄] [►] [⊞] Processing: 3 of 10      [Export ▼]      │
└────────────────────────────────────────────────────────┘
```

**Components (Left to Right):**

1. **Previous Button** (`◄`):
   - Icon button
   - Navigate to previous document
   - Disabled if first document (gray, no hover)

2. **Next Button** (`►`):
   - Icon button
   - Navigate to next document
   - Disabled if last document

3. **Grid Icon** (`⊞`):
   - Icon button
   - Opens document picker modal

4. **Processing Indicator** (center):
   - Text: "Processing: X of Y"
   - Only shown if any documents are processing
   - Gray text (`text-slate-500`)

5. **Export Button** (right-aligned):
   - Dropdown button
   - Options: "Export All" | "Export Current Document"
   - **Export All** disabled with tooltip if processing: "Complete processing to export all"

**Styling:**
- All buttons: 32px height, borderless
- Hover: subtle gray background (`hover:bg-slate-100`)
- Active: slight scale down

### 6.2 Document Picker Modal

```
┌─────────────────────────────────────────────────┐
│  Document Picker                          [×]   │
├─────────────────────────────────────────────────┤
│                                                 │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐          │
│  │ [🔄] │ │      │ │      │ │      │          │
│  │  1   │ │  2   │ │  3   │ │  4   │          │
│  └──────┘ └──────┘ └──────┘ └──────┘          │
│                                                 │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐          │
│  │      │ │      │ │      │ │      │          │
│  │  5   │ │  6   │ │  7   │ │  8   │          │
│  └──────┘ └──────┘ └──────┘ └──────┘          │
│                                                 │
│  ┌──────┐ ┌──────┐                             │
│  │      │ │      │                             │
│  │  9   │ │ 10   │                             │
│  └──────┘ └──────┘                             │
│                                                 │
└─────────────────────────────────────────────────┘
```

**Specifications:**
- **Grid Layout**: 4 columns
- **Thumbnail Size**: 120px × 160px
- **Spacing**: 16px gap
- **Modal Size**: Auto-fit content, centered
- **Max Height**: 80vh with scroll

**Thumbnail Behavior:**
- **Normal**: Gray border
- **Selected**: Blue border (`border-2 border-purple-600`)
- **Processing**: Spinner overlay on thumbnail
- **Hover**: Scale slightly, shadow increase
- **Click**: Select document, auto-close modal

**Close Options:**
- X button (top right)
- Click outside modal
- ESC key

### 6.3 Content Section

**Layout**: Two-column split (60/40 or 50/50)

#### Left Panel: Document Preview
```
┌─────────────────────────────┐
│                             │
│    [Document Preview]       │
│    (PDF/Image Viewer)       │
│                             │
│                             │
│                             │
└─────────────────────────────┘
```

**Features:**
- Full document preview
- PDF viewer for PDFs
- Image viewer for JPG/PNG
- Zoom controls (optional for prototype)
- Background: `bg-slate-100`

#### Right Panel: Extracted Data

**For Processing Documents:**
```
┌─────────────────────────────┐
│                             │
│          [⌛]               │
│                             │
│  Please wait while this     │
│  document is being          │
│  processed                  │
│                             │
└─────────────────────────────┘
```

**Styling:**
- Centered content
- Spinner icon (animated)
- Italic text (`italic text-slate-500`)

**For Completed Documents (Pretrained):**
```
┌─────────────────────────────┐
│ Document Title              │
│ ─────────────────────────   │
│                             │
│ Field Name: Value           │
│ Field Name: Value           │
│ Field Name: Value           │
│                             │
│ Passport Number: A12345678  │
│ Full Name: John Doe         │
│ Date of Birth: 1990-01-15   │
│ Expiry Date: 2030-12-31     │
│ Nationality: USA            │
│                             │
└─────────────────────────────┘
```

**Layout:**
- Document title: 32px font size
- Horizontal divider
- Field-value pairs in readable format
- Padding: 24px
- Background: White

**For Completed Documents (Custom with Prompt):**
```
┌─────────────────────────────┐
│ Document Title              │
│ ─────────────────────────   │
│                             │
│ The invoice shows a total   │
│ amount of $1,234.56 with    │
│ invoice number INV-2024-001 │
│ dated January 15, 2024. The │
│ vendor is ABC Company and   │
│ the due date is February    │
│ 14, 2024.                   │
│                             │
└─────────────────────────────┘
```

**Layout:**
- Paragraph format
- Readable line height (1.6)
- Natural language response

---

## 7. Mock Data Requirements

### 7.1 Mock Batches (3-5 batches)

**Batch 1: Passports**
- Name: "International Travel Documents"
- Type: Pretrained - Passport
- Model: Flagship
- Documents: 10/50
- Status: All completed
- Modified: Today's date
- Mock files: passport_001.pdf through passport_010.pdf

**Batch 2: Invoices (Processing)**
- Name: "Q1 2024 Invoices"
- Type: Custom - Custom Prompt
- Model: Locally Hosted
- Documents: 8/50
- Status: 3 processing, 5 completed
- Modified: Yesterday's date
- Mock files: invoice_001.pdf through invoice_008.pdf

**Batch 3: ID Cards**
- Name: "Employee Verification"
- Type: Pretrained - Identity Card
- Model: Flagship
- Documents: 15/50
- Status: All completed
- Modified: 3 days ago
- Mock files: id_001.jpg through id_015.jpg

**Batch 4: Tax Documents**
- Name: "2023 Tax Returns"
- Type: Pretrained - Tax Document
- Model: Flagship
- Documents: 6/50
- Status: All completed
- Modified: 1 week ago

**Batch 5: Custom Receipts**
- Name: "Expense Receipts"
- Type: Custom - Data Structure
- Model: Locally Hosted
- Documents: 12/50
- Status: 2 processing, 10 completed
- Modified: 2 days ago

### 7.2 Mock Document Data

**Passport Fields:**
```javascript
{
  documentNumber: "P12345678",
  givenNames: "John Michael",
  surname: "Doe",
  dateOfBirth: "1990-01-15",
  placeOfBirth: "New York, USA",
  dateOfIssue: "2020-03-20",
  dateOfExpiry: "2030-03-20",
  nationality: "United States of America",
  sex: "M"
}
```

**Identity Card Fields:**
```javascript
{
  idNumber: "S1234567A",
  fullName: "Jane Smith",
  dateOfBirth: "1988-05-22",
  address: "123 Main Street, Unit 05-01, Singapore 123456",
  dateOfIssue: "2019-07-10",
  dateOfExpiry: "2029-07-10",
  sex: "F"
}
```

**Invoice (Custom Prompt Response):**
```
This invoice numbered INV-2024-001 from ABC Corporation shows a 
total amount of $1,234.56 dated January 15, 2024. The invoice 
includes line items for consulting services ($800) and software 
licensing ($434.56). Payment is due by February 14, 2024 with 
payment terms of Net 30 days.
```

**Tax Document Fields:**
```javascript
{
  taxYear: "2023",
  taxpayerName: "Michael Johnson",
  ssn: "***-**-5678",
  filingStatus: "Single",
  totalIncome: "$85,450",
  taxableIncome: "$72,300",
  totalTax: "$12,680",
  refundAmount: "$1,234"
}
```

**Custom Receipt (Data Structure):**
```javascript
{
  receiptNumber: "RCP-2024-0045",
  merchantName: "Best Electronics",
  totalAmount: "$459.99",
  receiptDate: "2024-01-18",
  paymentMethod: "Credit Card"
}
```

### 7.3 Document File Names
Use realistic naming patterns:
- `passport_john_doe.pdf`
- `id_card_jane_smith.jpg`
- `invoice_abc_corp_jan2024.pdf`
- `tax_return_2023_michael_johnson.pdf`
- `receipt_best_electronics_20240118.jpg`

---

## 8. Error Handling

### 8.1 File Upload Errors

**Error: File Too Large**
```
⚠ filename.pdf exceeds 200 pages limit
```
- Icon: Warning (yellow)
- Action: Remove button enabled
- Submit disabled until removed

**Error: Invalid File Type**
```
⚠ filename.doc is not supported (PDF, JPG, PNG only)
```

**Error: Too Many Files**
```
⚠ Maximum 50 files allowed. Please remove X files.
```
- Show at top of file list
- Red background (`bg-red-50`)
- Files over limit highlighted

### 8.2 Upload Failure (Network)
```
┌─────────────────────────────────┐
│ ⚠ Upload Failed                 │
│ Unable to upload files. Please  │
│ check your connection and try   │
│ again.                          │
│          [Retry] [Cancel]       │
└─────────────────────────────────┘
```
- Toast notification (top-right)
- Auto-dismiss after 5 seconds
- Retry button re-attempts upload

### 8.3 Empty States

**No Batches:**
```
┌─────────────────────────────────┐
│         [📄]                    │
│    No batches yet               │
│                                 │
│ Create your first batch to get  │
│ started with document processing│
│                                 │
│   [Create Pretrained Batch]     │
│   [Create Custom Batch]         │
└─────────────────────────────────┘
```

**No Documents in Batch:** (Should not occur based on workflow, but good to handle)
```
This batch has no documents yet.
```

---

## 9. Routing Structure

```
/login
  ↓
/dashboard
  ├─ Modal: Pretrained Wizard
  └─ Modal: Custom Wizard
      ↓
/batch/:batchId
  ├─ Modal: Document Picker
  ├─ Modal: Rename Batch
  └─ Modal: Delete Confirmation
```

**Route Guards:**
- `/dashboard` and `/batch/:batchId` require authentication
- Redirect to `/login` if no `userEmail` in localStorage
- `/login` redirects to `/dashboard` if already authenticated

---

## 10. Component Breakdown

### Core Components

1. **AuthLayout**
   - Email step
   - OTP step

2. **DashboardLayout**
   - Header with logout
   - Welcome section
   - Action cards
   - Batch list

3. **PretrainedWizard** (Modal)
   - Step 1: Name
   - Step 2: Type & Model
   - Step 3: Upload

4. **CustomWizard** (Modal)
   - Step 1: Name
   - Step 2: Type & Model
   - Step 3: Processing Method
   - Step 4: Upload

5. **BatchDetailPage**
   - Sticky header with nav
   - Document preview panel
   - Extraction results panel

6. **DocumentPicker** (Modal)
   - Grid of thumbnails

7. **SharedComponents**
   - Button (primary, secondary, ghost)
   - Input field
   - Dropdown/Select
   - Modal container
   - File upload zone
   - Spinner
   - Toast notifications

---

## 11. State Management

### Global State (Context)
```javascript
{
  user: {
    email: string
  },
  batches: [
    {
      id: string,
      name: string,
      type: 'pretrained' | 'custom',
      documentType: string,
      model: 'flagship' | 'local',
      documents: [],
      totalDocuments: number,
      processingCount: number,
      modifiedDate: Date,
      createdDate: Date
    }
  ],
  currentBatch: batchId,
  currentDocument: documentIndex
}
```

### Document Object
```javascript
{
  id: string,
  filename: string,
  fileType: 'pdf' | 'jpg' | 'png',
  fileSize: number,
  status: 'processing' | 'completed' | 'failed',
  uploadDate: Date,
  processedDate: Date,
  extractedData: {
    // For pretrained: key-value pairs
    // For custom prompt: text string
  },
  previewUrl: string // Base64 or blob URL for prototype
}
```

---

## 12. Animation & Interactions

### Transitions
- Page navigation: 200ms fade
- Modal open/close: 300ms with backdrop fade
- Wizard steps: 200ms slide (optional)
- Button hover: 150ms
- Loading states: Spinner with fade-in after 300ms

### Hover States
- Buttons: Slight color change, shadow increase
- Cards: Border color change, subtle lift
- Batch rows: Background color change
- Thumbnails: Scale 1.05, shadow increase

### Loading Indicators
- **Global**: Full-page spinner for route changes
- **Local**: Inline spinners for processing documents
- **Button**: Spinner replaces text during action

---

## 13. Responsive Behavior (Desktop & Tablet)

### Desktop (≥1024px)
- Max content width: 1280px
- Batch list: Full table layout
- Batch detail: 60/40 split (preview/data)
- Action cards: Side-by-side

### Tablet (768px - 1023px)
- Max content width: 100% with padding
- Batch list: May stack some info
- Batch detail: 50/50 split or stack vertically
- Action cards: Stack vertically
- Document picker: 3 columns instead of 4

---

## 14. Accessibility Considerations

- **Keyboard Navigation**: Tab through all interactive elements
- **Focus States**: Clear visible focus rings (purple)
- **Screen Reader**: Proper ARIA labels
- **Color Contrast**: Meet WCAG AA standards
- **Button Labels**: Descriptive text or aria-labels for icons

---

## 15. Development Priorities

### Phase 1: Core Structure (Day 1)
1. Project setup (React + Tailwind)
2. Routing structure
3. Authentication flow
4. Dashboard layout with mock data
5. Basic styling

### Phase 2: Features (Day 2)
1. Pretrained wizard
2. Custom wizard
3. File upload component
4. Batch management (rename, delete, sort)

### Phase 3: Detail Page (Day 3)
1. Batch detail page layout
2. Document navigation
3. Document picker modal
4. Preview panels
5. Export functionality

### Phase 4: Polish (Day 4)
1. Animations and transitions
2. Error handling
3. Loading states
4. Responsive adjustments
5. Testing across browsers

---

## 16. Notes for Claude Code

- **Mock Data**: Generate realistic data for all 10 documents across 5 batches
- **No Backend**: All state in memory + localStorage for persistence
- **Simulated Processing**: Use setTimeout to simulate 3-5 second processing delays
- **Export**: Generate CSV/Excel client-side (use libraries like `papaparse` for CSV, `xlsx` for Excel)
- **File Previews**: Use placeholder images or embedded sample PDFs for prototype
- **Focus on UX**: Smooth interactions, clear feedback, intuitive navigation

---

## 17. Key Libraries to Consider

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "lucide-react": "^0.294.0",
    "@headlessui/react": "^1.7.17", // For modals, dropdowns
    "papaparse": "^5.4.1", // CSV export
    "xlsx": "^0.18.5", // Excel export
    "react-hot-toast": "^2.4.1" // Toast notifications
  },
  "devDependencies": {
    "tailwindcss": "^3.3.5",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.32"
  }
}
```

---

## 18. Success Criteria

✅ User can log in with mock email (no OTP required)  
✅ User can create pretrained document batches  
✅ User can create custom document batches (both methods)  
✅ User can upload files with proper validation  
✅ User can view batch list with sorting  
✅ User can manage batches (rename, delete, export)  
✅ User can navigate batch detail page  
✅ User can view document previews and extracted data  
✅ User sees processing states accurately  
✅ User can export results  
✅ App is responsive on desktop and tablet  
✅ UI is polished with proper animations and feedback  

---

## End of Specifications

This document provides comprehensive specifications for building the OCR/KIE prototype app. All design decisions, user flows, component structures, and technical requirements are detailed above. Use this as the single source of truth for implementation with Claude Code.