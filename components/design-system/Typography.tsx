'use client'

import clsx from 'clsx'

interface ITypography {
  label: string
  prefixIcon?: React.ReactNode
  className?: string
}

export const Title: React.FC<ITypography> = ({
  prefixIcon,
  label,
  className,
}) => {
  return (
    <label
      className={clsx(
        className ?? 'mb-5',
        'inline-flex items-center text-xl font-[600] text-slate-400',
      )}
    >
      {prefixIcon && (
        <div className="mr-3 text-[var(--color-accent-hover)]">
          {prefixIcon}
        </div>
      )}
      {label}
    </label>
  )
}

export const AdminHeader = ({ title }: { title: string }) => {
  return <h1 className="text-2xl font-bold">{title}</h1>
}
