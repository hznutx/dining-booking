export interface IDeal {
  id: number
  name: string
  price: number
  discountPercent: number | null
  discountPrice: number | null
  image: string
  recommend: boolean
  description: string | null
  expired_at: string
  res_id: number
  type: number
  updated_at: string
  max_seat: number
  restaurants: IRestaurant
  categories: ICategory
}

export interface IRestaurant {
  id: number
  name: string
  open: string
  close: string
  type: number
  isActive: boolean
  location: Location | null
  brand_logo: string
  updated_at: string
  description: string | null
  slug: string
  deals: IDeal[]
}

export interface ILocation {
  id: number
  lat: number
  lng: number
  address: string
}

export interface ICategory {
  id: number
  name: string
  type: string
}
