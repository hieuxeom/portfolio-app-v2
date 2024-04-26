import { cookies } from "next/headers";

export default function Home() {
	return (
		<div>
			<h1 className="text-default">Text</h1>
			<h1 className="text-sub-default">Label</h1>
			<h1 className="text-disabled">Default</h1>
		</div>
	);
}
