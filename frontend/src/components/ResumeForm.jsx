import React from 'react'

export default function ResumeForm({ data, setData }) {
  const update = (field) => (e) =>
    setData({ ...data, [field]: e.target.value })

  // ✅ Helper for nested education updates
  const updateEducation = (section, field) => (e) =>
    setData({
      ...data,
      education: {
        ...data.education,
        [section]: {
          ...data.education?.[section],
          [field]: e.target.value,
        },
      },
    })

  const addProject = () => {
    setData({
      ...data,
      projects: [...(data.projects || []), { title: '', description: '' }],
    })
  }

  const updateProject = (index, field) => (e) => {
    const projects = [...(data.projects || [])]
    projects[index][field] = e.target.value
    setData({ ...data, projects })
  }

  const removeProject = (index) => {
    const projects = [...(data.projects || [])]
    projects.splice(index, 1)
    setData({ ...data, projects })
  }

  return (
    <div className="bg-white p-6 rounded shadow space-y-6">
      {/* Basic Info */}
      <h2 className="text-lg font-semibold">Basic Info</h2>
      <div className="grid gap-3">
        <div>
          <label className="block text-sm font-medium">Full name</label>
          <input
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-200"
            value={data.name || ''}
            onChange={update('name')}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Professional title</label>
          <input
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-200"
            value={data.title || ''}
            onChange={update('title')}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Summary</label>
          <textarea
            rows="4"
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-200"
            value={data.summary || ''}
            onChange={update('summary')}
          />
        </div>
      </div>

      {/* Education Section */}
      <h2 className="text-lg font-semibold">Education</h2>
      <div className="grid gap-6">
        {/* 10th */}
        <div>
          <label className="block text-sm font-medium">10th School</label>
          <input
            className="w-full p-2 border border-gray-300 rounded"
            value={data.education?.school10?.name || ''}
            onChange={updateEducation('school10', 'name')}
            placeholder="School name"
          />
          <input
            className="w-full p-2 border border-gray-300 rounded mt-2"
            value={data.education?.school10?.marks || ''}
            onChange={updateEducation('school10', 'marks')}
            placeholder="Marks/Percentage"
          />
          <input
            className="w-full p-2 border border-gray-300 rounded mt-2"
            value={data.education?.school10?.year || ''}
            onChange={updateEducation('school10', 'year')}
            placeholder="Passout year"
          />
        </div>

        {/* 12th */}
        <div>
          <label className="block text-sm font-medium">12th School</label>
          <input
            className="w-full p-2 border border-gray-300 rounded"
            value={data.education?.school12?.name || ''}
            onChange={updateEducation('school12', 'name')}
            placeholder="School name"
          />
          <input
            className="w-full p-2 border border-gray-300 rounded mt-2"
            value={data.education?.school12?.marks || ''}
            onChange={updateEducation('school12', 'marks')}
            placeholder="Marks/Percentage"
          />
          <input
            className="w-full p-2 border border-gray-300 rounded mt-2"
            value={data.education?.school12?.year || ''}
            onChange={updateEducation('school12', 'year')}
            placeholder="Passout year"
          />
        </div>

        {/* College */}
        <div>
          <label className="block text-sm font-medium">College</label>
          <input
            className="w-full p-2 border border-gray-300 rounded"
            value={data.education?.college?.name || ''}
            onChange={updateEducation('college', 'name')}
            placeholder="College name"
          />
          <input
            className="w-full p-2 border border-gray-300 rounded mt-2"
            value={data.education?.college?.degree || ''}
            onChange={updateEducation('college', 'degree')}
            placeholder="Degree/Branch"
          />
          <input
            className="w-full p-2 border border-gray-300 rounded mt-2"
            value={data.education?.college?.marks || ''}
            onChange={updateEducation('college', 'marks')}
            placeholder="Marks/CGPA"
          />
          <input
            className="w-full p-2 border border-gray-300 rounded mt-2"
            value={data.education?.college?.year || ''}
            onChange={updateEducation('college', 'year')}
            placeholder="Passout year"
          />
        </div>
      </div>

      {/* Projects */}
      <h2 className="text-lg font-semibold">Projects</h2>
      <div className="space-y-4">
        {(data.projects || []).map((proj, i) => (
          <div key={i} className="border p-3 rounded">
            <input
              className="w-full p-2 border border-gray-300 rounded mb-2"
              value={proj.title}
              onChange={updateProject(i, 'title')}
              placeholder="Project title"
            />
            <textarea
              className="w-full p-2 border border-gray-300 rounded"
              rows="3"
              value={proj.description}
              onChange={updateProject(i, 'description')}
              placeholder="Project description"
            />
            <button
              type="button"
              onClick={() => removeProject(i)}
              className="mt-2 text-sm text-red-600 hover:underline"
            >
              Remove Project
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addProject}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          + Add Project
        </button>
      </div>

      {/* Skills & Contact */}
      <h2 className="text-lg font-semibold">Other Info</h2>
      <div>
        <label className="block text-sm font-medium">Skills (comma separated)</label>
        <input
          className="w-full p-2 border border-gray-300 rounded"
          value={data.skills || ''}
          onChange={update('skills')}
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Contact</label>
        <input
          className="w-full p-2 border border-gray-300 rounded"
          value={data.contact || ''}
          onChange={update('contact')}
          placeholder="Email or phone"
        />
      </div>
    </div>
  )
}
