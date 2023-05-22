import { http } from "./axios";

export class CandidateService {
  async submitApplication(direction: number) {
    return http
      .post("v1/intership-applications", {
        direction,
      })
      .then((response) => {
        return response.data;
      });
  }

  async getApplicationStatus(userId: string) {
    return http.get(`v1/intership-applications/${userId}`).then((response) => {
      return response.data;
    });
  }
}

export default new CandidateService();
