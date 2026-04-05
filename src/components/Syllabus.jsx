import React, { useState, useEffect } from "react";
import axios from "axios";
import { FileText, Download, Loader2, AlertCircle } from "lucide-react";

/**
 * Syllabus Component
 * Shows a list of available PDF syllabus documents for students to download.
 */
const Syllabus = ({ trainingId }) => {
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPdfs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/syllabus");
        // If trainingId is provided, filter by it. Otherwise show all.
        const filtered = trainingId 
          ? res.data.filter(p => p.trainingId === trainingId) 
          : res.data;
        setPdfs(filtered);
      } catch {
        setError("Unable to load syllabus documents.");
      } finally {
        setLoading(false);
      }
    };
    fetchPdfs();
  }, [trainingId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8 text-indigo-600">
        <Loader2 className="w-8 h-8 animate-spin mr-3" />
        <span className="text-lg font-medium">Loading Syllabus...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center p-4 text-red-700 bg-red-50 rounded-xl border border-red-200">
        <AlertCircle className="w-5 h-5 mr-3" />
        <span>{error}</span>
      </div>
    );
  }

  if (pdfs.length === 0) {
    return (
      <div className="text-center p-8 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
        <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
        <p className="text-gray-500 font-medium">No syllabus PDF uploaded yet.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-1">
      {pdfs.map((pdf) => (
        <div 
          key={pdf._id} 
          className="group relative flex items-center justify-between p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:border-indigo-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        >
          <div className="flex items-center space-x-5">
            <div className="p-4 bg-indigo-50 text-indigo-600 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                {pdf.title}
              </h4>
              <p className="text-sm text-gray-500 mt-1">
                Uploaded {new Date(pdf.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          
          <a 
            href={`http://localhost:5000${pdf.fileUrl}`} 
            download 
            className="flex items-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 active:scale-95 transition-all shadow-lg shadow-indigo-200"
          >
            <Download className="w-5 h-5 mr-2" />
            Download PDF
          </a>
        </div>
      ))}
    </div>
  );
};

export default Syllabus;
