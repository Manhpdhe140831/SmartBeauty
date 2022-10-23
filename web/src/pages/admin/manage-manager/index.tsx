import { AppPageInterface } from "../../../interfaces/app-page.interface";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ManagerModel } from "../../../model/manager.model";
import mockManager from "../../../mock/manager";
import BtnCreateManager from "./_partial/_btn-create-manager";

const ManageManager: AppPageInterface = () => {
  const [page, setPage] = useState(1);

  // query to get the list of the manager
  const { data: managers, isLoading } = useQuery<ManagerModel[]>(
    ["list-manager", page],
    async () => await mockManager()
  );

  return (
    <div className="flex h-full flex-col space-y-4 p-4">
      {/*  Search section   */}
      <div className="flex justify-end space-x-2">
        {/*  Btn create new manager   */}
        <BtnCreateManager onChanged={(e) => console.log(e)} />
      </div>
    </div>
  );
};

ManageManager.routerName = "Tài khoản chi nhánh";

export default ManageManager;
