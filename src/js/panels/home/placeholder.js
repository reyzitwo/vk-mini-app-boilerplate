import React from 'react';
import { withRouter } from "@reyzitwo/react-router-vkminiapps";

import {
    PanelHeader, 
    PanelHeaderBack, 
    Placeholder,
    Group
} from "@vkontakte/vkui";
import { Icon56DiamondOutline } from '@vkontakte/icons';

function HomePanelPlaceholder({ router }) {
    
    return(
        <>
            <PanelHeader 
                separator={false}
                left={<PanelHeaderBack onClick={() => router.toBack()}/>}
            >
                Панель
            </PanelHeader>

            <Group>
                <Placeholder
                    icon={<Icon56DiamondOutline/>}
                    header='Заглушка'
                >
                    Простой Placeholder. Здесь ничего нет
                </Placeholder>
            </Group>
        </>
    )
}

export default withRouter(HomePanelPlaceholder);