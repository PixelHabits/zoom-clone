'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import HomeCard from './HomeCard';
import MeetingModal from './MeetingModal';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useUser } from '@clerk/nextjs';
import { useToast } from '@/components/ui/use-toast';

import { Description } from '@radix-ui/react-dialog';

const MeetingTypeList = () => {
	const router = useRouter();
	const [meetingState, setMeetingState] = useState<
		'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined
	>();
	const { user } = useUser();
	const client = useStreamVideoClient();
	const [values, setValues] = useState({
		dateTime: new Date(),
		description: '',
		link: '',
	});

	const [callDetails, setCallDetails] = useState<Call>();
	const { toast } = useToast();
	const createMeeting = async () => {
		if (!client || !user) return;

		try {
			if (!values.dateTime) {
				toast({
					title: 'Please select a data and time',
					className: 'bg-blue-1',
				});
				return;
			}

			const id = crypto.randomUUID();
			const call = client.call('default', id);

			if (!call) throw new Error('Failed to create call');

			const startsAt =
				values.dateTime.toISOString() || new Date(Date.now()).toISOString();
			const description = values.description || 'Instant meeting';

			await call.getOrCreate({
				data: {
					starts_at: startsAt,
					custom: {
						description,
					},
				},
			});
			setCallDetails(call);

			if (!values.description) {
				router.push(`/meeting/${call.id}`);
			}

			toast({
				title: 'Meeting Created',
				className: 'bg-green-800',
			});
		} catch (error) {
			console.log(error);
			toast({
				title: 'Failed to create meeting',
				className: 'bg-red-800',
			});
		}
	};

	return (
		<section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
			<HomeCard
				img='/icons/add-meeting.svg'
				title='New Meeting'
				description='Start an instant meeting'
				handleClick={() => setMeetingState('isInstantMeeting')}
				className='bg-orange-1'
			/>
			<HomeCard
				img='/icons/schedule.svg'
				title='Schedule Meeting'
				description='Plan your meeting'
				handleClick={() => setMeetingState('isScheduleMeeting')}
				className='bg-blue-1'
			/>
			<HomeCard
				img='/icons/recordings.svg'
				title='View Recordings'
				description='Check out your recordings'
				handleClick={() => router.push('/recordings')}
				className='bg-purple-1'
			/>
			<HomeCard
				img='/icons/join-meeting.svg'
				title='Join Meeting'
				description='via invitation link'
				handleClick={() => setMeetingState('isJoiningMeeting')}
				className='bg-yellow-1'
			/>

			{!callDetails ? (
			<MeetingModal
				isOpen={meetingState === 'isScheduleMeeting'}
				onClose={() => setMeetingState(undefined)}
				title='Create Meeting'
				handleClick={createMeeting}
			>
				

			</MeetingModal>
			) : (
			<MeetingModal
				isOpen={meetingState === 'isScheduleMeeting'}
				onClose={() => setMeetingState(undefined)}
				title='Meeting Created'
				className='text-center'
				handleClick={() => {
					// navigator.clipboard.writeText
					// (meetingLink);
					// toast({title: 'Link Copied'})
				}}
				image='/icons/checked.svg'
				buttonIcon='/icons/copy.svg'
				buttonText='Copy Meeting Link'
			/>
			)}
			<MeetingModal
				isOpen={meetingState === 'isInstantMeeting'}
				onClose={() => setMeetingState(undefined)}
				title='Start and Instant Meeting'
				className='text-center'
				buttonText='Start Meeting'
				handleClick={createMeeting}
			/>
		</section>
	);
};

export default MeetingTypeList;
