import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link'
import Layout from '../../../../components/layout'
import Navigation from '../../../../components/navigation'
import { useStaff, useHistory } from '../../../../lib/hooks'

const History = () => {
  const router = useRouter()
  const s = useStaff(router.query.id)
  const h = useHistory({id: router.query.id_history})
  const [staff, setStaff] = useState()
  const [history, setHistory] = useState()
  const [submittable, setSubmittable] = useState(false)
  const [deletable, setDeletable] = useState(false)

  useEffect(() => {
    setStaff(Array.isArray(s.staff) ? s.staff[0] : '')
  }, [s.isLoading])

  useEffect(() => {
    setHistory(Array.isArray(h.histories) ? h.histories[0] : '')
  }, [h.isLoading])

  useEffect(() => {
    setDeletable(!(router.query.id_history == 'new'))
  }, [router.query.id_history])

  if (!history) {
    return null
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmittable(false)
    const method = !history.id ? 'POST' : 'PUT'
    const res = await fetch(`/api/histories/${router.query.id_history}`, {method: method, body:JSON.stringify(history)});
    !history.id && router.push(`/staff/${router.query.id}/histories`)
  }

  function handleChange(e) {
    e.preventDefault()
    setSubmittable(true)
    const target = e.target
    const value = target.type === "checkbox" ? target.checked : target.value
    const name = target.name
    setHistory({ ...history, [name]: value, staffId: staff.staffId })
  }

  async function handleDelete(e) {
    e.preventDefault()
    if (confirm('削除します')) {
      const res = await fetch(`/api/histories/${router.query.id_history}`, {method: 'DELETE', body:JSON.stringify(history)});
      router.push(`/staff/${router.query.id}/histories`)
    }
  }

  return (
    <Layout>
      <Navigation id={staff.id} page="histories" />

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
              <input type="date" name="startDate" value={history.startDate || ''} onChange={handleChange} required
                     className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="endDate" className="form-inline-label">期間(至)</label>
            </div>
            <div className="w-2/3">
              <input type="date" name="endDate" value={history.endDate || ''} onChange={handleChange}
                     className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="description" className="form-inline-label">内容</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="description" value={history.description || ''} onChange={handleChange}
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

export default History
