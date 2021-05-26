import VKConnect from "@vkontakte/vk-connect";

import {setColorScheme} from "../store/vk/actions";

export const initApp = () => (dispatch) => {
    const VKConnectCallback = (e) => {
        if (e.detail.type === 'VKWebAppUpdateConfig') {
            VKConnect.unsubscribe(VKConnectCallback);

            dispatch(setColorScheme(e.detail.data.scheme));
        }
    };

    VKConnect.subscribe(VKConnectCallback);
    return VKConnect.send('VKWebAppInit', {}).then(data => {
        return data;
    }).catch(error => {
        return error;
    });
};

export const closeApp = () => {
    return VKConnect.send("VKWebAppClose", {
        "status": "success"
    }).then(data => {
        return data;
    }).catch(error => {
        return error;
    });
};

export const swipeBackOn = () => {
    return VKConnect.send("VKWebAppEnableSwipeBack", {}).then(data => {
        return data;
    }).catch(error => {
        return error;
    });
};

export const swipeBackOff = () => {
    return VKConnect.send("VKWebAppDisableSwipeBack", {}).then(data => {
        return data;
    }).catch(error => {
        return error;
    });
};