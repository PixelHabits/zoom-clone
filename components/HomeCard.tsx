import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react'
interface HomeCardProps {
    className: string,
    img: string,
    title: string,
    description: string,
    handleClick: () => void;

}
const HomeCard = ({ className, img, title, description, handleClick}: HomeCardProps) => {
  return (
		<div
			// Removed xl:max-w-[600px] because it made it not will container
			className={cn(' px-4 py-6 flex flex-col justify-between w-full min-h-[260px] rounded-[14px] cursor-pointer', className)}
			onClick={handleClick}
		>
			<div className='flex-center glassmorphism size-12 rounded-[10px]'>
				<Image
					src={img}
					alt='meeting'
					width={27}
					height={27}
				/>
			</div>

			<div className='flex flex-col gap-2'>
				<h1 className='text-2xl font-bold'>{title}</h1>
				<p className='text-lg font-normal'>{description}</p>
			</div>
		</div>
	);
}

export default HomeCard