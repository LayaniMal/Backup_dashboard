//Header bar

import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Badge, UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavbarBrand } from 'reactstrap';
import PropTypes from 'prop-types';
import { AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/logo3.png'
import alert from '../../assets/img/brand/alert2.png'
//import alert1 from '../../assets/alert1.jpg';

const defaultProps = {};

const propTypes = {
  children: PropTypes.node,
};

class DefaultHeader extends Component {

  getCurrentDate = () => {

    var date = new Date();
    //cal date
    var datestring = "Last Updated : " + date.getDate() + "/"
      + (date.getMonth() + 1) + "/"
      + date.getFullYear() + " " + " at ";

    //cal hours
    var hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
    var am_pm = date.getHours() >= 12 ? "PM" : "AM";
    hours = hours < 10 ? "0" + hours : hours;

    //cal minutes
    var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();

    //cal seconds
    var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();

    //convert CST to IST
    var minutes = date.getMinutes();

    var time = datestring + hours + ":" + minutes + am_pm + " IST";

    console.log(time);

    var moment = require('moment-timezone');
    moment().tz("America/Chicago").format();

    var dateTime = moment.tz(datestring + hours + minutes, 'America/Chicago');

    console.log(dateTime);
    
    return time;

  }
  render() {
    //<NavbarBrand href="/" className="navbar-brand">Real-Time Backup Status Dashboard</NavbarBrand>

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>

        <AppSidebarToggler className="d-lg-none" display="md" mobile />

        <AppNavbarBrand

          full={{ src: logo, width: 40, height: 40, alt: 'CoreUI Logo' }}
          minimized={{ src: logo, width: 30, height: 30, alt: 'CoreUI Logo' }}

        />

        <AppSidebarToggler className="d-md-down-none" display="lg" />

        <Nav className="d-md-down-none" navbar>
          <Nav className="title">

            <h3>Real-Time Backup Status Dashboard</h3>
          </Nav>


        </Nav>
        <AppNavbarBrand

          full={{ src: alert, width: 50, height: 50, alt: 'CoreUI Alert' }}
          minimized={{ src: alert, width: 50, height: 50, alt: 'CoreUI Alert' }}

        />

        <Nav className="ml-auto" navbar>

        </Nav>


        <NavItem>

          <p className="last-updated-text">

            {this.getCurrentDate()}

          </p>
        </NavItem>



      </React.Fragment>

    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
