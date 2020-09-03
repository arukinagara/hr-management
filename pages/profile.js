import { useUser } from '../lib/hooks'
import Layout from '../components/layout'

const Profile = () => {
  // セッションからユーザ情報を取得する
  // ユーザ情報が無ければ/loginにリダイレクトする
  const user = useUser({ redirectTo: '/login' })

  return (
    <Layout>
      <h1>Profile</h1>
      {user && <p>Your session: {JSON.stringify(user)}</p>}
    </Layout>
  )
}

export default Profile
