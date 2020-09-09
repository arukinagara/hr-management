import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link'
import Layout from '../../../../components/layout'
import Navigation from '../../../../components/navigation'
import { useStaff, useQualification } from '../../../../lib/hooks'

const Qualification = () => {
  const router = useRouter()
  const s = useStaff(router.query.id)
  const q = useQualification({id: router.query.id_qualification})
  const [staff, setStaff] = useState()
  const [qualification, setQualification] = useState()
  const [submittable, setSubmittable] = useState(false)
  const [deletable, setDeletable] = useState(false)

  useEffect(() => {
    setStaff(Array.isArray(s.staff) ? s.staff[0] : '')
  }, [s.isLoading])

  useEffect(() => {
    setQualification(Array.isArray(q.qualifications) ? q.qualifications[0] : '')
  }, [q.isLoading])

  useEffect(() => {
    setDeletable(!(router.query.id_qualification == 'new'))
  }, [router.query.id_qualification])

  if (!qualification) {
    return null
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmittable(false)
    const method = !qualification.id ? 'POST' : 'PUT'
    const res = await fetch(`/api/qualifications/${router.query.id_qualificatione}`, {method: method, body:JSON.stringify(qualification)});
    !qualification.id && router.push(`/staff/${router.query.id}/qualifications`)
  }

  function handleChange(e) {
    e.preventDefault()
    setSubmittable(true)
    const target = e.target
    const value = target.type === "checkbox" ? target.checked : target.value
    const name = target.name
    setQualification({ ...qualification, [name]: value, staffId: staff.staffId })
  }

  async function handleDelete(e) {
    e.preventDefault()
    if (confirm('削除します')) {
      const res = await fetch(`/api/qualifications/${router.query.id_qualification}`, {method: 'DELETE', body:JSON.stringify(qualification)});
      router.push(`/staff/${router.query.id}/qualifications`)
    }
  }

  return (
    <Layout>
      <Navigation id={staff.id} page="qualifications" />

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
              <label htmlFor="name" className="form-inline-label">資格名</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="name" value={qualification.name || ''} onChange={handleChange} required
                     className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="getDate" className="form-inline-label">取得年月日</label>
            </div>
            <div className="w-2/3">
              <input type="date" name="getDate" value={qualification.getDate || ''} onChange={handleChange}
                     className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="number" className="form-inline-label">登録番号</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="number" value={qualification.number || ''} onChange={handleChange}
                     className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="expirationDate" className="form-inline-label">有効期限</label>
            </div>
            <div className="w-2/3">
              <input type="date" name="expirationDate" value={qualification.expirationDate || ''} onChange={handleChange}
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

export default Qualification
