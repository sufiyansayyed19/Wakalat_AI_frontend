// API Request/Response Types for Backend Integration

export interface CaseInput {
  type: 'text' | 'document' | 'form';
  content: string;
  metadata?: {
    caseType?: string;
    firNo?: string;
    dateOfIncident?: string;
    jurisdiction?: string;
    complainantName?: string;
    respondentName?: string;
    documents?: string[];
  };
}

export interface RelatedCaseLaw {
  id: string;
  title: string;
  citation: string;
  court: string;
  year: number;
  relevancyScore: number; // 0-100, higher is more relevant
  summary: string;
  keyPoints: string[];
  judgmentText?: string;
  url?: string;
}

export interface LegalAction {
  id: string;
  action: string;
  description: string;
  applicableSections: string[];
  priority: 'high' | 'medium' | 'low';
  estimatedTimeline?: string;
  requiredDocuments?: string[];
}

export interface CaseAnalysisResponse {
  caseId: string;
  status: 'processing' | 'completed' | 'failed';
  timestamp: string;
  
  // Main outputs
  relatedCaseLaws: RelatedCaseLaw[];
  legalActions: LegalAction[];
  
  // Additional analysis
  applicableLaws: {
    section: string;
    act: string;
    description: string;
  }[];
  
  summary: string;
  confidence: number; // 0-100
  
  // Metadata
  processingTime?: number; // milliseconds
  error?: string;
}

export interface ApiError {
  message: string;
  code: string;
  details?: Record<string, unknown>;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
}
