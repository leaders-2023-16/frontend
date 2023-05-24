import { UpdateTraineeProfile } from "@/store/traineeProfile/types";

export const validate = (editingObj: Partial<UpdateTraineeProfile>) => {
  if (
    editingObj.educations?.length &&
    editingObj.educations?.some(
      (e) =>
        !e.name || !e.start_year || !(e.type !== "school" && e.specialization)
    )
  ) {
    return false;
  }
  if (
    editingObj.work_experiences?.length &&
    editingObj.work_experiences?.some(
      (e) => !e.employer || !e.start_date || e.position
    )
  ) {
    return false;
  }

  return true;
};