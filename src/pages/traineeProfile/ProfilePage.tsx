import { onlyRoles } from "@/HOCs/onlyRole";
import { TraineeProfile } from "../../components/TraineeProfile";
import { Row, Col, Typography } from "antd";
import { UserRole } from "@/types/User";
export const TraineeProfilePage = onlyRoles(
  [UserRole.CANDIDATE, UserRole.TRAINEE],
  () => {
    return (
      <>
        <Typography style={{ fontSize: "36px", color: "#1A1230" }}>
          Профиль
        </Typography>
        <Row gutter={[24, 24]} wrap justify={"center"} style={{marginTop: '18px'}}>
          <Col flex={"0 0 250px"}>
            <div
              style={{
                width: "250px",
                height: "250px",
                border: "1px solid #F5F5F5",
                background: '#F5F5F5',
                borderRadius: '20px'
              }}
            ></div>
          </Col>
          <Col flex={"1 1 250px"}>
            <TraineeProfile />
          </Col>
        </Row>
      </>
    );
  }
);
