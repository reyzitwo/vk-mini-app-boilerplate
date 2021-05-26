import React from 'react';
import {connect} from 'react-redux';

import {openModal} from "../../store/router/actions";

import {
    List, 
    Cell, 
    Avatar, 
    ModalPage, 
    ModalPageHeader, 
    PanelHeaderButton, 
    withPlatform, 
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
        avatar: 'https://sun1.is74.userapi.com/impf/c626821/v626821590/2ae79/TI4fleAH-cs.jpg?size=1280x724&quality=96&sign=851a3817064034d2fa974ce029b71a5a&type=album',
        desc: 'Какой-то текст'
    },
];

class HomeBotsListModal extends React.Component {

    render() {
        const {id, onClose, openModal, platform} = this.props;

        return (
            <ModalPage
                id={id}
                header={
                    <ModalPageHeader
                        left={platform !== IOS &&
                        <PanelHeaderButton onClick={onClose}><Icon24Cancel/></PanelHeaderButton>}
                        right={platform === IOS &&
                        <PanelHeaderButton onClick={onClose}><Icon24Dismiss/></PanelHeaderButton>}
                    >
                        VK
                    </ModalPageHeader>
                }
                onClose={onClose}
                settlingHeight={80}
            >
                <List>
                    {bots.map((bot, index) => (
                        <Cell
                            key={index}
                            description={bot.desc}
                            before={<Avatar size={40} src={bot.avatar}/>}
                            onClick={() => openModal('MODAL_PAGE_BOT_INFO')}
                            asideContent={<Icon24Chevron fill="#528bcc"/>}
                        >
                            {bot.name}
                        </Cell>
                    ))}
                </List>
            </ModalPage>
        );
    }

}

const mapDispatchToProps = {
    openModal
};

export default withPlatform(connect(null, mapDispatchToProps)(HomeBotsListModal));
