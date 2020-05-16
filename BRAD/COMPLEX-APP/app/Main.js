import React, { useState }              from 'react'
import ReactDOM                         from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import CreatePost                       from './components/CreatePost'
import Header                           from './components/Header'
import HomeGuest                        from './components/HomeGuest'
import Footer                           from './components/Footer'
import About                            from './components/About'
import Terms                            from './components/Terms'
import Home                             from './components/Home'
import ViewSinglePost                   from './components/ViewSinglePost'
import FlashMessages                    from './components/FlashMessages'
import Axios                            from 'axios'

Axios.defaults.baseURL = 'http://localhost:3333'

function Main () {
    const [ loggedIn, setLoggedIn ] = useState( Boolean( localStorage.getItem( 'appToken' ) ) )
    const [ flashMessages, setFlashMessages ] = useState( [] )

    function addFlashMessage (msg) {
        setFlashMessages( prev => prev.concat( msg ) )
    }

    return (
        <BrowserRouter>
            <FlashMessages messages={ flashMessages } />
            <Header loggedIn={ loggedIn }
                    setLoggedIn={ setLoggedIn } />
            <Switch>
                <Route path={ '/' }
                       exact>
                    { loggedIn ? <Home /> : <HomeGuest /> }
                </Route>
                <Route path={ '/about-us' }>
                    <About />
                </Route>
                <Route path={ '/terms' }>
                    <Terms />
                </Route>
                 <Route path={ '/post/:id' }>
                    <ViewSinglePost />
                </Route>
                <Route path={ '/create-post' }>
                    <CreatePost addFlashMessage={ addFlashMessage } />
                </Route>
            </Switch>
            <Footer />
        </BrowserRouter>
    )
}

ReactDOM.render( <Main />, document.querySelector( '#app' ) )

if ( module.hot ) {
    module.hot.accept()
}
