import * as yup from "yup";

export type FormData = yup.InferType<typeof AuthSchema>;

export const AuthSchema = yup.object({
    email: yup
        .mixed()
        .test('isAdmin', "Email is invalid, use 'admin'",
            (value) => value === 'admin'),
    password: yup
        .mixed()
        .test('isAdmin', "Password is invalid, use '12345'",
            (value) => value === '12345'),
})