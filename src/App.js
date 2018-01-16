import React, { Component } from 'react';
import logo from './mainStreetAuto.svg';
import axios from 'axios';
import './App.css';

// Toast notification dependencies
import { ToastContainer, toast } from 'react-toastify';

class App extends Component {
  constructor( props ) {
    super( props );

    this.state = {
      vehiclesToDisplay: [],
      buyersToDisplay: []
    };

    this.getVehicles = this.getVehicles.bind( this );
    this.getPotentialBuyers = this.getPotentialBuyers.bind( this );
    this.sellCar = this.sellCar.bind( this );
    this.addCar = this.addCar.bind( this );
    this.filterByColor = this.filterByColor.bind( this );
    this.filterByMake = this.filterByMake.bind( this );
    this.addBuyer = this.addBuyer.bind( this );
    this.nameSearch = this.nameSearch.bind( this );
    this.resetData = this.resetData.bind( this );
    this.byYear = this.byYear.bind( this );
    this.deleteBuyer = this.deleteBuyer.bind( this );
  }

  getVehicles() {
    // axios (GET)
    // setState with response -> vehiclesToDisplay
    axios.get('http://joes-autos.herokuapp.com/api/vehicles')
    .then((resp)=>{
      this.setState({
        vehiclesToDisplay: resp.data
      })
      toast.success('Successfully got vehicles')
    }).catch((error)=>{
      console.error(error);
      toast.error('Failed to get vehicles');
    })
  }

  getPotentialBuyers() {
    // axios (GET)
    // setState with response -> buyersToDisplay
    axios.get('http://joes-autos.herokuapp.com/api/buyers')
    .then((resp)=>{
      this.setState({
        buyersToDisplay: resp.data
      })
      toast.success('Successfully got buyers')
    }).catch((error)=>{
      console.error(error);
      toast.error('Failed to get buyers');
    })
  }

  sellCar( id ) {
    // axios (DELETE)
    // setState with response -> vehiclesToDisplay
    axios.delete(`http://joes-autos.herokuapp.com/api/vehicles/${id}`)
    .then((resp)=>{
      this.setState({
        vehiclesToDisplay:resp.data.vehicles
      })
      toast.success('Car sucessfully sold')
    }).catch((error)=>{
      console.log(error);
      toast.error('Failed to sell car');
    })
  }

  filterByMake() {
    let make = this.refs.selectedMake.value;

    // axios (GET)
    // setState with response -> vehiclesToDisplay
    axios.get(`http://joes-autos.herokuapp.com/api/vehicles?make=${make}`)
    .then((resp)=>{
      this.setState({
        vehiclesToDisplay:resp.data
      })
      toast.success('Successfully filtered vehicles')
    }).catch((error)=>{
      console.log(error);
      toast.error('Failed to filter vehicles')
    })
  }

  filterByColor() {
    let color = this.refs.selectedColor.value;

    // axios (GET)
    // setState with response -> vehiclesToDisplay
    axios.get(`http://joes-autos.herokuapp.com/api/vehicles?color=${color}`)
    .then((resp)=>{
      this.setState({
        vehiclesToDisplay:resp.data
      })
      toast.success('Successfully filtered vehicles')
    }).catch((error)=>{
      console.log(error);
      toast.error('Failed to filter vehicles')
    })
  }

  updatePrice( priceChange, id ) {
    // axios (PUT)
    // setState with response -> vehiclesToDisplay
    axios.put(`http://joes-autos.herokuapp.com/api/vehicles/${id}/${priceChange}`)
    .then((resp)=>{
      this.setState({
        vehiclesToDisplay:resp.data.vehicles
      })
      toast.success('Updated Price')
    }).catch((error)=>{
      console.log(error);
      toast.error('Failed to update price')
    })
  }

  addCar() {
    let newCar = {
      make: this.refs.make.value,
      model: this.refs.model.value,
      color: this.refs.color.value,
      year: this.refs.year.value*1,
      price: this.refs.price.value*1
    };

    // axios (POST)
    // setState with response -> vehiclesToDisplay
    axios.post('http://joes-autos.herokuapp.com/api/vehicles', newCar)
    .then((resp)=>{
      this.setState({
        vehiclesToDisplay:resp.data.vehicles
      })
      toast.success('Added new vehicle')
    }).catch((error)=>{
      console.log(error);
      toast.error('Failed to add new vehicle')
    })
  }

  addBuyer() {
    let newBuyer ={
      name: this.refs.name.value,
      phone: this.refs.phone.value,
      address: this.refs.address.value
    };

    //axios (POST)
    // setState with response -> buyersToDisplay
    axios.post('http://joes-autos.herokuapp.com/api/buyers', newBuyer)
    .then((resp)=>{
      this.setState({
        buyersToDisplay:resp.data.buyers
      })
      toast.success('Added new buyer')
    }).catch((error)=>{
      console.log(error);
      toast.error('Failed to add new buyers')
    })
  }

  deleteBuyer( id ) {
    // axios (DELETE)
    //setState with response -> buyersToDisplay
    axios.delete(`http://joes-autos.herokuapp.com/api/buyers/${id}`)
    .then((resp)=>{
      this.setState({
        buyersToDisplay:resp.data.buyers
      })
      toast.success('Buyer sucessfully removed')
    }).catch((error)=>{
      console.log(error);
      toast.error('Failed to remove buyer');
    })
  }

