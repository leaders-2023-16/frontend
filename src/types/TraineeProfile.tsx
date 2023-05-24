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

export interface TraineeProfileWorkExperiences {
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
  user_id: string;
  citizenship?: TraineeProfileCitizenship;
  bio?: string;
  phone_number?: string;
  links: TraineeProfileLink[];
  educations: TraineeProfileEducation[];
  work_experiences: TraineeProfileWorkExperiences[];
  first_name: string;
  last_name: string;
  email?: string;
  birth_date?: string;
  sex?: TraineeProfileSex;
  status?: TraineeProfileStatus;
  cv_score?: number;
  test_score?: number;
}
