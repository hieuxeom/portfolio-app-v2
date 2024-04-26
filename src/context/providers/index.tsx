"use client";

import React from "react";
import { AuthProvider } from "./authProvider";
import { NextUIProvider } from "@nextui-org/react";
import { ToastContainer, toast } from "react-toastify";

const ProviderContainer = ({ children }: { children: React.ReactNode }) => {
	return (
		<React.StrictMode>
			<NextUIProvider>
				<ToastContainer />
				<AuthProvider>{children}</AuthProvider>
			</NextUIProvider>
		</React.StrictMode>
	);
};

export default ProviderContainer;
