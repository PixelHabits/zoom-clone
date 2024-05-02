import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk';
import React from 'react';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

const EndCallButton = () => {
	const call = useCall();
	const router = useRouter();
	const { useLocalParticipant } = useCallStateHooks();
	const localParticipant = useLocalParticipant();

	const isMeetingOwner =
		localParticipant &&
		call?.state.createdBy &&
		localParticipant.userId === call.state.createdBy.id;

	if (!isMeetingOwner) return null;

	return (
		<Button
			onClick={async () => {
				await call.endCall();
				await call.camera.disable();
				await call.microphone.disable();
				console.log('Trying to Disable Camera');

				router.push('/');
			}}
			className='bg-red-500'
		>
			End Call for All Participants
		</Button>
	);
};

export default EndCallButton;