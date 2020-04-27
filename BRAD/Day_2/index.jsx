function OurApp () {
    return (
        <>
            <OurHeader />
            <TimeArea />
            <ul>
                <Pet name={'Meowsalot'} species={'cat'} age={'5'} />
                <Pet name={'Barksalot'} species={'dog'} age={'2'} />
                <Pet name={'Fluffy'} species={'rabbit'} age={'3'} />
            </ul>
            <Footer />
        </>
    )
}

function Pet (props) {
    return <li>{props.name} is a {props.species} and is {props.age} years old.</li>
}

function OurHeader () {
    return <h1 className="special">Our amazing App header</h1>
}

function TimeArea () {
    return <p>The current time is {new Date().toLocaleString()}</p>
}

function Footer () {
    return <small>Copyright footer text</small>
}
setInterval(function () {
    ReactDOM.render(<OurApp />, document.querySelector("#app"))
}, 1000)
