import { TraineeProfile } from "../../components/TraineeProfile";
import { Row, Col } from "antd";
export const TraineeProfilePage = () => {

    return (
        <>
            <Row gutter={[24, 24]} wrap justify={'center'}>
                <Col flex={'0 0 250px'}>
                    <div style={{ width: '250px', height: '250px', border: '1px solid black' }}></div>
                </Col>
                <Col flex={'1 1 250px'}>
                    <TraineeProfile />
                </Col>
            </Row>
        </>
    );
}