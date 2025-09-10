import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [resumes, setResumes] = useState([]);
  const navigate = useNavigate();

  const fetchResumes = async () => {
    try {
      const { data } = await API.get('/resume');
      setResumes(data);
    } catch (err) {
      console.error(err);
      alert('Unable to load resumes');
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  const remove = async (id) => {
    if (!confirm('Delete this resume?')) return;
    try {
      await API.delete(`/resume/${id}`);
      fetchResumes();
    } catch (err) {
      alert('Delete failed');
    }
  };

  return (
    <div className="pt-24 px-6 md:px-12 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="mb-8 flex justify-between items-center">
        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
          Your Resumes
        </h2>
        <button
          onClick={() => navigate('/builder')}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 hover:shadow-lg transition"
        >
          + Create Resume
        </button>
      </div>

      {/* Resume List */}
      <div className="grid gap-6">
        {resumes.length === 0 && (
          <div className="bg-white p-10 rounded-xl shadow text-center text-gray-600 font-medium border border-gray-200">
            <p className="text-xl font-semibold mb-2">No resumes yet</p>
            <p>
              <span className="text-blue-600 font-semibold">Click Create</span> to start building your first resume.
            </p>
          </div>
        )}

        {resumes.map((r) => (
          <div
            key={r._id}
            className="p-6 bg-white rounded-xl shadow hover:shadow-xl transition flex justify-between items-center border border-gray-100"
          >
            <div>
              <div className="text-xl font-bold text-gray-800">{r.title}</div>
              <div className="text-sm text-gray-500">
                Updated: {new Date(r.updatedAt).toLocaleString()}
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => navigate(`/view/${r._id}`)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                View
              </button>
              <button
                onClick={() => navigate(`/builder/${r._id}`)}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
              >
                Edit
              </button>
              <button
                onClick={() => remove(r._id)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
