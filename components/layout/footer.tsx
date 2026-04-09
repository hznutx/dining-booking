import { FaTwitter, FaFacebookF, FaInstagram, FaTiktok } from 'react-icons/fa'

const credit = ''
export const socialLinks = [
  {
    name: 'Twitter',
    href: '#',
    icon: FaTwitter,
  },
  {
    name: 'Facebook',
    href: '#',
    icon: FaFacebookF,
  },
  {
    name: 'Instagram',
    href: '#',
    icon: FaInstagram,
  },
  {
    name: 'TikTok',
    href: '#',
    icon: FaTiktok,
  },
]

const paragraph =
  'Enjoy exclusive deals real-time availability and seamless booking - all in one place.'

export const Footer = () => {
  return (
    <section className="relative">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-x-12 gap-y-16 md:col-span-3 lg:grid-cols-6">
          <div className="col-span-2 md:col-span-3 lg:col-span-2 lg:pr-8">
            <p className="mt-7 text-base leading-relaxed">{paragraph}</p>

            <ul className="mt-9 flex items-center space-x-3">
              {socialLinks.map(({ name, href, icon: Icon }) => (
                <li key={name}>
                  <a
                    href={href}
                    aria-label={name}
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-800 text-white transition-all duration-200 hover:bg-gray-600 focus:bg-gray-600"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">
              Company
            </p>

            <ul className="mt-6 space-y-4">
              <li>
                <a
                  href="#"
                  title=""
                  className="flex text-base transition-all duration-200"
                >
                  {' '}
                  About{' '}
                </a>
              </li>

              <li>
                <a
                  href="#"
                  title=""
                  className="flex text-base transition-all duration-200"
                >
                  {' '}
                  Features{' '}
                </a>
              </li>

              <li>
                <a
                  href="#"
                  title=""
                  className="flex text-base transition-all duration-200"
                >
                  {' '}
                  Works{' '}
                </a>
              </li>

              <li>
                <a
                  href="#"
                  title=""
                  className="flex text-base transition-all duration-200"
                >
                  {' '}
                  Career{' '}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">
              Help
            </p>

            <ul className="mt-6 space-y-4">
              <li>
                <a
                  href="#"
                  title=""
                  className="flex text-base transition-all duration-200"
                >
                  {' '}
                  Customer Support{' '}
                </a>
              </li>

              <li>
                <a
                  href="#"
                  title=""
                  className="flex text-base transition-all duration-200"
                >
                  {' '}
                  Delivery Details{' '}
                </a>
              </li>

              <li>
                <a
                  href="#"
                  title=""
                  className="flex text-base transition-all duration-200"
                >
                  {' '}
                  Terms & Conditions{' '}
                </a>
              </li>

              <li>
                <a
                  href="#"
                  title=""
                  className="flex text-base transition-all duration-200"
                >
                  {' '}
                  Privacy Policy{' '}
                </a>
              </li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1 lg:col-span-2 lg:pl-8">
            {''}
          </div>
        </div>

        <hr className="mt-16 mb-10 border-gray-200" />

        <p className="text-center text-sm">
          © Copyright {new Date().getFullYear()} {credit} All Rights Reserved.
        </p>
      </div>
    </section>
  )
}
