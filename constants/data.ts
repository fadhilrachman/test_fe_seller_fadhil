import { NavItem } from '@/types';

export type User = {
  id: number;
  name: string;
  company: string;
  role: string;
  verified: boolean;
  status: string;
};
export const users: User[] = [
  {
    id: 1,
    name: 'Candice Schiner',
    company: 'Dell',
    role: 'Frontend Developer',
    verified: false,
    status: 'Active'
  },
  {
    id: 2,
    name: 'John Doe',
    company: 'TechCorp',
    role: 'Backend Developer',
    verified: true,
    status: 'Active'
  },
  {
    id: 3,
    name: 'Alice Johnson',
    company: 'WebTech',
    role: 'UI Designer',
    verified: true,
    status: 'Active'
  },
  {
    id: 4,
    name: 'David Smith',
    company: 'Innovate Inc.',
    role: 'Fullstack Developer',
    verified: false,
    status: 'Inactive'
  },
  {
    id: 5,
    name: 'Emma Wilson',
    company: 'TechGuru',
    role: 'Product Manager',
    verified: true,
    status: 'Active'
  },
  {
    id: 6,
    name: 'James Brown',
    company: 'CodeGenius',
    role: 'QA Engineer',
    verified: false,
    status: 'Active'
  },
  {
    id: 7,
    name: 'Laura White',
    company: 'SoftWorks',
    role: 'UX Designer',
    verified: true,
    status: 'Active'
  },
  {
    id: 8,
    name: 'Michael Lee',
    company: 'DevCraft',
    role: 'DevOps Engineer',
    verified: false,
    status: 'Active'
  },
  {
    id: 9,
    name: 'Olivia Green',
    company: 'WebSolutions',
    role: 'Frontend Developer',
    verified: true,
    status: 'Active'
  },
  {
    id: 10,
    name: 'Robert Taylor',
    company: 'DataTech',
    role: 'Data Analyst',
    verified: false,
    status: 'Active'
  }
];

export type Employee = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  date_of_birth: string; // Consider using a proper date type if possible
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  longitude?: number; // Optional field
  latitude?: number; // Optional field
  job: string;
  profile_picture?: string | null; // Profile picture can be a string (URL) or null (if no picture)
};

export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: 'dashboard',
    label: 'Dashboard'
  },
  {
    title: 'Pengumuman',
    href: '/dashboard/announcement',
    icon: 'announcement',
    label: 'Dashboard'
  },
  {
    title: 'Master Data',
    href: '/dashboard/user',
    icon: 'user',
    label: 'user',
    subMenu: [
      {
        title: 'Divisi',
        href: '/dashboard/division'
      },
      {
        title: 'Karyawan',
        href: '/dashboard/employees'
      },
      {
        title: 'Operator',
        href: '/dashboard/admin'
      }
    ]
  },
  {
    title: 'Manajemen Kehadiran',
    href: '/dashboard/employee',
    icon: 'employee',
    label: 'employee',
    subMenu: [
      {
        title: 'Absen',
        href: '/dashboard/absent'
      },
      {
        title: 'History Absent',
        href: '/dashboard/absent'
      },
      {
        title: 'Master Shifting',
        href: '/dashboard/master-shifting'
      },
      {
        title: 'Shifting',
        href: '/dashboard/shifting'
      },
      {
        title: 'Cuti',
        href: '/dashboard/time-off'
      }
    ]
  },
  {
    title: 'Log Aktifitas',
    href: '/dashboard/log-activity',
    icon: 'logActivity',
    label: 'employee'
  }
  // {
  //   title: 'Employee',
  //   href: '/dashboard/employee',
  //   icon: 'employee',
  //   label: 'employee'
  // },
  // {
  //   title: 'Profile',
  //   href: '/dashboard/profile',
  //   icon: 'profile',
  //   label: 'profile'
  // },
  // {
  //   title: 'Kanban',
  //   href: '/dashboard/kanban',
  //   icon: 'kanban',
  //   label: 'kanban'
  // },
  // {
  //   title: 'Login',
  //   href: '/',
  //   icon: 'login',
  //   label: 'login'
  // }
];
