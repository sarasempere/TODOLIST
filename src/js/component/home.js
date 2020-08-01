import React from "react";

//include images into your bundle
import { Todolist } from "./todolistAPI";

//create your first component
export function Home() {
	return (
		<div className="text-center mt-5">
			<Todolist />
		</div>
	);
}
