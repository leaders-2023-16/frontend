import { IPatchTraineeProfile } from "@/types/TraineeProfile";

export const validate = (editingObj: IPatchTraineeProfile) => {
  if (
    editingObj.educations?.length &&
    !editingObj.educations?.every((e) =>
      e.name && e.start_year && e.type !== "school" ? e.specialization : true
    )
  ) {
    return "Полностью заполните Образование";
  }
  if (
    editingObj.work_experiences?.length &&
    !editingObj.work_experiences?.every(
      (e) => e.employer && e.start_date && e.position
    )
  ) {
    return "Полностью заполните Опыт работы";
  }
  if (!editingObj.bio) {
    return "Заполните О себе!";
  }

  return true;
};
