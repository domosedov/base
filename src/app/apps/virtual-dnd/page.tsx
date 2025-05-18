'use client'

import dynamic from 'next/dynamic'

const List = dynamic(() => import('./page.client'), { ssr: false })

export default function VirtualDndPage() {
  return (
    <div>
      Virtual DnD
      <List />
    </div>
  )
}
