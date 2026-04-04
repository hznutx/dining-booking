import Image from 'next/image';

export const Icon = ({ src, size }: { src: string; size: number }) => {
  return (
    <Image
      className='text-current'
      src={src}
      alt='icon'
      width={size}
      height={size}
    />
  );
};
