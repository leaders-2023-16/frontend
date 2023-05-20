import { Outlet, useNavigate } from "react-router-dom"
import { useAppSelector } from "../../store";
import { selectAuth } from "../../store/auth/selectors";
import { Layout } from "antd";
import Sider from "antd/es/layout/Sider";

export const LayoutPage = () => {
    const navigate = useNavigate()
    const { isLoggedIn, user } = useAppSelector(selectAuth)
    return <>
        <Layout style={{ minHeight: '100vh' }}>
            <Layout.Header>header</Layout.Header>
            <Layout>
                <Layout.Content style={{padding: '18px 36px'}}><Outlet /></Layout.Content>
            </Layout>
            <Layout.Footer>footer</Layout.Footer>
        </Layout>
    </>
}