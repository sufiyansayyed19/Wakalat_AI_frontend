'use client';

import { useState, useCallback } from 'react';
import { Upload, X, File, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface FileWithPreview extends File {
  preview?: string;
}

const DocumentUploadForm = () => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const onDrop = useCallback((acceptedFiles: FileWithPreview[]) => {
    // Only accept PDF, DOC, DOCX files
    const validFiles = acceptedFiles.filter(file => {
      const isValid = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
        .includes(file.type);
      if (!isValid) {
        toast.error(`${file.name} is not a valid document file. Please upload PDF or Word documents only.`);
      }
      return isValid;
    });

    if (validFiles.length > 0) {
      // Store files in localStorage
      const filesData = validFiles.map(file => ({
        name: file.name,
        type: file.type,
        size: file.size,
        lastModified: file.lastModified,
      }));
      localStorage.setItem('uploadedDocuments', JSON.stringify(filesData));

      setFiles(validFiles);
      toast.success('Documents uploaded successfully!');
    }
  }, []);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    onDrop(droppedFiles);
  }, [onDrop]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files ? Array.from(e.target.files) : [];
    onDrop(selectedFiles);
  }, [onDrop]);

  const removeFile = useCallback((index: number) => {
    setFiles(prev => {
      const newFiles = [...prev];
      newFiles.splice(index, 1);
      
      // Update localStorage
      if (newFiles.length === 0) {
        localStorage.removeItem('uploadedDocuments');
      } else {
        const filesData = newFiles.map(file => ({
          name: file.name,
          type: file.type,
          size: file.size,
          lastModified: file.lastModified,
        }));
        localStorage.setItem('uploadedDocuments', JSON.stringify(filesData));
      }
      
      return newFiles;
    });
    toast.success('Document removed');
  }, []);

  return (
    <div className="w-full">
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`w-full flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-lg transition-colors ${
          isDragging
            ? 'border-amber-500 bg-amber-50/50 dark:bg-amber-500/10'
            : 'border-stone-300 dark:border-zinc-700'
        }`}
      >
        <input
          type="file"
          id="fileInput"
          multiple
          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          className="hidden"
          onChange={handleFileSelect}
        />
        <label
          htmlFor="fileInput"
          className="flex flex-col items-center justify-center gap-2 cursor-pointer"
        >
          <Upload className="w-8 h-8 text-stone-500 dark:text-stone-400" />
          <p className="text-stone-500 dark:text-stone-400 text-center">
            {isDragging ? (
              <span className="text-amber-600 dark:text-amber-500">Drop your documents here</span>
            ) : (
              <span>
                Drag & drop your documents here or{' '}
                <span className="text-amber-600 dark:text-amber-500">browse</span>
              </span>
            )}
          </p>
          <p className="text-xs text-stone-400 dark:text-stone-500">
            Supports: PDF, DOC, DOCX
          </p>
        </label>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="mt-6 space-y-3">
          {files.map((file, index) => (
            <div
              key={`${file.name}-${index}`}
              className="flex items-center justify-between p-3 bg-stone-100 dark:bg-zinc-800 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <File className="w-5 h-5 text-amber-600 dark:text-amber-500" />
                <div>
                  <p className="text-sm font-medium text-stone-800 dark:text-stone-200">
                    {file.name}
                  </p>
                  <p className="text-xs text-stone-500 dark:text-stone-400">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <button
                  onClick={() => removeFile(index)}
                  className="p-1 hover:bg-stone-200 dark:hover:bg-zinc-700 rounded-full transition-colors"
                >
                  <X className="w-4 h-4 text-stone-500 dark:text-stone-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DocumentUploadForm;