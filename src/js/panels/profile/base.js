import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from '@reyzitwo/react-router-vkminiapps';

import {
    PanelHeader,
    Gradient,
    Avatar,
    Title,
    Text,
    Button,
    ScreenSpinner,
    Group,
    Header,
    SimpleCell,
    CellButton
} from "@vkontakte/vkui";
import {
    Icon28SchoolOutline,
    Icon28AddOutline
} from '@vkontakte/icons';
import bridge from '@vkontakte/vk-bridge';
import { set } from "../../reducers/mainReducer";

let isInfoUser = false

function ProfilePanelBase({ router }) {
    const mainStorage = useSelector((state) => state.main)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!isInfoUser) {
            getInfoUser()
        }
    }, [])

    async function getInfoUser() {
        router.toPopout(<ScreenSpinner/>)

        let user_info = await bridge.send('VKWebAppGetUserInfo');
        user_info.name = user_info.first_name + ' ' + user_info.last_name
        dispatch(set({ key: 'infoUser', value: user_info }))

        isInfoUser = true
        router.toPopout()
    }

    return (
        <>
            <PanelHeader separator={false}>Профиль</PanelHeader>
            <Group>
                <Gradient className={mainStorage.isDesktop ? 'ProfileUserWeb' : 'ProfileUserMobail'}>
                    <Avatar size={96} src={mainStorage.infoUser.photo_200}/>

                    <Title 
                        className='NameUser'
                        level="2" 
                        weight="medium"
                    >
                        {mainStorage.infoUser.name}
                    </Title>

                    <Text className='SubheaderUser'>
                        Какой-нибудь статус человека...
                    </Text>

                    <Button 
                        size="m" 
                        mode="secondary" 
                        href={`https://vk.com/id${mainStorage.infoUser.id}`}
                        target='_blank' 
                    >
                        Перейти на страницу
                    </Button>
                </Gradient>

                <Header>Учебные заведения и классы</Header>

                <SimpleCell 
                    before={<Icon28SchoolOutline/>} 
                    description="Екатеринбург"
                >
                    Школа №180
                </SimpleCell>

                <CellButton 
                    before={<Icon28AddOutline />}
                >
                    Добавить учебное заведение
                </CellButton>
            </Group>
        </>
    );
}

export default withRouter(ProfilePanelBase);