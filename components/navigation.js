import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useStaff } from '../lib/hooks'

const Navigation = ({ id, page }) => {
  const active = "text-center block border border-white hover:border-gray-200 \
                  text-white bg-gray-700 py-2 px-4"
  const inactive = "text-center block border border-white hover:border-gray-200 \
                    text-gray-700 hover:bg-gray-700 hover:text-white py-2 px-4"

  return (
    <div className="mb-4">
      <ul className="flex">
        <li className="flex-1 mr-2">
          <Link href="/staff/[id]" as={`/staff/${id}`}>
            <a className={page == 'staff' ? active : inactive}>個人</a>
          </Link>
        </li>
        <li className="flex-1 mr-2">
          <Link href="/staff/[id]/relatives" as={`/staff/${id}/relatives`}>
            <a className={page == 'relatives' ? active : inactive}>家族</a>
          </Link>
        </li>
        <li className="flex-1 mr-2">
          <Link href="/staff/[id]/qualifications" as={`/staff/${id}/qualifications`}>
            <a className={page == 'qualifications' ? active : inactive}>資格</a>
          </Link>
        </li>
        <li className="flex-1 mr-2">
          <Link href="/staff/[id]/histories" as={`/staff/${id}/histories`}>
            <a className={page == 'histories' ? active : inactive}>入社前履歴</a>
          </Link>
        </li>
        <li className="flex-1 mr-2">
          <Link href="/staff/[id]/projects" as={`/staff/${id}/projects`}>
            <a className={page == 'projects' ? active : inactive}>職務履歴</a>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Navigation
