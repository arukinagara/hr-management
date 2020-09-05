import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link'
import useSWR from 'swr'
import Layout from '../../components/layout'
import { useStaff } from '../../lib/hooks'

const Staff = () => {
  const router = useRouter()
  const s = useStaff(router.query.id)

  const [staff, setStaff] = useState()
  const [submittable, setSubmittable] = useState(false)
  const [deletable, setDeletable] = useState(false)

  useEffect(() => {
    setStaff(Array.isArray(s.staff) ? s.staff[0] : '')
  }, [s.isLoading])

  useEffect(() => {
    setDeletable(!(router.query.id == 'new'))
  }, [router.query.id])

  if (!staff) {
    return null
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmittable(false)
    const method = !staff.id ? 'POST' : 'PUT'
    const res = await fetch(`/api/staff/${router.query.id}`, {method: method, body:JSON.stringify(staff)});
    !staff.id && router.push('/')
  }

  function handleChange(e) {
    e.preventDefault()
    setSubmittable(true)
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setStaff({ ...staff, [name]: value });
  }

  async function handleDelete(e) {
    e.preventDefault()
    if (confirm('削除します')) {
      const res = await fetch(`/api/staff/${router.query.id}`, {method: 'DELETE', body:JSON.stringify(staff)});
      router.push('/')
    }
  }

  return (
    <Layout>
      <div>
        <ul>
          <li>個人</li>
          <Link href="/staff/[id]/relatives" as={`/staff/${staff.id}/relatives`}>
            <li>家族</li>
          </Link>
          <li>資格</li>
          <li>入社前履歴</li>
          <li>入社後職務履歴</li>
        </ul>
      </div>
      <div className="detail">
        <form onSubmit={handleSubmit}>
          <ul>
            <li>
              <label><span>社員ID</span></label>
              <input type="text" name="staffId" value={staff.staffId || ''} onChange={handleChange} required />
            </li>
            <li>
              <label><span>氏名</span></label>
              <input type="text" name="fullName" value={staff.fullName || ''} onChange={handleChange} required />
            </li>
            <li>
              <label><span>フリガナ</span></label>
              <input type="text" name="furigana" value={staff.furigana || ''} onChange={handleChange} />
            </li>
            <li>
              <label><span>旧姓</span></label>
              <input type="text" name="maidenName" value={staff.maidenName || ''} onChange={handleChange} />
            </li>
            <li>
              <label><span>性別</span></label>
              <input type="text" name="sex" value={staff.sex || ''} onChange={handleChange} />
            </li>
            <li>
              <label><span>血液型</span></label>
              <input type="text" name="bloodType" value={staff.bloodType || ''} onChange={handleChange} />
            </li>
            <li>
              <label><span>生年月日</span></label>
              <input type="date" name="birthDate" value={staff.birthDate || ''} onChange={handleChange} />
            </li>
            <li>
              <label><span>入社日</span></label>
              <input type="date" name="joinDate" value={staff.joinDate || ''} onChange={handleChange} />
            </li>
            <li>
              <label><span>採用区分</span></label>
              <input type="text" name="employedCategory" value={staff.employedCategory || ''} onChange={handleChange} />
            </li>
            <li>
              <label><span>勤務地</span></label>
              <input type="text" name="location" value={staff.location || ''} onChange={handleChange} />
            </li>
            <li>
              <label><span>業務名称</span></label>
              <input type="text" name="projectName" value={staff.projectName || ''} onChange={handleChange} />
            </li>
            <li>
              <label><span>勤務開始月</span></label>
              <input type="date" name="startDate" value={staff.startDate || ''} onChange={handleChange} />
            </li>
            <li>
              <label><span>部門</span></label>
              <input type="text" name="department" value={staff.department || ''} onChange={handleChange} />
            </li>
            <li>
              <label><span>役職</span></label>
              <input type="text" name="position" value={staff.position || ''} onChange={handleChange} />
            </li>
            <li>
              <label><span>種別</span></label>
              <input type="text" name="staffCategory" value={staff.staffCategory || ''} onChange={handleChange} />
            </li>
            <li>
              <label><span>派遣システム連携</span></label>
              <input type="checkbox" name="isLinkage" value={staff.isLinkage || false} onChange={handleChange} />
            </li>
            <li>
              <label><span>職能資格</span></label>
              <input type="text" name="staffRank" value={staff.staffRank || ''} onChange={handleChange} />
            </li>
            <li>
              <span>居住地</span>
            </li>
            <li>
              <label><span>郵便番号</span></label>
              <input type="text" name="postalCode" value={staff.postalCode || ''} onChange={handleChange} />
            </li>
            <li>
              <label><span>住所1</span></label>
              <input type="text" name="address1" value={staff.address1 || ''} onChange={handleChange} />
            </li>
            <li>
              <label><span>住所2</span></label>
              <input type="text" name="address2" value={staff.address2 || ''} onChange={handleChange} />
            </li>
            <li>
              <label><span>住所3</span></label>
              <input type="text" name="address3" value={staff.address3 || ''} onChange={handleChange} />
            </li>
            <li>
              <label><span>自宅電話番号</span></label>
              <input type="text" name="phoneNumber" value={staff.phoneNumber || ''} onChange={handleChange} />
            </li>
            <li>
              <label><span>携帯電話番号</span></label>
              <input type="text" name="mobileNumber" value={staff.mobileNumber || ''} onChange={handleChange} />
            </li>
            <li>
              <span>送付先</span>
            </li>
            <li>
              <label><span>送付先指定</span></label>
              <input type="checkbox" name="isMailing" value={staff.isMailing || false} onChange={handleChange} />
            </li>
            <li>
              <label><span>郵便番号</span></label>
              <input type="text" name="mailingPostalCode" value={staff.mailingPostalCode || ''} onChange={handleChange} />
            </li>
            <li>
              <label><span>住所1</span></label>
              <input type="text" name="mailingAddress1" value={staff.mailingAddress1 || ''} onChange={handleChange} />
            </li>
            <li>
              <label><span>住所2</span></label>
              <input type="text" name="mailingAddress2" value={staff.mailingAddress2 || ''} onChange={handleChange} />
            </li>
            <li>
              <label><span>住所3</span></label>
              <input type="text" name="mailingAddress3" value={staff.mailingAddress3 || ''} onChange={handleChange} />
            </li>
            <li>
              <label><span>電話番号</span></label>
              <input type="text" name="mailingPhoneNumber" value={staff.mailingPhoneNumber || ''} onChange={handleChange} />
            </li>
            <li>
              <span>住民票</span>
            </li>
            <li>
              <label><span>郵便番号</span></label>
              <input type="text" name="residencePostalCode" value={staff.residencePostalCode || ''} onChange={handleChange} />
            </li>
            <li>
              <label><span>住所1</span></label>
              <input type="text" name="residenceAddress1" value={staff.residenceAddress1 || ''} onChange={handleChange} />
            </li>
            <li>
              <label><span>住所2</span></label>
              <input type="text" name="residenceAddress2" value={staff.residenceAddress2 || ''} onChange={handleChange} />
            </li>
            <li>
              <label><span>住所3</span></label>
              <input type="text" name="residenceAddress3" value={staff.residenceAddress3 || ''} onChange={handleChange} />
            </li>
            <li>
              <label><span>電話番号</span></label>
              <input type="text" name="residencePhoneNumber" value={staff.residencePhoneNumber || ''} onChange={handleChange} />
            </li>
            <li>
              <label><span>最寄駅1 路線</span></label>
              <input type="text" name="line1" value={staff.line1 || ''} onChange={handleChange} />
            </li>
            <li>
              <label><span>最寄駅1 駅</span></label>
              <input type="text" name="station1" value={staff.station1 || ''} onChange={handleChange} />
            </li>
            <li>
              <label><span>最寄駅2 路線</span></label>
              <input type="text" name="line2" value={staff.line2 || ''} onChange={handleChange} />
            </li>
            <li>
              <label><span>最寄駅2 駅</span></label>
              <input type="text" name="station2" value={staff.station2 || ''} onChange={handleChange} />
            </li>
            <li>
              <label><span>最寄駅3 路線</span></label>
              <input type="text" name="line3" value={staff.line3 || ''} onChange={handleChange} />
            </li>
            <li>
              <label><span>最寄駅3 駅</span></label>
              <input type="text" name="station3" value={staff.station3 || ''} onChange={handleChange} />
            </li>
            <li>
              <span>緊急連絡先</span>
            </li>
            <li>
              <label><span>氏名</span></label>
              <input type="text" name="emergencyFullName" value={staff.emergencyFullName || ''} onChange={handleChange} />
            </li>
            <li>
              <label><span>フリガナ</span></label>
              <input type="text" name="emergencyFurigana" value={staff.emergencyFurigana || ''} onChange={handleChange} />
            </li>
            <li>
              <label><span>続柄</span></label>
              <input type="text" name="emergencyRelation" value={staff.emergencyRelation || ''} onChange={handleChange} />
            </li>
            <li>
              <label><span>同居区分</span></label>
              <input type="checkbox" name="emergencyIsLiveWith" value={staff.emergencyIsLiveWith || ''} onChange={handleChange} />
            </li>
            <li>
              <label><span>郵便番号</span></label>
              <input type="text" name="emergencyPostalCode" value={staff.emergencyPostalCode || ''} onChange={handleChange} />
            </li>
            <li>
              <label><span>住所1</span></label>
              <input type="text" name="emergencyAddress1" value={staff.emergencyAddress1 || ''} onChange={handleChange} />
            </li>
            <li>
              <label><span>住所2</span></label>
              <input type="text" name="emergencyAddress2" value={staff.emergencyAddress2 || ''} onChange={handleChange} />
            </li>
            <li>
              <label><span>住所3</span></label>
              <input type="text" name="emergencyAddress3" value={staff.emergencyAddress3 || ''} onChange={handleChange} />
            </li>
            <li>
              <label><span>電話番号</span></label>
              <input type="text" name="emergencyPhoneNumber" value={staff.emergencyPhoneNumber || ''} onChange={handleChange} />
            </li>
            <li>
              <label><span>寡婦・勤労学生など</span></label>
              <input type="text" name="remarks" value={staff.remarks || ''} onChange={handleChange} />
            </li>
            <li>
              <label><span>障害者区分</span></label>
              <input type="text" name="handicappedCategory" value={staff.handicappedCategory || ''} onChange={handleChange} />
            </li>
            <li>
              <label><span>退職日</span></label>
              <input type="date" name="leaveDate" value={staff.leaveDate || ''} onChange={handleChange} />
            </li>
            <li>
              <label><span>退職理由</span></label>
              <input type="text" name="leaveReason" value={staff.leaveReason || ''} onChange={handleChange} />
            </li>
            <li>
              <label><span>備考</span></label>
              <input type="text" name="notes" value={staff.notes || ''} onChange={handleChange} />
            </li>
            <li>
              <div>
                <button type="submit" disabled={!submittable}>更新</button>
              </div>
            </li>
            <li>
              <div>
                <button type="button" disabled={!deletable} onClick={handleDelete}>削除</button>
              </div>
            </li>
          </ul>
        </form>
      </div>

      <style jsx>{`
      `}</style>
    </Layout>
  )
}

export default Staff
