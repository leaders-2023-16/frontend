export interface IStatistic {
  responses: {
    total: number;
    relevant: number;
    irrelevant: number;
  };

  age_statistics: [
    {
      label: string;
      count: number;
    }
  ];

  education: {
    by_name: [{ label: string; count: number }];
    by_type: [{ label: string; count: number }];
  };

  direction_statistics: [{ label: string; count: number }];
  work_experience: [{ label: string; count: number }];

  vacancies: {
    total: number;
    by_department: [{ label: string; count: number }];
  };
}
