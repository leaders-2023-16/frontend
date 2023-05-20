export enum Degree {
  Bachelor = 'Bachelor',
  Master = ' Master',
  Doctorate = ' Doctorate'
}

export type WorkExperiences = {
  employer: string,
  position: string,
  start_date: string,
  end_date: string | null,
  description: string,
}

export type Education = {
  name: string;
  type: string;
  start_date: string;
  end_date: string | null;
  specialization: string;
  degree: Degree;
  description: string | null;
}

export type TraineeProfileState = {
  user_id: string;
  citizenship: number | null;
  bio: string;
  phone_number: string | null;
  links: { url: string }[];
  educations: Education[]
  work_experiences: WorkExperiences[]
}
