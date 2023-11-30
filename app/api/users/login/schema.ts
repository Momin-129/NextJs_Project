import {z} from 'zod';

const schema = z.object({
    email:z.string().min(1),
    password:z.string().min(1)
});

export default schema;