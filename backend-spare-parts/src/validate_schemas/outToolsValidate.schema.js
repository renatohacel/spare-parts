import z from 'zod';

const outToolSchema = z.object({

    responsible: z.string({
        invalid_type_error: 'El Receptor debe ser una cadena de texto',
        required_error: 'El Receptor es obligatorio'
    }).min(3, { message: 'El Receptor debe tener mínimo 3 caracteres' }),


    num_employee_responsible: z.number({
        invalid_type_error: 'El número de empleado debe ser un número',
        required_error: 'El número ded Empleado es obligatorio'
    }).refine((num) => num.toString().length <= 7, { message: 'El Número de Empleado debe ser máximo de 7 dígitos' }),

    receiver: z.string({
        invalid_type_error: 'El Receptor debe ser una cadena de texto',
        required_error: 'El Receptor es obligatorio'
    }).min(3, { message: 'El Receptor debe tener mínimo 3 caracteres' }),

    num_employee_receiver: z.number({
        invalid_type_error: 'El número de empleado debe ser un número',
        required_error: 'El número ded Empleado es obligatorio'
    }).refine((num) => num.toString().length <= 7, { message: 'El Número de Empleado debe ser máximo de 7 dígitos' }),

    tool: z.string({
        invalid_type_error: 'La herramienta debe ser una cadena de texto',
        required_error: 'La herramienta es obligatoria'
    }),

    date_out: z.string({
        invalid_type_error: 'La fecha debe ser una cadena de texto',
        required_error: 'La fecha es obligatoria'
    }),

    time_out: z.string({
        invalid_type_error: 'La fecha debe ser una cadena de texto',
        required_error: 'La fecha es obligatoria'
    }),

    area: z.string({
        invalid_type_error: 'El área debe ser una cadena de texto',
        required_error: 'El área es requerida'
    }),

    qty: z.number({
        invalid_type_error: 'La cantidad debe ser un número',
        required_error: 'La cantidad es obligatoria',
    }),

    is_returned: z.number({
        invalid_type_error: 'El estado debe ser número entre 1 o 0',
        required_error: 'El estado es obligatorio'
    }),

    date_return: z.string({
        invalid_type_error: 'La fecha debe ser una cadena de texto',
    }).nullable(),

    time_return: z.string({
        invalid_type_error: 'La fecha debe ser una cadena de texto',
    }).nullable(),

    comments: z.string({
        invalid_type_error: 'Los comentarios deben ser una cadena de texto',
    }).nullable(),
});

export function validateOutTools(input) {
    return outToolSchema.safeParse(input);
}

export function validatePartialOutTools(input) {
    return outToolSchema.partial().safeParse(input)
}