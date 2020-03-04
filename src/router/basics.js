import BasicsIndex from "@/views/basics/index";
import BasicsInstance from "@/views/basics/Instance";
import Syntax from "@/views/basics/Syntax";
import computed from "@/views/basics/computed";
import Style from "@/views/basics/style";

let basicsRoutes = [
	{
		path: "/basics",
		name: "BasicsIndex",
		component: BasicsIndex,
		children: [
			{
				path: "instance",
				component: BasicsInstance
			},
			{
				path: "syntax",
				name: "BasicsSyntax",
				component: Syntax
			},
			{
				path: "computed",
				name: "computed",
				component: computed
			},
			{
				path: "style",
				name: "style",
				component: Style
			}
		]
	}
];
export default basicsRoutes;
