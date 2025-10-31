# Frontend-Backend Integration Guide

## Overview
This document describes the API contract between the frontend and backend for the Legal Case Analysis System.

## Current Status
- **Frontend Mode**: Mock Mode (MOCK_MODE = true)
- **Mock Data**: Returns simulated responses
- **Ready for Integration**: Switch MOCK_MODE to false when backend is ready

## API Service Location
- **File**: `src/services/api.ts`
- **Types**: `src/types/api.ts`
- **Configuration**: `MOCK_MODE` flag in api.ts

## API Endpoints Expected

### 1. Analyze Case
**Endpoint**: `POST /api/analyze`

**Request Body**:
```typescript
{
  type: 'text' | 'document' | 'form',
  content: string,  // User's case description or form data
  metadata?: {
    caseType?: string,           // 'Civil' | 'Criminal' | 'Cybercrime' | 'Family'
    firNo?: string,
    dateOfIncident?: string,
    jurisdiction?: string,
    complainantName?: string,
    respondentName?: string,
    documents?: string[]         // Document names/URLs
  }
}
```

**Response**:
```typescript
{
  caseId: string,
  status: 'processing' | 'completed' | 'failed',
  timestamp: string,  // ISO format
  
  // Main outputs - MOST IMPORTANT
  relatedCaseLaws: [{
    id: string,
    title: string,
    citation: string,           // e.g., "2023 SCC 145"
    court: string,
    year: number,
    relevancyScore: number,     // 0-100, sorted highest to lowest
    summary: string,
    keyPoints: string[],
    judgmentText?: string,
    url?: string
  }],
  
  legalActions: [{
    id: string,
    action: string,
    description: string,
    applicableSections: string[],
    priority: 'high' | 'medium' | 'low',
    estimatedTimeline?: string,
    requiredDocuments?: string[]
  }],
  
  // Additional analysis
  applicableLaws: [{
    section: string,
    act: string,
    description: string
  }],
  
  summary: string,
  confidence: number,  // 0-100
  processingTime?: number
}
```

### 2. Get Case Law Details (Optional)
**Endpoint**: `GET /api/caselaw/{caseId}`

**Response**: Single RelatedCaseLaw object with full details

### 3. Export Analysis (Future)
**Endpoint**: `GET /api/export/{caseId}`

**Response**: 
```typescript
{
  url: string  // Download URL for PDF
}
```

## Key Requirements

### Related Case Laws
- **Must be sorted** by relevancyScore (highest first)
- Include at least top 3-5 most relevant cases
- Each case needs:
  - Clear citation
  - Relevancy score (0-100)
  - Brief summary
  - Key legal points

### Legal Actions
- Priority-ordered recommendations
- Specific actionable steps
- Applicable legal sections
- Timeline estimates

### Processing
- Can return `status: 'processing'` initially
- Frontend will show streaming animation
- Final response marked as `status: 'completed'`

## Environment Variables

Create `.env.local` in frontend root:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000/api
# or your backend URL
```

## Switching to Real Backend

In `src/services/api.ts`:

```typescript
const MOCK_MODE = false;  // Change this to false
```

That's it! All API calls will now go to the real backend.

## Error Handling

Frontend expects this error format:
```typescript
{
  success: false,
  error: {
    message: string,
    code: string,
    details?: Record<string, unknown>
  }
}
```

## Testing

### Test with Mock Data (Current)
```bash
npm run dev
# Submit a case - you'll see mock responses
```

### Test with Backend (When Ready)
1. Set `MOCK_MODE = false` in `src/services/api.ts`
2. Set `NEXT_PUBLIC_API_URL` in `.env.local`
3. Run frontend
4. Test all case submission types

## Case Submission Types

Frontend supports 3 input types:

1. **Text Input**: Raw case description
2. **Document Upload**: PDF/DOC files
3. **Guided Form**: Structured form with:
   - Case Type selection
   - Parties information
   - Incident details
   - Case-specific fields

All three types are converted to the same API format.

## Sample Mock Response

Check `src/services/api.ts` → `generateMockResponse()` function for complete sample structure.

## Questions?

Contact Frontend Team:
- Check mock data structure in api.ts
- See type definitions in types/api.ts
- Test with MOCK_MODE = true first

---

**Important**: Current frontend is fully functional with mock data. Backend integration is just a config change!
