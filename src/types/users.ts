export interface UserPermissions {
  roles?: { manage?: boolean };
  users?: { manage?: boolean };
  reports?: { manage?: boolean };
  agencies?: { manage?: boolean };
  settings?: { manage?: boolean };
  incidents?: { read?: boolean; create?: boolean; update?: boolean };
  dashboards?: { manage?: boolean };
  communications?: { read?: boolean; create?: boolean; update?: boolean };
  "roles-templates"?: { manage?: boolean };
  "patrol-routes"?: { manage?: boolean };
  "city-map"?: { manage?: boolean };
  analytics?: { manage?: boolean,view?: boolean };
  notifications?: { manage?: boolean };
  system?: { full_access?: boolean };
}

export interface Role {
    id: number;
    role_name: string;
    display_name: string;
    level: "system" | "tenant" | "agency";
    agency_id?: number;
    parent_role_id?: number;
    permissions: {
      reports?: {
        view: boolean;
      };
      incidents?: {
        read: boolean;
        create: boolean;
        update: boolean;
        delete?: boolean;
      };
      system?: {
        full_access?: boolean;
      };
      [key: string]: any;
    };
    description: string;
    metadata: {
      created_at: string;
      updated_at: string;
    };
  }
  
  export interface CreateUserData {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    phone: string;
    role: string;
    agency_id?: number;
    tenant_id?: number;
  }
  
  export interface UpdateUserData {
    id: number;
    userData: Partial<{
      first_name: string;
      last_name: string;
      phone: string;
      role: string;
      is_active: boolean;
      agency_id?: number;
    }>;
  }
  
  export interface UsersResponse {
    success: boolean;
    data: {
      users: User[];
      pagination: {
        total: number;
        page: number;
        limit: number;
        pages: number;
      };
    };
  }
  
  export interface UserData {
    id?: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    role_id?: string;
    agency_id?: number | null;
    is_active: boolean;
    password?: string;
    tenant_id?: number | null;
    roles?: Array<{
      id: number;
      role_name: string;
      display_name: string;
    }>;
    primary_role?: {
      id: number;
      name: string;
      display_name: string;
    };
    agency?: {
      id: number;
      agency_name: string;
    } | null;
  }
  
  export interface User {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    phone: string;
    tenant_id: number | null;
    agency_id: number | null;
    created_by: number | null;
    updated_by: number | null;
    is_active: boolean;
    last_login: string | null;
    created_at: string;
    updated_at: string;
    tenant: any | null;
    agency: any | null;
    roles: Array<{
      id: number;
      role_name: string;
      display_name: string;
      description: string;
      level: string;
      tenant_id: number | null;
      agency_id: number | null;
      parent_role_id: number | null;
      permissions: any;
      is_custom: boolean;
      is_template: boolean;
      is_active: boolean;
      created_by: number | null;
      metadata: any;
      created_at: string;
      updated_at: string;
      UserRole: {
        is_primary: boolean;
        granted_at: string;
        agency_id: number | null;
      };
    }>;
    primary_role: {
      id: number;
      name: string;
      display_name: string;
      level: string;
      granted_at: string;
    };
    all_roles: Array<{
      id: number;
      name: string;
      display_name: string;
      level: string;
      is_primary: boolean;
      agency_id: number | null;
    }>;
  }
  