  nameSearch() {
    let searchLetters = this.refs.searchLetters.value;

    // axios (GET)
    // setState with response -> buyersToDisplay
    axios.get(`http://joes-autos.herokuapp.com/api/buyers?name=${searchLetters}`)
    .then((resp)=>{
      this.setState({
        buyersToDisplay:resp.data
      })
      toast.success('Successfully filtered buyers')
    }).catch((error)=>{
      console.log(error);
      toast.error('Failed to filter buyers')
    })
  }

  byYear() {
    let year = this.refs.searchYear.value;

    // axios (GET)
    // setState with response -> vehiclesToDisplay
    axios.get(`http://joes-autos.herokuapp.com/api/vehicles?year=${year}`)
    .then((resp)=>{
      this.setState({
        vehiclesToDisplay:resp.data
      })
      toast.success('Successfully filtered vehicles')
    }).catch((error)=>{
      console.log(error);
      toast.error('Failed to filter vehicles')
    })
  }

  // Do not edit the code below
  resetData( dataToReset ) {
    axios.get('https://joes-autos.herokuapp.com/api/' + dataToReset + '/reset').then( res => {
      if ( dataToReset === 'vehicles' ) {
        this.setState({ vehiclesToDisplay: res.data.vehicles });
      } else {
        this.setState({ buyersToDisplay: res.data.buyers });
      }
    });
  }
  // Do not edit the code above

  render() {
    const vehicles = this.state.vehiclesToDisplay.map( v => {
      return (
        <div key={ v.id }>
          <p>Make: { v.make }</p>
          <p>Model: { v.model }</p>
          <p>Year: { v.year }</p>
          <p>Color: { v.color }</p>
          <p>Price: { v.price }</p>

          <button className='btn btn-sp'
                  onClick={ () => this.updatePrice( 'up', v.id ) }>
            Increase Price
          </button>

          <button className='btn btn-sp'
                  onClick={ () => this.updatePrice( 'down', v.id ) }>
            Decrease Price
          </button>

          <button className='btn btn-sp'
                  onClick={ () => this.sellCar( v.id ) }>
            SOLD!
          </button>
          
          <hr className='hr' />
        </div> 
      )
    });

    const buyers = this.state.buyersToDisplay.map( person => {
      return (
        <div key={ person.id }>
          <p>Name: { person.name }</p>
          <p>Phone: { person.phone }</p>
          <p>Address: { person.address }</p>

          <button className='btn' 
                  onClick={ () => { this.deleteBuyer( person.id ) } }>
            No longer interested
          </button>

          <hr className='hr' />
        </div> 
      )
    });

    return (
      <div className=''>
        <ToastContainer />
        
        <header className='header'>
          <img src={ logo } alt=""/>

          <button className="header-btn1 btn"
                  onClick={ () => this.resetData( 'vehicles' ) }>
            Reset Vehicles
          </button>

          <button className='header-btn2 btn'
                  onClick={ () => this.resetData( 'buyers' ) }>
            Reset Buyers
          </button>
        </header>

        <div className='btn-container'>
          <button className='btn-sp btn' 
                  onClick={ this.getVehicles }>
            Get All Vehicles
          </button>

          <select onChange={ this.filterByMake }
                  ref='selectedMake'
                  className='btn-sp'
                  value="">
            <option value="" disabled>Filter by make</option>
            <option value="Suzuki">Suzuki</option>
            <option value="GMC">GMC</option>
            <option value="Ford">Ford</option>
            <option value="Volkswagen">Volkswagen</option>
            <option value="Chevrolet">Chevrolet</option>
            <option value="Mercedes-Benz">Mercedes-Benz</option>
            <option value="Cadillac">Cadillac</option>
            <option value="Dodge">Dodge</option>
            <option value="Chrysler">Chrysler</option>
          </select>

          <select ref='selectedColor'
                  onChange={ this.filterByColor }
                  className='btn-sp'
                  value="">
            <option value="" disabled>Filter by color</option>
            <option value="red">Red</option>
            <option value="green">Green</option>
            <option value="Purple">Purple</option>
            <option value="indigo">Indigo</option>
            <option value="violet">Violet</option>
            <option value="teal">Teal</option>
          </select>

          <input  onChange={ this.nameSearch }
                  placeholder='Search by name'
                  type="text"
                  ref='searchLetters' />

           <input ref='searchYear'
                  className='btn-sp'
                  type='number'
                  placeholder='Year' />

          <button onClick={ this.byYear }
                  className='btn-inp'>
            Go
          </button>

          <button className='btn-sp btn'
                  onClick={ this.getPotentialBuyers }>
            Get Potential Buyers
          </button>
        </div> 

        <br />

        <p className='form-wrap'>
          <input className='btn-sp' placeholder='make' ref="make" />
          <input className='btn-sp' placeholder='model' ref='model' />
          <input type='number' className='btn-sp' placeholder='year' ref='year' />
          <input className='btn-sp' placeholder='color' ref='color' />
          <input type='number' className='btn-sp' placeholder='price' ref='price' />

          <button className='btn-sp btn'
                  onClick={ this.addCar }>
            Add vehicle
          </button>
        </p>

        <p className='form-wrap'>
          <input className='btn-sp' placeholder='name' ref='name' />
          <input className='btn-sp' placeholder='phone' ref='phone' />
          <input className='btn-sp' placeholder='address' ref='address' />

          <button onClick={ this.addBuyer }
                  className='btn-sp btn' >
            Add buyer
          </button>
        </p>
        
        <main className='main-wrapper'>
          <section className='info-box'> 
            <h3>Inventory</h3>

            { vehicles }
          </section>

          <section className='info-box'>
            <h3>Potential Buyers</h3>

            { buyers }
          </section>
        </main>
      </div>
    );
  }
}

export default App;
