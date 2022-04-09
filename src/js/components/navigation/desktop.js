import React from 'react';
import { useSelector } from "react-redux";
import { withRouter } from '@reyzitwo/react-router-vkminiapps';

import {
  SplitCol,
	Panel,
	PanelHeader,
	Group,
	Cell
} from '@vkontakte/vkui';
import ThemeControllers from './themeControllers';
import { Icon28HomeOutline, Icon28Profile } from '@vkontakte/icons';

function DesktopNavigation({ router }) {
  const hasHeader = useSelector((state) => state.main.hasHeader)

	return(
    <SplitCol fixed width='280px' maxWidth='280px'>
      <Panel id='menuDesktop'>
        {hasHeader && <PanelHeader/>}
        <Group>
          <Cell
            onClick={() => router.toView('home')}
            disabled={router.activeView === 'home'}
            before={<Icon28HomeOutline/>}
            className={router.activeView === 'home' ? 'activeViewCell' : ''}
          >
            Главная
          </Cell>

          <Cell
            onClick={() => router.toView('profile')}
            disabled={router.activeView === 'profile'}
            before={<Icon28Profile/>}
            className={router.activeView === 'profile' ? 'activeViewCell' : ''}
          >
            Профиль
          </Cell>
        </Group>

        <ThemeControllers/>
      </Panel>
    </SplitCol>
	)
}

export default withRouter(DesktopNavigation);