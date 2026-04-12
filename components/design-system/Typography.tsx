'use client'

interface ITypography {
  label: string
  prefixIcon?: React.ReactNode
}

export const Title: React.FC<ITypography> = ({ prefixIcon, label }) => {
  return (
    <label className="mb-5 inline-flex items-center text-xl font-[600] text-slate-400">
      {prefixIcon && (
        <div className="mr-3 text-[var(--color-accent-hover)]">
          {prefixIcon}
        </div>
      )}
      {label}
    </label>
  )
}
