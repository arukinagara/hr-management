import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link'
import Layout from '../../components/layout'
import Navigation from '../../components/navigation'
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
      <Navigation id={staff.id} page="staff" />

      <div className="detail">
        <form onSubmit={handleSubmit}>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="staffId" className="form-inline-label">社員ID</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="staffId" value={staff.staffId || ''} onChange={handleChange} required
                     className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="fullName" className="form-inline-label">氏名</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="fullName" value={staff.fullName || ''} onChange={handleChange} required
                     className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="furigana" className="form-inline-label">フリガナ</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="furigana" value={staff.furigana || ''} onChange={handleChange}
                     className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="maidenName" className="form-inline-label">旧姓</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="maidenName" value={staff.maidenName || ''} onChange={handleChange}
                     className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="sex" className="form-inline-label">性別</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="sex" value={staff.sex || ''} onChange={handleChange}
                     className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="bloodType" className="form-inline-label">血液型</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="bloodType" value={staff.bloodType || ''} onChange={handleChange}
                     className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="birthDate" className="form-inline-label">生年月日</label>
            </div>
            <div className="w-2/3">
              <input type="date" name="birthDate" value={staff.birthDate || ''} onChange={handleChange}
                     className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="joinDate" className="form-inline-label">入社日</label>
            </div>
            <div className="w-2/3">
              <input type="date" name="joinDate" value={staff.joinDate || ''} onChange={handleChange}
                     className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="employedCategory" className="form-inline-label">採用区分</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="employedCategory" value={staff.employedCategory || ''} onChange={handleChange}
                     className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="location" className="form-inline-label">勤務地</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="location" value={staff.location || ''} onChange={handleChange}
                     className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="projectName" className="form-inline-label">業務名称</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="projectName" value={staff.projectName || ''} onChange={handleChange}
                     className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="startDate" className="form-inline-label">勤務開始月</label>
            </div>
            <div className="w-2/3">
              <input type="date" name="startDate" value={staff.startDate || ''} onChange={handleChange}
                     className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="department" className="form-inline-label">部門</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="department" value={staff.department || ''} onChange={handleChange}
                     className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="position" className="form-inline-label">役職</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="position" value={staff.position || ''} onChange={handleChange}
                     className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="staffCategory" className="form-inline-label">種別</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="staffCategory" value={staff.staffCategory || ''} onChange={handleChange}
                     className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="isLinkage" className="form-inline-label">派遣システム連携</label>
            </div>
            <div className="w-2/3">
              <input type="checkbox" name="isLinkage" value={staff.isLinkage || ''} onChange={handleChange}
                     className="mr-2 leading-tight"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="staffRank" className="form-inline-label">職能資格</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="staffRank" value={staff.staffRank || ''} onChange={handleChange}
                     className="form-inline-input"/>
            </div>
          </div>

          <div className="devide">
            居住地
            <div className="flex items-center mb-2">
              <div className="w-1/3">
                <label htmlFor="postalCode" className="form-inline-label">郵便番号</label>
              </div>
              <div className="w-2/3">
                <input type="text" name="postalCode" value={staff.postalCode || ''} onChange={handleChange}
                       className="form-inline-input"/>
              </div>
            </div>

            <div className="flex items-center mb-2">
              <div className="w-1/3">
                <label htmlFor="address1" className="form-inline-label">住所1</label>
              </div>
              <div className="w-2/3">
                <input type="text" name="address1" value={staff.address1 || ''} onChange={handleChange}
                       className="form-inline-input"/>
              </div>
            </div>

            <div className="flex items-center mb-2">
              <div className="w-1/3">
                <label htmlFor="address2" className="form-inline-label">住所2</label>
              </div>
              <div className="w-2/3">
                <input type="text" name="address2" value={staff.address2 || ''} onChange={handleChange}
                       className="form-inline-input"/>
              </div>
            </div>

            <div className="flex items-center mb-2">
              <div className="w-1/3">
                <label htmlFor="address3" className="form-inline-label">住所3</label>
              </div>
              <div className="w-2/3">
                <input type="text" name="address3" value={staff.address3 || ''} onChange={handleChange}
                       className="form-inline-input"/>
              </div>
            </div>

            <div className="flex items-center mb-2">
              <div className="w-1/3">
                <label htmlFor="phoneNumber" className="form-inline-label">自宅電話番号</label>
              </div>
              <div className="w-2/3">
                <input type="text" name="phoneNumber" value={staff.phoneNumber || ''} onChange={handleChange}
                       className="form-inline-input"/>
              </div>
            </div>

            <div className="flex items-center mb-2">
              <div className="w-1/3">
                <label htmlFor="mobileNumber" className="form-inline-label">携帯電話番号</label>
              </div>
              <div className="w-2/3">
                <input type="text" name="mobileNumber" value={staff.mobileNumber || ''} onChange={handleChange}
                       className="form-inline-input"/>
              </div>
            </div>
          </div>

          <div className="devide">
            送付先
            <div className="flex items-center mb-2">
              <div className="w-1/3">
                <label htmlFor="isMailing" className="form-inline-label">送付先指定</label>
              </div>
              <div className="w-2/3">
                <input type="checkbox" name="isMailing" value={staff.isMailing || ''} onChange={handleChange}
                       className="mr-2 leading-tight"/></div>
            </div>

            <div className="flex items-center mb-2">
              <div className="w-1/3">
                <label htmlFor="mailingPostalCode" className="form-inline-label">郵便番号</label>
              </div>
              <div className="w-2/3">
                <input type="text" name="mailingPostalCode" value={staff.mailingPostalCode || ''} onChange={handleChange}
                       className="form-inline-input"/>
              </div>
            </div>

            <div className="flex items-center mb-2">
              <div className="w-1/3">
                <label htmlFor="mailingAddress1" className="form-inline-label">住所1</label>
              </div>
              <div className="w-2/3">
                <input type="text" name="mailingAddress1" value={staff.mailingAddress1 || ''} onChange={handleChange}
                       className="form-inline-input"/>
              </div>
            </div>

            <div className="flex items-center mb-2">
              <div className="w-1/3">
                <label htmlFor="mailingAddress2" className="form-inline-label">住所2</label>
              </div>
              <div className="w-2/3">
                <input type="text" name="mailingAddress2" value={staff.mailingAddress2 || ''} onChange={handleChange}
                       className="form-inline-input"/>
              </div>
            </div>

            <div className="flex items-center mb-2">
              <div className="w-1/3">
                <label htmlFor="mailingAddress3" className="form-inline-label">住所3</label>
              </div>
              <div className="w-2/3">
                <input type="text" name="mailingAddress3" value={staff.mailingAddress3 || ''} onChange={handleChange}
                       className="form-inline-input"/>
              </div>
            </div>

            <div className="flex items-center mb-2">
              <div className="w-1/3">
                <label htmlFor="mailingPhoneNumber" className="form-inline-label">電話番号</label>
              </div>
              <div className="w-2/3">
                <input type="text" name="mailingPhoneNumber" value={staff.mailingPhoneNumber || ''} onChange={handleChange}
                       className="form-inline-input"/>
              </div>
            </div>
          </div>

          <div className="devide">
            住民票
            <div className="flex items-center mb-2">
              <div className="w-1/3">
                <label htmlFor="residencePostalCode" className="form-inline-label">郵便番号</label>
              </div>
              <div className="w-2/3">
                <input type="text" name="residencePostalCode" value={staff.residencePostalCode || ''} onChange={handleChange}
                       className="form-inline-input"/>
              </div>
            </div>

            <div className="flex items-center mb-2">
              <div className="w-1/3">
                <label htmlFor="residenceAddress1" className="form-inline-label">住所1</label>
              </div>
              <div className="w-2/3">
                <input type="text" name="residenceAddress1" value={staff.residenceAddress1 || ''} onChange={handleChange}
                       className="form-inline-input"/>
              </div>
            </div>

            <div className="flex items-center mb-2">
              <div className="w-1/3">
                <label htmlFor="residenceAddress2" className="form-inline-label">住所2</label>
              </div>
              <div className="w-2/3">
                <input type="text" name="residenceAddress2" value={staff.residenceAddress2 || ''} onChange={handleChange}
                       className="form-inline-input"/>
              </div>
            </div>

            <div className="flex items-center mb-2">
              <div className="w-1/3">
                <label htmlFor="residenceAddress3" className="form-inline-label">住所3</label>
              </div>
              <div className="w-2/3">
                <input type="text" name="residenceAddress3" value={staff.residenceAddress3 || ''} onChange={handleChange}
                       className="form-inline-input"/>
              </div>
            </div>

            <div className="flex items-center mb-2">
              <div className="w-1/3">
                <label htmlFor="residencePhoneNumber" className="form-inline-label">電話番号</label>
              </div>
              <div className="w-2/3">
                <input type="text" name="residencePhoneNumber" value={staff.residencePhoneNumber || ''} onChange={handleChange}
                       className="form-inline-input"/>
              </div>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="line1" className="form-inline-label">最寄駅1 路線</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="line1" value={staff.line1 || ''} onChange={handleChange}
                     className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="station1" className="form-inline-label">最寄駅1 駅</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="station1" value={staff.station1 || ''} onChange={handleChange}
                     className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="line2" className="form-inline-label">最寄駅2 路線</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="line2" value={staff.line2 || ''} onChange={handleChange}
                     className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="station2" className="form-inline-label">最寄駅2 駅</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="station2" value={staff.station2 || ''} onChange={handleChange}
                     className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="line3" className="form-inline-label">最寄駅3 路線</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="line3" value={staff.line3 || ''} onChange={handleChange}
                     className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="station3" className="form-inline-label">最寄駅3 駅</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="station3" value={staff.station3 || ''} onChange={handleChange}
                     className="form-inline-input"/>
            </div>
          </div>

          <div className="devide">
            緊急連絡先
            <div className="flex items-center mb-2">
              <div className="w-1/3">
                <label htmlFor="emergencyFullName" className="form-inline-label">氏名</label>
              </div>
              <div className="w-2/3">
                <input type="text" name="emergencyFullName" value={staff.emergencyFullName || ''} onChange={handleChange}
                       className="form-inline-input"/>
              </div>
            </div>

            <div className="flex items-center mb-2">
              <div className="w-1/3">
                <label htmlFor="emergencyFurigana" className="form-inline-label">フリガナ</label>
              </div>
              <div className="w-2/3">
                <input type="text" name="emergencyFurigana" value={staff.emergencyFurigana || ''} onChange={handleChange}
                       className="form-inline-input"/>
              </div>
            </div>

            <div className="flex items-center mb-2">
              <div className="w-1/3">
                <label htmlFor="emergencyRelation" className="form-inline-label">続柄</label>
              </div>
              <div className="w-2/3">
                <input type="text" name="emergencyRelation" value={staff.emergencyRelation || ''} onChange={handleChange}
                       className="form-inline-input"/>
              </div>
            </div>

            <div className="flex items-center mb-2">
              <div className="w-1/3">
                <label htmlFor="emergencyIsLiveWith" className="form-inline-label">同居区分</label>
              </div>
              <div className="w-2/3">
                <input type="checkbox" name="emergencyIsLiveWith" value={staff.emergencyIsLiveWith || ''} onChange={handleChange}
                       className="mr-2 leading-tight"/>
              </div>
            </div>

            <div className="flex items-center mb-2">
              <div className="w-1/3">
                <label htmlFor="emergencyPostalCode" className="form-inline-label">郵便番号</label>
              </div>
              <div className="w-2/3">
                <input type="text" name="emergencyPostalCode" value={staff.emergencyPostalCode || ''} onChange={handleChange}
                       className="form-inline-input"/>
              </div>
            </div>

            <div className="flex items-center mb-2">
              <div className="w-1/3">
                <label htmlFor="emergencyAddress1" className="form-inline-label">住所1</label>
              </div>
              <div className="w-2/3">
                <input type="text" name="emergencyAddress1" value={staff.emergencyAddress1 || ''} onChange={handleChange}
                       className="form-inline-input"/>
              </div>
            </div>

            <div className="flex items-center mb-2">
              <div className="w-1/3">
                <label htmlFor="emergencyAddress2" className="form-inline-label">住所2</label>
              </div>
              <div className="w-2/3">
                <input type="text" name="emergencyAddress2" value={staff.emergencyAddress2 || ''} onChange={handleChange}
                       className="form-inline-input"/>
              </div>
            </div>

            <div className="flex items-center mb-2">
              <div className="w-1/3">
                <label htmlFor="emergencyAddress3" className="form-inline-label">住所3</label>
              </div>
              <div className="w-2/3">
                <input type="text" name="emergencyAddress3" value={staff.emergencyAddress3 || ''} onChange={handleChange}
                       className="form-inline-input"/>
              </div>
            </div>

            <div className="flex items-center mb-2">
              <div className="w-1/3">
                <label htmlFor="emergencyPhoneNumber" className="form-inline-label">電話番号</label>
              </div>
              <div className="w-2/3">
                <input type="text" name="emergencyPhoneNumber" value={staff.emergencyPhoneNumber || ''} onChange={handleChange}
                       className="form-inline-input"/>
              </div>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="remarks" className="form-inline-label">寡婦・勤労学生など</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="remarks" value={staff.remarks || ''} onChange={handleChange}
                     className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="handicappedCategory" className="form-inline-label">障害者区分</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="handicappedCategory" value={staff.handicappedCategory || ''} onChange={handleChange}
                     className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="leaveDate" className="form-inline-label">退職日</label>
            </div>
            <div className="w-2/3">
              <input type="date" name="leaveDate" value={staff.leaveDate || ''} onChange={handleChange}
                     className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="leaveReason" className="form-inline-label">退職理由</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="leaveReason" value={staff.leaveReason || ''} onChange={handleChange}
                     className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-4">
            <div className="w-1/3">
              <label htmlFor="notes" className="form-inline-label">備考</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="notes" value={staff.notes || ''} onChange={handleChange}
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

      <style jsx>{`
      `}</style>
    </Layout>
  )
}

export default Staff
