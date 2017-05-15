import * as React from "react";
import { observer } from "mobx-react";

import { Main, } from "./elements/main";
import { ContainerSection, } from "./elements/container-section";

// Components:
import { NavMain } from "./components/nav-main";
import { Footer } from "./components/footer";

// Pages/Route's View:
import { Home } from "./pages/home";
import { Todo } from "./pages/todo";
import { Contributing } from "./pages/contributing";
import { Page as Typography } from "./pages/typography";
import { Page as Bloqquotes } from "./pages/blockquote";
import { Page as Buttons } from "./pages/buttons";
import { Page as Lists } from "./pages/lists";
import { Page as Forms } from "./pages/forms";
import { Page as Tables } from "./pages/tables";
import { Page as Grids} from "./pages/grids";
import {Page as Codes} from "./pages/codes";

// Stores/Vm's
import { AllStores } from "./stores/all-stores";

// Routing
import { Router, Route, Switch } from "react-router";
import { history } from "./history";

export const App = observer((props: { stores: AllStores }) => {
    const stores = props.stores;
    // ...
    return (
        <Main>
            <NavMain stores={stores} />

            <ContainerSection style={{ minHeight: "100em" }}>

                <Router history={history}>
                    <Switch>
                        <Route exact path="/" component={() =>
                            <Home {...{ stores }} />} />
                        <Route path="/Home" component={() =>
                            <Home {...{ stores }} />} />
                        <Route path="/getting-started" component={() =>
                            <Todo {...{ stores, what: "getting-started" }} />
                        } />
                        <Route path="/typography" component={() =>
                            <Typography />
                        } />
                        <Route path="/blockquotes" component={() =>
                            <Bloqquotes />
                        } />
                        <Route path="/buttons" component={() =>
                            <Buttons />
                        } />
                        <Route path="/lists" component={() =>
                            <Lists />
                        } />
                        <Route path="/forms" component={() =>
                            <Forms />
                        } />
                        <Route path="/tables" component={() =>
                            <Tables />
                        } />
                        <Route path="/grids" component={() =>
                            <Grids />
                        } />
                        <Route path="/codes" component={() =>
                            <Codes />
                        } />
                        <Route path="/utilities" component={() =>
                            <Todo {...{ stores, what: "utilities" }} />
                        } />
                        <Route path="/tips" component={() =>
                            <Todo {...{ stores, what: "tips" }} />
                        } />
                        <Route path="/browser-support" component={() =>
                            <Todo {...{ stores, what: "browser-support" }} />
                        } />
                        <Route path="/examples" component={() =>
                            <Todo {...{ stores, what: "examples" }} />
                        } />
                        <Route path="/contributing" component={() =>
                            <Contributing {...{ stores }} />
                        } />
                        <Route component={() => <div> Not Found</div>}></Route>
                    </Switch>
                </Router>
            </ContainerSection>

            <Footer {...{ stores }} />
        </Main>
    );
}
);