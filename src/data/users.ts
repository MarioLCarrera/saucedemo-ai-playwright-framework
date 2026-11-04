export const password = 'secret_sauce';

export type InvalidLoginCase = {
    id: string;
    description: string;
    username: string;
    password: string;
    expectedError: string;
};

export const invalidLoginCases: InvalidLoginCase[] = [
    {
        id: 'L-02',
        description: 'wrong password',
        username: 'standard_user',
        password: 'wrong_password',
        expectedError: 'Epic sadface: Username and password do not match any user in this service',
    },
    {
        id: 'L-03',
        description: 'locked out user',
        username: 'locked_out_user',
        password,
        expectedError: 'Epic sadface: Sorry, this user has been locked out.',
    },
    {
        id: 'L-04',
        description: 'empty username',
        username: '',
        password,
        expectedError: 'Epic sadface: Username is required',
    },
    {
        id: 'L-05',
        description: 'empty password',
        username: 'standard_user',
        password: '',
        expectedError: 'Epic sadface: Password is required',
    },
];
