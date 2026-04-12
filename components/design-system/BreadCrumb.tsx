import { Breadcrumbs } from '@heroui/react'
import { MdDinnerDining } from 'react-icons/md'

export const BreadcrumbsPath = ({ url }: { url: string }) => {
  const pathSplit = String(url).split('/')
  return (
    <div className="inline-flex items-center">
      <MdDinnerDining />
      <Breadcrumbs>
        {pathSplit?.map((path, i) => (
          <Breadcrumbs.Item
            href={url.replace(`${pathSplit[pathSplit.length - 1]}`, '')}
            key={i}
          >
            {String(path).toUpperCase()}
          </Breadcrumbs.Item>
        ))}
      </Breadcrumbs>
    </div>
  )
}
