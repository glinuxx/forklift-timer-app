// Mock API service
const mockUser = {
    email: 'admin@admin.com',
    password: 'admin',
    name: 'Admin User',
    id: 1
};

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const Api = {
    post: async (url, data) => {
        // Simulate network delay
        await delay(500);

        if (url === '/auth/login') {
            const { email, password } = data;

            if (email === mockUser.email && password === mockUser.password) {
                return {
                    data: {
                        user: {
                            id: mockUser.id,
                            name: mockUser.name,
                            email: mockUser.email
                        }
                    }
                };
            }

            // Simulate 401 error for invalid credentials
            const error = new Error('Invalid credentials');
            error.response = { status: 401 };
            throw error;
        }

        if (url === '/auth/register') {
            const { email, password, name } = data;

            if (email === mockUser.email) {
                const error = new Error('Email already registered');
                error.response = { status: 400 };
                throw error;
            }

            return {
                data: {
                    user: {
                        id: Date.now(),
                        name,
                        email
                    }
                }
            };
        }

        throw new Error(`Unknown endpoint: ${url}`);
    },

    get: async (url) => {
        await delay(500);
        throw {
            response: {
                status: 404,
                data: { message: 'Endpoint não encontrado' }
            }
        };
    }
};

export default Api;