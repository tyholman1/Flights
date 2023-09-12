const React = require("react")

class New extends React.Component {
  render() { 
    const date = new Date();
    const futureDate = date.getDate() + 367;
    date.setDate(futureDate);
    const defaultValue = date.toLocaleDateString('en-CA');
    return (
      <div>
        <h1>Create a New Flight</h1>
        
        <form action="/flight" method="POST">
          Flight Name: <input type="text"  name="airline" /> <br />
          Flight Number: <input type="number" name="flightNo" /> <br />
          {/* Is Ready To Eat: <input type="checkbox" name="readyToEat" /> <br /> */}
          Flight Date <input type="datetime-locale" name="departs" defaultValue={defaultValue}/>
          <input type="submit" value="Create Flight" />
        </form>
        <nav>
          <a href="/flight">Back</a>
        </nav>
      </div>
    )
  }
}

module.exports = New