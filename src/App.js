import React, {lazy, Suspense, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from '@reyzitwo/react-router-vkminiapps';

import {
  ConfigProvider,
  AppRoot,
  SplitLayout,
  PanelHeader,
  SplitCol,
  Epic,
  View,
  Panel,
  ModalRoot,
  ScreenSpinner,
  usePlatform,
  VKCOM,
  withAdaptivity,
} from "@vkontakte/vkui";
import bridge from "@vkontakte/vk-bridge";

import { set } from './js/reducers/mainReducer';

import DesktopNavigation from './js/components/navigation/desktop';
import MobailNavigation from './js/components/navigation/mobail';

import HomeBotsListModal from './js/components/modals/HomeBotsListModal';
import HomeBotInfoModal from './js/components/modals/HomeBotInfoModal';

const HomePanelBase = lazy(() => import('./js/panels/home/base'));
const HomePanelPlaceholder = lazy(() => import('./js/panels/home/placeholder'));
const ProfilePanelBase = lazy(() => import('./js/panels/profile/base'));

const App = withAdaptivity(({ viewWidth, router }) => {
  const mainStorage = useSelector((state) => state.main)
  const dispatch = useDispatch()

  dispatch(set({ key: 'isDesktop', value: viewWidth >= 3 }))
  dispatch(set({ key: 'platform', value: mainStorage.isDesktop ? VKCOM : usePlatform() }))
  dispatch(set({ key: 'hasHeader', value: mainStorage.isDesktop !== true }))

  useEffect(() => {
    bridge.subscribe(({ detail: { type, data } }) => {
      if (type === 'VKWebAppUpdateConfig') {
        dispatch(set({ key: 'theme', value: data.scheme === 'space_gray' ? 'dark' : 'light' }))
      }
    })
  }, [])

  const modals = (
    <ModalRoot activeModal={router.modal} onClose={() => router.toBack()}>
      <HomeBotsListModal nav="botsList"/>
      <HomeBotInfoModal nav="botInfo"/>
    </ModalRoot>
  );

  return(
    <ConfigProvider platform={mainStorage.platform} appearance={mainStorage.theme} isWebView>
      <AppRoot>
        <SplitLayout
          header={mainStorage.hasHeader && <PanelHeader separator={false} />}
          style={{ justifyContent: "center" }}
        >
          <SplitCol
            animate={!mainStorage.isDesktop}
            spaced={mainStorage.isDesktop}
            width={mainStorage.isDesktop ? '560px' : '100%'}
            maxWidth={mainStorage.isDesktop ? '560px' : '100%'}
          >   
            <Epic 
              activeStory={router.activeView} 
              tabbar={!mainStorage.isDesktop && <MobailNavigation/>}
            >
              <View 
                id='home'
                activePanel={router.activePanel === 'route_modal' ? 'base' : router.activePanel}
                popout={router.popout}
                modal={modals}
              >
                <Panel id='base'>
                  <Suspense fallback={<ScreenSpinner/>}>
                    <HomePanelBase/>
                  </Suspense>
                </Panel>

                <Panel id='placeholder'>
                  <Suspense fallback={<ScreenSpinner/>}>
                    <HomePanelPlaceholder/>
                  </Suspense>
                </Panel>
              </View>

              <View 
                id="profile"
                activePanel={router.activePanel === 'route_modal' ? 'base' : router.activePanel}
                popout={router.popout}
                modal={modals}
              >
                <Panel id='base'>
                  <Suspense fallback={<ScreenSpinner/>}>
                    <ProfilePanelBase/>
                  </Suspense>
                </Panel>
              </View>
            </Epic>
          </SplitCol>

          {mainStorage.isDesktop && <DesktopNavigation/>}
        </SplitLayout>
      </AppRoot>
    </ConfigProvider>
  )
}, { viewWidth: true })

export default withRouter(App);
