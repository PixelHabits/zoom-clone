import LiveTime from '@/components/LiveTime';
import MeetingTypeList from '@/components/MeetingTypeList';

const Home = () => {
	return (
		<section className='flex size-full flex-col gap-10 text-white'>
			<div className='h-[300px] w-full rounded-[20px] bg-hero bg-cover'>
				<div className='flex h-full flex-col justify-between mac-md:px-5 max-md:py-8 lg:p-11'>
					<h2 className='glassmorphism max-w-[270px] rounded py-2 text-center text-base font-normal'>
						Upcoming Meeting at 12:30 PM
					</h2>
					<LiveTime />
				</div>
			</div>

			<MeetingTypeList />
		</section>
	);
};

export default Home;
