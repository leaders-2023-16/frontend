import { Outlet } from "react-router-dom"

export const Layout = () => {
    return <>
        <div style={{ marginTop: '100px' }}>
            <Outlet />
        </div>
    </>
}