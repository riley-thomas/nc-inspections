import React, { Component } from 'react';
import {Route, Redirect, Switch} from 'react-router-dom';
import Config from '../Config.js';
import SettingsFetcher from './SettingsFetcher';
import FacilityListPage from '../Facility/FacilityListPage';
import FacilityPage from '../Facility/FacilityPage';
import ActivityPage from '../Activity/ActivityPage';
import ReportPage from '../Reports/ReportPage';
import CountyListPage from '../County/CountyListPage';
import DownloaderPage from '../Downloader/DownloaderPage';
import CorporationPage from '../Corporation/CorporationPage';
import CorporationListPage from '../Corporation/CorporationListPage';
import Navibar from '../Navigation/Navibar';
import PageFooter from '../Footer/PageFooter';
import ErrorPage from '../Errors/ErrorPage';
import Head from '../Head/Head';
import ScrollUp from '../Utils/ScrollUp';
import Logger from '../Utils/Logger';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleOnlineChanged = this.handleOnlineChanged.bind(this);
    this.state = Config.default_app_state;
   }

	componentWillMount(){
    SettingsFetcher.get('online').then((record) => {
      return record;
    }).then((record) => {
      let online = record !== null ? (record === 1 ? true : false) : true;
      this.setState({online: (online && navigator.onLine)})
    }).then(()=> {
      this.setState({working: false}, () => { Logger.starting()}) 
    }).catch((e) => { console.log(e) });
  }


  handleOnlineChanged(value) {
      SettingsFetcher.put({ name : 'online', value : (value === true ? 1 : 0) })
      .then(()=>{ this.setState({online: value}, ()=>{ console.log('Online state changed to '+value) }) })
  }


  renderPage() {
    if(!this.state.working) {
    return (
      <div className="mb-5" id={this.location}>
        <Switch>
          <Redirect exact from="/" to="/facilities/1" />
          <Redirect exact from="/facilities" to="/facilities/1" />
          <Route exact path="/facilities/:page([1-9]{1}[0-9]{0,5})" render={ (r) =>
            <div>
              <Navibar appstate={this.state} route={r} onlineChanged={(v) => this.handleOnlineChanged(v)} />
              <FacilityListPage appstate={this.state} route={r} location={r.location} page={r.match.params.page} />
            </div>
          } />
          <Route exact path="/facility/:id([1-9]{1}[0-9]{0,8})" render={ (r) =>
            <div>
              <Navibar appstate={this.state} route={r} onlineChanged={(v) => this.handleOnlineChanged(v)} />
              <FacilityPage appstate={this.state} route={r} id={r.match.params.id} />
            </div>
          } />
          <Route exact path="/facility/:id([0-9]{3}-[0-9]{2}-[0-9]{4,5})" render={ (r) => 
          	<div>
          		<Navibar path={r.location.path} appstate={this.state} route={r} onlineChanged={(v) => this.handleOnlineChanged(v)} />
            	<FacilityPage appstate={this.state} route={r} id={r.match.params.id} />
            </div>
          } />
          <Route exact path="/activity/:id([1-9]{1}[0-9]{0,8})" render={ (r) =>
            <div>
              <Navibar appstate={this.state} route={r} onlineChanged={(v) => this.handleOnlineChanged(v)} />
              <ActivityPage appstate={this.state} route={r} />
            </div>
          } />
          {/* <Route path="/facility/:id([1-9]{1}[0-9]{0,8})" component={FacilityPage} /> */}
          {/*<Route path="/activity/:id([1-9]{1}[0-9]{0,8})" component={ActivityPage} /> */}

          <Route path="/reports" render={(r) =>
            <div>
              <Navibar appstate={this.state} route={r} onlineChanged={(v) => this.handleOnlineChanged(v)} />
              <ReportPage appstate={this.state} />
            </div>
          } />
          <Route path="/counties" render={(r) =>
            <div>
              <Navibar appstate={this.state} route={r} onlineChanged={(v) => this.handleOnlineChanged(v)} />
              <CountyListPage appstate={this.state} />
            </div>
          } />
          <Route path="/download" render={ (r) =>
            <div>
              <Navibar appstate={this.state} route={r} onlineChanged={(v) => this.handleOnlineChanged(v)} />
              <DownloaderPage appstate={this.state} />
            </div>
          } />
          <Route exact path="/corporations" render={ (r) =>
            <div>
              <Navibar appstate={this.state} route={r} onlineChanged={(v) => this.handleOnlineChanged(v)} />
              <CorporationListPage appstate={this.state} />
            </div>
          } />
          <Route exact path="/corporation/:id([1-9]{1}[0-9]{0,6})" render={ (r) =>
            <div>
              <Navibar appstate={this.state} route={r} onlineChanged={(v) => this.handleOnlineChanged(v)} />
              <CorporationPage appstate={this.state} route={r} id={r.match.params.id} />
            </div>
          } />
          <Route component={ErrorPage} />
        </Switch>
      </div>
    );
    }
  }

  render() {
    return (
      <div>
        <Head />
        {this.renderPage() }
        <ScrollUp />
        <PageFooter appstate={this.state} />
      </div>
    );
  }
}

export default App;
