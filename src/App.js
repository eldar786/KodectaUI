import React, {Component} from 'react';
import './App.css';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import logo from './Kodecta.png';


const CustomInput = styled(TextField)`&&{width:100%}`



class App extends Component{
  state = {searchData:'', data:[]}
  //Get info od API, okida se prije rendera
  componentDidMount(){
    //() funk prije funk. setInterval 2 par
    //this.interval = setInterval(()=> this.tick(), 2000)
    

  }

  //tick(){
   // this.setState(state => ({seconds: state.seconds + 1}))
  //}

  handleChange = searchData => event => {
    console.log(event)
    this.setState({ [searchData]: event.target.value });
  };

  searchAPI = ()=>{
    const {searchData}=this.state
    const mainConst = 'http://localhost:8090';

        axios.get(`${mainConst}/media/artist/${searchData}`, {headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    },
    
    })
  .then( (response) => 
      this.setState({data:response.data})
  )
  .catch(function (error) {
    console.log(error);
  });
    
  }

  render(){
    
    const {searchData,data} = this.state 
    return (<div><img src={logo} alt="Logo" /><Grid container alignItems="center" spacing={16}>
    <Grid item md={10}>
    <CustomInput
          id="standard-name"
          label="Name"
          value={searchData}
          onChange={this.handleChange('searchData')}
        /></Grid>

    <Grid item md={2}><Button onClick={ this.searchAPI.bind(this)} variant="contained" color="primary">
        Search
      </Button></Grid>

    </Grid>
    <div>{data.map((item,k)=>(
      <div key={item.id}>
        {item.genre}
      </div>
    ))}</div>
    </div>
      )
  }
  
}


export default App;
