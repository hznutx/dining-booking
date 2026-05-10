import { Surface } from '@heroui/react'

interface ISurfaceProps {
  title: string
  variant?: 'default' | 'secondary' | 'tertiary' | 'transparent' | undefined
  value: number
}

export const InfoBox: React.FC<ISurfaceProps> = ({ variant, title, value }) => {
  return (
    <Surface className="rounded-3xl p-6" variant={variant}>
      <p className="text-muted text-sm">{title} </p>
      <h3 className="text-foreground mt-2 text-right text-5xl font-medium">
        {value}
      </h3>
    </Surface>
  )
}
