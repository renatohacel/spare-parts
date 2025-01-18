import z from "zod";

const authSchema = z.object({
    username: z.string({
        invalid_type_error: 'El Username debe ser una cadena de texto',
        required_error: 'El Username es obligatorio',
    }).min(5, { message: 'El Username debe tener mínimo 5 caractéres' }),
    password: z.string({
        invalid_type_error: 'El Password debe ser una cadena de texto',
        required_error: 'El Password es obligatorio',
    }).min(5, { message: 'El Password debe tener mínimo 5 caractéres' }),
});

export function validateAuth(input) {
    return authSchema.safeParse(input);
}
