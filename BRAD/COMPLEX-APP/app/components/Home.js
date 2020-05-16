import React, { useEffect } from 'react';
import Page                 from './Page'

function Home (props) {
    function firstCapital (word) {
        return word.charAt(0).toUpperCase() + word.slice(1)
    }
    return (
        <Page title={ 'Your Feed' }>
            <div className="container container--narrow py-md-5">
                <h2 className="text-center">Hello <strong>{ firstCapital(localStorage.getItem( 'appUsername' )) }</strong>, your feed
                    is empty.</h2>
                <p className="lead text-muted text-center">Your feed displays the latest posts from the people you
                    follow.
                    If you don&rsquo;t have any friends to follow that&rsquo;s okay; you can use
                    the &ldquo;Search&rdquo; feature in the top menu bar to find content written by people with similar
                    interests and then follow them.</p>
            </div>
        </Page>
    );
}

export default Home;
