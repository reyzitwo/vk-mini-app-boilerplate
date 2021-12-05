import React from 'react';

import {
    Panel, 
    PanelHeader, 
    PanelHeaderBack, 
    Placeholder,
    Group
} from "@vkontakte/vkui";
import { Icon56DiamondOutline } from '@vkontakte/icons';

function HomePanelPlaceholder({id, router}) {
    
    return(
        <Panel id={id}>
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
        </Panel>
    )
}

export default HomePanelPlaceholder;