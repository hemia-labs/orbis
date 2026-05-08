export {};

declare global {
  namespace Express {
    interface User {
      id?: string;
      userId?: string;
      email: string;
      name: string;
      lastName?: string | null;
      avatarUrl?: string | null;
      membership?: {
        organization: {
          id: string;
          name: string;
          slug: string;
        };
        roles: string[];
        permissions: string[];
      } | null;
      roles: string[];
      permissions: string[];
      lastLogin?: Date | string;
    }
  }
}

export type MulterFile = Express.Multer.File;
