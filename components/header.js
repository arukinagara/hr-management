import Link from 'next/link'
import { useUser } from '../lib/hooks'

const Header = () => {
  const user = useUser()

  return (
    <header className="text-white bg-gray-900">
      <nav className="max-w-2xl mx-auto my-0 px-5 py-2">
        <ul className="flex justify-end list-none ml-0 pl-0">
          <li className="mr-4 first:ml-auto">
            <Link href="/">
              <a>従業員一覧</a>
            </Link>
          </li>
          {user.data ? (
            <li className="mr-0">
              <a href="/api/logout" className="text-white no-underline">ログアウト</a>
            </li>
          ) : (
            <li className="mr-0">
              <Link href="/login">
                <a>ログイン</a>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  )
}

export default Header
