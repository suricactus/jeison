import React from 'react';
import { NavLink } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import { Nav, NavItem, NavLink as BsNavLink } from 'reactstrap';


export default class AsideVerticalTabs extends React.Component {

  clickCloseTabHandler(index, e) {
    e.preventDefault();

    const { editorCloseTab, history, match } = this.props;

    editorCloseTab(index);

    // if current opened tab is closed, go to the previous one
    // if(match.params.tabIndex == index + 1) {
      // history.goBack()
    // }
  }

  clickSelectTabNameHandler(e) {
    e.target.setSelectionRange(0, e.target.value.length);
  }


  changeTabNameHandler(index, e) {
    e.preventDefault();

    this.props.editorTabNameChange(index, e.target.value);
  }

  renderAsideTabElement(tab, index) {
    const closeTabBtn = (index || this.props.editors.length > 1) ? <FontAwesome name="times" onClick={this.clickCloseTabHandler.bind(this, index)} className="pull-right"/> : ''

    return (
      <NavItem key={index}>
        <NavLink to={`/editor/${index}`}>
          <input type="text" placeholder="Enter Tab Name" value={tab.name} 
          onClick={this.clickSelectTabNameHandler.bind(this)}
          onChange={this.changeTabNameHandler.bind(this, index)} 
          className="j-aside-tab-name-input" />
          {closeTabBtn}
        </NavLink>
      </NavItem>
    )
  }

  render() {
    return (
        <div>
          <Nav vertical>
            {this.props.editors.map(this.renderAsideTabElement.bind(this))}
            
            <NavItem>
              <BsNavLink href="#" onClick={() => this.props.editorAddNewTab()} className="text-center">
                Add new tab &nbsp;
                <FontAwesome name="plus"></FontAwesome>
              </BsNavLink>
            </NavItem>
          </Nav>
        </div>
      );
  }

}