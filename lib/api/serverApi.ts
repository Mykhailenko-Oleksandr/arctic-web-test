import { cookies } from "next/headers";
import { nextServer } from "./api";

// export async function sample(id: string) {
//   const cookieStore = await cookies();
//   const res = await nextServer.get<{ a: string }>(`/sample/${id}`, {
//     headers: {
//       Cookie: cookieStore.toString(),
//     },
//   });
//   return res.data;
// }
