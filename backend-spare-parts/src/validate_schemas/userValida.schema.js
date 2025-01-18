import z from "zod";

const userSchema = z.object({
    username: z.string({
        invalid_type_error: 'El Username debe ser una cadena de texto',
        required_error: 'El Username es obligatorio',
    }).min(5, { message: 'El Username debe tener mínimo 5 caractéres' }),

    password: z.string({
        invalid_type_error: 'Password must be a string',
        required_error: 'Password is required',
    }).min(5, { message: 'El Password debe tener mínimo 5 caractéres' }),

    num_employee: z.number({
        invalid_type_error: 'El Número de Empleado debe ser un número',
        required_error: 'El Número de Empleado es obligatorio'
    }).refine((num) => num.toString().length <= 7, { message: 'El Número de Empleado debe ser máximo de 7 dígitos' }),

    name: z.string({
        invalid_type_error: 'El nombre debe ser una cadena de texto',
        required_error: 'El nombre es obligatorio',
    }).min(3, { message: 'El nombre debe tener mínimo 3 caractéres' }),
    email: z.string().email({ message: 'El email debe ser válido' }).optional(),

    shift: z.number({
        invalid_type_error: 'El Turno debe ser un número entre 1-3',
        required_error: 'El Turno es obligatorio'
    }).min(1, { message: 'El turno mínimo es 1' }).max(3, { message: 'El turno máximo es 3' }),

    isAdmin: z.boolean({
        invalid_type_error: 'Tipo de usuario Admin debe ser verdadero o falso'
    })
})

export function validateUser(input) {
    return userSchema.safeParse(input);
}

export function validatePartialUser(input) {
    return userSchema.partial().safeParse(input);
}