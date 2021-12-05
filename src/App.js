import React from 'react';
import { withRouter } from 'react-router-vkminiapps';

import {
  Epic, 
  View, 
  Tabbar, 
  ModalRoot, 
  TabbarItem, 
  ConfigProvider,
  AdaptivityProvider, 
  AppRoot,
  usePlatform,
  VKCOM,
  Cell,
  SplitCol,
  PanelHeader,
  SplitLayout,
  Panel,
  Group,
} from "@vkontakte/vkui";

import { 
  Icon28HomeOutline, 
  Icon28Profile 
} from '@vkontakte/icons';

import HomePanelBase from './js/panels/home/base';
import HomePanelPlaceholder from './js/panels/home/placeholder';

import ProfilePanelBase from './js/panels/profile/base';

import HomeBotsListModal from './js/components/modals/HomeBotsListModal';
import HomeBotInfoModal from './js/components/modals/HomeBotInfoModal';

function App(props) {
  const setActiveView = (e) => props.router.toView(e.currentTarget.dataset.id)

  let parsedUrl = new URL(window.location.href)
  const platform = parsedUrl.searchParams.get('vk_platform') === 'desktop_web' ? VKCOM : usePlatform()
  const isDesktop = parsedUrl.searchParams.get('vk_platform') === 'desktop_web' ? true : false
  const hasHeader = parsedUrl.searchParams.get('vk_platform') === 'desktop_web' ? false : true

  const modals = (
    <ModalRoot activeModal={props.router.modal}>
      <HomeBotsListModal
        id="botsList"
        platform={platform}
        router={props.router}
      />

      <HomeBotInfoModal
        id="botInfo"
        platform={platform}
        router={props.router}
      />
    </ModalRoot>
  );

  return(
    <ConfigProvider platform={platform} isWebView={true}>
      <AdaptivityProvider>
        <AppRoot>
          <SplitLayout
            header={hasHeader && <PanelHeader separator={false} />}
            style={{ justifyContent: "center" }}
          >
            <SplitCol
              animate={!isDesktop}
              spaced={isDesktop}
              width={isDesktop ? '560px' : '100%'}
              maxWidth={isDesktop ? '560px' : '100%'}
            >   
              <Epic activeStory={props.router.activeView} tabbar={ !isDesktop && 
                <Tabbar>
                  <TabbarItem
                    data-id='home'
                    selected={props.router.activeView === 'home'}
                    onClick={setActiveView}
                    text='Главная'
                  ><Icon28HomeOutline/></TabbarItem>
                  <TabbarItem
                    data-id='profile'
                    selected={props.router.activeView === 'profile'}
                    onClick={setActiveView}
                    text='Профиль'
                  ><Icon28Profile/></TabbarItem>
                </Tabbar>
              }>
                <View
                  id="home"
                  activePanel={props.router.activePanel}
                  popout={props.router.popout}
                  modal={modals}
                  //onSwipeBack={() => goBack()}
                >
                  <HomePanelBase id="base" router={props.router}/>
                  <HomePanelPlaceholder id="placeholder" router={props.router}/>
                </View>

                <View
                  id="profile"
                  activePanel={props.router.activePanel}
                  popout={props.router.popout}
                  modal={modals}
                  //onSwipeBack={() => goBack()}
                >
                  <ProfilePanelBase 
                    id="base" 
                    isDesktop={isDesktop}
                    router={props.router}
                  />
                </View>
              </Epic>
            </SplitCol>

            {isDesktop && (
              <SplitCol fixed width='280px' maxWidth='280px'>
                <Panel id='menuDesktop'>
                  {hasHeader && <PanelHeader/>}
                  <Group>
                    <Cell
                      data-id='home'
                      onClick={setActiveView}
                      disabled={props.router.activeView === 'home'}
                      before={<Icon28HomeOutline/>}
                      className={props.router.activeView === 'home' ? 'activeViewCell' : ''}
                    >
                      Главная
                    </Cell>

                    <Cell
                      data-id='profile'
                      onClick={setActiveView}
                      disabled={props.router.activeView === 'profile'}
                      before={<Icon28Profile/>}
                      className={props.router.activeView === 'profile' ? 'activeViewCell' : ''}
                    >
                      Профиль
                    </Cell>
                  </Group>
                </Panel>
              </SplitCol>
            )}
              
          </SplitLayout>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  )
}

export default withRouter(App);