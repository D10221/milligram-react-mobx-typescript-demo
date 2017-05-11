import * as React from "react";
import { observer } from "mobx-react";

import {
    Main,Container
} from "./elements/index";

// Components:
import { MainNav } from "./components/navigation";
import { Footer } from "./components/footer";

// Pages/Route's View:
import { Home } from "./pages/home";
import { Todo } from "./pages/todo";
import { Contributing } from "./pages/contributing";


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
            <MainNav stores={stores} />

            <Container style={{minHeight: "100em"}}>

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
                            <Todo {...{ stores, what: "typography" }} />
                        } />
                        <Route path="/blockquotes" component={() =>
                            <Todo {...{ stores, what: "blockquotes" }} />
                        } />
                        <Route path="/buttons" component={() =>
                            <Todo {...{ stores, what: "buttons" }} />
                        } />
                        <Route path="/lists" component={() =>
                            <Todo {...{ stores, what: "lists" }} />
                        } />
                        <Route path="/forms" component={() =>
                            <Todo {...{ stores, what: "forms" }} />
                        } />
                        <Route path="/tables" component={() =>
                            <Todo {...{ stores, what: "tables" }} />
                        } />
                        <Route path="/grids" component={() =>
                            <Todo {...{ stores, what: "grids" }} />
                        } />
                        <Route path="/codes" component={() =>
                            <Todo {...{ stores, what: "codes" }} />
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
            </Container>

            <Footer {...{ stores }} />
        </Main>
    );
}
);