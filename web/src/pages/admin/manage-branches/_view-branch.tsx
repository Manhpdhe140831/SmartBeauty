type ViewBranchPropsType<A> = {
  branchData: A;
  onSave?: <T>(branchData: T) => void;
};

const BranchInfo = <BD,>({}: ViewBranchPropsType<BD>) => {
  // TODO
  return <></>;
};

export default BranchInfo;
