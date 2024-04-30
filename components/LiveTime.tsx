'use client';
import React, { useState, useEffect, useCallback } from 'react';

const LiveTime = () => {
	const [date, setDate] = useState(new Date());
	useEffect(() => {
		const updateClock = () => setDate(new Date());

		const msUntilNextMinute = 60000 - (Date.now() % 60000);

		let intervalId: NodeJS.Timeout | null = null;

		const timeoutId = setTimeout(() => {
			updateClock();
			intervalId = setInterval(updateClock, 60000);
		}, msUntilNextMinute);

		return () => {
			if (intervalId) clearInterval(intervalId);
			clearTimeout(timeoutId);
		};
	}, []);

	return (
		<div className='flex flex-col gap-2'>
			<h1 className='text-4xl font-extrabold lg:text-7xl'>
				{date.toLocaleTimeString('en-us', {
					hour: '2-digit',
					minute: '2-digit',
				})}
			</h1>
			<p className='text-lg font-medium text-sky-1 lg:text-2xl'>
				{date.toLocaleDateString('en-us', {
					weekday: 'long',
					year: 'numeric',
					month: 'long',
					day: 'numeric',
				})}
			</p>
		</div>
	);
};

export default LiveTime;
