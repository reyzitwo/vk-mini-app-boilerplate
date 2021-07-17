import React from 'react';
import {connect} from 'react-redux';

import {setPage, openPopout, closePopout} from "../../store/router/actions";

import {
    Panel,
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

var infouser = 0
var first_name = 'Загрузка...'
var last_name
var user_id
var photo

class HomePanelProfile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            first_name: first_name,
            last_name: last_name,
            user_id: user_id,
            photo: photo
        };
    }

    componentDidMount() {
        if (infouser === 0) {
            this.getInfoUser();
        }
    }

    async getInfoUser() {
        this.props.openPopout(<ScreenSpinner/>)

        let user_info = await bridge.send('VKWebAppGetUserInfo');
        first_name = user_info.first_name
        last_name = user_info.last_name
        photo = user_info.photo_200
        user_id = user_info.id
        this.setState({ 
            first_name: first_name,
            last_name: last_name,
            user_id: user_id,
            photo: photo,
        });
        infouser = 1

        this.props.closePopout()

    }

    render() {
        const {id} = this.props;
        const {photo, first_name, last_name, user_id} = this.state;

        return (
            <Panel id={id}>
                <PanelHeader noShadow={true}>Examples 2</PanelHeader>
                <Group>
                    <Gradient className='ProfileUser'>
                        <Avatar size={96} src={photo} />

                        <Title 
                            className='NameUser'
                            level="2" 
                            weight="medium"
                        >
                            {first_name} {last_name}
                        </Title>

                        <Text className='SubheaderUser'>
                            Крутой человек!
                        </Text>

                        <Button 
                            size="m" mode="secondary" 
                            href={`https://vk.com/id${user_id}`} 
                            target='_blank' 
                        >
                            Перейти на страницу
                        </Button>
                    </Gradient>
                    <Group mode="plain">
                        <Header>Учебные заведения и классы</Header>
                        <SimpleCell before={<Icon28SchoolOutline />} description="Екатеринбург">Школа №180</SimpleCell>
                        <CellButton before={<Icon28AddOutline />}>Добавить учебное заведение</CellButton>
                    </Group>
                </Group>
            </Panel>
        );
    }

}

const mapDispatchToProps = {
    setPage,
    openPopout,
    closePopout
};

export default connect(null, mapDispatchToProps)(HomePanelProfile);
