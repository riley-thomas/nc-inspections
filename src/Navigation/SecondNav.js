import React, { Component } from 'react';
import { Container, Nav, NavItem, NavLink, Breadcrumb, BreadcrumbItem } from 'reactstrap';

class SecondNav extends Component {


  renderBack() {
    if(this.props.back) {
      return (
        <NavItem>
          <NavLink className='text-white'>{this.props.back.label}</NavLink>
        </NavItem>     
      );
    }
    return;
  }
  renderNav() {
    if(this.props.navigation) {
      let items = this.props.navigation.map((v,k) => {
          return (
            <NavItem key={k}>
              <NavLink href={v.url} className={v.active ? 'text-white active' : 'text-white'}>{v.name}</NavLink>
            </NavItem>
          )
      });
      return (
        <Nav>
          {this.renderBack()}
          {items}
        </Nav>
      );
    }
    return;
  }

  renderCrumbs() {
    if(this.props.navigation) {
      let crumbs = this.props.navigation.map((v,k) => {
          if(v.active) {
            return (
              <BreadcrumbItem key={k} active>
                <a href={v.url} className='text-white'>{v.name}</a>
              </BreadcrumbItem>
            )
          }
          return (
            <BreadcrumbItem key={k} active>
              <a href={v.url} className='text-white'>{v.name}</a>
            </BreadcrumbItem>
          )
      });
      return (
        <Breadcrumb>
          {crumbs}
        </Breadcrumb>
      );
    }
    return;
  }

  render() {
    return (
        <Container fluid={true} className="topical-nav">
          {this.renderNav()}
        </Container>
    );
  }

}

export default SecondNav;