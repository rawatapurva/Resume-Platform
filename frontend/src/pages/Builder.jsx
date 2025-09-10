import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../services/api';
import ResumeForm from '../components/ResumeForm';

export default function Builder() {
  const { id } = useParams();
  const navigate = useNavigate();

//   const [resume, setResume] = useState({
//     title: '',
//     data: {
//       name: '',
//       title: '',
//       summary: '',
//       skills: '',
//       contact: '',
//       school10: { name: '', marks: '', year: '' },
//       school12: { name: '', marks: '', year: '' },
//       college: { name: '', degree: '', marks: '', year: '' },
//       projects: [],
//     },
//   });
const [resume, setResume] = useState({
  title: '',
  data: {
    name: '',
    title: '',
    summary: '',
    skills: '',
    contact: '',
    education: {
      school10: { name: '', marks: '', year: '' },
      school12: { name: '', marks: '', year: '' },
      college: { name: '', degree: '', marks: '', year: '' },
    },
    projects: [],
  },
});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      API.get(`/resume/${id}`)
        .then(res => setResume(res.data))
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [id]);

  const save = async () => {
    try {
      const payload = { title: resume.title, data: resume.data };
      if (id) await API.put(`/resume/${id}`, payload);
      else await API.post('/resume', payload);
      navigate('/');
    } catch (err) {
      alert('Save failed');
    }
  };

  return (
    <div className="pt-24 px-6 md:px-12 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Section */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-700 mb-6">Build Your Resume</h2>

          {/* Resume Title */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-600">Resume Title</label>
            <input
              value={resume.title}
              onChange={(e) => setResume(prev => ({ ...prev, title: e.target.value }))}
              className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="e.g. Software Engineer Resume"
            />
          </div>

          {/* Resume Form */}
          <ResumeForm
            data={resume.data || {}}
            setData={(d) => setResume(prev => ({ ...prev, data: d }))}
          />

          {/* Action Buttons */}
          <div className="mt-8 flex gap-4">
            <button
              onClick={save}
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition shadow-md"
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-2 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition shadow-md"
            >
              Cancel
            </button>
          </div>
        </div>

        {/* Right Section - Preview */}
        <div className="bg-white rounded-xl shadow-lg p-8 overflow-y-auto">
          <h3 className="text-lg font-bold text-gray-700 mb-4 border-b pb-2">Preview</h3>
          <div className="space-y-6">
            {/* Header */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800">
                {resume.data?.name || 'Full Name'}
              </h2>
              <div className="italic text-gray-500">
                {resume.data?.title || 'Professional Title'}
              </div>
              <p className="text-gray-600 mt-2">
                {resume.data?.summary || 'Summary or objective...'}
              </p>
            </div>

            {/* Skills & Contact */}
            <div>
              <strong className="text-gray-700">Skills:</strong>{' '}
              {resume.data?.skills || '—'}
            </div>
            <div>
              <strong className="text-gray-700">Contact:</strong>{' '}
              {resume.data?.contact || '—'}
            </div>

            {/* Education */}
            {/* Education */}
<div>
  <h4 className="text-lg font-semibold border-b pb-1 mb-2">Education</h4>
  <div className="text-sm">
    <p>
      <strong>10th:</strong>{' '}
      {resume.data?.education?.school10?.name || '—'} | Marks: {resume.data?.education?.school10?.marks || '—'} | Year: {resume.data?.education?.school10?.year || '—'}
    </p>
    <p>
      <strong>12th:</strong>{' '}
      {resume.data?.education?.school12?.name || '—'} | Marks: {resume.data?.education?.school12?.marks || '—'} | Year: {resume.data?.education?.school12?.year || '—'}
    </p>
    <p>
      <strong>College:</strong>{' '}
      {resume.data?.education?.college?.name || '—'} ({resume.data?.education?.college?.degree || '—'}) | Marks: {resume.data?.education?.college?.marks || '—'} | Year: {resume.data?.education?.college?.year || '—'}
    </p>
  </div>
</div>


            {/* Projects */}
            <div>
              <h4 className="text-lg font-semibold border-b pb-1 mb-2">Projects</h4>
              <div className="space-y-3">
                {(resume.data?.projects || []).length > 0 ? (
                  resume.data.projects.map((proj, i) => (
                    <div key={i} className="border rounded p-2">
                      <h5 className="font-semibold">{proj.title || 'Untitled Project'}</h5>
                      <p className="text-sm text-gray-600">{proj.description || 'No description provided.'}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No projects added.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
