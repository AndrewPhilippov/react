import React, { useEffect, useState } from 'react'
import Axios                          from 'axios'
import { useParams, Link }            from 'react-router-dom'
import LoadingDotsIcon                from './LoadingDotsIcon'
import Post                           from './Post'

function ProfilePosts () {
	const { username } = useParams()
	const [isLoading, setIsLoading] = useState(true)
	const [posts, setPosts] = useState([])

	useEffect(() => {
		const ourRequest = Axios.CancelToken.source()


		async function fetchPosts () {
			try {
				const response = await Axios.get(`/profile/${ username }/posts`, { cancelToken: ourRequest.token })
				setPosts(response.data)
				setIsLoading(false)
			} catch (e) {
				Console.log('There was a problem or the request was canceled')
			}
		}

		fetchPosts()
		return () => {
			ourRequest.cancel()
		}
	}, [username])

	if (isLoading) return <div><LoadingDotsIcon /></div>

	return (
		<div className="list-group">
			{ posts.map(post => {
				return <Post post={ post }
							 noAuthor={ true }
							 key={ post._id } />
			}) }
		</div>
	)
}

export default ProfilePosts
