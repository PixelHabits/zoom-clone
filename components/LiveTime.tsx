'use client';
import React, { useState, useEffect, useCallback } from 'react';

const LiveTime = () => {
	const [date, setDate] = useState(new Date());
	console.log('Initial Load', date);

	const updateClock = useCallback(() => {
		setDate(new Date());
		console.log('Update Clock Load');
	}, []);

	useEffect(() => {
		const initialTime = new Date();
		const msUntilNextMinute =
			(60 - initialTime.getSeconds()) * 1000 - initialTime.getMilliseconds();

		const timeoutId = setTimeout(updateClock, msUntilNextMinute);

		return () => clearTimeout(timeoutId);
	}, [updateClock]);

	useEffect(() => {
		// let intervalId: NodeJS.Timeout | null = null;

		const intervalId = setInterval(updateClock, 60000);

		return () => clearInterval(intervalId);
	}, [updateClock]);

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
