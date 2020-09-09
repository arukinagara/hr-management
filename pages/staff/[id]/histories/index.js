import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link'
import Layout from '../../../../components/layout'
import Navigation from '../../../../components/navigation'
import { useStaff, useHistory } from '../../../../lib/hooks'

const Histories = () => {
  const router = useRouter()
  const s = useStaff(router.query.id)
  const [staff, setStaff] = useState()
  useEffect(() => {
    setStaff(Array.isArray(s.staff) ? s.staff[0] : '')
  }, [s.isLoading])
  const histories = useHistory(staff && {staffId: staff.staffId} || '')

  if (!staff) {
    return null
  }

  const tbody = !histories.histories ? null : histories.histories.map(history =>
    <Link href="/staff/[id]/histories/[id_history]"
          as={`/staff/${staff.id}/histories/${history.id}`} key={history.id}>
      <tr className="hover:bg-gray-200">
        <td className="p-2">{history.startDate}</td>
        <td className="p-2">{history.endDate}</td>
        <td className="p-2">{history.description}</td>
      </tr>
    </Link>
  )

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

      <Link href="/staff/[id]/histories/[id_history]" as={`/staff/${staff.id}/histories/new`}>
        <div className="mb-4 flex justify-end">
          <button type="link" className="btn">新規作成</button>
        </div>
      </Link>

      <table className="container table-fixed">
        <thead>
          <tr>
            <th className="text-left p-2 w-1/4">期間(自)</th>
            <th className="text-left p-2 w-1/4">期間(至)</th>
            <th className="text-left p-2 w-1/2">内容</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {tbody}
        </tbody>
      </table>
    </Layout>
  )
}

export default Histories
