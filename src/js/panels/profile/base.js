import React, { useState, useEffect } from 'react';

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

let isInfoUser = false
let infoUser = ['Загрузка...']

function ProfilePanelBase({isDesktop, router}) {
    const [infoUsers, setInfoUser] = useState(infoUser)

    useEffect(() => {
        if (!isInfoUser) {
            getInfoUser()
        }
    })

    async function getInfoUser() {
        router.toPopout(<ScreenSpinner/>)

        let user_info = await bridge.send('VKWebAppGetUserInfo');
        infoUser[0] = user_info.first_name + ' ' + user_info.last_name
        infoUser.push(user_info.photo_200)
        infoUser.push(user_info.id)

        setInfoUser(infoUser)
        isInfoUser = true

        router.toPopout()
    }

    return (
        <>
            <PanelHeader separator={false}>Профиль</PanelHeader>
            <Group>
                <Gradient className={isDesktop ? 'ProfileUserWeb' : 'ProfileUserMobail'}>
                    <Avatar size={96} src={infoUsers[1]}/>

                    <Title 
                        className='NameUser'
                        level="2" 
                        weight="medium"
                    >
                        {infoUsers[0]}
                    </Title>

                    <Text className='SubheaderUser'>
                        Какой-нибудь статус человека...
                    </Text>

                    <Button 
                        size="m" 
                        mode="secondary" 
                        href={`https://vk.com/id${infoUsers[2]}`} 
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

export default ProfilePanelBase;