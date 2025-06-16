// ----------------------------------------------------------------------

export type IJobFilters = {
  roles: string[];
  experience: string;
  benefits: string[];
  locations: string[];
  employmentTypes: string[];
};

export type IJobCandidate = {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
};

export type IJobCompany = {
  name: string;
  logo: string;
  phoneNumber: string;
  fullAddress: string;
};

export type IJobSalary = {
  type: string;
  price: number;
  negotiable: boolean;
};

export type IJobItem = {
  id: string;
  role: string;
  title: string;
  content: string;
  publish: string;
  skills: string[];
  totalViews: number;
  experience: string;
  salary: IJobSalary;
  benefits: string[];
  locations: string[];
  company: IJobCompany;
  createdAt: string | null;
  employmentTypes: string[];
  workingSchedule: string[];
  expiredDate: string | null;
  candidates: IJobCandidate[];
};
