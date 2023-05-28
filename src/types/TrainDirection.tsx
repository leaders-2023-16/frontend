export enum TrainDirection {
  IT_CITY = 1,
  MEDIA_CITY,
  SOCIAL_CITY,
  COMFORT_CITY_ZONE,
  RIGHTS_AREA,
  CITY_ECONOMIC,
  HR_CITY,
}

export const TrainDirectionName = {
  [TrainDirection.IT_CITY]: "it-city",
  [TrainDirection.MEDIA_CITY]: "media-city",
  [TrainDirection.SOCIAL_CITY]: "social-city",
  [TrainDirection.COMFORT_CITY_ZONE]: "comfort-city-zone",
  [TrainDirection.RIGHTS_AREA]: "rights-area",
  [TrainDirection.CITY_ECONOMIC]: "city-economic",
  [TrainDirection.HR_CITY]: "hr-city",
};
export const TrainDirectionLabel = {
  [TrainDirection.IT_CITY]: "IT-город",
  [TrainDirection.MEDIA_CITY]: "Медийный город",
  [TrainDirection.SOCIAL_CITY]: "Социальный город",
  [TrainDirection.COMFORT_CITY_ZONE]: "Комфортная городская среда",
  [TrainDirection.RIGHTS_AREA]: "Правовое пространство",
  [TrainDirection.CITY_ECONOMIC]: "Городская экономика",
  [TrainDirection.HR_CITY]: "HR-город",
};

export const TrainDirectionByName = {
  "it-city": TrainDirection.IT_CITY,
  "media-city": TrainDirection.MEDIA_CITY,
  "social-city": TrainDirection.SOCIAL_CITY,
  "comfort-city-zone": TrainDirection.COMFORT_CITY_ZONE,
  "rights-area": TrainDirection.RIGHTS_AREA,
  "city-economic": TrainDirection.CITY_ECONOMIC,
  "hr-city": TrainDirection.HR_CITY,
};
