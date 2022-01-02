import React from 'react';

import {
	Tabbar,
	TabbarItem
} from '@vkontakte/vkui';
import { Icon28HomeOutline, Icon28Profile } from '@vkontakte/icons';

function MobailNavigation({setActiveView, router}) {

	function openView(e) {
		let nowView = router.activeView
		setActiveView(e)
		
		if (e.currentTarget.dataset.id === nowView) {
		  router.toHash(`${e.currentTarget.dataset.id}/base`)
		}
	}

	return(
	    <Tabbar>
	      <TabbarItem
	        data-id='home'
	        selected={router.activeView === 'home'}
	        onClick={openView}
	        text='Главная'
	      ><Icon28HomeOutline/></TabbarItem>

	      <TabbarItem
	        data-id='profile'
	        selected={router.activeView === 'profile'}
	        onClick={openView}
	        text='Профиль'
	      ><Icon28Profile/></TabbarItem>
	    </Tabbar>
	)
}

export default MobailNavigation;