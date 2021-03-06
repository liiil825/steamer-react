import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore, {
    history
} from '../stores/configureStore';

import Loadable from 'react-loadable';
import IndexWrapper from '../container/index';
import Spinner from 'react-spin-component';

import App from '../container/app';
import DevTools from '../../common/devtools/DevTools';
import { DEBUG } from '../constants/constants';

import { ConnectedRouter } from 'react-router-redux';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

let store = configureStore();

let DevToolsWrapper = (DEBUG) ? <DevTools /> : null;

const LoadableDetail = Loadable({
    loader: () => import('../container/detail'),
    loading() {
      return <Spinner isShow={true}/>
    }
});

const LoadableComment = Loadable({
    loader: () => import('../container/comment'),
    loading() {
      return <Spinner isShow={true}/>
    }
});

export default class Root extends Component {
    render() {
        return (
            <Provider
                store={store}
            >
                <div>
                    <ConnectedRouter
                        history={history}
                    >
                        <div>
                            <Route exact path="/" component={IndexWrapper}/>
                            <Route exact path="/detail/:id/:commentid" component={LoadableDetail}/>
                            <Route exact path="/comment/:id" component={LoadableComment}/>
                        </div>
                    </ConnectedRouter>
                    { DevToolsWrapper }
                </div>
            </Provider>
        );
    }
}

// render(
//     <Root />,
//     document.getElementById('pages')
// );
