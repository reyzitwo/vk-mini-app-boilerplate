import React from 'react';
import { useSelector } from "react-redux";
import { withRouter } from '@reyzitwo/react-router-vkminiapps';
import {
    List, 
    Cell, 
    Avatar, 
    ModalPage, 
    ModalPageHeader, 
    PanelHeaderButton,
    IOS
} from "@vkontakte/vkui";
import { Icon24Dismiss, Icon24Cancel, Icon24Chevron } from '@vkontakte/icons'

const bots = [
    {
        name: 'VK Mini Apps',
        avatar: 'https://sun9-1.userapi.com/impf/c846420/v846420985/1526c3/ISX7VF8NjZk.jpg?size=800x800&quality=96&sign=fefc1a684879e75bd9d36b4ba2907310&type=album',
        desc: 'Какой-то текст'
    },
    {
        name: 'VK API',
        avatar: 'https://sun2.is74.userapi.com/impf/c638629/v638629852/2afba/o-dvykjSIB4.jpg?size=600x600&quality=96&sign=553d78e3d9a15f06cacc3f421d9a4919&type=album',
        desc: 'Какой-то текст'
    },
    {
        name: 'VK Testers',
        avatar: 'https://sun1.is74.userapi.com/impg/A1ovThuM8zEqmrM9JSCmQreQMma77TzS4GKnQg/KXYKrjN-gvs.jpg?size=1280x1280&quality=95&sign=65c063e8da218030ea2643df3414ece4&type=album',
        desc: 'Какой-то текст'
    },
];

function BotsListModal({ nav, router }) {
    const platform = useSelector((state) => state.main.platform)

    return (
        <ModalPage
            nav={nav}
            header={
                <ModalPageHeader
                    left={platform !== IOS && 
                        <PanelHeaderButton onClick={() => router.toBack()}>
                            <Icon24Cancel/>
                        </PanelHeaderButton>
                    }

                    right={platform === IOS && 
                        <PanelHeaderButton onClick={() => router.toBack()}>
                            <Icon24Dismiss/>
                        </PanelHeaderButton>
                    }
                >
                    Сообщества
                </ModalPageHeader>
            }
            onClose={() => router.toBack()}
            settlingHeight={100}
        >
            <List>
                {bots.map((bot, index) => (
                    <Cell
                        key={index}
                        description={bot.desc}
                        before={<Avatar size={40} src={bot.avatar}/>}
                        onClick={() => router.toModal('botInfo')}
                        asideContent={<Icon24Chevron fill="#528bcc"/>}
                    >
                        {bot.name}
                    </Cell>
                ))}
            </List>
        </ModalPage>
    );
}

export default withRouter(BotsListModal);