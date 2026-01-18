/**
 * permissions-access-control.ts
 * 
 * This file defines the access control system and role permissions.
 */

import { createAccessControl } from 'better-auth/plugins/access';
import { defaultStatements as orgDefaultStatements } from 'better-auth/plugins/organization/access';
import { defaultStatements as adminDefaultStatements } from 'better-auth/plugins/admin/access';
import { 
  ACTIONS, 
  ROLES,
  ORGANIZATION_ACTIONS,
  MEMBER_ACTIONS,
  INVITATION_ACTIONS,
  USER_ACTIONS,
  SESSION_ACTIONS
} from './permissions-constants';

/**
 * Combined statements from all resources and actions in the system
 */
const statements = {
  // Include default statements from plugins - must use direct properties
  organization: orgDefaultStatements.organization,
  member: orgDefaultStatements.member,
  invitation: orgDefaultStatements.invitation,
  team: orgDefaultStatements.team,
  user: adminDefaultStatements.user,
  session: adminDefaultStatements.session,
  
  // Custom resources and actions
  enthusiast_profile: [
    ACTIONS.VIEW,
    ACTIONS.EDIT,
    ACTIONS.DOWNLOAD,
  ],
  vendor_profile: [
    ACTIONS.VIEW,
    ACTIONS.EDIT,
    ACTIONS.VERIFY,
    ACTIONS.DOWNLOAD,
  ],
  buyer_profile: [
    ACTIONS.VIEW,
    ACTIONS.EDIT,
    ACTIONS.APPROVE,
  ],
  agency_profile: [
    ACTIONS.VIEW,
    ACTIONS.EDIT,
    ACTIONS.APPROVE,
  ],
  post: [
    ACTIONS.CREATE,
    ACTIONS.VIEW,
    ACTIONS.EDIT,
    ACTIONS.DELETE,
    ACTIONS.MODERATE,
  ],
  comment: [
    ACTIONS.CREATE,
    ACTIONS.VIEW,
    ACTIONS.EDIT,
    ACTIONS.DELETE,
    ACTIONS.MODERATE,
  ],
  ad: [
    ACTIONS.CREATE,
    ACTIONS.VIEW,
    ACTIONS.EDIT,
    ACTIONS.DELETE,
    ACTIONS.APPROVE,
  ],
  credit: [
    ACTIONS.GRANT,
    ACTIONS.USE,
    ACTIONS.VIEW,
  ],
} as const;

/**
 * Create the access control system
 */
export const ac = createAccessControl(statements);

/**
 * Define roles for admin organization users
 */
export const adminRoles = {
  // Super admin has full access to everything
  [ROLES.SUPER_ADMIN]: ac.newRole({
    // Organization resources - use action constants matching Better Auth
    organization: [ORGANIZATION_ACTIONS.UPDATE, ORGANIZATION_ACTIONS.DELETE],
    member: [MEMBER_ACTIONS.CREATE, MEMBER_ACTIONS.UPDATE, MEMBER_ACTIONS.DELETE],
    invitation: [INVITATION_ACTIONS.CREATE, INVITATION_ACTIONS.CANCEL],
    // Admin resources
    user: [USER_ACTIONS.CREATE, USER_ACTIONS.LIST, USER_ACTIONS.SET_ROLE, USER_ACTIONS.BAN, USER_ACTIONS.IMPERSONATE, USER_ACTIONS.DELETE],
    session: [SESSION_ACTIONS.LIST, SESSION_ACTIONS.REVOKE, SESSION_ACTIONS.DELETE],
    
    // Custom resources
    enthusiast_profile: [ACTIONS.VIEW, ACTIONS.EDIT, ACTIONS.DOWNLOAD],
    vendor_profile: [ACTIONS.VIEW, ACTIONS.EDIT, ACTIONS.VERIFY, ACTIONS.DOWNLOAD],
    buyer_profile: [ACTIONS.VIEW, ACTIONS.EDIT, ACTIONS.APPROVE],
    agency_profile: [ACTIONS.VIEW, ACTIONS.EDIT, ACTIONS.APPROVE],
    post: [ACTIONS.CREATE, ACTIONS.VIEW, ACTIONS.EDIT, ACTIONS.DELETE, ACTIONS.MODERATE],
    comment: [ACTIONS.CREATE, ACTIONS.VIEW, ACTIONS.EDIT, ACTIONS.DELETE, ACTIONS.MODERATE],
    ad: [ACTIONS.CREATE, ACTIONS.VIEW, ACTIONS.EDIT, ACTIONS.DELETE, ACTIONS.APPROVE],
    credit: [ACTIONS.GRANT, ACTIONS.USE, ACTIONS.VIEW],
  }),

  // Content moderator focuses on content management
  [ROLES.CONTENT_MODERATOR]: ac.newRole({
    enthusiast_profile: [ACTIONS.VIEW],
    post: [ACTIONS.VIEW, ACTIONS.MODERATE, ACTIONS.DELETE],
    comment: [ACTIONS.VIEW, ACTIONS.MODERATE, ACTIONS.DELETE],
  }),

  // Vendor validator focuses on vendor verification
  [ROLES.VENDOR_VALIDATOR]: ac.newRole({
    vendor_profile: [ACTIONS.VIEW, ACTIONS.VERIFY],
    // For organization, only use actions from ORGANIZATION_ACTIONS
    organization: [ORGANIZATION_ACTIONS.UPDATE],
    ad: [ACTIONS.VIEW, ACTIONS.APPROVE],
  }),

  // Credit manager focuses on credit management
  [ROLES.CREDIT_MANAGER]: ac.newRole({
    credit: [ACTIONS.GRANT, ACTIONS.VIEW],
    buyer_profile: [ACTIONS.VIEW],
    agency_profile: [ACTIONS.VIEW],
  }),
};

