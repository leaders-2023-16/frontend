export enum Degree {
  Bachelor = "Bachelor",
  Master = "Master",
  Doctorate = "Doctorate",
}

export const DegreeToLabel = {
  [Degree.Bachelor]: "Бакалавр",
  [Degree.Master]: "Магистр",
  [Degree.Doctorate]: "Доктор",
};

export type WorkExperiences = {
  employer: string;
  position: string;
  start_date: string;
  end_date: string | null;
  description: string;
};

export type Education = {
  name: string;
  type: string;
  start_year: string;
  end_year: string | null;
  specialization: string;
  degree: "Master" | "Bachelor" | "Doctorate";
  description: string | null;
};

export type Citizenship = {
  id: number;
  name: string;
};

export type TraineeProfileType = {
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  citizenship: Citizenship | null;
  bio: string;
  phone_number: string | null;
  links: { url: string }[];
  educations: Education[];
  work_experiences: WorkExperiences[];
  birth_date: string;
  sex: string | null;
  career_school_username?: string;
  career_school_password?: string;
  testing_platform_username?: string;
  testing_platform_password?: string;
};

export type UpdateTraineeProfile = Omit<TraineeProfileType, "citizenship"> & {
  citizenship: number;
};
