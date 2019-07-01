import React from 'react';
import axios from 'axios'

const getUrl = 'http://127.0.0.1:8080/api/';

class Home extends React.Component {

  state = {

    tickets: ''

  }


  componentDidMount() {
    axios.get(getUrl)
      .then(response => {
        this.setState({ tickets: response.data })
        console.log("Ticket data:", response.data)
      })

  }

  render() {
    return (
      <div>Home page</div>
    )

  }
}


export default Home;
