import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavLink } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import { Nav, NavItem, NavLink as BsNavLink } from 'reactstrap';
import * as actionCreators from '../actions/actionCreators';

class AsideVerticalTabs extends React.Component {
  clickCloseTabHandler (index, e) {
    e.preventDefault();

    this.props.asideTabClose(this.props.storeName, index);
  }

  clickSelectTabNameHandler (e) {
    e.target.setSelectionRange(0, e.target.value.length);
  }

  changeTabNameHandler (index, e) {
    e.preventDefault();

    this.props.asideTabRename(this.props.storeName, index, e.target.value);
  }

  renderAsideTabElement (tab, index) {
    const closeTabBtn = (index || this.props.tabList.length > 1) ? <FontAwesome name='times' onClick={this.clickCloseTabHandler.bind(this, index)} className='pull-right' /> : '';

    return (
      <NavItem key={index}>
        <NavLink to={`${this.props.linkBase}/${index}`}>
          <input type='text' placeholder='Enter Tab Name' value={tab.name}
            onClick={this.clickSelectTabNameHandler.bind(this)}
            onChange={this.changeTabNameHandler.bind(this, index)}
            className='j-aside-tab-name-input' />
          {closeTabBtn}
        </NavLink>
      </NavItem>
    );
  }

  render () {
    return (
      <div>
        <Nav vertical>
          {this.props.tabList.map(this.renderAsideTabElement.bind(this))}

          <NavItem>
            <BsNavLink href='#' onClick={() => this.props.asideTabNew(this.props.storeName)} className='text-center'>
                Add new tab &nbsp;
                <FontAwesome name='plus' />
            </BsNavLink>
          </NavItem>
        </Nav>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return state;
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

const AsideVerticalTabsConnect = connect(mapStateToProps, mapDispatchToProps)(AsideVerticalTabs);

export default AsideVerticalTabsConnect;
