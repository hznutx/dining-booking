export const LoadingSpin = () => {
  return (
    <section>
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-[var(--color-accent-hover)]" />
          <p>กำลังเปลี่ยนเส้นทาง...</p>
        </div>
      </div>
    </section>
  )
}
