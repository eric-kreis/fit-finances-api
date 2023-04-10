import { Manager } from '@prisma/client';

export type CreateManagerType = Omit<Manager, 'id' | 'createdAt' | 'updatedAt'> & { password: string };

export type UpdateManagerType = Partial<CreateManagerType>;
