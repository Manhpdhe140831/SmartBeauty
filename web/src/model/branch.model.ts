export interface BranchModel<managerType = number> {
  id: number;
  name: string;
  manager: managerType;
  mobile: string;
  address: string;
  email: string;
  logo: string;
}
