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

export function useStaff(id = '') {
  const { data, error } = useSWR(`/api/staff/${id}`, fetcher)
  const isLoading = !error && !data
  const isError = error
  const hasStaff = Boolean(data?.staff)

  return {
    staff: data?.staff || null,
    isLoading: isLoading,
    isError: isError
  }
}

export function useRelative({id = '', staffId = ''} = {}) {
  const param = staffId ? `?staffId=${staffId}` : ''
  const { data, error } = useSWR(`/api/relatives/${id}${param}`, fetcher)
  const isLoading = !error && !data
  const isError = error
  const hasRelatives = Boolean(data?.Relatives)

  return {
    relatives: data?.relatives || null,
    isLoading: isLoading,
    isError: isError
  }
}
