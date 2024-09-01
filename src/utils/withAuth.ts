// import { useRouter } from 'next/navigation';
// import { useEffect } from 'react';
// import jwt from 'jsonwebtoken';

// const withAuth = (WrappedComponent: React.ComponentType<any>, requiredRole: string) => {
//   const AuthHOC = (props: any) => {
//     const router = useRouter();

//     useEffect(() => {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         router.push('/login');
//       } else {
//         const decodedToken: any = jwt.decode(token);
//         if (decodedToken.role !== requiredRole) {
//           router.push('/login');
//         }
//       }
//     }, [router]);

//     return <WrappedComponent {...props} />;
//   };

//   return AuthHOC;
// };

// export default withAuth;
