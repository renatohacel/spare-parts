import z from 'zod';

const toolsSchema = z.object({
    name: z.string({
        invalid_type_error: 'El Nombre debe ser una cadena de texto',
        required_error: 'El Nombre es obligatorio'
    }).min(3, { message: 'El nombre de la herramienta debe tener mínimo 3 caracteres' })
});

export function validateTools(input) {
    return toolsSchema.safeParse(input);
}

export function validatePartialTools(input) {
    return toolsSchema.partial().safeParse(input);
}