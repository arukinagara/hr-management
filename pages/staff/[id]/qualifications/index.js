import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link'
import Layout from '../../../../components/layout'
import Navigation from '../../../../components/navigation'
import { useStaff, useQualification } from '../../../../lib/hooks'

const Qualifications = () => {
  const router = useRouter()
  const s = useStaff(router.query.id)
  const [staff, setStaff] = useState()
  useEffect(() => {
    setStaff(Array.isArray(s.staff) ? s.staff[0] : '')
  }, [s.isLoading])
  const qualifications = useQualification(staff && {staffId: staff.staffId} || '')

  if (!staff) {
    return null
  }

  const tbody = !qualifications.qualifications ? null : qualifications.qualifications.map(qualification =>
    <Link href="/staff/[id]/qualifications/[id_qualification]"
          as={`/staff/${staff.id}/qualifications/${qualification.id}`} key={qualification.id}>
      <tr className="hover:bg-gray-200">
        <td className="p-2">{qualification.name}</td>
        <td className="p-2">{qualification.getDate}</td>
        <td className="p-2">{qualification.number}</td>
        <td className="p-2">{qualification.expirationDate}</td>
      </tr>
    </Link>
  )

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

      <Link href="/staff/[id]/qualifications/[id_qualification]" as={`/staff/${staff.id}/qualifications/new`}>
        <div className="mb-4 flex justify-end">
          <button type="link" className="btn">新規作成</button>
        </div>
      </Link>

      <table className="container table-fixed">
        <thead>
          <tr>
            <th className="text-left p-2 w-1/4">資格名</th>
            <th className="text-left p-2 w-1/4">取得年月日</th>
            <th className="text-left p-2 w-1/4">登録番号</th>
            <th className="text-left p-2 w-1/4">有効期限</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {tbody}
        </tbody>
      </table>
    </Layout>
  )
}

export default Qualifications
