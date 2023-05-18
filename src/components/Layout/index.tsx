import { Box, Button, Frame, HorizontalStack, Page, TopBar } from "@shopify/polaris"
import { Outlet, useNavigate } from "react-router-dom"
import { useAppSelector } from "../../store";
import { selectAuth } from "../../store/auth/selectors";

const logo = {
    width: 124,
    topBarSource:
        'https://cdn.shopify.com/s/files/1/0446/6937/files/jaded-pixel-logo-color.svg?6215648040070010999',
    contextualSaveBarSource:
        'https://cdn.shopify.com/s/files/1/0446/6937/files/jaded-pixel-logo-gray.svg?6215648040070010999',
    url: '#',
    accessibilityLabel: 'Jaded Pixel',
};

export const Layout = () => {
    const navigate = useNavigate()
    const { isLoggedIn, user } = useAppSelector(selectAuth)
    return <>
        <div style={{ minHeight: '100%' }}>
            <Frame
                logo={logo}
                topBar={<TopBar
                    userMenu={
                        isLoggedIn ? <TopBar.UserMenu
                            actions={[]}
                            name="name"
                            initials=""
                            onToggle={() => undefined}
                            open
                        /> : (<>
                            <Box paddingInlineEnd={'2'}>
                                <HorizontalStack gap={'2'} wrap={false}>
                                    <Button onClick={() => navigate('login')}>Войти</Button>
                                    <Button onClick={() => navigate('signup')}>Зарегистрироваться</Button>
                                </HorizontalStack>
                            </Box>

                        </>)
                    }
                />}
            >
                <Page>
                    <Outlet />
                </Page>
            </Frame>
        </div>

    </>
}