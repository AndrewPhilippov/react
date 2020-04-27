const pets = [
    { name: "Meowsalot", species: "cat", age: "5", id: 123456789 },
    { name: "Barksalot", species: "dog", age: "3", id: 987654321 },
    { name: "Fluffy", species: "rabbit", age: "2", id: 123123123 },
    { name: "Purrsloud", species: "cat", age: "1", id: 456456456 },
    { name: "Paws", species: "dog", age: "6", id: 789789789 }
]

function OurApp() {
    return (
        <>
            <OurHeader />
            <TimeArea />
            <ul>
                {pets.map(pet => <Pet name={pet.name} species={pet.species} age={pet.age} key={pet.id} />)}
            </ul>
            <Footer />
        </>
    )
}

function Pet(props) {
    return <li>{props.name} is a {props.species} and is {props.age} years old.</li>
}

function Footer() {
    return <small>Copyright Footer Text</small>
}

function TimeArea() {
    return <p>The current time is {new Date().toLocaleString()}.</p>
}

function OurHeader() {
    return <h1 className="special">Our Amazing App Header</h1>
}

setInterval(function() {
    ReactDOM.render(<OurApp />, document.querySelector("#app"))
}, 1000)
