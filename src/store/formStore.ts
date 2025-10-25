import { create } from 'zustand';

// (The FormState interface remains the same)
export interface FormState {
  caseType: 'Civil' | 'Criminal' | 'Cybercrime' | 'Family' | null;
  firNo: string;
  dateOfIncident: string;
  location: string;
  jurisdiction: string;
  complainantName: string;
  complainantAge: string;
  complainantAddress: string;
  respondentName: string;
  respondentAddress: string;
  criminalDetails: {
    natureOfOffence: string;
    sections: string[];
    briefDescription: string;
  };
  civilDetails: {
    typeOfDispute: string;
    claimAmount?: string;
    reliefSought: string;
     groundsOfDispute: string;
  };
 cybercrimeDetails: {
    natureOfCyberOffence: string;
    platformInvolved: string;
    modeOfOperation: string; // Add this
    lossDetails: string; // Add this
    technicalDetails: string; // Add this to capture other info
  };
  familyDetails: {
    typeOfFamilyMatter: string;
    relationshipInvolved: string;
    marriageDetails: string;      // Add this
    childrenInfo: string;         // Add this
    groundsForPetition: string;   // Add this
    mainIssues: string;
  };
  updateField: <K extends keyof Omit<FormState, 'updateField' | 'updateNestedField'>>(field: K, value: FormState[K]) => void;
  // --- NEW FUNCTION SIGNATURE ---
  updateNestedField: <P extends keyof FormState, C extends keyof FormState[P]>(parent: P, child: C, value: FormState[P][C]) => void;
}

export const useFormStore = create<FormState>((set) => ({
  // (Initial state remains the same)
  caseType: null,
  firNo: '',
  dateOfIncident: '',
  location: '',
  jurisdiction: '',
  complainantName: '',
  complainantAge: '',
  complainantAddress: '',
  respondentName: '',
  respondentAddress: '',
  criminalDetails: { natureOfOffence: '', sections: [], briefDescription: '' },
  civilDetails: { typeOfDispute: '', claimAmount: '', reliefSought: '', groundsOfDispute: '' },
  cybercrimeDetails: { natureOfCyberOffence: '', platformInvolved: '',  modeOfOperation: '', lossDetails: '',technicalDetails: '' },
  familyDetails: { typeOfFamilyMatter: '', relationshipInvolved: '',marriageDetails: '', childrenInfo: '', groundsForPetition: '',mainIssues: '' },

  // (The original updateField function remains the same)
  updateField: (field, value) => set({ [field]: value }),
  
  // --- NEW NESTED UPDATE FUNCTION ---
  updateNestedField: (parent, child, value) => set((state) => {
    const parentObject = state[parent];
    if (typeof parentObject === 'object' && parentObject !== null) {
      return {
        ...state,
        [parent]: {
          ...parentObject,
          [child]: value,
        },
      };
    }
    return state;
  }),
}));