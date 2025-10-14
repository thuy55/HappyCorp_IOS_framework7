import React, { useState, useEffect } from 'react';
import { getDevice } from 'framework7/lite-bundle';
import {
  f7,
  f7ready,
  App,
  Panel,
  Views,
  View,
  Popup,
  Page,
  Navbar,
  Toolbar,
  NavRight,
  Link,
  Block,
  BlockTitle,
  LoginScreen,
  LoginScreenTitle,
  List,
  ListItem,
  ListInput,
  ListButton,
  BlockFooter,
  Icon,
  Card,
  NavLeft,
  NavTitle,
  Button
} from 'framework7-react';

import capacitorApp from '../js/capacitor-app';
import routes from '../js/routes';
import store from '../js/store';
import PageTransition from './PageTransition';

import '../css/app.less';
const MyApp = () => {
  useEffect(() => {
  const token = localStorage.getItem("HappyCorp-token-app");
  if (token) {
    f7.views.main.router.navigate("/home/");
  } else {
    f7.views.main.router.navigate("/login/");
  }
}, []);
  // Login screen demo data
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const device = getDevice();
  // Framework7 Parameters
  const f7params = {
    name: 'HAPPYCORP_7', // App name
    theme: 'auto', // Automatic theme detection
    // App store
    store: store,
    // App routes
    routes: routes,
    pushState: true,


    // Input settings
    input: {
      scrollIntoViewOnFocus: device.capacitor,
      scrollIntoViewCentered: device.capacitor,
    },
    // Capacitor Statusbar settings
    statusbar: {
      iosOverlaysWebView: true,
      androidOverlaysWebView: false,
    },
  };
  const alertLoginData = () => {
    f7.dialog.alert('Username: ' + username + '<br>Password: ' + password, () => {
      f7.loginScreen.close();
    });
  }
  f7ready(() => {
    const splash = document.getElementById('splash-screen');
    if (splash) {
      splash.style.opacity = 0;
      setTimeout(() => splash.remove(), 300); // animation ẩn dần
    }
    // Init capacitor APIs (see capacitor-app.js)
    if (f7.device.capacitor) {
      capacitorApp.init(f7);
    }
    // Call F7 APIs here
  });
  const [selected, setSelected] = useState('home');

  const [activeTab, setActiveTab] = useState('home');

  // Custom tab data
  useEffect(() => {
    import('https://cdn.lordicon.com/lordicon.js');
  }, []);

  // const currentPath = f7?.views.main.router.currentRoute.path;
  // console.log('Current path:', f7?.currentRoute?.path);

  useEffect(() => {
    f7ready(() => {
      console.log('Current path:', f7.views.main.router.currentRoute.path);
    });
  }, []);
  // f7.views.main.router.navigate('/endow-detal/');

  const [currentPath, setCurrentPath] = useState("home");
  // f7.views.main.router.navigate('/endow-detal/');
  function handleActive(e) {
    f7ready(() => {
      chuyentrang(e);
      setCurrentPath(e);
      console.log('Current path:', e);
    });
  }

  const getIconColor = (tabName) => {
  return currentPath === tabName
    ? 'primary:#1fc5f7,secondary:#1fc5f7'
    : 'primary:#999999,secondary:#999999';
};

function chuyentrang(e){
   f7.panel.close('left');
  
  setTimeout(() => {
    // f7.views.main.router.navigate(`/${e}/`);
    
    // Force activate corresponding tab
    setTimeout(() => {
      if (e === 'home') {
        f7.tab.show('#view-home');
      } else if (e === 'account') {
        f7.tab.show('#view-account');
      } else if (e === 'menu') {
        f7.tab.show('#view-menu');
      } else if (e === 'history') {
        f7.tab.show('#view-history');
      } else if (e === 'social') {
        f7.tab.show('#view-social');
      }else {
        f7.views.main.router.navigate(`/${e}/`);
      }
      
      setCurrentPath(e);
      console.log('Navigated and activated tab:', e);
    }, 50);
    
  }, 100);
  
}
let token = localStorage.getItem("a-token");
console.log(258, localStorage.getItem("a-token"));

function Logout() {
  console.log("dang xuat");
  
  f7.dialog.alert("Bạn có muốn đăng xuất?", 'Đăng xuất', () => {
    localStorage.removeItem("HappyCorp-token-app");
    localStorage.removeItem("HappyCorp-token-active");
    localStorage.removeItem("HappyCorp-token-phone");
    localStorage.removeItem("HappyCorp-token-name");
    localStorage.removeItem("HappyCorp-token-avatar");
    localStorage.removeItem("HappyCorp-token-email");
    localStorage.removeItem("HappyCorp-id-account");
    localStorage.removeItem("happyCorp_brand");
    localStorage.removeItem("happyCorp_brand_name");
    localStorage.removeItem("HappyCorp-token-app");
    // window.location.href = '/login/';
    f7.views.main.router.navigate('/login/', { reloadCurrent: true, clearPreviousHistory: true });
    f7.panel.close('left');
    setCurrentPath('login');
    setSelected('login');
    console.log('Navigated to login and cleared history');
  
  
  });
  
}


//Chế độ sáng tối
//  const [dark, setDark] = useState(false);

//   useEffect(() => {
//     const savedTheme = localStorage.getItem("theme");
//     console.log("aaa",savedTheme);
    
//     if (savedTheme === null){
//       setDark(true);
//       document.documentElement.classList.add("dark");
//       localStorage.setItem("theme", "dark");
//     }
//     if (savedTheme === "dark") {
//       setDark(true);
//       document.documentElement.classList.add("dark");
//     }
//     if (savedTheme === "light") {
//       setDark(false);
//       document.documentElement.classList.remove("dark");
//     }

//   }, []);

//   const setLightTheme = () => {
//     setDark(false);
//     document.documentElement.classList.remove("dark");
//     localStorage.setItem("theme", "light");
//   };

//   const setDarkTheme = () => {
//     setDark(true);
//     document.documentElement.classList.add("dark");
//     localStorage.setItem("theme", "dark");
//   };




  return (
    <App {...f7params} theme="auto" routes={routes} safeAreas>
      {/* Views/Tabs container */}
       {localStorage.getItem("HappyCorp-token-app") ? (
<Views id="main-view" main tabs className="safe-areas">
        <Toolbar tabbar icons bottom className='custom-tabbar'>
          <Link tabLink="#view-home" onClick={()=>{handleActive("home")}} tabLinkActive className={currentPath === 'home' ? 'tab-selected' : 'ion-tab-button-custom'} >
            <lord-icon
              src="https://cdn.lordicon.com/jeuxydnh.json"
              trigger={currentPath === 'home' ? 'loop' : 'none'}
              colors={getIconColor('home')}
              className=' me-1'
              >
            </lord-icon>
            <div  style={{ fontSize: "11px", fontWeight:"bold"}} >Home</div>
          </Link>
          <Link tabLink="#view-menu" onClick={()=>{handleActive("menu")}} className={currentPath === 'menu' ? 'tab-selected' : 'ion-tab-button-custom'}>
            <lord-icon
              src="https://cdn.lordicon.com/yvgmrqny.json"
              trigger={currentPath === 'menu' ? 'loop' : 'none'}
              colors={getIconColor('menu')}
              className=' me-1'
              >
            </lord-icon>
            <div  style={{ fontSize: "11px", fontWeight:"bold" }}>Menu</div>
          </Link>
          <Link tabLink="#view-history" onClick={()=>{handleActive("history")}} className={currentPath === 'history' ? 'tab-selected' : 'ion-tab-button-custom'}>
            <lord-icon
              src="https://cdn.lordicon.com/rrbmabsx.json"
              trigger={currentPath === 'history' ? 'loop' : 'none'}
              colors={getIconColor('history')}
              className=' me-1'
              >
            </lord-icon>
            <div  style={{ fontSize: "11px", fontWeight:"bold" }}>History</div>
          </Link>
          <Link tabLink="#view-social" onClick={()=>{handleActive("social")}} className={currentPath === 'social' ? 'tab-selected' : 'ion-tab-button-custom'}>
            <lord-icon
              src="https://cdn.lordicon.com/cfoaotmk.json"
              trigger={currentPath === 'social' ? 'loop' : 'none'}
              colors={getIconColor('social')}
              className=' me-1'
              >
            </lord-icon>
            <div  style={{ fontSize: "11px", fontWeight:"bold" }}>Social</div>
          </Link>
          <Link tabLink="#view-account" onClick={()=>{handleActive("account")}} className={currentPath === 'account' ? 'tab-selected' : 'ion-tab-button-custom'}>
            <lord-icon
              src="https://cdn.lordicon.com/kdduutaw.json"
              trigger={currentPath === 'account' ? 'loop' : 'none'}
              colors={getIconColor('account')}
              className=' me-1'
              >
            </lord-icon>
            <div  style={{ fontSize: "11px", fontWeight:"bold" }}>Account</div>
          </Link>
        </Toolbar>
        <View id="view-home" main tab tabActive url="/home/" pushState={true} />
        <View id="view-menu"  tab url="/menu/" pushState={true} />
        <View id="view-history"  tab url="/history/" pushState={true} />
        <View id="view-social" tab url="/social/" pushState={true} />
        <View id="view-account"  tab url="/account/" pushState={true} />
      </Views>
       ):(
<View
      main
      tab
      url="/login/"
    />
       )}
      
      

      {/* Left panel with cover effect*/}
      <Panel left cover>
        <View>
          <Page>
            <Navbar className="custom-navbar">
              <div className='text-center pb-1'>
              <img src='../image/happy-corp-logo.png' className='w-25'></img>
              </div>
            </Navbar>


            <BlockTitle className='mb-1  mt-4 fs-13 text-white'>Quản lý</BlockTitle>
            
            <List dividersIos={false} simpleList inset className='fs-13 list-custom mb-3'>
              {/* <ListItem  link="/account/" selected={selected === 'account'}
                onClick={() => { setSelected('account'), console.log(123) }}> */}
                <ListItem  onClick={() => { 
                  chuyentrang("account");
                  setSelected('account');
                  console.log(123);
                  setCurrentPath('account');
                }}
              >
                <div className='d-flex align-items-center'>
                <lord-icon
                  src="https://cdn.lordicon.com/shcfcebj.json"
                  trigger="loop"
                  colors="primary:#1fc5f7,secondary:#1fc5f7"
                  className=' me-2'
                  style={{ width: '25px', height: '25px' }}
                />
                Tài khoản
                </div>
              </ListItem> 
              {/* </ListItem> */}
              <ListItem >
                <Link>
                  <lord-icon
                    src="https://cdn.lordicon.com/apmrcxtj.json"
                    trigger="loop"
                    colors="primary:#1fc5f7,secondary:#1fc5f7"
                    className=' me-2'
                    style={{ width: '25px', height: '25px' }}>
                  </lord-icon>Thông báo
                </Link>
              </ListItem>
              <ListItem >
                <Link>
                  <lord-icon
                    src="https://cdn.lordicon.com/jectmwqf.json"
                    trigger="loop"
                    colors="primary:#1fc5f7,secondary:#1fc5f7"
                    className=' me-2'
                    style={{ width: '25px', height: '25px' }}>
                  </lord-icon>Nhật ký
                </Link>
              </ListItem>
            </List>

            {/* <BlockTitle className='mb-1  mt-3 fs-13 '>Giao diện</BlockTitle>
            <List dividersIos={false} simpleList inset className='fs-13 list-custom mb-3'>
              <ListItem>
              <Link onClick={setLightTheme}>
                <lord-icon
                  src="https://cdn.lordicon.com/bsdkzyjd.json"
                  trigger="loop"
                  colors="primary:#1fc5f7,secondary:#1fc5f7"
                  className="me-2"
                  style={{ width: "25px", height: "25px" }}
                />
                Sáng
              </Link>
            </ListItem>

            <ListItem>
              <Link onClick={setDarkTheme}>
                <lord-icon
                  src="https://cdn.lordicon.com/yodwgokk.json"
                  trigger="loop"
                  colors="primary:#1fc5f7,secondary:#1fc5f7"
                  className="me-2"
                  style={{ width: "25px", height: "25px" }}
                />
                Tối
              </Link>
            </ListItem>
            </List> */}
                  

            <BlockTitle className='mb-1  mt-3 fs-13 text-white'>Ngôn ngữ</BlockTitle>
            <List dividersIos={false} simpleList inset className='fs-13 list-custom mb-3'>
              <ListItem>
                <Link>
                  <lord-icon
                    src="https://cdn.lordicon.com/bsdkzyjd.json"
                    trigger="loop"
                    colors="primary:#1fc5f7,secondary:#1fc5f7"
                    className=' me-2'
                    style={{ width: '25px', height: '25px' }}>
                  </lord-icon>Tiếng Việt
                </Link>
              </ListItem>
              <ListItem >
                <Link>
                  <lord-icon
                    src="https://cdn.lordicon.com/bsdkzyjd.json"
                    trigger="loop"
                    colors="primary:#1fc5f7,secondary:#1fc5f7"
                    className=' me-2'
                    style={{ width: '25px', height: '25px' }}>
                  </lord-icon> Tiếng Anh
                </Link>
              </ListItem>
            </List>
            <div className='px-3'>
              <button className='p-2 rounded-pill bg-pink fs-13 border border-0 text-white fw-bold' onClick={()=>{Logout()}}>Đăng xuất</button>
            </div>
            <div className='fixed-bottom '>
              <Card className=" border border-0 bg-danger m-0 rounded-0 fs-13 p-3  text-dark" style={{backgroundImage: 'url(../image/nen.png)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
           
                {/* <div>
                  <img src='../image/happy-corp-logo.png' className='w-25' />
                </div> */}
                <div className=''>
                  <lord-icon
                    src="https://cdn.lordicon.com/onmwuuox.json"
                    trigger="loop"
                    colors="primary:#292489,secondary:#292489"
                    className=' me-1 mt-2'
                    style={{ width: '20px', height: '20px' }}>
                  </lord-icon>
                  Tòa nhà International Plaza, 343 Phạm Ngũ Lão, Phường Bến Thành, Quận 1, Hồ Chí Minh
                </div>
                <div className='mt-2 d-flex align-items-center'>
                  <lord-icon
                    src="https://cdn.lordicon.com/pmivedvy.json"
                    trigger="loop"
                    colors="primary:#292489,secondary:#292489"
                    className=' me-1'
                    style={{ width: '20px', height: '20px' }}>
                  </lord-icon>
                  1900 633 988
                </div>
                <div className='mt-4'>
              
              ll Rights Reserved | Privacy Policy | Sitemap | Website Terms of Use
                                                </div>
            </Card>
        </div>
        </Page>
        </View >
      </Panel>
 

      {/* Right panel with reveal effect*/}
      <Panel right reveal dark>
        <View>
          <Page>
            <Navbar title="Right Panel" />
            <Block>Right panel content goes here</Block>
          </Page>
        </View>
      </Panel>
 

      <LoginScreen id="my-login-screen">
        <View>
          <Page loginScreen>
            <LoginScreenTitle>Login</LoginScreenTitle>
            <List form>
              <ListInput
                type="text"
                name="username"
                placeholder="Your username"
                value={username}
                onInput={(e) => setUsername(e.target.value)}
              ></ListInput>
              <ListInput
                type="password"
                name="password"
                placeholder="Your password"
                value={password}
                onInput={(e) => setPassword(e.target.value)}
              ></ListInput>
            </List>
            <List>
              <ListButton title="Sign In" onClick={() => alertLoginData()} />
              <BlockFooter>
                Some text about login information.<br />Click "Sign In" to close Login Screen
              </BlockFooter>
            </List>
          </Page>
         </View>
      </LoginScreen>
    </App> 
  ) 
}
export default MyApp;