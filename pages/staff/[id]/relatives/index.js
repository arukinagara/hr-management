import { useState, useEffect } from 'react';
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useUser } from '../../../../lib/hooks'
import Layout from '../../../../components/layout'
import useSWR from 'swr'
import { useStaff, useRelative } from '../../../../lib/hooks'

const fetcher = (url) => fetch(url).then((res) => res.json())

const Relatives = () => {
  const router = useRouter()
  const s = useStaff(router.query.id)
  const [staff, setStaff] = useState()
  useEffect(() => {
    setStaff(Array.isArray(s.staff) ? s.staff[0] : '')
  }, [s.isLoading])
  const relatives = useRelative(staff && {staffId: staff.staffId} || '')

  if (!staff || !relatives) {
    return null
  }

  const tbody = !relatives.relatives ? null : relatives.relatives.map(relative =>
    <Link href="/staff/[id]/relatives/[id_relative]" as={`/staff/${staff.id}/relatives/${relative.id}`} key={relative.id}>
      <tr>
        <td>{relative.dependantReason}</td>
        <td>{relative.fullName}</td>
        <td>{relative.furigana}</td>
        <td>{relative.relation}</td>
        <td>{String(relative.isLiveWith)}</td>
        <td>{relative.postalCode}</td>
        <td>{relative.address1}</td>
        <td>{relative.address2}</td>
        <td>{relative.address3}</td>
        <td>{relative.phoneNumber}</td>
        </tr>
    </Link>
  )

  return (
    <Layout>
      <div>
        <ul>
          <li>個人</li>
          <li>家族</li>
          <li>資格</li>
          <li>入社前履歴</li>
          <li>入社後職務履歴</li>
        </ul>
      </div>
      <ul>
        <li>
          {staff.staffId}
        </li>
        <li>
          {staff.fullName}
        </li>
      </ul>
      <Link href="/staff/[id]/relatives/[id_relative]" as={`/staff/${staff.id}/relatives/new`}>
        <a>新規作成</a>
      </Link>
      <table>
        <thead>
          <tr>
            <th>扶養事由</th>
            <th>氏名</th>
            <th>フリガナ</th>
            <th>続柄</th>
            <th>同居区分</th>
            <th>郵便番号</th>
            <th>住所1</th>
            <th>住所2</th>
            <th>住所3</th>
            <th>電話番号</th>
          </tr>
        </thead>
        <tbody>
          {tbody}
        </tbody>
      </table>
    </Layout>
  )
}

export default Relatives
