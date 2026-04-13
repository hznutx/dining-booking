import { publicUrlSvgFile } from '@/utils'
import { Icon } from './Icon'

const NotFound = () => {
  return (
    <div className="flex h-full items-center justify-center space-y-10">
      <Icon src={publicUrlSvgFile('/notfound.svg')} size={400} />
    </div>
  )
}

export default NotFound
