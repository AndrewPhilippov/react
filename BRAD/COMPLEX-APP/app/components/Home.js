import React, { useEffect, useContext } from 'react'
import Page                             from './Page'
import { useImmer }                     from 'use-immer'
import LoadingDotsIcon                  from './LoadingDotsIcon'
import Post                             from './Post'
import { Link }                         from 'react-router-dom'
import Axios                            from 'axios'
import StateContext                     from '../StateContext'
import DispatchContext                  from '../DispatchContext'

function Home () {
	const appDispatch = useContext(DispatchContext)
	const appState = useContext(StateContext)
	const [state, setState] = useImmer({
										   isLoading: true,
										   feed: [],
									   })

	useEffect(() => {
		const ourRequest = Axios.CancelToken.source()

		async function fetchData () {
			try {
				const response = await Axios.post(`/getHomeFeed`, { token: appState.user.token }, { cancelToken: ourRequest.token })
				setState(draft => {
					draft.isLoading = false
					draft.feed = response.data
				})
			} catch (e) {
				console.log('There was a problem.')
			}
		}

		fetchData()
		return () => {
			ourRequest.cancel()
		}
	}, [])

	function firstCapital (word) {
		return word.charAt(0).toUpperCase() + word.slice(1)
	}

	if (state.isLoading) {
		return <LoadingDotsIcon />
	}

	return (
		<Page title={ 'Your Feed' }>
			<div className="container container--narrow py-md-5">
				{ state.feed.length && (
					<>
						<h2 className={ 'text-center mb-4' }>The Latest from Those You Follow</h2>
						<div className="list-group">
							{ Boolean(state.feed.length) && (
								<div className="list-group shadow-sm">
									<div className="list-group-item active">
										<strong></strong> { state.feed.length } { state.feed.length > 1 ? 'posts ' : 'post ' }
										from
										those you follow
									</div>
									{ state.feed.map(post => {
										return <Post post={ post }
													 key={ post._id } />
									}) }
								</div>
							) }
						</div>
					</>
				) }
				{ state.feed.length === 0 && (
					<>
						<h2 className="text-center">Hello <strong>{ firstCapital(appState.user.username) }</strong>,
													your
													feedis empty.</h2>
						<p className="lead text-muted text-center">Your feed displays the latest posts from the people
																   you
																   follow.
																   If you don&rsquo;t have any friends to follow
																   that&rsquo;s
																   okay; you can use
																   the &ldquo;Search&rdquo; feature in the top menu bar
																   to find
																   content written by people with similar
																   interests and then follow them.</p>
					</>
				) }
			</div>
		</Page>
	)
}

export default Home
