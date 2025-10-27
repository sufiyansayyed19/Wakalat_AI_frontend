'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ArrowUp, LoaderCircle, FileText, BotMessageSquare } from 'lucide-react';
import { useFormStore } from '../store/formStore';
import type { FormState } from '../store/formStore';
import GuidedForm from './forms/GuidedForm';
import DocumentUploadForm from './forms/DocumentUploadForm';
import toast from 'react-hot-toast';

type InputView = 'text' | 'doc' | 'form';

const InputArea = () => {
  const [activeView, setActiveView] = useState<InputView>('text');
  const [isLoading, setIsLoading] = useState(false);
  
  // --- NEW: State for the controlled text area ---
  const [textInput, setTextInput] = useState('');

  // --- NEW: Specific handler for text submission ---
  const handleTextSubmit = () => {
    if (!textInput.trim()) {
      toast.error("Please enter some text to analyze.");
      return;
    }
    
    setIsLoading(true);
    const dataToSend = { query: textInput };

    console.log("--- SUBMITTING DATA TO BACKEND ---");
    console.log(`Input Mode: ${activeView}`);
    console.log(JSON.stringify(dataToSend, null, 2));

    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 2000)),
      {
        loading: 'Analyzing your query...',
        success: 'Analysis complete!',
        error: 'Error analyzing your query',
      }
    ).finally(() => setIsLoading(false));
  };

  // --- NEW: Specific handler for form/doc submission ---
  const handleFormSubmit = () => {
    const formData = useFormStore.getState();

    if (activeView === 'form') {
      // Check if case type is selected
      if (!formData.caseType) {
        toast.error("Please select a Case Type before submitting.");
        return;
      }

      // Define mandatory fields and their display names
      const mandatoryFields = {
        dateOfIncident: 'Date of Filing / Incident',
        complainantName: 'Complainant Name',
        complainantAge: 'Complainant Age/Occupation',
        complainantAddress: 'Complainant Address',
        respondentName: 'Respondent Name'
      } as const;

      // Check if all mandatory fields are filled
      const missingFields = Object.entries(mandatoryFields)
        .filter(([key]) => {
          const value = formData[key as keyof typeof formData];
          return !value || (typeof value === 'string' && !value.trim());
        })
        .map(([_, label]) => label);

      if (missingFields.length > 0) {
        toast.error(`Please fill in all mandatory fields: ${missingFields.join(', ')}`);
        return;
      }
    } else if (activeView === 'doc') {
      const uploadedDocs = localStorage.getItem('uploadedDocuments');
      if (!uploadedDocs) {
        toast.error("Please upload at least one document before submitting.");
        return;
      }
      
      const documents = JSON.parse(uploadedDocs);
      if (!documents.length) {
        toast.error("Please upload at least one document before submitting.");
        return;
      }

      toast.promise(
        new Promise((resolve) => setTimeout(resolve, 2000)),
        {
          loading: 'Processing documents...',
          success: `Successfully processed ${documents.length} document${documents.length > 1 ? 's' : ''}`,
          error: 'Error processing documents'
        }
      ).finally(() => {
        // Clear the documents from localStorage after successful submission
        localStorage.removeItem('uploadedDocuments');
      });
      return;
    }

    setIsLoading(true);
    // Exclude function properties from the data to send
    const { updateField, updateNestedField, ...dataToSend } = formData;

    console.log("--- SUBMITTING DATA TO BACKEND ---");
    console.log(`Input Mode: ${activeView}`);
    console.log(JSON.stringify(dataToSend, null, 2));

    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 2000)),
      {
        loading: 'Processing form data...',
        success: 'Form submitted successfully!',
        error: 'Error processing form data',
      }
    ).finally(() => setIsLoading(false));
  };

  // --- UPDATED: Main handler now acts as a dispatcher ---
  const handleSubmit = () => {
    if (activeView === 'text') {
      handleTextSubmit();
    } else {
      handleFormSubmit();
    }
  };

  const getButtonClassName = (viewName: InputView) => {
    const isActive = activeView === viewName;
    const baseClasses = "flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-200 focus:outline-none";
    const activeClasses = "bg-stone-800 dark:bg-zinc-700 text-white";
    const inactiveClasses = "bg-stone-200 dark:bg-zinc-800 text-stone-600 dark:text-stone-300 hover:bg-stone-300 dark:hover:bg-zinc-700";
    return `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`;
  };

  return (
    <div className="w-full max-w-3xl mx-auto py-6 px-4 mt-16">
      <div className="flex items-center justify-center gap-4 mb-6">
        <h1 className="text-3xl font-medium text-stone-800 dark:text-stone-200">
          Any new Case?
        </h1>
      </div>

      <div className="flex items-center justify-center gap-3 mb-6">
        <button onClick={() => setActiveView('text')} className={getButtonClassName('text')}>
          <BotMessageSquare size={16} /> Text Input
        </button>
        <button onClick={() => setActiveView('doc')} className={getButtonClassName('doc')}>
          <FileText size={16} /> Document Input
        </button>
        <button onClick={() => setActiveView('form')} className={getButtonClassName('form')}>
          Guided Form <span className="text-amber-600 dark:text-amber-500 font-normal ml-1">(recommended)</span>
        </button>
      </div>
      
      <div className="relative">
        {activeView === 'text' && (
          <div>
            <div className="relative">
              <textarea
                value={textInput} // --- UPDATED: Controlled component
                onChange={(e) => setTextInput(e.target.value)} // --- UPDATED: Controlled component
                className="w-full h-48 p-4 pr-16 text-md bg-stone-100 dark:bg-zinc-900 border border-stone-200 dark:border-zinc-700 rounded-lg resize-none text-stone-800 dark:text-stone-200 placeholder:text-stone-500 dark:placeholder:text-stone-400 focus:bg-white dark:focus:bg-zinc-900 focus:ring-1 focus:ring-amber-500/50 focus:border-amber-500/50 focus:outline-none transition-all duration-200"
                placeholder="Paste the full case description, FIR details, or narrative here..."
              />
              <button 
                onClick={handleSubmit} 
                disabled={isLoading}
                className="absolute bottom-6 right-6 flex items-center justify-center w-10 h-10 bg-stone-800 dark:bg-stone-200 text-white dark:text-stone-800 rounded-full font-semibold hover:bg-stone-900 dark:hover:bg-white transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? <LoaderCircle size={20} className="animate-spin" /> : <ArrowUp size={20} />}
              </button>
            </div>
            <div className="text-center mt-4 mb-16">
              <p className="text-xs text-stone-500 dark:text-stone-400">WAKALAT.AI can make mistakes. Check important info.</p>
            </div>
          </div>
        )}

        {activeView === 'doc' && (
          <div className="flex flex-col items-center justify-center gap-4">
            <DocumentUploadForm />
          </div>
        )}

        {activeView === 'form' && <GuidedForm />}
      </div>

      {(activeView === 'doc' || activeView === 'form') && (
        <div className="flex flex-col items-center mt-6">
          <button 
            onClick={handleSubmit}
            disabled={isLoading}
            className="flex items-center justify-center gap-2 px-6 py-2.5 bg-stone-800 dark:bg-stone-200 text-white dark:text-stone-800 rounded-full font-semibold text-sm hover:bg-stone-900 dark:hover:bg-white transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-amber-500/30 focus:ring-offset-1 disabled:opacity-70 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {isLoading ? ( <LoaderCircle size={18} className="animate-spin" /> ) : (
              <>
                <ArrowUp size={18} />
                Submit for Analysis
              </>
            )}
          </button>
          <div className="text-center mt-4 mb-16">
            <p className="text-xs text-stone-500 dark:text-stone-400">WAKALAT.AI can make mistakes. Check important info.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default InputArea;