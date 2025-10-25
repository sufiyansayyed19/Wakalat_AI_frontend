interface FormState {
  // Section A: Metadata
  caseType: 'Civil' | 'Criminal' | 'Cybercrime' | 'Family' | null;
  firNo: string;
  dateOfIncident: string;
  location: string;
  jurisdiction: string;

  // Section B: Parties
  complainantName: string;
  complainantAge: string;
  complainantAddress: string;
  respondentName: string;
  respondentAddress: string;

  // Section C: Case-specific details (only one will be filled)
  criminalDetails: {
    natureOfOffence: string;
    sections: string[];
    briefDescription: string;
  };
  civilDetails: {
    typeOfDispute: string;
    claimAmount?: string;
    reliefSought: string;
  };
  cybercrimeDetails: {
    natureOfCyberOffence: string;
    platformInvolved: string;
    digitalEvidence: string;
  };
  familyDetails: {
    typeOfFamilyMatter: string;
    relationshipInvolved: string;
    mainIssues: string;
  };

  // Function to update any field
  updateField: <K extends keyof Omit<FormState, 'updateField'>>(field: K, value: FormState[K]) => void;
}