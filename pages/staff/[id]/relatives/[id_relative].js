import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link'
import Layout from '../../../../components/layout'
import Navigation from '../../../../components/navigation'
import { useStaff, useRelative } from '../../../../lib/hooks'

const Relative = () => {
  const router = useRouter()
  const s = useStaff(router.query.id)
  const r = useRelative({id: router.query.id_relative})
  const [staff, setStaff] = useState()
  const [relative, setRelative] = useState()
  const [submittable, setSubmittable] = useState(false)
  const [deletable, setDeletable] = useState(false)

  useEffect(() => {
    setStaff(Array.isArray(s.staff) ? s.staff[0] : '')
  }, [s.isLoading])

  useEffect(() => {
    setRelative(Array.isArray(r.relatives) ? r.relatives[0] : '')
  }, [r.isLoading])

  useEffect(() => {
    setDeletable(!(router.query.id_relative == 'new'))
  }, [router.query.id_relative])

  if (!relative) {
    return null
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmittable(false)
    const method = !relative.id ? 'POST' : 'PUT'
    const res = await fetch(`/api/relatives/${router.query.id_relative}`, {method: method, body:JSON.stringify(relative)});
    !relative.id && router.push(`/staff/${router.query.id}/relatives`)
  }

  function handleChange(e) {
    e.preventDefault()
    setSubmittable(true)
    const target = e.target
    const value = target.type === "checkbox" ? target.checked : target.value
    const name = target.name
    setRelative({ ...relative, [name]: value, staffId: staff.staffId })
  }

  async function handleDelete(e) {
    e.preventDefault()
    if (confirm('削除します')) {
      const res = await fetch(`/api/relatives/${router.query.id_relative}`, {method: 'DELETE', body:JSON.stringify(relative)});
      router.push(`/staff/${router.query.id}/relatives`)
    }
  }

  return (
    <Layout>
      <Navigation id={staff.id} page="relatives" />

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
              <label htmlFor="dependantReason" className="form-inline-label">扶養事由</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="dependantReason" value={relative.dependantReason || ''} onChange={handleChange}
                     className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="fullName" className="form-inline-label">氏名</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="fullName" value={relative.fullName || ''} onChange={handleChange} required
                     className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="furigana" className="form-inline-label">フリガナ</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="furigana" value={relative.furigana || ''} onChange={handleChange}
                     className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="relation" className="form-inline-label">続柄</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="relation" value={relative.relation || ''} onChange={handleChange}
                     className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="isLiveWith" className="form-inline-label">同居区分</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="isLiveWith" value={relative.isLiveWith || ''} onChange={handleChange}
                     className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="postalCode" className="form-inline-label">郵便番号</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="postalCode" value={relative.postalCode || ''} onChange={handleChange}
                     className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="address1" className="form-inline-label">住所1</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="address1" value={relative.address1 || ''} onChange={handleChange}
                     className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="address2" className="form-inline-label">住所2</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="address2" value={relative.address2 || ''} onChange={handleChange}
                     className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="address3" className="form-inline-label">住所3</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="address3" value={relative.address3 || ''} onChange={handleChange}
                     className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-4">
            <div className="w-1/3">
              <label htmlFor="phoneNumber" className="form-inline-label">電話番号</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="phoneNumber" value={relative.phoneNumber || ''} onChange={handleChange}
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

export default Relative
