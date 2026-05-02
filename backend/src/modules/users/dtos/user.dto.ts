export class UserDto {
  id: string;
  name: string | null;
  lastName: string | null;
  email: string;
  avatar: string | null;
  memberships: UserMembershipDto[];
  roles: UserRoleDto[];
  lastLogin: Date | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export class UserRoleDto {
  id?: string;
  name: string;
  slug: string;
  description: string | null;
  scope: string;
  permissions: {
    slug: string;
    description: string | null;
  }[];
}

export class UserMembershipDto {
  id: string;
  status: string;
  organization: {
    id: string;
    name: string;
    slug: string;
  } | null;
  role: UserRoleDto;
}
