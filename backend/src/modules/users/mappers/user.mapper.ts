import { UserDto } from '../dtos/user.dto';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';

interface UserMapperOptions {
  withRoleId?: boolean;
}

export class UserMapper {
  static toDTO(user: User, options: UserMapperOptions = {}): UserDto {
    const activeMemberships =
      user.memberships?.filter(
        (membership) => membership.status === 'active' && membership.role,
      ) ?? [];
    const rolesById = new Map<string, UserDto['roles'][number]>();

    const memberships = activeMemberships.map((membership) => {
      const role = membership.role;
      const roleDto = {
        ...(options.withRoleId ? { id: role.id } : {}),
        name: role.name,
        slug: role.slug,
        description: role.description,
        scope: role.scope,
        permissions: role.permissions
          ? role.permissions.map((permission) => ({
              slug: permission.slug,
              description: permission.description,
            }))
          : [],
      };

      rolesById.set(role.id, roleDto);

      return {
        id: membership.id,
        status: membership.status,
        organization: membership.organization
          ? {
              id: membership.organization.id,
              name: membership.organization.name,
              slug: membership.organization.slug,
            }
          : null,
        role: roleDto,
      };
    });

    return {
      id: user.id,
      name: user.name,
      lastName: user.lastname,
      email: user.email,
      memberships,
      roles: Array.from(rolesById.values()),
      avatar: user.avatarUrl,
      isActive: user.status === 'active',
      lastLogin: user.lastLoginAt,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      deletedAt: user.deletedAt,
    };
  }

  static toCreateEntity(userDto: CreateUserDto): Partial<User> {
    const user = new User();
    user.name = userDto.name;
    user.lastname = userDto.lastName;
    user.email = userDto.email;
    return user;
  }

  static toUpdateEntity(userDto: UpdateUserDto): Partial<User> {
    const user = new User();
    user.name = userDto.name;
    user.lastname = userDto.lastName;
    user.email = userDto.email;
    user.avatarUrl = userDto.avatar;
    if (userDto.isActive !== undefined) {
      user.status = userDto.isActive ? 'active' : 'disabled';
    }
    return user;
  }
}
