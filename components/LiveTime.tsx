'use client';
import React, { useState, useEffect } from 'react';

const LiveTime = () => {
	const [time, setTime] = useState('');
	const [date, setDate] = useState('');

	useEffect(() => {
		const updateClock = () => {
			const now = new Date();
			setTime(
				now.toLocaleTimeString('en-us', {
					hour: '2-digit',
					minute: '2-digit',
				})
			);
			setDate(
				new Intl.DateTimeFormat('en-us', {
					dateStyle: 'full',
				}).format(now)
			);
		};

		updateClock();
		const timer = setInterval(updateClock, 1000);

		return () => clearInterval(timer);
	}, []);

	return (
		<div className='flex flex-col gap-2'>
			<h1 className='text-4xl font-extrabold lg:text-7xl'>{time}</h1>
			<p className='text-lg font-medium text-sky-1 lg:text-2xl'>{date}</p>
		</div>
	);
};

export default LiveTime;
