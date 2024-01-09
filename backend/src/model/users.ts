export const users = [
    {
        id:1,
        name:'John Doe',
        email: 'johndoe@test.com',
        password: "$2b$10$W./GL4g9fKuIyLYzH6BsQe7LzvX2l.uEcintM5LyhQN4miHPfHlwa",

    },
    {
        id:2,
        name:'Jane Doe',
        email: 'janedoe@test.com',
        password: "$2b$10$sPJYyf75p6V/GPfxBhmNL.vqIlY.o65IYk4CWfpXQWnoW8AIffCEe",
    },
    {
        id:3,
        name: 'John Smith',
        email: 'johnsmith@test.com',
        password: "$2b$10$tW.NR6oPKAIa6BPRX5fs0eM7Py4rxUbVOysRafdxWp4MULE9wvjVW",
    },
    
];
export const getUsers = (params:any) => {
    let data = users.map((user)=>({id:user.id, name:user.name }));
    if (params.name) {
        data = data.filter(({ name }) => name === params.name);
    }
    return data;
};
export const getUserById = (id: number) => {
    const user = users
        .map((user) => ({ id: user.id, name: user.name }))
        .find(({ id: userId }) => userId === id);
    return user;        
};

export const allUsers = () => {
    return users;
}