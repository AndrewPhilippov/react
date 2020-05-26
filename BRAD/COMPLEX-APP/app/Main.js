// Base
import React, { useState, useReducer, useEffect } from 'react'
import ReactDOM                                   from 'react-dom'
import { useImmerReducer }                        from 'use-immer'
import { CSSTransition }                          from 'react-transition-group'
import { BrowserRouter, Switch, Route }           from 'react-router-dom'
import StateContext                               from './StateContext'
import DispatchContext                            from './DispatchContext'

// My Components
import CreatePost     from './components/CreatePost'
import EditPost       from './components/EditPost'
import Header         from './components/Header'
import HomeGuest      from './components/HomeGuest'
import Footer         from './components/Footer'
import About          from './components/About'
import Terms          from './components/Terms'
import Home           from './components/Home'
import ViewSinglePost from './components/ViewSinglePost'
import FlashMessages  from './components/FlashMessages'
import Profile        from './components/Profile'
import NotFound       from './components/NotFound'
import Search         from './components/Search'
import Chat           from './components/Chat'

// Axios
import Axios from 'axios'

Axios.defaults.baseURL = 'http://localhost:3333'

function Main () {

	const initialState = {
		loggedIn: Boolean(localStorage.getItem('appToken')),
		flashMessages: [],
		user: {
			token: localStorage.getItem('appToken'),
			username: localStorage.getItem('appUsername'),
			avatar: localStorage.getItem('appAvatar'),
		},
		isSearchOpen: false,
		isChatOpen: false,
		unreadChatCount: 0,
	}

	function ourReducer (draft, action) {
		switch (action.type) {
			case 'login':
				draft.loggedIn = true
				draft.user = action.data
				return
			case 'logout':
				draft.loggedIn = false
				return
			case 'flashMessage':
				draft.flashMessages.push(action.value)
				return
			case 'openSearch':
				draft.isSearchOpen = true
				return
			case 'closeSearch':
				draft.isSearchOpen = false
				return
			case 'toggleChat':
				draft.isChatOpen = !draft.isChatOpen
				return
			case 'closeChat':
				draft.isChatOpen = false
				return
			case 'incrementUnreadChatCount':
				draft.unreadChatCount++
				return
			case 'clearUnreadChatCount':
				draft.unreadChatCount = 0
				return
		}
	}

	const [state, dispatch] = useImmerReducer(ourReducer, initialState)

	useEffect(() => {
		if (state.loggedIn) {
			localStorage.setItem('appToken', state.user.token)
			localStorage.setItem('appUsername', state.user.username)
			localStorage.setItem('appAvatar', state.user.avatar)
		} else {
			localStorage.removeItem('appToken')
			localStorage.removeItem('appUsername')
			localStorage.removeItem('appAvatar')
		}
	}, [state.loggedIn])

	return (
		<StateContext.Provider value={ state }>
			<DispatchContext.Provider value={ dispatch }>
				<BrowserRouter>
					<FlashMessages messages={ state.flashMessages } />
					<Header />
					<Switch>
						<Route path={ '/' }
							   exact>
							{ state.loggedIn ? <Home /> : <HomeGuest /> }
						</Route>
						<Route path={ '/profile/:username' }>
							<Profile />
						</Route>
						<Route path={ '/about-us' }>
							<About />
						</Route>
						<Route path={ '/terms' }>
							<Terms />
						</Route>
						<Route path={ '/post/:id' }
							   exact>
							<ViewSinglePost />
						</Route>
						<Route path={ '/post/:id/edit' }
							   exact>
							<EditPost />
						</Route>
						<Route path={ '/create-post' }>
							<CreatePost />
						</Route>
						<Route>
							<NotFound />
						</Route>
					</Switch>
					<CSSTransition timeout={ 330 }
								   in={ state.isSearchOpen }
								   classNames={ 'search-overlay' }
								   unmountOnExit>
						<Search />
					</CSSTransition>
					<Chat />
					<Footer />
				</BrowserRouter>
			</DispatchContext.Provider>
		</StateContext.Provider>
	)
}

ReactDOM.render(<Main />, document.querySelector('#app'))

if (module.hot) {
	module.hot.accept()
}
