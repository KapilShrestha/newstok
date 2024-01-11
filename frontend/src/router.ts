// // import path from 'path';
// import UniversalRouter from 'universal-router';

// const routes = [
//     {
//         path: '', // root path
//         action: () => 'Home Page',
//     },
//     {
//         path: '/auth/admin',
//         action: () => 'Admin Page',
//         children: [
//             {
//                 path: '/admin-posts',
//                 action: () => 'Posts Page',
//             },
//             {
//                 path: '/admin-categories',
//                 action: () => 'Categories Page',
//             },
//             {
//                 path: '/admin-comments',
//                 action: () => 'Comments Page',
//             },
//         ]
//     },
//     {
//         path: '/posts/:id',
//         action: (context) => `Post #${context.params.id}`,
//     },
// ];

// export const router = new UniversalRouter(routes);

// router.resolve({ pathname: '/posts/100' }).then(result => {
//     console.log(result); // outputs: 'Post #100'
// });