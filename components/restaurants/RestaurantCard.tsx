'use client'
import { PAGE } from '@/config/site'
import { useCurrency } from '@/services/hooks/useCurrency'
import { IDeal, IRestaurant } from '@/types/deal'
import { Avatar, Button, Card } from '@heroui/react'
import { useLocale, useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { BsFillPeopleFill } from 'react-icons/bs'

interface ICard {
  data: IRestaurant
}

export const RestaurantCard: React.FC<ICard> = ({ data }) => {
  const t = useTranslations()
  const router = useRouter()

  const handleClick = () => router.push(PAGE.RESTAURANT + `/${data?.slug}`)

  return (
    <Card className="h-60 w-full max-w-sm">
      <Card.Header>
        <div className="flex w-full flex-col items-center justify-between gap-6 sm:flex-row sm:items-start">
          <Avatar className="size-20 border border-gray-200">
            <Avatar.Image alt={data?.slug} src={data?.brand_logo} />
            <Avatar.Fallback>
              {data?.name.charAt(0).toUpperCase()}
            </Avatar.Fallback>
          </Avatar>{' '}
          <Card.Title className="font-extrabold">{data?.name}</Card.Title>
        </div>
      </Card.Header>
      <Card.Content>
        <p className="line-clamp-2 h-12 text-sm leading-6">
          {data?.description}
        </p>
      </Card.Content>
      <Card.Footer className="flex justify-end">
        <Button
          className="w-full sm:w-auto"
          variant="ghost"
          onClick={handleClick}
        >
          All Packages
        </Button>
      </Card.Footer>
    </Card>
  )
}
