import Layout from "@/views/order/layout";
import Hook from "@/views/jiqiao/hook";

export default [
  {
    name: "技巧",
    path: "/jiqiao",
    component: Layout,
    redirect: { name: "Hook" },
    children: [
      {
        path: "/jiqiao/index",
        name: "Hook",
        component: Hook,
      },
    ],
  },
];
