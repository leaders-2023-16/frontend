export enum TraineeProfileStatus {
  PASSED = "PASSED",
  IN_PROGRESS = "IN_PROGRESS",
  FAILED = "FAILED",
}

export enum TraineeProfileSex {
  Male = "M",
  Female = "F",
}

export enum TraineeProfileDegree {
  Bachelor = "Bachelor",
  Master = "Master",
  Doctorate = "Doctorate",
}

export interface TraineeProfileWorkExperience {
  employer: string;
  position: string;
  start_date: string;
  end_date?: string;
  description: string;
}

export interface TraineeProfileEducation {
  name: string;
  type: string;
  start_year: number;
  end_year?: number;
  specialization: string;
  degree: TraineeProfileDegree;
  description: string;
}

export interface TraineeProfileCitizenship {
  id: number;
  name: string;
}

export interface TraineeProfileLink {
  url: string;
}

export interface ITraineeProfile {
  user_id: number;
  citizenship?: TraineeProfileCitizenship;
  bio?: string;
  phone_number?: string;
  links: TraineeProfileLink[];
  educations: TraineeProfileEducation[];
  work_experiences: TraineeProfileWorkExperience[];
  first_name: string;
  last_name: string;
  email?: string;
  birth_date?: string;
  sex?: TraineeProfileSex;
  status?: TraineeProfileStatus;
  cv_score?: number;
  test_score?: number;
  career_school_username?: string;
  career_school_password?: string;
  progress_career_school?: number;
  testing_platform_username?: string;
  testing_platform_password?: string;
}

export type IPatchTraineeProfile = Partial<
  Omit<ITraineeProfile, "citizenship">
> & {
  citizenship?: number;
};
