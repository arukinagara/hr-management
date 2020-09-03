import Link from 'next/link'
import { useUser } from '../lib/hooks'
import Layout from '../components/layout'
import useSWR from 'swr'

const fetcher = (url) => fetch(url).then((res) => res.json())

// 下のexport defaultで使っている
const Home = () => {
  const user = useUser()
  // indexから認証が必要にするなら以下
  // const user = useUser({ redirectTo: '/login' })

  const { data, error } = useSWR('/api/staff', fetcher)

  if (!data) {
    return null
  }

  const tbody = !data?.staff ? null : data?.staff.map(staff =>
    <Link href="/staff/[id]" as={`/staff/${staff.id}`} key={staff.id}>
      <tr>
        <td>{staff.staffId}</td>
        <td>{staff.fullName}</td>
        <td>{staff.furigana}</td>
      </tr>
    </Link>
  )

  return (
    <Layout>
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
        table {
          width: 100%;
          margin: 0 auto;
          padding: 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
      `}</style>
    </Layout>
  )
}

export default Home
