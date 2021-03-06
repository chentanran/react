import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import React from 'react'
import { HashRouter, Link } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd';
import Rouet from '../router'
import './style.css'

const { Header, Sider, Content } = Layout;

class SiderDemo extends React.Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" />
          <HashRouter>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Link to="/nav1">
                <Icon type="user" />
                <span>nav 1</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/nav2">
                <Icon type="video-camera" />
                <span>nav 2</span>
              </Link>
              
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/line1">
                <Icon type="upload" />
                <span>nav 3</span>
              </Link>
            </Menu.Item>
          </Menu>
          </HashRouter>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              background: '#fff',
              minHeight: 280,
            }}
          >
            <CSSTransitionGroup 
              transitionName="fade" 
              transitionEnterTimeout={500}
              transitionLeaveTimeout={200}>
              <Rouet></Rouet>
            </CSSTransitionGroup>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default SiderDemo