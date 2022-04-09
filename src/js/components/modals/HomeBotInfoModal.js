import React from 'react';
import { useSelector } from "react-redux";
import { withRouter } from '@reyzitwo/react-router-vkminiapps';
import {
    Cell, 
    List, 
    Avatar, 
    InfoRow, 
    ModalPage, 
    ModalPageHeader, 
    PanelHeaderButton,
    IOS
} from "@vkontakte/vkui";
import { Icon24Dismiss, Icon24Cancel } from '@vkontakte/icons'

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
                    Информация о сообществе
                </ModalPageHeader>
            }
            onClose={() => router.toBack()}
            settlingHeight={100}
        >
            <Cell
                description="Описание"
                before={<Avatar size={40} src="https://vk.com/images/community_100.png?ava=1"/>}
            >
                Название
            </Cell>

            <List>
                <Cell>
                    <InfoRow header="Подписчиков">
                            8800
                    </InfoRow>
                </Cell>

                <Cell>
                    <InfoRow header="Записей">
                        555
                    </InfoRow>
                </Cell>

                <Cell>
                    <InfoRow header="Рейтинг">
                        3535
                    </InfoRow>
                </Cell>
            </List>
        </ModalPage>
    );
}

export default withRouter(BotsListModal);