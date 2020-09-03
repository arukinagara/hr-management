import { useEffect } from 'react'
import Router from 'next/router'
import useSWR from 'swr'

const fetcher = (url) => fetch(url).then((r) => r.json())

export function useUser({ redirectTo, redirectIfFound } = {}) {
  const { data, error } = useSWR('/api/user', fetcher)
  const isLoading = !error && !data
  const isError = error
  const hasUser = Boolean(data?.user)

  // useEffectによりコンポーネントのレンダリング後まで実行が遅延される
  useEffect(() => {
    if (!redirectTo || isLoading) return
    if (
      (redirectTo && !redirectIfFound && !hasUser) ||
      (redirectIfFound && hasUser)
    ) {
      Router.push(redirectTo)
    }
  }, [redirectTo, redirectIfFound, isLoading, hasUser])

  return {
    data: data?.user || null,
    isLoading: isLoading,
    isError: isError
  }
}
