import z from "zod";

const personalSchema = z.object({
    name: z.string({
        invalid_type_error: 'El Nombre debe ser una cadena de texto',
        required_error: 'El Nombre es obligatorio',
    }).min(3, { message: 'El Nombre debe tener mínimo 3 caracteres' }),

    role: z.string({
        invalid_type_error: 'El Puesto debe ser una cadena de texto',
    }).nullable(),

    num_employee: z.number({
        invalid_type_error: 'El Número de Empleado debe ser un número',
    }).refine((num) => num.toString().length <= 7, { message: 'El Número de Empleado debe ser máximo de 7 dígitos' }).nullable(),

    shift: z.number({
        invalid_type_error: 'El Turno debe ser un número entre 1-3',
        required_error: 'El Turno es obligatorio'
    }).min(1, { message: 'El turno mínimo es 1' }).max(3, { message: 'El turno máximo es 3' }).nullable(),

    area: z.string({
        invalid_type_error: 'El Puesto debe ser una cadena de texto',
    }).nullable(),

    manager: z.string({
        invalid_type_error: 'El Manager debe ser una cadena de texto',
    }).nullable(),
})

export function validatePersonal(input) {
    return personalSchema.safeParse(input);
}

export function validatePartialPersonal(input) {
    return personalSchema.partial().safeParse(input);
}