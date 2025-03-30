// Mock API service
const mockUsers = [
    {
        id: 1,
        email: 'teste@teste.com',
        password: '123456',
        name: 'Usuário Teste'
    }
];

const api = {
    post: async (url, data) => {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));

        if (url === '/auth/login') {
            const user = mockUsers.find(u =>
                u.email === data.email && u.password === data.password
            );

            if (user) {
                const { password, ...userWithoutPassword } = user;
                return { data: { user: userWithoutPassword } };
            }

            throw { response: { status: 401 } };
        }

        if (url === '/auth/register') {
            if (mockUsers.some(u => u.email === data.email)) {
                throw { response: { status: 400, data: { message: 'Email já cadastrado' } } };
            }

            const newUser = {
                id: mockUsers.length + 1,
                ...data
            };
            mockUsers.push(newUser);

            const { password, ...userWithoutPassword } = newUser;
            return { data: { user: userWithoutPassword } };
        }

        throw new Error('URL não encontrada');
    }
};

export default api;
