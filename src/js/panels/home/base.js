import React from 'react';
import {connect} from 'react-redux';

import {closePopout, goBack, openModal, openPopout, setPage} from '../../store/router/actions';

import {
    Div, 
    Panel, 
    Alert, 
    Group, 
    Button, 
    PanelHeader,
    ScreenSpinner,
    Snackbar,
    Avatar
} from '@vkontakte/vkui'
import { Icon16Done } from '@vkontakte/icons'
import Chel from '../../../svg/chel.svg'


class HomePanelBase extends React.Component {

    state = {
        showImg: false
    };

    showImg = () => {
        this.setState({showImg: true});
    };

    openPopout() {
        this.props.openPopout(
            <Alert
                actions={[{
                    title: 'Нет',
                    autoclose: true,
                    mode: 'cancel',
                }, {
                    title: 'Да',
                    autoclose: true,
                    mode: 'destructive',
                    action: this.showImg
                }]}
                onClose={() => this.props.closePopout()}
                header='Вопрос значит'
                text='Вас роняли в детстве?'
            />
        );
    }

    async openSpinner() {
        this.props.openPopout(<ScreenSpinner/>)
        await this.sleep(3000)
        this.props.closePopout()
    }

    openSnackbar() {
        this.props.openPopout(
            <Snackbar
                layout='vertical'
                onClose={() => this.props.closePopout()}
                action='Например кнопка'
                before={<Avatar size={24} style={{ background: 'var(--accent)' }}> <Icon16Done fill='#fff' width={14} height={14}/> </Avatar>}
            >
                Какой-то текст
            </Snackbar>
        );
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    render() {
        const {id, setPage, withoutEpic} = this.props;

        return (
            <Panel id={id}>
                <PanelHeader>Examples</PanelHeader>
                <Group>
                    <Div>
                        <Button mode="secondary" size="l" stretched={true} onClick={() => setPage('home', 'placeholder')}>Открыть Placeholder</Button>
                    </Div>
                    <Div>
                        <Button mode="secondary" size="l" stretched={true} onClick={() => this.openPopout()}>Открыть алерт</Button>
                    </Div>
                    <Div>
                        <Button mode="secondary" size="l" stretched={true} onClick={() => this.openSpinner()}>Открыть спиннер</Button>
                    </Div>
                    <Div>
                        <Button mode="secondary" size="l" stretched={true} onClick={() => this.openSnackbar()}>Открыть снекбар</Button>
                    </Div>
                    <Div>
                        <Button mode="secondary" size="l" stretched={true} onClick={() => this.props.openModal("MODAL_PAGE_BOTS_LIST")}>Открыть
                            модальную страницу</Button>
                    </Div>
                    {withoutEpic && <Div>
                        <Button mode="secondary" size="l" stretched={true} onClick={() => setPage('modal', 'filters')}>Открыть модальное окно</Button>
                    </Div>}
                    {this.state.showImg && <Div className='div-center'>
                        <img src={Chel} alt="чел"/>
                    </Div>}
                </Group>
            </Panel>
        );
    }

}

const mapDispatchToProps = {
    setPage,
    goBack,
    openPopout,
    closePopout,
    openModal
};

export default connect(null, mapDispatchToProps)(HomePanelBase);
