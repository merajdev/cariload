// import { getDataFromToken } from "@/helpers/getData";
// import { NextRequest, NextResponse } from "next/server";
// import User from "@/models/user.model";
// import dbConnect from "@/lib/mongodb";

// dbConnect


// export async function GET(request: NextRequest) {
//     try {
//         const userID = await getDataFromToken(request);
//         const user = await User.findById(userID).select("-password");

//         if (!user) {
//             return NextResponse.json({ message: "User not found" }, { status: 404 });
//         }

//         return NextResponse.json(
//             {
//                 message: "User found",
//                 data: user
//             },
//             {
//                 status: 200
//             }
//         );

//     } catch (err: any) {
//         return NextResponse.json({ error: err.message },
//             { status: 500 });
//     }
// }