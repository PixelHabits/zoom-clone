import React, { ReactNode } from "react";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "PixelHabit's Zoom-Clone",
	description: 'Thanks for checking out my project',
};

const HomeLayout = ({ children }: { children: ReactNode }) => {
	return (
		<main className="relative">
			<Navbar />
			<div className="flex">
				<Sidebar />

				<section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-28 max-md:pd-14 sm:px-14">
					<div className="w-full">{children}</div>
				</section>
			</div>
			Footer
		</main>
	);
};

export default HomeLayout;
