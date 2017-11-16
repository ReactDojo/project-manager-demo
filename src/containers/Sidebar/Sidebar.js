import React, { Component } from 'react';
import { connect } from 'react-redux';
import clone from 'clone';
import { Link } from 'react-router-dom';
import { Layout } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import Menu from '../../components/uielements/menu';
import IntlMessages from '../../components/utility/intlMessages';
import SidebarWrapper from './sidebar.style';

import appActions from '../../redux/app/actions';
import Logo from '../../components/utility/logo';
import { rtl } from '../../config/withDirection';

const { Sider } = Layout;
const {
  toggleOpenDrawer,
  changeOpenKeys,
  changeCurrent,
  toggleCollapsed,
} = appActions;
class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.onOpenChange = this.onOpenChange.bind(this);
  }
  handleClick(e) {
    this.props.changeCurrent([e.key]);
    if (this.props.app.view === 'MobileView') {
      setTimeout(() => {
        this.props.toggleCollapsed();
        this.props.toggleOpenDrawer();
      }, 100);
    }
  }
  onOpenChange(newOpenKeys) {
    const { app, changeOpenKeys } = this.props;
    const latestOpenKey = newOpenKeys.find(
      key => !(app.openKeys.indexOf(key) > -1)
    );
    const latestCloseKey = app.openKeys.find(
      key => !(newOpenKeys.indexOf(key) > -1)
    );
    let nextOpenKeys = [];
    if (latestOpenKey) {
      nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
    }
    if (latestCloseKey) {
      nextOpenKeys = this.getAncestorKeys(latestCloseKey);
    }
    changeOpenKeys(nextOpenKeys);
  }
  getAncestorKeys = key => {
    const map = {
      sub3: ['sub2'],
    };
    return map[key] || [];
  };

  renderView({ style, ...props }) {
    const viewStyle = {
      marginRight: rtl === 'rtl' ? '0' : '-17px',
      paddingRight: rtl === 'rtl' ? '0' : '9px',
      marginLeft: rtl === 'rtl' ? '-17px' : '0',
      paddingLeft: rtl === 'rtl' ? '9px' : '0',
    };
    return (
      <div className="box" style={{ ...style, ...viewStyle }} {...props} />
    );
  }

  render() {
    // const { url, app, toggleOpenDrawer, bgcolor } = this.props;
    const { url, app, toggleOpenDrawer, customizedTheme } = this.props;
    const collapsed = clone(app.collapsed) && !clone(app.openDrawer);
    const { openDrawer } = app;
    const mode = collapsed === true ? 'vertical' : 'inline';
    const onMouseEnter = event => {
      if (openDrawer === false) {
        toggleOpenDrawer();
      }
      return;
    };
    const onMouseLeave = () => {
      if (openDrawer === true) {
        toggleOpenDrawer();
      }
      return;
    };
    const scrollheight = app.height;
    const styling = {
      backgroundColor: customizedTheme.backgroundColor,
    };
    const submenuColor = {
      color: customizedTheme.textColor,
    };
    return (
      <SidebarWrapper>
        <Sider
          trigger={null}
          collapsible={true}
          collapsed={collapsed}
          width="240"
          className="isomorphicSidebar"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          style={styling}
        >
          <Logo collapsed={collapsed} />
          <Scrollbars
            renderView={this.renderView}
            style={{ height: scrollheight - 70 }}
          >
            <Menu
              onClick={this.handleClick}
              theme="dark"
              mode={mode}
              openKeys={collapsed ? [] : app.openKeys}
              selectedKeys={app.current}
              onOpenChange={this.onOpenChange}
              className="isoDashboardMenu"
            >
              <Menu.Item key="dashboard">
                <Link to={`/dashboard`}>
                  <span className="isoMenuHolder" style={submenuColor}>
                    <i className="ion-grid" />
                    <span className="nav-text">
                      <IntlMessages id="sidebar.dashboard" />
                    </span>
                  </span>
                </Link>
              </Menu.Item>

              <Menu.Item key="projects">
                <Link to={`${url}/projects`}>
                  <span className="isoMenuHolder" style={submenuColor}>
                    <i className="ion-clipboard" />
                    <span className="nav-text">
                      <IntlMessages id="sidebar.projects" />
                    </span>
                  </span>
                </Link>
              </Menu.Item>

              <Menu.Item key="tasks">
                <Link to={`${url}/tasks`}>
                  <span className="isoMenuHolder" style={submenuColor}>
                    <i className="ion-android-list" />
                    <span className="nav-text">
                      <IntlMessages id="sidebar.tasks" />
                    </span>
                  </span>
                </Link>
              </Menu.Item>

              <Menu.Item key="users">
                <Link to={`${url}/users`}>
                  <span className="isoMenuHolder" style={submenuColor}>
                    <i className="ion-android-person-add" />
                    <span className="nav-text">
                      <IntlMessages id="sidebar.users" />
                    </span>
                  </span>
                </Link>
              </Menu.Item>

              <Menu.Item key="youtubeSearch">
                <Link to={`${url}/youtubeSearch`}>
                  <span className="isoMenuHolder" style={submenuColor}>
                    <i className="ion-social-youtube" />
                    <span className="nav-text">
                      <IntlMessages id="sidebar.youtubeSearch" />
                    </span>
                  </span>
                </Link>
              </Menu.Item>

              <Menu.Item key="samplecode1">
                <Link to={`${url}/samplecode1`}>
                  <span className="isoMenuHolder" style={submenuColor}>
                    <i className="ion-code" />
                    <span className="nav-text">
                      <IntlMessages id="sidebar.samplecode1" />
                    </span>
                  </span>
                </Link>
              </Menu.Item>

              <Menu.Item key="samplecode2">
                <Link to={`${url}/samplecode2`}>
                  <span className="isoMenuHolder" style={submenuColor}>
                    <i className="ion-code" />
                    <span className="nav-text">
                      <IntlMessages id="sidebar.samplecode2" />
                    </span>
                  </span>
                </Link>
              </Menu.Item>

              <Menu.Item key="signout">
                <Link to={`/signin`}>
                  <span className="isoMenuHolder" style={submenuColor}>
                    <i className="ion-log-out" />
                    <span className="nav-text">
                      <IntlMessages id="sidebar.signout" />
                    </span>
                  </span>
                </Link>
              </Menu.Item>

            </Menu>
          </Scrollbars>
        </Sider>
      </SidebarWrapper>
    );
  }
}

export default connect(
  state => ({
    app: state.App.toJS(),
    customizedTheme: state.ThemeSwitcher.toJS().sidebarTheme,
  }),
  { toggleOpenDrawer, changeOpenKeys, changeCurrent, toggleCollapsed }
)(Sidebar);
