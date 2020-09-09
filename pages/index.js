import Link from 'next/link'
import Layout from '../components/layout'
import { useUser, useStaff } from '../lib/hooks'

const Home = () => {
  const user = useUser()
  const staff = useStaff()

  if (!staff) {
    return null
  }

  const tbody = !staff.staff ? null : staff.staff.map(s =>
    <Link href="/staff/[id]" as={`/staff/${s.id}`} key={s.id}>
      <tr className="hover:bg-gray-200">
        <td className="p-2">{s.staffId}</td>
        <td className="p-2">{s.fullName}</td>
        <td className="p-2">{s.furigana}</td>
      </tr>
    </Link>
  )

  return (
    <Layout>
      <Link href="/staff/[id]" as="/staff/new">
        <div className="mb-4 flex justify-end">
          <button type="link" disabled={!user.data}
                  className={user.data ? "btn" : "btn-disabled"}>新規作成</button>
        </div>
      </Link>
      <table className="container table-fixed">
        <thead>
          <tr>
            <th className="text-left p-2 w-1/3">社員ID</th>
            <th className="text-left p-2 w-1/3">氏名</th>
            <th className="text-left p-2 w-1/3">フリガナ</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {tbody}
        </tbody>
      </table>

      <style jsx>{`
      `}</style>
    </Layout>
  )
}

export default Home
