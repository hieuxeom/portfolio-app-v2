import React, { ReactNode } from "react";
import clsx from "clsx";

interface ITypography {
	type?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "text" | "small" | "title" | "sub-title" | "tiny";
	className?: string;
	children: ReactNode;
}

export default function Typography({ type = "text", className = "", children }: ITypography) {
	const baseClass = clsx("leading-normal", {
		"my-2": type != "small" && type != "tiny",
	});
	const customClass = {
		title: ["font-bold", "uppercase", "lg:text-8xl lg:my-12", "md:text-6xl", "text-5xl"],
		"sub-title": ["uppercase", "font-bold", "lg:text-3xl", "sm:text-2xl", "text-xl"],
		text: ["font-normal", "md:text-md lg:my-1", "text-lg"],
		small: ["sm:text-sm", "font-normal"],
		tiny: ["text-xs", "font-normal", "m-0"],
		h1: ["font-bold", "leading-normal", "xl:text-6xl", "md:text-5xl", "sm:text-4xl", "text-4xl"],
		h2: ["font-bold", "leading-normal", "xl:text-5xl", "md:text-4xl", "sm:text-3xl", "text-3xl"],
		h3: ["font-bold", "leading-normal", "xl:text-2xl", "md:text-xl", "text-xl"],
		h4: ["font-bold", "leading-normal", "xl:text-xl", "md:text-lg", "sm:text-base", "text-xl"],
		h5: ["font-bold", "leading-normal", "xl:text-lg", "sm:text-base", "text-sm"],
		h6: ["font-bold", "leading-normal", "xl:text-sm", "text-xs"],
	};
	const classStruct = `${baseClass} ${customClass[type].join(" ")} ${className}`;
	switch (type) {
		case "title":
			return <h1 className={classStruct}>{children}</h1>;
		case "sub-title":
			return <p className={classStruct}>{children}</p>;
		case "text":
			return <p className={classStruct}>{children}</p>;
		case "small":
			return <p className={classStruct}>{children}</p>;
		case "tiny":
			return <p className={classStruct}>{children}</p>;
		case "h1":
			return <h1 className={classStruct}>{children}</h1>;
		case "h2":
			return <h2 className={classStruct}>{children}</h2>;
		case "h3":
			return <h3 className={classStruct}>{children}</h3>;
		case "h4":
			return <h4 className={classStruct}>{children}</h4>;
		case "h5":
			return <h5 className={classStruct}>{children}</h5>;
		case "h6":
			return <h6 className={classStruct}>{children}</h6>;
		default:
			throw new Error(`Invalid typography type: ${type}`);
	}
}
