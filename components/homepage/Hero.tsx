import Image from 'next/image'

const heroData = {
  title: 'Discover and reserve the best dining experiences in your city',
  subtitle: 'Summer hot deals 30% with `Promo99`',
  cta: {
    label: 'Start booking',
    href: '#',
  },
  categories: [
    { label: 'All Restaurants', href: '#' },
    { label: 'Fine Dining', href: '#' },
    { label: 'Casual', href: '#' },
    { label: 'Cafés', href: '#' },
    { label: 'Buffet', href: '#' },
    { label: 'Family', href: '#' },
  ],
  images: {
    desktop:
      'https://i.ibb.co/sJ2Wdy8D/sandwich-with-poached-egg-fried-ham-cream-cheese-garnished-with-basil-leaves.jpg',
    mobile: 'https://i.ibb.co/FC3zZNf/view-delicious-steak-dish.jpg',
  },
}

export const Hero = () => {
  return (
    <section className="relative">
      <div className="absolute inset-0 hidden h-[calc(100vh-72px)] bg-black lg:block">
        <Image
          loading="eager"
          fill
          className="w-full object-cover object-bottom-right opacity-80"
          src={heroData.images.desktop}
          alt=""
        />
      </div>
      <div className="relative z-50 pt-12 sm:pt-16 lg:py-36 xl:py-48">
        <div className="absolute inset-x-0 top-0 hidden lg:block">
          <div className="py-5">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex items-center space-x-8">
                {heroData.categories.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="rounded text-sm font-medium text-white transition-all duration-200 hover:text-amber-400"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-xl text-center lg:mx-0 lg:text-left">
            <p className="text-base text-gray-50">{heroData.subtitle}</p>

            <h1 className="my-32 text-[clamp(2rem,3rem,6rem)] leading-tight font-bold text-white sm:mt-8 lg:mb-0 xl:mt-3">
              {heroData.title}
            </h1>

            <div className="mt-8 sm:mt-12">
              <a
                href={heroData.cta.href}
                className="inline-flex items-center justify-center rounded-2xl border border-transparent bg-gray-900 px-8 py-3 text-base leading-7 font-bold text-white transition-all duration-200 hover:bg-gray-600 focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 focus:ring-offset-[#FFE942] focus:outline-none"
              >
                {heroData.cta.label}
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[calc(100vh-72px)] lg:hidden">
        <div className="absolute inset-0 z-[40] h-full bg-black/40" />
        <Image
          loading="eager"
          fill
          className="w-full object-cover object-bottom"
          src={heroData.images.mobile}
          alt=""
        />
      </div>
    </section>
  )
}
