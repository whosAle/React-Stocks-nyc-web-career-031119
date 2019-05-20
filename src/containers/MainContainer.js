import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

const STOCKS_URL = "http://localhost:3000/stocks";


class MainContainer extends Component {

  //set up initial state
  state = {stocks: [], sort: null, filter: null};

  //on mount actions
  componentDidMount(){
    fetch(STOCKS_URL)
      .then(resp => resp.json())
      .then(data => this.setState({stocks: data}))
  };

/***** Event Handlers *******/
  handleStockClick = id => {
    const stock = this.state.stocks.find(stock => stock.id === id)
    stock.owned ? !stock.owned : stock.owned = true
    this.setState({stocks: this.state.stocks})
  }

  handleSearchClick = (e, key) => {
    // debugger
    // e.target.checked = true;
    this.setState({sort: key})
  }

  handleFilterSelect = (type) => this.setState({filter: type})

/***** additional helper methods *******/
  sortStocks = (stocks, key) => {
    return stocks.sort((a,b) => a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0)
  }

  filterStocks = (stocks) => {

    return stocks.filter(stock => stock.type == this.state.filter)
  }

/***** Renda!! *******/
  render() {
    console.log(this.state);
    const ownedStocks = this.state.stocks.filter(stock => stock.owned);

    let availableStocks = this.state.stocks.filter(stock => !stock.owned);
    switch (this.state.sort) {
      case "Alphabetically":
        this.sortStocks(availableStocks, "ticker");
        break;
      case "Price":
        this.sortStocks(availableStocks, "price");
        break;
    }

    if (this.state.filter) {
      availableStocks = this.filterStocks(availableStocks);
    }
    console.log("after filter", availableStocks);

    return (
      <div>
        <SearchBar onSearchClick={this.handleSearchClick} onFilterSelect={this.handleFilterSelect} sort={this.state.sort}/>

          <div className="row">
            <div className="col-8">

              <StockContainer stocks={availableStocks} onStockClick={this.handleStockClick}/>

            </div>
            <div className="col-4">

              <PortfolioContainer stocks={ownedStocks}/>

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
