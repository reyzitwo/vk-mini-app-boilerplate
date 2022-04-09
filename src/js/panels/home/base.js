import React, { useState } from 'react';
import { withRouter } from '@reyzitwo/react-router-vkminiapps';

import {
    Div,  
    Alert, 
    Group, 
    Button, 
    PanelHeader,
    ScreenSpinner,
    Snackbar,
    Avatar
} from '@vkontakte/vkui'
import { Icon16Done } from '@vkontakte/icons'
import img from '../../../svg/chel.svg'

function HomePanelBase({ router }) {
    const [showImg, setShowImg] = useState(false)
    const [snackbar, setSnackbar] = useState(null)

    function openAlert() {
        router.toPopout(
            <Alert
                actions={[{
                    title: 'Нет',
                    autoclose: true,
                    mode: 'cancel',
                }, {
                    title: 'Да',
                    autoclose: true,
                    mode: 'destructive',
                    action: () => setShowImg(true)
                }]}
                onClose={() => router.toPopout()}
                header='Вопрос значит'
                text='Вас роняли в детстве?'
            />
        )
    }

    async function openSpinner() {
        router.toPopout(<ScreenSpinner/>)
        await new Promise(resolve => setTimeout(resolve, 2000))
        router.toPopout()
    }

    function openSnackbar() {
        setSnackbar(
            <Snackbar
                layout='vertical'
                onClose={() => setSnackbar(null)}
                action='Например кнопка'
                before={
                    <Avatar size={24} style={{ background: 'var(--accent)' }}> 
                        <Icon16Done fill='#fff'/> 
                    </Avatar>
                }
            >
                Какой-то текст
            </Snackbar>
        )
    }

    return (
        <>
            <PanelHeader separator={false}>Главная</PanelHeader>
            <Group>
                <Div>
                    <Button 
                        size="l" 
                        stretched
                        mode="secondary" 
                        onClick={() => router.toPanel('placeholder')}
                    >
                        Открыть Panel
                    </Button>
                </Div>

                <Div>
                    <Button 
                        size="l" 
                        stretched
                        mode="secondary" 
                        onClick={() => openAlert()}
                    >
                        Открыть Alert
                    </Button>
                </Div>

                <Div>
                    <Button 
                        size="l" 
                        stretched
                        mode="secondary" 
                        onClick={() => openSpinner()}
                    >
                        Открыть ScreenSpinner
                    </Button>
                </Div>

                <Div>
                    <Button
                        size="l" 
                        stretched
                        mode="secondary" 
                        onClick={() => openSnackbar()}
                    >
                        Открыть Snackbar
                    </Button>
                </Div>

                <Div>
                    <Button 
                        size="l" 
                        stretched
                        mode="secondary" 
                        onClick={() => router.toModal('botsList')}
                    >
                        Открыть ModalPage
                    </Button>
                </Div>

                {showImg && 
                    <Div className='div-center'>
                        <img src={img} alt="чел"/>
                    </Div>
                }
            </Group>
            {snackbar}
        </>
    );
}

export default withRouter(HomePanelBase);