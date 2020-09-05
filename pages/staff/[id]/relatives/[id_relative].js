import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import Layout from '../../../../components/layout'
import { useStaff, useRelative } from '../../../../lib/hooks'

const Relative = () => {
  const router = useRouter()
  const s = useStaff(router.query.id)
  const r = useRelative({id: router.query.id_relative})
  const [staff, setStaff] = useState()
  const [relative, setRelative] = useState()
  const [disabled, setDisabled] = useState(true)

  useEffect(() => {
    setStaff(Array.isArray(s.staff) ? s.staff[0] : '')
  }, [s.isLoading])

  useEffect(() => {
    setRelative(Array.isArray(r.relatives) ? r.relatives[0] : '')
  }, [r.isLoading])

  if (!relative) {
    return null
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setDisabled(true)
    const method = !relative.id ? 'POST' : 'PUT'
    const res = await fetch(`/api/relatives/${router.query.id_relative}`, {method: method, body:JSON.stringify(relative)});
    !relative.id && router.push(`/staff/${router.query.id}/relatives`)
  }

  function handleChange(e) {
    e.preventDefault()
    setDisabled(false)
    const target = e.target
    const value = target.type === "checkbox" ? target.checked : target.value
    const name = target.name
    setRelative({ ...relative, [name]: value, staffId: staff.staffId })
  }

  return (
    <Layout>
      <div className="detail">
        <form onSubmit={handleSubmit}>
          <ul>
            <li>
              <label><span>扶養事由</span></label>
              <input type="text" name="dependantReason" value={relative.dependantReason || ''} onChange={handleChange} />
            </li>
            <li>
              <label><span>氏名</span></label>
              <input type="text" name="fullName" value={relative.fullName || ''} onChange={handleChange} />
            </li>
            <li>
              <label><span>フリガナ</span></label>
              <input type="text" name="furigana" value={relative.furigana || ''} onChange={handleChange} />
            </li>
            <li>
              <label><span>続柄</span></label>
              <input type="text" name="relation" value={relative.relation || ''} onChange={handleChange} />
            </li>
            <li>
              <label><span>同居区分</span></label>
              <input type="checkbox" name="isLiveWith" value={relative.isLiveWith || ''} onChange={handleChange} />
            </li>
            <li>
              <label><span>郵便番号</span></label>
              <input type="text" name="postalCode" value={relative.postalCode || ''} onChange={handleChange} />
            </li>
            <li>
              <label><span>住所1</span></label>
              <input type="text" name="address1" value={relative.address1 || ''} onChange={handleChange} />
            </li>
            <li>
              <label><span>住所2</span></label>
              <input type="text" name="address2" value={relative.address2 || ''} onChange={handleChange} />
            </li>
            <li>
              <label><span>住所3</span></label>
              <input type="text" name="address3" value={relative.address3 || ''} onChange={handleChange} />
            </li>
            <li>
              <label><span>電話番号</span></label>
              <input type="text" name="phoneNumber" value={relative.phoneNumber || ''} onChange={handleChange} />
            </li>
            <li>
              <div className="submit">
                <button type="submit" disabled={disabled}>更新</button>
              </div>
            </li>
          </ul>
        </form>
      </div>
    </Layout>
  )
}

export default Relative