/**
 * Define roles for vendor organization users
 */
export const vendorRoles = {
  // Vendor admin manages the vendor organization
  [ROLES.VENDOR_ADMIN]: ac.newRole({
    vendor_profile: [ACTIONS.VIEW, ACTIONS.EDIT],
    // For Better Auth resources, use their specific action constants
    member: [MEMBER_ACTIONS.CREATE, MEMBER_ACTIONS.UPDATE],
    invitation: [INVITATION_ACTIONS.CREATE, INVITATION_ACTIONS.CANCEL],
    ad: [ACTIONS.CREATE, ACTIONS.VIEW, ACTIONS.EDIT],
  }),

  // Regular vendor user
  [ROLES.VENDOR_USER]: ac.newRole({
    vendor_profile: [ACTIONS.VIEW],
    ad: [ACTIONS.VIEW],
  }),
};

/**
 * Define roles for buyer organization users
 */
export const buyerRoles = {
  // Buyer admin manages the buyer organization
  [ROLES.BUYER_ADMIN]: ac.newRole({
    buyer_profile: [ACTIONS.VIEW, ACTIONS.EDIT],
    enthusiast_profile: [ACTIONS.VIEW, ACTIONS.DOWNLOAD],
    vendor_profile: [ACTIONS.VIEW, ACTIONS.DOWNLOAD],
    // For Better Auth resources, use their specific action constants
    member: [MEMBER_ACTIONS.CREATE, MEMBER_ACTIONS.UPDATE],
    invitation: [INVITATION_ACTIONS.CREATE, INVITATION_ACTIONS.CANCEL],
    credit: [ACTIONS.USE, ACTIONS.VIEW],
  }),

  // Buyer recruiter focuses on recruitment
  [ROLES.BUYER_RECRUITER]: ac.newRole({
    enthusiast_profile: [ACTIONS.VIEW, ACTIONS.DOWNLOAD],
    vendor_profile: [ACTIONS.VIEW, ACTIONS.DOWNLOAD],
    credit: [ACTIONS.USE, ACTIONS.VIEW],
  }),
};

/**
 * Define roles for agency organization users
 */
export const agencyRoles = {
  // Agency admin manages the agency organization
  [ROLES.AGENCY_ADMIN]: ac.newRole({
    agency_profile: [ACTIONS.VIEW, ACTIONS.EDIT],
    enthusiast_profile: [ACTIONS.VIEW, ACTIONS.DOWNLOAD],
    // For Better Auth resources, use their specific action constants
    member: [MEMBER_ACTIONS.CREATE, MEMBER_ACTIONS.UPDATE],
    invitation: [INVITATION_ACTIONS.CREATE, INVITATION_ACTIONS.CANCEL],
    credit: [ACTIONS.USE, ACTIONS.VIEW],
  }),

  // Agency recruiter focuses on recruitment
  [ROLES.AGENCY_RECRUITER]: ac.newRole({
    enthusiast_profile: [ACTIONS.VIEW, ACTIONS.DOWNLOAD],
    credit: [ACTIONS.USE, ACTIONS.VIEW],
  }),
};

/**
 * Enthusiast permissions (not organization-based)
 */
export const enthusiastPermissions = {
  enthusiast_profile: [ACTIONS.VIEW, ACTIONS.EDIT],
  post: [ACTIONS.CREATE, ACTIONS.VIEW, ACTIONS.EDIT, ACTIONS.DELETE],
  comment: [ACTIONS.CREATE, ACTIONS.VIEW, ACTIONS.EDIT, ACTIONS.DELETE],
};

/**
 * Combine organization roles for export
 */

export const organizationRoles = {
  ...vendorRoles,
  ...buyerRoles,
  ...agencyRoles,
};