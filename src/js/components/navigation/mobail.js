import React from 'react';
import { withRouter } from '@reyzitwo/react-router-vkminiapps';

import {
	Tabbar,
	TabbarItem
} from '@vkontakte/vkui';
import { Icon28HomeOutline, Icon28Profile } from '@vkontakte/icons';

function MobailNavigation({ router }) {

	function openView(view) {
		let nowView = router.activeView
		router.toView(view)
		
		if (view === nowView) {
		  router.toHash(`${view}/base`)
		}
	}

	return(
	    <Tabbar>
	      <TabbarItem
	        selected={router.activeView === 'home'}
	        onClick={() => openView('home')}
	        text='Главная'
	      ><Icon28HomeOutline/></TabbarItem>

	      <TabbarItem
	        data-id='profile'
	        selected={router.activeView === 'profile'}
					onClick={() => openView('profile')}
	        text='Профиль'
	      ><Icon28Profile/></TabbarItem>
	    </Tabbar>
	)
}

export default withRouter(MobailNavigation);