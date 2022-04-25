/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
// access control return a yes/no value depending on user session

import { permissionsList } from './schemas/fields';
import { ListAccessArgs } from './types';

export function isSignedIn({ session }: ListAccessArgs) {
  return !!session;
}

const generatedPermissions = Object.fromEntries(
  permissionsList.map((permission) => [
    permission,
    function ({ session }: ListAccessArgs) {
      return !!session?.data.role?.[permission];
    },
  ])
);

// Permission to check if someone meets a criteria - yes or no
export const permissions = { ...generatedPermissions };

// Rule based functions
//  Rules can return a boolean (yes/no) or a filter which
// limits which products they can access and CRUD
export const rules = {
  canManageProducts({ session }) {
    if (!isSignedIn({ session })) return false;
    // do they have the permission of canManageProducts
    if (permissions.canManageProducts({ session })) {
      return true;
    }
    // if not , do they own this item
    return { user: { id: session.itemId } };
  },
  canOrder({ session }) {
    if (!isSignedIn({ session })) return false;
    // do they have the permission of canManageProducts
    if (permissions.canManageCart({ session })) {
      return true;
    }
    // if not , do they own this item
    return { user: { id: session.itemId } };
  },
  canManageOrderItems({ session }) {
    if (!isSignedIn({ session })) return false;

    // do they have the permission of canManageProducts
    if (permissions.canManageCart({ session })) {
      return true;
    }
    // if not , do they own this item
    return { order: { user: { id: session.itemId } } };
  },
  canReadProducts({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) return false;

    if (permissions.canManageProducts({ session })) {
      return true; // they can read everything!
    }
    // otherwise should only see available products
    return { status: 'AVAILABLE' };
  },
  canManageUsers({ session }) {
    if (!isSignedIn({ session })) return false;
    // do they have the permission of canManageProducts
    if (permissions.canManageUsers({ session })) {
      return true;
    }
    // otherwise they can only update themselves
    return { id: session.itemId };
  },
};
