import { Manager } from './manager';

export type CreateManagerType = Omit<Manager, 'id' | 'createdAt' | 'updatedAt'> & { password: string };

export type UpdateManagerType = Partial<CreateManagerType>;
