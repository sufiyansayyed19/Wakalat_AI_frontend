'use client';

import { useFormStore } from "../../store/formStore";
import { SelectField } from "./FormFields";
import MetadataForm from './MetadataForm';
import PartiesForm from './PartiesForm';
import CriminalCaseForm from './CriminalCaseForm';
import CivilCaseForm from './CivilCaseForm';
import CybercrimeCaseForm from './CybercrimeCaseForm';
import FamilyCaseForm from './FamilyCaseForm';

const GuidedForm = () => {
  const caseType = useFormStore(state => state.caseType);

  const caseTypeOptions = [
    { value: 'Criminal', label: 'Criminal Case' },
    { value: 'Civil', label: 'Civil Case' },
    { value: 'Cybercrime', label: 'Cybercrime Case' },
    { value: 'Family', label: 'Family Case' },
  ];

  const renderCaseSpecificForm = () => {
    switch (caseType) {
      case 'Criminal':
        return <CriminalCaseForm />;
      case 'Civil':
        return <CivilCaseForm />;
      case 'Cybercrime':
        return <CybercrimeCaseForm />;
      case 'Family':
        return <FamilyCaseForm />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 bg-stone-100 dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-stone-800 dark:text-stone-200">
        Guided Case Details
      </h2>

      <SelectField 
        name="caseType"
        label="Select Case Type"
        options={caseTypeOptions}
        isRequired
      />

      {caseType && (
        <>
          <hr className="my-6 border-stone-300 dark:border-zinc-600" />
          <MetadataForm />
          
          <hr className="my-6 border-stone-300 dark:border-zinc-600" />
          <PartiesForm />
          
          <hr className="my-6 border-stone-300 dark:border-zinc-600" />
          {renderCaseSpecificForm()}
        </>
      )}
    </div>
  );
};

// --- THIS IS THE CRUCIAL LINE ---
// Ensures that this component is the default export of this file.
export default GuidedForm;