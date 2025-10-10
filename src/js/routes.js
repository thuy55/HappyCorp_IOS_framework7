
import HomePage from '../pages/home.jsx';
import AboutPage from '../pages/about.jsx';
import FormPage from '../pages/form.jsx';
import CatalogPage from '../pages/catalog.jsx';
import ProductPage from '../pages/product.jsx';
import SettingsPage from '../pages/settings.jsx';

import DynamicRoutePage from '../pages/dynamic-route.jsx';
import RequestAndLoad from '../pages/request-and-load.jsx';
import NotFoundPage from '../pages/404.jsx';
import SocialPage from '../pages/social.jsx';
import LoginPage from '../pages/Login.jsx';
import EventPage from '../pages/Event.jsx';
import EndowPage from '../pages/Endow.jsx';
import EventDetailPage from '../pages/EventDetail.jsx';
import EndowDetailPage from '../pages/EndowDetail.jsx';
import RoomPage from '../pages/room.jsx';
import AccountPage from '../pages/Account.jsx';
import RevenuePage from '../pages/Revenue.jsx';
import HistoryPage from '../pages/History.jsx';
import MenuPage from '../pages/Menu.jsx';
import SocialHidePage from '../pages/social-hide.jsx';
import SocialSavePage from '../pages/social_save.jsx';
import TestPage from '../pages/test.jsx';
import BookingPage from '../pages/booking.jsx';
import ChatPage from '../pages/Chat.jsx';

var routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/home/',
    component: HomePage,
  },
  {
    path: '/about/',
    component: AboutPage,
  },
  {
    path: '/form/',
    component: FormPage,
  },
  {
    path: '/catalog/',
    component: CatalogPage,
  },
  {
    path: '/product/:id/',
    component: ProductPage,
  },
  {
    path: '/settings/',
    component: SettingsPage,
  },

  {
    path: '/social/',
    component: SocialPage,
  },
  {
    path: '/login/',
    component: LoginPage,
  },
  {
    path: '/event/',
    component: EventPage,
  },
  {
    path: '/endow/',
    component: EndowPage,
  },
  {
    path: '/event-detail/',
    component: EventDetailPage,
  },
  {
    path: '/endow-detal/',
    component: EndowDetailPage,
  },
  {
    path: '/room/',
    component: RoomPage,
  },
  {
    path: '/account/',
    component: AccountPage,
  },
  {
    path: '/revenue/',
    component: RevenuePage,
  },
  {
    path: '/history/',
    component: HistoryPage,
  },
  {
    path: '/menu/',
    component: MenuPage,
  },
  {
    path: '/social-hidden/',
    component: SocialHidePage,
  },
  {
    path: '/social-save/',
    component: SocialSavePage,
  },
  
  {
    path: '/test/',
    component: TestPage,
  },
 {
    path: '/booking/',
    component: BookingPage,
  },
  {
    path: '/chat/',
    component: ChatPage,
  },



  {
    path: '/dynamic-route/blog/:blogId/post/:postId/',
    component: DynamicRoutePage,
  },
  {
    path: '/request-and-load/user/:userId/',
    async: function ({ router, to, resolve }) {
      // App instance
      var app = router.app;

      // Show Preloader
      app.preloader.show();

      // User ID from request
      var userId = to.params.userId;

      // Simulate Ajax Request
      setTimeout(function () {
        // We got user data from request
        var user = {
          firstName: 'Vladimir',
          lastName: 'Kharlampidi',
          about: 'Hello, i am creator of Framework7! Hope you like it!',
          links: [
            {
              title: 'Framework7 Website',
              url: 'http://framework7.io',
            },
            {
              title: 'Framework7 Forum',
              url: 'http://forum.framework7.io',
            },
          ]
        };
        // Hide Preloader
        app.preloader.hide();

        // Resolve route to load page
        resolve(
          {
            component: RequestAndLoad,
          },
          {
            props: {
              user: user,
            }
          }
        );
      }, 1000);
    },
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];

export default routes;
