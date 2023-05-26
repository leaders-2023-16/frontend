import { ITraineeProfile } from "./TraineeProfile";
import { IVacancy } from "./Vacancy";

export interface IVacancyResponse {
  id: number;
  vacancy: IVacancy;
  applicant: ITraineeProfile;
  text_answer?: string;
  covering_letter?: string;
  approved_by_mentor?: boolean;
  approved_by_applicant?: boolean;
}
