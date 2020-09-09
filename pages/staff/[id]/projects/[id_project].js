import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link'
import Layout from '../../../../components/layout'
import Navigation from '../../../../components/navigation'
import { useStaff, useProject } from '../../../../lib/hooks'

const Project = () => {
  const router = useRouter()
  const s = useStaff(router.query.id)
  const p = useProject({id: router.query.id_project})
  const [staff, setStaff] = useState()
  const [project, setProject] = useState()
  const [submittable, setSubmittable] = useState(false)
  const [deletable, setDeletable] = useState(false)

  useEffect(() => {
    setStaff(Array.isArray(s.staff) ? s.staff[0] : '')
  }, [s.isLoading])

  useEffect(() => {
    setProject(Array.isArray(p.projects) ? p.projects[0] : '')
  }, [p.isLoading])

  useEffect(() => {
    setDeletable(!(router.query.id_project == 'new'))
  }, [router.query.id_project])

  if (!project) {
    return null
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmittable(false)
    const method = !project.id ? 'POST' : 'PUT'
    const res = await fetch(`/api/projects/${router.query.id_project}`, {method: method, body:JSON.stringify(project)});
    !project.id && router.push(`/staff/${router.query.id}/projects`)
  }

  function handleChange(e) {
    e.preventDefault()
    setSubmittable(true)
    const target = e.target
    const value = target.type === "checkbox" ? target.checked : target.value
    const name = target.name
    setProject({ ...project, [name]: value, staffId: staff.staffId })
  }

  async function handleDelete(e) {
    e.preventDefault()
    if (confirm('削除します')) {
      const res = await fetch(`/api/projects/${router.query.id_project}`, {method: 'DELETE', body:JSON.stringify(project)});
      router.push(`/staff/${router.query.id}/projects`)
    }
  }

  return (
    <Layout>
      <Navigation id={staff.id} page="projects" />

      <div className="flex items-center mb-2">
        <div className="w-1/3">
          <label className="form-inline-label">社員ID</label>
        </div>
        <div className="w-2/3">
          <div className="bg-gray-200 appearance-none border-2 border-gray-200 w-full py-2 px-4 text-gray-700 leading-tight">
            {staff.staffId}
          </div>
        </div>
      </div>

      <div className="flex items-center mb-8">
        <div className="w-1/3">
          <label className="form-inline-label">氏名</label>
        </div>
        <div className="w-2/3">
          <div className="bg-gray-200 appearance-none border-2 border-gray-200 w-full py-2 px-4 text-gray-700 leading-tight">
            {staff.fullName}
          </div>
        </div>
      </div>

      <div className="detail">
        <form onSubmit={handleSubmit}>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="startDate" className="form-inline-label">期間(自)</label>
            </div>
            <div className="w-2/3">
              <input type="date" name="startDate" value={project.startDate || ''} onChange={handleChange} required
                     className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="endDate" className="form-inline-label">期間(至)</label>
            </div>
            <div className="w-2/3">
              <input type="date" name="endDate" value={project.endDate || ''} onChange={handleChange}
                     className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="name" className="form-inline-label">従事件名</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="name" value={project.name || ''} onChange={handleChange}
                     className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="description" className="form-inline-label">業務内容</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="description" value={project.description || ''} onChange={handleChange}
                     className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="notes" className="form-inline-label">特記内容</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="notes" value={project.notes || ''} onChange={handleChange}
                     className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3"></div>
            <div className="w-1/3">
              <button type="submit" disabled={!submittable}
                      className={submittable ? "btn px-8" : "btn-disabled px-8"}>更新</button>
            </div>
            <div className="w-1/3 flex justify-end">
              <button type="submit" disabled={!deletable} onClick={handleDelete}
                      className={deletable ? "btn px-8" : "btn-disabled px-8"}>削除</button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  )
}

export default Project
