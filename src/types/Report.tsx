export enum ReportStatus {
  ATTENDED = "ATTENDED",
  SICK_DAY = "SICK_DAY",
  VACATION = "VACATION",
  STUDY_VACATION = "STUDY_VACATION",
}

export interface IReport {
  id: number;
  date: string;
  is_approved?: boolean;
  status?: ReportStatus;
  applicant: number;
  approved_by: number;
  work_place: number;
}
