import React, { useState } from 'react';
import { f7 } from 'framework7-react';

const PageTransition = ({
  href,
  children,
  transition = 'f7-push',
  logo = '../image/happy-corp-logo.png',
  loadingMessage = 'Đang chuyển trang...',
  duration = 2000,
  className = '',
  showLoader = true,
  onClick,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleNavigation = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Gọi onClick callback nếu có
    if (onClick) {
      onClick(e);
    }

    if (isLoading) return; // Prevent double click

    console.log('🚀 PageTransition: Starting navigation to', href);
    setIsLoading(true);

    // Hiển thị loading ngay lập tức
    setTimeout(() => {
      navigateToPage();
    }, 500); // Delay ngắn để hiển thị loading
  };

  const navigateToPage = () => {
    try {
      console.log('🔍 Available views:', Object.keys(f7.views));
      
      // Xác định view đúng để navigate
      let targetView;

      if (href === '/' || href === '/home/') {
        // Về home page - thử view-home trước
        targetView = f7.views['view-home'] || f7.views.main;
        console.log('📍 Using view for home navigation:', targetView);
      } else {
        // Các route khác - sử dụng main view
        targetView = f7.views.main;
        console.log('📍 Using main view for navigation');
      }

      // Fallback nếu không tìm thấy view
      if (!targetView || !targetView.router) {
        targetView = f7.views.main || Object.values(f7.views)[0];
        console.log('📍 Using fallback view');
      }

      if (targetView && targetView.router) {
        console.log('✅ Navigating with router to:', href);
        
        targetView.router.navigate(href, {
          transition: transition,
          animate: true,
          pushState: true,
          history: true,
          replaceState: false,
          clearPreviousHistory: false,
          animatePages: true,
          browserHistory: true,
          
          // Event callbacks
          on: {
            pageBeforeIn: function () {
              console.log('📱 Page transition started');
            },
            pageAfterIn: function () {
              console.log('🎉 Page transition completed');
              setTimeout(() => {
                setIsLoading(false);
              }, 300);
            },
            pageInit: function () {
              console.log('🔄 Page initialized');
            }
          }
        });

      } else {
        console.error('❌ No valid router found, using window.location');
        setTimeout(() => {
          window.location.href = href;
          setIsLoading(false);
        }, duration);
      }

    } catch (error) {
      console.error('💥 Navigation error:', error);
      // Fallback navigation
      setTimeout(() => {
        window.location.href = href;
        setIsLoading(false);
      }, duration);
    }
  };

  return (
    <>
      <div
        className={`page-transition-trigger ${className} ${isLoading ? 'loading' : ''}`}
        onClick={handleNavigation}
        style={{
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          transform: isLoading ? 'scale(0.95)' : 'scale(1)',
          opacity: isLoading ? 0.8 : 1,
          userSelect: 'none',
          position: 'relative',
          display: 'inline-block'
        }}
        {...props}
      >
        {children}

        {/* Ripple effect */}
        {isLoading && (
          <div
            className="ripple-effect"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(233, 30, 99, 0.3) 0%, transparent 70%)',
              transform: 'translate(-50%, -50%) scale(0)',
              animation: 'ripple 0.6s ease-out forwards',
              pointerEvents: 'none'
            }}
          />
        )}
      </div>

      {/* Loading Overlay */}
      {isLoading && showLoader && (
        <div
          className="page-loader-overlay"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(5px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000,
            animation: 'fadeIn 0.3s ease-in-out'
          }}
        >
          <div className="text-center">
            {/* Logo */}
            <div className="logo-container mb-3">
              <img
                src={logo}
                alt="Loading Logo"
                style={{
                  width: '100px',
                  height: '100px',
                  objectFit: 'contain',
                  animation: 'pulse 1.5s ease-in-out infinite'
                }}
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRTkxRTYzIiByeD0iMTAiLz4KPHRleHQgeD0iNTAiIHk9IjU1IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5IQVBQWTwvdGV4dD4KPC9zdmc+';
                }}
              />
            </div>

            {/* Spinner */}
            {/* <div className="loading-spinner mb-3">
              <div
                className="spinner-border text-pink"
                role="status"
                style={{
                  width: '2.5rem',
                  height: '2.5rem'
                }}
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            </div> */}

            {/* Loading message */}
            {/* <div
              className="loading-message"
              style={{
                color: '#6c757d',
                fontSize: '16px',
                fontWeight: '500',
                marginBottom: '20px'
              }}
            >
              {loadingMessage}
            </div> */}

            {/* Progress bar */}
            {/* <div
              className="progress"
              style={{
                width: '250px',
                height: '6px',
                backgroundColor: '#e9ecef',
                borderRadius: '10px',
                overflow: 'hidden'
              }}
            >
              <div
                className="progress-bar bg-pink"
                style={{
                  animation: `progressBar ${duration}ms linear forwards`,
                  borderRadius: '10px'
                }}
              />
            </div> */}
          </div>
        </div>
      )}
    </>
  );
};

export default PageTransition;