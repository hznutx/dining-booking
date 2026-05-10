import { IRestaurant } from '@/types/deal'

const BrandHeader = ({ detail }: { detail?: IRestaurant }) => {
  return (
    <div id="header" className="items-center space-x-6 md:inline-flex">
      <div className="relative aspect-square h-30">
        <img
          alt="brand_logo"
          className="pointer-events-none block aspect-square w-full rounded-full border border-gray-200 object-cover select-none"
          loading="lazy"
          src={detail?.brand_logo}
        />
      </div>
      <div className="w-full items-center justify-between xl:inline-flex">
        <h1 className="mr-6 text-xl font-extrabold xl:text-3xl">
          {detail?.name}
        </h1>
      </div>
    </div>
  )
}

export default BrandHeader
