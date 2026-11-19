import React, { useState, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  UploadCloud,
  FileText,
  X,
  AlertCircle,
  Flame,
  CheckCircle2,
  Users,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Info
} from 'lucide-react';
import { startAnalysis } from '../services/api';
import { toast } from 'sonner';

export const Upload = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const previousAnalysisId = searchParams.get('compareWith');

  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form Fields
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [audience, setAudience] = useState('Startup Investors');
  const [errorMessage, setErrorMessage] = useState('');

  const audienceOptions = [
    { id: 'Startup Investors', label: 'Startup Investors', desc: 'Commercial viability, unit economics, market size & TAM' },
    { id: 'Hackathon Judges', label: 'Hackathon Judges', desc: 'Execution speed, innovation, working prototype & demo appeal' },
    { id: 'University Professors', label: 'University Professors', desc: 'Methodological rigor, technical depth & evidence' },
    { id: 'Recruiters', label: 'Recruiters', desc: 'Team execution, engineering competence & project scope' },
    { id: 'General Audience', label: 'General Audience', desc: 'Plain English, high clarity & immediate user relatability' },
  ];

  // Handle Drag Events
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  // Validate File
  const validateFile = (selectedFile) => {
    setErrorMessage('');
    if (!selectedFile) return false;

    // Check MIME and extension
    const isPdf = selectedFile.type === 'application/pdf' || selectedFile.name.toLowerCase().endsWith('.pdf');
    if (!isPdf) {
      setErrorMessage('Only PDF presentations are accepted. Please export your slides as a PDF file.');
      toast.error('Only PDF files are supported');
      return false;
    }

    // Check size limit: 10MB
    const maxSizeBytes = 10 * 1024 * 1024;
    if (selectedFile.size > maxSizeBytes) {
      setErrorMessage('File size exceeds 10 MB limit. Please compress or optimize your presentation PDF.');
      toast.error('File size exceeds 10 MB limit');
      return false;
    }

    return true;
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (validateFile(droppedFile)) {
        setFile(droppedFile);
        if (!projectName) {
          // Auto-suggest project name from filename
          const cleanName = droppedFile.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
          setProjectName(cleanName);
        }
      }
    }
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (validateFile(selectedFile)) {
        setFile(selectedFile);
        if (!projectName) {
          const cleanName = selectedFile.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
          setProjectName(cleanName);
        }
      }
    }
  };

  const removeFile = () => {
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024 * 1024) {
      return (bytes / 1024).toFixed(1) + ' KB';
    }
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!file) {
      setErrorMessage('Please select or drag-and-drop a pitch deck PDF file.');
      toast.error('No presentation file selected');
      return;
    }

    if (!projectName.trim()) {
      setErrorMessage('Please provide a project or startup name.');
      toast.error('Project name is required');
      return;
    }

    try {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append('pdf', file);
      formData.append('projectName', projectName.trim());
      formData.append('projectDescription', projectDescription.trim());
      formData.append('audience', audience);
      if (previousAnalysisId) {
        formData.append('previousAnalysisId', previousAnalysisId);
      }

      const response = await startAnalysis(formData);
      if (response.success && response.analysisId) {
        toast.success('Pitch deck uploaded! AI judges are analyzing...');
        navigate(`/analyzing/${response.analysisId}`);
      } else {
        throw new Error(response.message || 'Failed to start analysis');
      }
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Error uploading presentation';
      setErrorMessage(msg);
      toast.error(msg);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-10">
      
      {/* Page Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold">
          <Flame className="w-3.5 h-3.5 fill-orange-500" />
          <span>Upload Pitch Deck</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Face The Three AI Judges
        </h1>
        <p className="text-sm text-gray-400 max-w-xl mx-auto">
          Upload your PDF (max 15 slides, up to 10 MB). Tell us who you're pitching to, and let the AI judges grill your claims.
        </p>

        {previousAnalysisId && (
          <div className="p-3 bg-purple-500/10 border border-purple-500/30 rounded-xl text-xs text-purple-300 max-w-md mx-auto flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>Comparing against previous report: <strong>#{previousAnalysisId.slice(-6)}</strong></span>
          </div>
        )}
      </div>

      {/* Main Upload Form Card */}
      <form onSubmit={handleSubmit} className="rounded-2xl border border-white/10 bg-[#171C2C]/90 p-6 sm:p-10 backdrop-blur-xl shadow-2xl space-y-8">
        
        {/* Error notification */}
        {errorMessage && (
          <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-3">
            <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <span className="font-semibold block mb-0.5">Upload Error</span>
              <span>{errorMessage}</span>
            </div>
          </div>
        )}

        {/* 1. PDF Drag & Drop Zone */}
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-300 flex items-center justify-between">
            <span>1. Pitch Deck File (PDF)</span>
            <span className="text-gray-500 font-normal">Max 15 slides • Max 10 MB</span>
          </label>

          {!file ? (
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-all ${
                dragActive
                  ? 'border-purple-500 bg-purple-500/10 scale-[1.01]'
                  : 'border-white/15 bg-[#111522]/70 hover:border-purple-500/40 hover:bg-[#111522]'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,application/pdf"
                onChange={handleFileInputChange}
                className="hidden"
              />

              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-orange-500/20 via-purple-500/20 to-cyan-500/20 border border-white/10 flex items-center justify-center text-purple-400">
                  <UploadCloud className="w-8 h-8 text-orange-400" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold text-white">
                    Click to browse or drag and drop your deck PDF here
                  </p>
                  <p className="text-xs text-gray-400">
                    Supports PowerPoint, Keynote, Canva or Figma decks exported as PDF
                  </p>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Encrypted in-memory extraction • Zero permanent file storage</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-[#111522] border border-white/10 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="overflow-hidden">
                  <p className="text-sm font-bold text-white truncate">{file.name}</p>
                  <p className="text-xs text-gray-400">{formatFileSize(file.size)}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={removeFile}
                className="p-2 rounded-lg text-gray-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors flex-shrink-0"
                title="Remove file"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>


        {/* 2. Project Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-300">
              2. Project / Startup Name *
            </label>
            <input
              type="text"
              required
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="E.g. PayLoop, Campus Barter, OmniAI..."
              className="w-full bg-[#111522] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-300">
              3. Brief Description (Optional)
            </label>
            <input
              type="text"
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              placeholder="1-2 sentences on what problem you solve..."
              className="w-full bg-[#111522] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50"
            />
          </div>
        </div>


        {/* 3. Target Audience Selection */}
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-300 flex items-center justify-between">
            <span>4. Target Audience (Tailors Judge Rigor)</span>
            <span className="text-gray-500 font-normal">Choose who you are presenting to</span>
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {audienceOptions.map((opt) => (
              <label
                key={opt.id}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                  audience === opt.id
                    ? 'border-purple-500 bg-purple-500/10 shadow-lg shadow-purple-500/10'
                    : 'border-white/5 bg-[#111522] hover:border-white/15'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-xs font-bold ${audience === opt.id ? 'text-white' : 'text-gray-300'}`}>
                    {opt.label}
                  </span>
                  <input
                    type="radio"
                    name="audience"
                    value={opt.id}
                    checked={audience === opt.id}
                    onChange={() => setAudience(opt.id)}
                    className="accent-purple-500"
                  />
                </div>
                <p className="text-[11px] text-gray-400 leading-tight">
                  {opt.desc}
                </p>
              </label>
            ))}
          </div>
        </div>


        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 rounded-xl font-black text-sm uppercase tracking-wider text-white bg-gradient-to-r from-orange-500 via-purple-600 to-purple-700 hover:from-orange-600 hover:via-purple-700 hover:to-purple-800 disabled:opacity-50 transition-all duration-300 shadow-xl shadow-orange-500/25 hover:shadow-orange-500/40 flex items-center justify-center gap-2 group"
          >
            <Flame className="w-5 h-5 fill-orange-200 group-hover:scale-110 transition-transform" />
            <span>{isSubmitting ? 'Uploading Presentation...' : 'START ROASTING'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="text-center text-[11px] text-gray-500 mt-3">
            By clicking Start Roasting, you agree to our fair-use policy. Uploads are processed privately and immediately deleted after text extraction.
          </p>
        </div>

      </form>

    </div>
  );
};

export default Upload;
