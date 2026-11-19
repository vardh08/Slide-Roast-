import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Clock,
  Trash2,
  ExternalLink,
  Flame,
  Layers,
  Users,
  Calendar,
  AlertCircle,
  GitCompare,
  UploadCloud
} from 'lucide-react';
import { getHistory, deleteAnalysis } from '../services/api';
import { toast } from 'sonner';

export const History = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const res = await getHistory();
      if (res.success && res.reports) {
        setReports(res.reports);
      }
    } catch (err) {
      toast.error('Failed to load analysis history');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete the roast report for "${name}"?`)) {
      return;
    }

    try {
      await deleteAnalysis(id);
      toast.success('Report deleted successfully');
      setReports(reports.filter(r => r.id !== id));
    } catch (err) {
      toast.error('Failed to delete report');
    }
  };

  const getScoreBadge = (score) => {
    if (score >= 90) return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
    if (score >= 75) return 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30';
    if (score >= 60) return 'text-purple-400 bg-purple-500/10 border-purple-500/30';
    if (score >= 40) return 'text-orange-400 bg-orange-500/10 border-orange-500/30';
    return 'text-rose-400 bg-rose-500/10 border-rose-500/30';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-purple-400" />
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Report History
            </h1>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Access previous deck evaluations, track progress, or compare revised presentations
          </p>
        </div>

        <Link
          to="/upload"
          className="px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 transition-all shadow-lg shadow-orange-500/10 flex items-center justify-center gap-2"
        >
          <Flame className="w-4 h-4 fill-orange-200" />
          Roast New Deck
        </Link>
      </div>

      {/* Reports Table or Grid */}
      {loading ? (
        <div className="py-24 text-center space-y-4">
          <div className="w-10 h-10 rounded-full border-2 border-purple-500 border-t-transparent animate-spin mx-auto" />
          <p className="text-xs text-gray-400">Loading saved reports...</p>
        </div>
      ) : reports.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-[#171C2C]/50 p-12 text-center space-y-4 max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-gray-500">
            <Clock className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-white">No Reports Saved Yet</h3>
          <p className="text-xs text-gray-400">
            You haven't submitted any pitch decks for evaluation yet. Upload a PDF to get started!
          </p>
          <div className="pt-2">
            <Link
              to="/upload"
              className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 transition-colors inline-flex items-center gap-2"
            >
              <UploadCloud className="w-4 h-4" />
              Upload First Pitch Deck
            </Link>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#171C2C]/80 backdrop-blur-xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-[#111522]/80 text-[11px] font-bold uppercase tracking-wider text-gray-400">
                <th className="py-4 px-6">Project / Startup</th>
                <th className="py-4 px-6">Audience</th>
                <th className="py-4 px-6">Date</th>
                <th className="py-4 px-6">Slides</th>
                <th className="py-4 px-6">Overall Score</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs text-gray-300">
              {reports.map((r) => {
                const dateStr = new Date(r.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                });
                return (
                  <tr key={r.id} className="hover:bg-white/[0.02] transition-colors">
                    
                    {/* Project */}
                    <td className="py-4 px-6">
                      <div className="font-bold text-white text-sm">
                        {r.projectName}
                      </div>
                      <span className="text-[11px] text-gray-500 font-mono">
                        {r.filename}
                      </span>
                    </td>

                    {/* Audience */}
                    <td className="py-4 px-6">
                      <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300 font-medium text-[11px]">
                        {r.audience}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="py-4 px-6 text-gray-400">
                      {dateStr}
                    </td>

                    {/* Slides */}
                    <td className="py-4 px-6">
                      <span className="font-mono text-gray-300">
                        {r.pageCount || 0} slides
                      </span>
                    </td>

                    {/* Score */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-1 rounded-lg font-black font-mono border ${getScoreBadge(r.overallScore)}`}>
                          {r.overallScore}/100
                        </span>
                        <span className="text-[11px] text-gray-400">
                          {r.scoreInterpretation}
                        </span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/report/${r.id}`}
                          className="px-3 py-1.5 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 hover:text-white border border-purple-500/20 transition-colors flex items-center gap-1 font-semibold"
                          title="View Roast Report"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>View</span>
                        </Link>

                        <Link
                          to={`/upload?compareWith=${r.id}`}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-cyan-400 transition-colors"
                          title="Compare with Revised Deck"
                        >
                          <GitCompare className="w-4 h-4" />
                        </Link>

                        <button
                          onClick={() => handleDelete(r.id, r.projectName)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-500/10 text-gray-400 hover:text-rose-400 transition-colors"
                          title="Delete Report"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
};

export default History;
