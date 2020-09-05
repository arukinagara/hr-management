import Link from 'next/link'
import { useUser, useStaff } from '../lib/hooks'
import Layout from '../components/layout'
import useSWR from 'swr'

// 下のexport defaultで使っている
const Home = () => {
  const user = useUser()
  // indexから認証が必要にするなら以下
  // const user = useUser({ redirectTo: '/login' })

  const staff = useStaff()
  //const { data, error } = useSWR('/api/staff', fetcher)

  if (!staff) {
    return null
  }

  // const tbody = !data?.staff ? null : data?.staff.map(staff =>
  const tbody = !staff.staff ? null : staff.staff.map(s =>
    <Link href="/staff/[id]" as={`/staff/${s.id}`} key={s.id}>
      <tr>
        <td>{s.staffId}</td>
        <td>{s.fullName}</td>
        <td>{s.furigana}</td>
      </tr>
    </Link>
  )

  return (
    <Layout>
      <Link href="/staff/[id]" as="/staff/new">
        <a>新規作成</a>
      </Link>
      <table>
        <thead>
          <tr>
            <th>社員ID</th>
            <th>氏名</th>
            <th>フリガナ</th>
          </tr>
        </thead>
        <tbody>
          {tbody}
        </tbody>
      </table>

      <style jsx>{`
      `}</style>
    </Layout>
  )
}

export default Home
