import React from 'react';
import {connect} from 'react-redux';

import {goBack} from "../../store/router/actions";

import {
    Panel, 
    PanelHeader, 
    PanelHeaderBack, 
    Placeholder
} from "@vkontakte/vkui";
import { Icon56DiamondOutline } from '@vkontakte/icons';

class HomePanelPlaceholder extends React.Component {

    render() {
        const {id, goBack} = this.props;

        return (
            <Panel id={id}>
                <PanelHeader
                    left={<PanelHeaderBack onClick={() => goBack()}/>}
                >
                    Examples 1.2
                </PanelHeader>
                <Placeholder stretched
                    icon={<Icon56DiamondOutline/>}
                    header='Заглушка'
                >
                    Простой Placeholder. Здесь ничего нет
                </Placeholder>
            </Panel>
        );
    }

}

const mapDispatchToProps = {
    goBack
};

export default connect(null, mapDispatchToProps)(HomePanelPlaceholder);
