'use client'
import { PAGE } from '@/config/site'
import { useCurrency } from '@/services/hooks/useCurrency'
import { IDeal } from '@/types/deal'
import { Button, Card } from '@heroui/react'
import { useLocale, useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { BsFillPeopleFill } from 'react-icons/bs'

interface ICard {
  data: IDeal
}

export const DealCard: React.FC<ICard> = ({ data }) => {
  const t = useTranslations()
  const locale = useLocale()
  const router = useRouter()
  const { convert } = useCurrency()

  const handleClick = () =>
    router.push(
      PAGE.RESTAURANT + `/${data?.restaurants?.slug}/deal/${data?.id}`,
    )

  return (
    <Card className="h-fit w-full max-w-sm">
      <div className="relative h-[140px] w-full shrink-0 overflow-hidden rounded-2xl sm:aspect-video sm:h-auto">
        <img
          alt="Cherries"
          className="pointer-events-none absolute inset-0 h-full w-full scale-125 object-cover select-none"
          loading="lazy"
          src={data?.image}
        />
      </div>
      <div className="flex flex-1 flex-col gap-3">
        <Card.Header className="gap-1">
          <Card.Title className="line-clamp-2 pr-8 font-black">
            {data?.name}
          </Card.Title>
          <Card.Description className="line-clamp-2">
            {data?.description}
          </Card.Description>
          <Card.Content className="flex flex-col items-end">
            <h2 className="text-2xl font-medium">
              <span className="text-amber-500">
                {t('currency')}
                {convert(Number(data?.price ?? 0), locale)}
              </span>
            </h2>
            <p className="text-muted text-xs">{t('deal.net_price')}</p>
          </Card.Content>
        </Card.Header>
        <Card.Footer className="mt-auto flex w-full flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col">
            <p className="text-foreground inline-flex items-center text-sm font-medium">
              {data?.max_seat > 1 ? `1 - ${data?.max_seat} ` : `1 `}
              <BsFillPeopleFill className="ml-2" />
            </p>
            {data?.expired_at && (
              <span className="text-muted text-xs">
                {t('deal.expired_at') +
                  new Date(data?.expired_at).toLocaleDateString()}
              </span>
            )}
          </div>
          <Button
            className="w-full sm:w-auto"
            variant="primary"
            onClick={handleClick}
          >
            {t('deal.booking')}
          </Button>
        </Card.Footer>
      </div>
    </Card>
  )
}
