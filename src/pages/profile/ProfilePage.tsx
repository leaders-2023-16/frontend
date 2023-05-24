import { onlyRoles } from "@/HOCs/onlyRole";
import {
  useGetTraineeProfileByIdQuery,
  useUpdateTraineeProfileByIdMutation,
} from "../../store/traineeProfile";
import { useState } from "react";
import { UserRole } from "@/types/User";

export const ProfilePage = onlyRoles([UserRole.CANDIDATE], () => {
  const { data, isLoading } = useGetTraineeProfileByIdQuery("7");
  const [updateData, { isLoading: isChanging }] =
    useUpdateTraineeProfileByIdMutation();
  const [bio, setBio] = useState("");

  const handleUpdate = () => {
    updateData({ id: "7", data: { bio } });
  };

  if (isLoading) {
    return <h1>Loading.....</h1>;
  }
  return (
    <>
      <h1>{data?.bio}</h1>
      <input onChange={(e) => setBio(e.target.value)}></input>
      <button onClick={handleUpdate}>Изменить</button>
      {isChanging && <h1>Updating.....</h1>}
    </>
  );
});
