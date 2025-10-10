import React, { useEffect, useState } from 'react';
import {
  Page,
  Navbar,
  NavLeft,
  NavTitle,
  NavTitleLarge,
  NavRight,
  Link,
  Toolbar,
  Block,
  BlockTitle,
  List,
  ListItem,
  Button,
  Card,
  Icon,
  Badge,
  Popup,
  View,
  f7,
  CardHeader,
  CardContent,
  PageContent
} from 'framework7-react';
import moment from 'moment';
import { number } from 'prop-types';
import CommonNavbar from '../components/CommonNavbar';
import PageTransition from '../components/PageTransition';

import { Player } from '@lordicon/react';
import SheetBooking from "../components/SheetBooking";
import SheetMenu from '../components/Menu';
import SheetEvent from '../components/Event';
import SheetEventDetail from '../components/EventDetail';
import SheetEndow from '../components/Endow';
import SheetEndowDetail from '../components/EndowDetail';
import SheetRevenue from '../components/Revenue';
import SheetRoomDetail from '../components/RoomDetail';
import SheetInvoices from '../components/Invoices';
import { useTranslation } from 'react-i18next';
import SheetBrand from '../components/brand';
import axios from 'axios';

const HomePage = () => {
  const { t, i18n } = useTranslation();

  const week = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
  const [calendarDays, setCalendarDays] = useState([]);

  const [selectedMonth, setSelectedMonth] = useState(moment().month()); // 0 - 11
  const [selectedYear, setSelectedYear] = useState(moment().year());

  const [searchMonth, setSearchMonth] = useState(moment().month()); // 0 - 11
  const [searchYear, setSearchYear] = useState(moment().year());

  useEffect(() => {
    generateCalendar(moment().year(), moment().month());
  }, []);

  const datamonth = [
    // { time: "05/07/2025", booking: [2, 1, 0] },
    // { time: "08/07/2025", booking: [2, 0, 4] }
  ];

  function generateCalendar(year, month) {
    const baseDate = moment().year(year).month(month);
    const startOfMonth = baseDate.clone().startOf("month");
    const endOfMonth = baseDate.clone().endOf("month");

    const startOfCalendar = startOfMonth.clone().startOf("isoWeek");
    const endOfCalendar = endOfMonth.clone().endOf("isoWeek");

    const days = [];
    const current = startOfCalendar.clone();

    while (current.isSameOrBefore(endOfCalendar, "day")) {
      days.push(current.clone());
      current.add(1, "day");
    }

    setCalendarDays(days);
  }

  function handleSearchMonth() {
    setSearchMonth(selectedMonth);
    setSearchYear(selectedYear);
    generateCalendar(selectedYear, selectedMonth);
  }

  const handleClick = (e) => {
    setIsModalOpenSee(false);
    history.push(e);
    console.log(e);
  };

  function handleRefresh(event) {
    setTimeout(() => {
      // Any calls to load data go here
      event.detail.complete();
    }, 2000);
  }

  function bookingDetail(e) {
    localStorage.setItem("HappyCorp_id_invoices", e)
    // f7.popup.open('#booking-detail');
    console.log(345565);
  }

  const [sheetOpened, setSheetOpened] = useState(false);
  const [sheetOpenedMenu, setSheetOpenedMenu] = useState(false);
  const [sheetOpenedEvent, setSheetOpenedEvent] = useState(false);
  const [sheetOpenedEndow, setSheetOpenedEndow] = useState(false);
  const [sheetOpenedEventDetail, setSheetOpenedEventDetail] = useState(false);
  const [sheetOpenedEndowDetail, setSheetOpenedEndowDetail] = useState(false);
  const [sheetOpenedRevenue, setSheetOpenedRevenue] = useState(false);
  const [sheetOpenedInvoices, setSheetOpenedInvoices] = useState(false);

  const [sheetOpenedBrand, setSheetOpenedBrand] = useState(false);

  // tháng hiện tại

  const currentDate = new Date();

  // 2. Lấy tháng (0-11, nên phải +1) và năm
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  // 3. Định dạng tháng (thêm số 0 phía trước nếu cần)
  const formattedMonth = String(currentMonth).padStart(2, '0');

  const [ngaychon, setNgayChon] = useState("")

  //Xem lịch booking theo ngày

  const [invoiceDate, setInvoiceDate] = useState([]);
  function historyDate(ngay, thang, nam) {
    const brand = localStorage.getItem("happyCorp_brand");
    const token = localStorage.getItem("HappyCorp-token-app");
    const data = {
      "token": token,
      "brand": brand,
      "day": ngay,
      "month": thang,
      "year": nam
    }

    const api = axios.create({
      baseURL: "https://api-happy.eclo.io/api",
    });

    api.post("/invoicesDate", data, {
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (res.data.status === "error") {
          console.log("lỗi");
          f7.dialog.alert(res.data.content, "Error");
        } else if (res.data.status === "success") {
          console.log("date", res.data.invoices);
          setInvoiceDate(res.data.invoices);
          f7.popup.open('#popup-view-booking');

        }
      })
      .catch((error) => {
        f7.dialog.alert(error, "Error");
        console.log("k ket noi dc api");
      });
  }
  const [room, setRoom] = useState([]);
  function roomTrong() {
    const brand = localStorage.getItem("happyCorp_brand");
    const token = localStorage.getItem("HappyCorp-token-app");
    const data = {
      "token": token,
      "brand": brand
    }

    const api = axios.create({
      baseURL: "https://api-happy.eclo.io/api",
    });

    api.post("/room-booking", data, {
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (res.data.status === "error") {
          console.log("lỗi");
          f7.dialog.alert(res.data.content, "Error");
        } else if (res.data.status === "success") {
          console.log(res.data.data);
          setRoom(res.data.data);
        }
      })
      .catch((error) => {
        f7.dialog.alert(error, "Error");
        console.log("k ket noi dc api");
      });
  }
  const defaultImageUrl = 'https://img.freepik.com/premium-photo/elite-karaoke-suite-with-velvet-ropes-bartender_416256-24715.jpg';
  const [sheetOpenebMenu, setSheetOpenebMenu] = useState(false);

  const [history, setHistory] = useState([]);
  function historyAll() {
    const brand = localStorage.getItem("happyCorp_brand");
    const token = localStorage.getItem("HappyCorp-token-app");
    const data = {
      "token": token,
      "brand": brand
    }

    const api = axios.create({
      baseURL: "https://api-happy.eclo.io/api",
    });

    api.post("/invoices", data, {
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (res.data.status === "error") {
          console.log("lỗi");
          f7.dialog.alert(res.data.content, "Error");
        } else if (res.data.status === "success") {
          console.log(res.data.data);
          setHistory(res.data.data.slice(0, 10));
        }
      })
      .catch((error) => {
        f7.dialog.alert(error, "Error");
        console.log("k ket noi dc api");
      });
  }
  useEffect(() => {
    historyAll();
  }, [])
  return (
    <Page name="home">
      {/* Top Navbar */}
      <Navbar large sliding={false}>
        <NavLeft>
          {/* <Link iconIos="f7:menu" iconMd="material:menu" panelOpen="left" /> */}
          <Link panelOpen="left" >
            {/* <lord-icon
              src="https://cdn.lordicon.com/vmiwgvnx.json"
              trigger="loop"
              state="loop-spin"
              colors="primary:#1fc5f7,secondary:#1fc5f7"
              className='size-icon me-2'>
            </lord-icon> */}
            <img src='../image/menu-xanh.png' style={{ width: "30px" }}></img>
          </Link>
        </NavLeft>
        <NavTitle className='text-dark' sliding>
          <img src='../image/happy-corp-logo.png' style={{ height: "35px" }}></img>

        </NavTitle>
        <NavRight>
          <Link >
            <lord-icon
              src="https://cdn.lordicon.com/wjyqkiew.json"
              trigger="loop"
              colors="primary:#1fc5f7,secondary:#1fc5f7"
              className='size-icon'>
            </lord-icon></Link>
          <Link onClick={() => setSheetOpenedBrand(true)} >
            <lord-icon
              src="https://cdn.lordicon.com/tjjwskjx.json"
              trigger="loop"
              colors="primary:#1fc5f7,secondary:#1fc5f7"
              className='size-icon me-2'>
            </lord-icon></Link>
        </NavRight>
        <NavTitleLarge className='text' >
          <div className='d-flex justify-content-between align-items-center'>
            <div>
              <span className='fs-13  fw-normal me-1'>
                Xin chào
              </span>
              <span className='fw-bold'>{localStorage.getItem("HappyCorp-token-name")}</span>

            </div>
            <Button className='bg-pink rounded-pill p-3 fw-bold text-white'>Kích hoạt thẻ</Button>

          </div>
        </NavTitleLarge>
      </Navbar>
      <PageContent className='pb-0' >
        <div className='px-4 my-2' >
          <div className="d-flex align-items-center bg-input  rounded-pill p-1 row" style={{ cursor: 'pointer', marginTop: "-50px" }}>
            <input className='border bg-input rounded-pill border-0 p-2 px-3 col-10 text-dark' placeholder='Tìm kiếm'></input>
            <Button fill={false} className=" col-2 pe-0 d-flex justify-content-end">
              <lord-icon
                src="https://cdn.lordicon.com/wjyqkiew.json"
                trigger="loop"
                colors="primary:#1fc5f7,secondary:#1fc5f7"
                className=' me-2'
                style={{ width: '30px', height: '30px' }}>
              </lord-icon>
            </Button>
          </div>

        </div>

        {/* Page content */}
        <List className='m-0 mt-2'>
          <div className="video-container rounded-3 px-2">
            <video
              className="video-bg w-100 "
              autoPlay
              muted
              loop
              playsInline
            >
              <source src="https://happycorp.com.vn/wp-content/uploads/2025/07/homevideo.mp4" type="video/mp4" />
            </video>
          </div>
        </List>

        <div className="grid grid-cols-4 px-2 mt-2">
          <div onClick={() => setSheetOpenedMenu(true)}>
            <div className='text-center rounded-4 mx-2 p-1'>
              <img src='../image/catering.gif' className='w-50'></img>
              <div className=' fs-13 '>Thực đơn</div>
            </div>
          </div>
          <div onClick={() => setSheetOpened(true)}>
            <div className='text-center rounded-4 mx-2 p-1'>
              <img src='../image/online-order.gif' className='w-50'></img>
              <div className=' fs-13'>Đặt bàn</div>
            </div>
          </div>
          <div onClick={() => setSheetOpenedEvent(true)}>
            <div className='text-center rounded-4 mx-2 p-1'>
              <img src='../image/ticket.gif' className='w-50'></img>
              <div className=' fs-13'>Sự kiện</div>
            </div>
          </div>
          <div onClick={() => setSheetOpenedRevenue(true)}>
            <div className='text-center rounded-4 mx-2 p-1'>
              <img src='../image/bill.gif' className='w-50'></img>
              <div className=' fs-13'>Doanh thu</div>
            </div>
          </div>
        </div>

        <Link onClick={() => setSheetOpenedEndow(true)} className='fs-6 fw-bold mx-3 mt-3 justify-content-start d-flex align-items-center'>
          {/* <img src='../image/6.gif' className='size-icon'></img> */}
          <lord-icon
            src="https://cdn.lordicon.com/puebsmel.json"
            trigger="loop"
            colors="primary:#1fc5f7,secondary:#1fc5f7"
            className=' me-1'
            style={{ width: '30px', height: '30px' }}>
          </lord-icon>

          Ưu đãi
        </Link>
        <div className='row d-flex flex-nowrap mx-2 mt-2 pb-2' style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
          <div className='col-5 px-1'>
            <Card className='m-0 border border-0 p-1 fs-13' onClick={() => setSheetOpenedEndowDetail(true)}>
              <div>
                <img onClick={() => setSheetOpenedEndowDetail(true)} src='https://image.made-in-china.com/202f0j00vzJeGPLHZIoB/Gold-Restaurant-Bar-Counter-Square-U-Stylish-Wholesale-Night-Club-Bar-Design.webp' className='w-100 rounded-3'></img>
                <div className='d-flex'>
                  <div className='mt-2 fst-italic'> <lord-icon
                    src="https://cdn.lordicon.com/puebsmel.json"
                    trigger="loop"
                    colors="primary:#1fc5f7,secondary:#1fc5f7"
                    className=' me-1'
                    style={{ width: '20px', height: '20px' }}>
                  </lord-icon>
                    Giảm giá sốc</div>
                </div>
                <div className='fw-bold text-pink my-1'>Giảm 10%</div>
                <div className='limited-lines1'>Giảm tối đa tiền mặt 1.000.000đ cho hóa đơn từ 50.000.000đ</div>
              </div>
            </Card>
          </div>
          <div className='col-5 px-1'>
            <Card className='m-0 border border-0 p-1 fs-13'>
              <div>
                <img onClick={() => setSheetOpenedEndowDetail(true)} src='https://image.made-in-china.com/202f0j00vzJeGPLHZIoB/Gold-Restaurant-Bar-Counter-Square-U-Stylish-Wholesale-Night-Club-Bar-Design.webp' className='w-100 rounded-3'></img>
                <div className='d-flex'>
                  <div className='mt-2 fst-italic'>
                    <lord-icon
                      src="https://cdn.lordicon.com/puebsmel.json"
                      trigger="loop"
                      colors="primary:#1fc5f7,secondary:#1fc5f7"
                      className=' me-1'
                      style={{ width: '20px', height: '20px' }}>
                    </lord-icon>
                    Giảm giá sốc</div>
                </div>
                <div className='fw-bold text-pink my-1'>Giảm 10%</div>
                <div className='limited-lines1'>Giảm tối đa tiền mặt 1.000.000đ cho hóa đơn từ 50.000.000đ</div>
              </div>
            </Card>
          </div>
          <div className='col-5 px-1'>
            <Card onClick={() => setSheetOpenedEndowDetail(true)} className='m-0 border border-0 p-1 fs-13'>
              <div>
                <img src='https://image.made-in-china.com/202f0j00vzJeGPLHZIoB/Gold-Restaurant-Bar-Counter-Square-U-Stylish-Wholesale-Night-Club-Bar-Design.webp' className='w-100 rounded-3'></img>
                <div className='d-flex'>
                  <div className='mt-2 fst-italic'>
                    <lord-icon
                      src="https://cdn.lordicon.com/puebsmel.json"
                      trigger="loop"
                      colors="primary:#1fc5f7,secondary:#1fc5f7"
                      className=' me-1'
                      style={{ width: '20px', height: '20px' }}>
                    </lord-icon>
                    Giảm giá sốc</div>
                </div>
                <div className='fw-bold text-pink my-1'>Giảm 10%</div>
                <div className='limited-lines1'>Giảm tối đa tiền mặt 1.000.000đ cho hóa đơn từ 50.000.000đ</div>
              </div>
            </Card>
          </div>
          <div className='col-5 px-1'>
            <Card className='m-0 border border-0 p-1 fs-13'>
              <div>
                <img src='https://image.made-in-china.com/202f0j00vzJeGPLHZIoB/Gold-Restaurant-Bar-Counter-Square-U-Stylish-Wholesale-Night-Club-Bar-Design.webp' className='w-100 rounded-3'></img>
                <div className='d-flex'>
                  <div className='mt-2 fst-italic'>
                    <lord-icon
                      src="https://cdn.lordicon.com/puebsmel.json"
                      trigger="loop"
                      colors="primary:#1fc5f7,secondary:#1fc5f7"
                      className=' me-1'
                      style={{ width: '20px', height: '20px' }}>
                    </lord-icon>
                    Giảm giá sốc</div>
                </div>
                <div className='fw-bold text-pink my-1'>Giảm 10%</div>
                <div className='limited-lines1'>Giảm tối đa tiền mặt 1.000.000đ cho hóa đơn từ 50.000.000đ</div>
              </div>
            </Card>
          </div>
        </div>
        <Link onClick={() => setSheetOpenedEvent(true)} className='fs-6 fw-bold mx-3 mt-3'>
          <lord-icon
            src="https://cdn.lordicon.com/okgbpdra.json"
            trigger="loop"
            colors="primary:#1fc5f7,secondary:#1fc5f7"
            className=' me-1'
            style={{ width: '30px', height: '30px' }}>
          </lord-icon>
          Sự kiện</Link>
        <swiper-container pagination
          loop
          autoplay='{"delay":5000, "disableOnInteraction": false}'
          class=" mt-3 demo-swiper-multiple demo-swiper-multiple-auto ps-3"
          space-between="10"
          slides-per-view="1.15">
          <swiper-slide><img onClick={() => setSheetOpenedEventDetail(true)} src='https://wallpaperaccess.com/full/2300142.jpg' className='w-100 border-image' ></img></swiper-slide>
          <swiper-slide><img onClick={() => setSheetOpenedEventDetail(true)} src='https://wallpaperaccess.com/full/2300142.jpg' className='w-100 border-image'></img></swiper-slide>
          <swiper-slide><img onClick={() => setSheetOpenedEventDetail(true)} src='https://wallpaperaccess.com/full/2300142.jpg' className='w-100 border-image'></img></swiper-slide>
          <swiper-slide><img onClick={() => setSheetOpenedEventDetail(true)} src='https://wallpaperaccess.com/full/2300142.jpg' className='w-100 border-image' ></img></swiper-slide>
          <swiper-slide><img src='https://wallpaperaccess.com/full/2300142.jpg' className='w-100 border-image'></img></swiper-slide>
          <swiper-slide><img src='https://wallpaperaccess.com/full/2300142.jpg' className='w-100 border-image' ></img></swiper-slide>
          <swiper-slide><img src='https://wallpaperaccess.com/full/2300142.jpg' className='w-100 border-image'></img></swiper-slide>
        </swiper-container>

        {/* Calender */}
        <div className='fs-15 fw-bold mx-3 mt-3 d-flex align-items-center'>
          <lord-icon
            src="https://cdn.lordicon.com/uphbloed.json"
            trigger="loop"
            colors="primary:#1fc5f7,secondary:#1fc5f7"
            className=' me-1'
            style={{ width: '30px', height: '30px' }}>
          </lord-icon>
          Lịch Booking tháng {formattedMonth}/{currentYear}
        </div>
        <div className='p-3  mt1'>
          <div className="calendar  p-1  rounded-4 shadow-sm " style={{ backdropFilter: "blur(50px)" }}>
            <div className="d-flex justify-content-between text-center mb-2 py-1">
              {week.map((day, idx) => (
                <div key={idx} className="flex-fill fw-bold bg-pink mx-1 py-2 rounded-3 p-1" style={{ fontSize: "13px" }}>{day}</div>
              ))}
            </div>
            <div className="d-flex flex-wrap text-center">
              {calendarDays.map((date, idx) => {
                const isCurrentMonth = date.month() === searchMonth && date.year() === searchYear;

                const handleDayClick = () => {
                  const fullDate = date.format("DD/MM/YYYY");
                  console.log("Ngày được chọn:", fullDate);
                  setNgayChon(fullDate);
                  const dateParts = fullDate.split('/'); // dateParts sẽ là ["05", "10", "2025"]

                  const ngay = dateParts[0]; // Ngày (ví dụ: "05")
                  const thang = dateParts[1]; // Tháng (ví dụ: "10")
                  const nam = dateParts[2];
                  historyDate(ngay, thang, nam);
                  roomTrong();
                };
                return (
                  // <Link className='m-0 p-0' fill popupOpen="#popup-view-booking" onClick={handleDayClick} >
                  <Card onClick={handleDayClick}
                    key={idx}
                    className={`card-animated-bg rounded-3 m-1 p-1 border border-0 ${isCurrentMonth ? '' : 'bg-date'} `}
                    style={{
                      width: "12%",
                      color: isCurrentMonth ? undefined : 'transparent',
                      fontSize: "10px",
                      minHeight: "45px"
                    }}
                  >
                    <div className='row m-0'>
                      <div className='col-6 p-0 pe-1' onClick={handleDayClick}>
                        {date.format("DD")}
                      </div>
                      {datamonth && datamonth.map((book, key) => {
                        if (book.time === date.format("DD/MM/YYYY")) {
                          return (
                            <>
                              <div className='col-6 p-0 ps-1 ' onClick={handleDayClick} key={key}>
                                <div className='bg-danger text-white rounded-2'>
                                  {book.booking[0]}
                                </div>
                              </div>
                              <div className='col-6 p-0 mt-1 pe-1' onClick={handleDayClick}>
                                <div className='bg-success text-white rounded-2'>
                                  {book.booking[1]}
                                </div>
                              </div>
                              <div className='col-6 p-0 mt-1 ps-1' onClick={handleDayClick}>
                                <div className='bg-warning text-white rounded-2'>
                                  {book.booking[2]}
                                </div>
                              </div>
                            </>
                          )
                        }
                      })}
                    </div>
                  </Card>
                  // </Link>
                );
              })}
            </div>

            <div className="d-flex justify-content-between align-items-center gap-3  p-2 ">
              <div className="d-flex align-items-center gap-1">
                <Badge className='bg-pink'> </Badge>
                <span className='fs-13'> Tổng booking</span>
              </div>
              <div className="d-flex align-items-center gap-1">
                <Badge className='bg-success'> </Badge>
                <span className='fs-13'> Đã thanh toán</span>
              </div>
              <div className="d-flex align-items-center gap-1">
                <Badge className='bg-warning'> </Badge>
                <span className='fs-13'> Còn chờ</span>
              </div>
            </div>

          </div>
        </div>

        <div className=' d-flex justify-content-between align-items-center px-3 mt-2'>
          <div className='fs-13 fw-bold d-flex align-items-center'>
            <lord-icon
              src="https://cdn.lordicon.com/psyssele.json"
              trigger="loop"
              colors="primary:#1fc5f7,secondary:#1fc5f7"
              className=' me-1'
              style={{ width: '30px', height: '30px' }}>
            </lord-icon>
            Lịch sử đặt lịch
          </div>
          {/* <Link href="/history/" className="d-flex align-items-center">
            <span class="material-icons fs-5">
              arrow_forward
            </span>
          </Link> */}
        </div>
        {/* <Card expandable className='border  shadow-none  border-0 m-2 p-1'>
          <CardContent padding={false}>
            <div className="" >
              <CardHeader className="display-block p-2  px-3 pe-1">
                <div className='row w-100  d-flex align-items-center '>
                  <div className='col-2 p-0 ps-1'>
                    <img style={{ width: "100%", height: "100%" }} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlyd6LH2s0z9gH9I33pj9ZTUzbO_GEv5fCPQ&s' className=' border border-2 rounded-3 border-danger'></img>
                  </div>
                  <div className='col-10 fs-13  border-bottom border-light'>
                    <div className='fw-bold d-flex justify-content-between'> Phòng: V.I.P 4 <span className='text-success'>Đã hoàn tất</span></div>
                    <div className='text-muted mt-1 mb-2'>18/07/2025 14:22:52</div>
                  </div>
                </div>
              </CardHeader>
              <Link
                cardClose
                color="white"
                className="card-opened-fade-in"
                style={{ position: 'absolute', right: '15px', top: '15px' }}
                iconF7="xmark_circle_fill"
              />
            </div>
            <div className="card-content-padding">
              <Block className='mt-0 '>
                <div className='fw-bold fs-6 mt-4'>Thông tin khách hàng</div>
                <List className='my-2 fs-13'>
                  <div className='d-flex justify-content-between align-items-center pb-2 mt-3 border-bottom'>
                    Khách hàng<div className='fw-bold'>MR TRUNG & HUY NGUYỄN (K.BI)</div>
                  </div>
                  <div className='d-flex justify-content-between align-items-center pb-2 mt-3 border-bottom'>
                    Ghi chú<div className='fw-bold'>Không có</div>
                  </div>
                </List>
                <div className='fw-bold fs-6 mt-4'>Thông tin đặt bàn</div>
                <List className='my-2 fs-13'>
                  <div className='d-flex justify-content-between align-items-center pb-2 mt-3 border-bottom'>
                    Nhà hàng<div className='fw-bold'>90s House</div>
                  </div>
                  <div className='d-flex justify-content-between align-items-center pb-2 mt-3 border-bottom'>
                    Mã booking<div className='fw-bold'>#8732465</div>
                  </div>
                  <div className='d-flex justify-content-between align-items-center pb-2 mt-3 border-bottom'>
                    Ngày<div className='fw-bold'>31/07/2025 12:00:00</div>
                  </div>
                  <div className='d-flex justify-content-between align-items-center pb-2 mt-3 border-bottom'>
                    Số người<div className='fw-bold'>3</div>
                  </div>

                  <div className='d-flex justify-content-between align-items-center pb-2 mt-3 border-bottom'>
                    Khu vực/ Phòng<div className='fw-bold'>V4</div>
                  </div>
                  <div className='d-flex justify-content-between align-items-center pb-2 mt-3 border-bottom'>
                    Trạng thái<span className='px-2 pb-1 bg-primary rounded-pill text-white'>Đã nhận phòng</span>
                  </div>
                  <div className='d-flex justify-content-between align-items-center pb-2 mt-3 border-bottom'>
                    Người đặt<div className='fw-bold'>Jatbirat</div>
                  </div>
                  <div className='d-flex justify-content-between align-items-center pb-2 mt-3 border-bottom'>
                    Ghi chú<div className='fw-bold'>Không có</div>
                  </div>
                </List>
                <div className='fw-bold fs-6 mt-4'>Thanh toán</div>
                <List className='my-2 fs-13'>
                  <div className='d-flex justify-content-between align-items-center pb-2 mt-3 border-bottom'>
                    Tổng tiền<div className='fw-bold'>0</div>
                  </div>
                </List>

                <div className=' grid grid-cols-2 grid-gap px-2 my-4'>
                  <div>
                    <button className='border border-0 rounded-pill p-3 bg-warning fs-13 fw-đơnd'>Tải hóa đơn</button>
                  </div>
                  <div>
                    <button className='border border-0 rounded-pill p-3 bg-warning fs-13 fw-đơnd'>Chia sẻ</button>
                  </div>
                </div>
              </Block>

            </div>
          </CardContent>
        </Card> */}
        <List className='px-3 mb-3 mt-0'>
          {history && history.map((history, key) => {
            return (
              <>
                <ListItem onClick={() => { setSheetOpenedInvoices(true); localStorage.setItem("HappyCorp_id_invoices", history.active) }} className='row mt-2 list-no-chevron'>
                  <div className='col-2'>
                    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlyd6LH2s0z9gH9I33pj9ZTUzbO_GEv5fCPQ&s' className='w-100 border border-2 rounded-3 border-danger'></img>
                  </div>
                  <div className='col-10 fs-13 ms-2 border-bottom '>
                    <div className='fw-bold d-flex justify-content-between'>
                      Phòng: {history.room_name}
                      { history.process == 100 &&
                        <span className='text-primary rounded-2'>Nhận khách</span>
                      }
                      {(history.process == 1 || history.process == 2) &&
                        <span className='text-warning rounded-2'>Đợi duyệt</span>
                      }
                      {history.process == 3 || history.process == 300 &&
                        <span className='text-secondary rounded-2'>Đã hủy</span>
                      }
                      {history.process == 20 &&
                        <span className='text-danger rounded-2'>Đã hủy</span>
                      }
                      {history.process == 200 &&
                        <span className='text-success rounded-2'>Đã hoàn tất</span>
                      }
                    </div>
                    <div className=' mt-1 mb-2'>{history.date}</div>
                  </div>
                </ListItem>
              </>
            )
          })}
        </List>

        <Popup id="popup-view-booking">
          <View>
            <Page>
              <Navbar title={`Ngày ${ngaychon}`}>
                <NavRight>
                  <Link popupClose>Close</Link>
                </NavRight>
              </Navbar>
              <Block className='my-3'>
                {/* <div className='fw-bold'>Chi tiết khách hàng</div>
                <List className='my-2'>
                  <Card className='m-0 p-2 border border-0 rounded-0'>
                    <div className=' text-center'>
                      Chưa biết là gì
                    </div>
                  </Card>
                </List> */}

                <div className='fw-bold fs-6 text-pink'>Tổng booking {invoiceDate.length}</div>

                <div class="grid grid-cols-3 fs-13 mt-2">
                  <div className='d-flex align-items-center mt-2'>
                    <div className='hinh-vuong bg-primary rounded-2 me-1'></div>
                    Nhận khách
                  </div>
                  <div className='d-flex align-items-center mt-2'>
                    <div className='hinh-vuong bg-success rounded-2 me-1'></div>
                    Thanh toán
                  </div>
                  <div className='d-flex align-items-center mt-2'>
                    <div className='hinh-vuong bg-warning rounded-2 me-1'></div>
                    Đợi duyệt
                  </div>
                  <div className='d-flex align-items-center mt-2'>
                    <div className='hinh-vuong bg-info rounded-2 me-1'></div>
                    Chờ duyệt
                  </div>
                  <div className='d-flex align-items-center mt-2'>
                    <div className='hinh-vuong bg-danger rounded-2 me-1'></div>
                    Không duyệt
                  </div>
                  <div className='d-flex align-items-center mt-2'>
                    <div className='hinh-vuong bg-secondary rounded-2 me-1'></div>
                    Đã hủy
                  </div>
                </div>
                <List className='my-3'>
                  {invoiceDate.length > 0 ? invoiceDate.map((invoiceDate) => {
                    return (
                      <>
                        <div onClick={() => { bookingDetail(invoiceDate.active); setSheetOpenedInvoices(true) }} className='mt-1  hieuung p-2 rounded-2 d-flex align-items-center fs-13'>
                          {(invoiceDate.process == 1 || invoiceDate.process == 100) &&
                            <div className='bg-primary rounded-2' style={{ width: "35px", height: "35px" }}></div>
                          }
                          {invoiceDate.process == 2 &&
                            <div className='bg-warning rounded-2' style={{ width: "35px", height: "35px" }}></div>
                          }
                          {invoiceDate.process == 3 || invoiceDate.process == 300 &&
                            <div className='bg-secondary rounded-2' style={{ width: "35px", height: "35px" }}></div>
                          }
                          {invoiceDate.process == 20 &&
                            <div className='bg-danger rounded-2' style={{ width: "35px", height: "35px" }}></div>
                          }
                          {invoiceDate.process == 200 &&
                            <div className='bg-success rounded-2' style={{ width: "35px", height: "35px" }}></div>
                          }
                          <div className='ms-2'>
                            <div className='fw-bold mb-1 w-100 text-white '>{invoiceDate.name}<span className='fs-11 ms-2'>(Phòng {invoiceDate.room_name})</span></div>
                            <div>{invoiceDate.date}</div>
                          </div>
                        </div>
                      </>
                    )
                  }) : (
                    <>
                      <div className='text-center fs-13 mt-3'> Không có lịch sử đặt</div>
                    </>)}
                </List>
                <div className='fw-bold fs-6 text-pink'>Phòng trống</div>
                <List className='mt-0'>
                  <div className='row'>
                    {room && room.map((diagram, key) => {
                      return (
                        <div key={key}>
                          <div className="d-flex mt-3 align-items-center fw-bold fst-italic room-group-title">
                            {diagram.name}
                          </div>
                          <div className='row  mt-2 pb-2 '>
                            {diagram.rooms && diagram.rooms.map((roomItem, index) => {
                              const imageUrl = roomItem.images || defaultImageUrl;
                              return (
                                <div className='col-4 p-1 mt-2' onClick={() => { setSheetOpenebMenu(true); localStorage.setItem("HappyCorp_active_room", roomItem.active) }} key={index}>
                                  <div className=' position-relative' style={{
                                    // Thêm box-shadow để tạo viền phát sáng
                                    boxShadow: '0 0 5px 0 #ff9700, 0 0 10px 0 #1fc5f7',
                                    borderRadius: '8px',
                                    border: '0.5px solid #ff9700'
                                  }}>
                                    <img src={imageUrl} className=' rounded-3 w-100' style={{ objectFit: 'cover' }}></img>

                                    <div className='position-absolute bottom-0 start-0 m-2'>
                                      <div className='fw-bold fs-13 text-white rounded-3 px-1' style={{ backgroundColor: "#ff9700", letterSpacing: '2px' }}>
                                        ROOM {roomItem.name}
                                      </div>
                                    </div>

                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                      // --- Kết thúc Group ---
                    })}
                    {/* <div className='col-6 p-2'>
                      <Card className='m-0 p-1 rounded-3 border border-0 fs-13'>
                        <img className='w-100 rounded-3' src='https://image.made-in-china.com/202f0j00vzJeGPLHZIoB/Gold-Restaurant-Bar-Counter-Square-U-Stylish-Wholesale-Night-Club-Bar-Design.webp'></img>
                        <div className='fs-6 fw-bold text-center mt-2'>Happy corp 2</div>
                        <div className='mt-1'>Khung giờ trống:</div>
                        <ul className='mt-1' style={{ listStyle: 'disc', paddingLeft: '1.1rem' }}>
                          <li>9h30 - 15h00</li>
                          <li>9h30 - 15h00</li>
                        </ul>
                      </Card>
                    </div>
                    <div className='col-6 p-2'>
                      <Card className='m-0 p-1 rounded-3 border border-0 fs-13'>
                        <img className='w-100 rounded-3' src='https://image.made-in-china.com/202f0j00vzJeGPLHZIoB/Gold-Restaurant-Bar-Counter-Square-U-Stylish-Wholesale-Night-Club-Bar-Design.webp'></img>
                        <div className='fs-6 fw-bold text-center mt-2'>Happy corp 2</div>
                        <div className='mt-1'>Khung giờ trống:</div>
                        <ul className='mt-1' style={{ listStyle: 'disc', paddingLeft: '1.1rem' }}>
                          <li>9h30 - 15h00</li>
                          <li>9h30 - 15h00</li>
                        </ul>
                      </Card>
                    </div>
                    <div className='col-6 p-2'>
                      <Card className='m-0 p-1 rounded-3 border border-0 fs-13'>
                        <img className='w-100 rounded-3' src='https://image.made-in-china.com/202f0j00vzJeGPLHZIoB/Gold-Restaurant-Bar-Counter-Square-U-Stylish-Wholesale-Night-Club-Bar-Design.webp'></img>
                        <div className='fs-6 fw-bold text-center mt-2'>Happy corp 2</div>
                        <div className='mt-1'>Khung giờ trống:</div>
                        <ul className='mt-1' style={{ listStyle: 'disc', paddingLeft: '1.1rem' }}>
                          <li>9h30 - 15h00</li>
                          <li>9h30 - 15h00</li>
                        </ul>
                      </Card>
                    </div>
                    <div className='col-6 p-2'>
                      <Card className='m-0 p-1 rounded-3 border border-0 fs-13'>
                        <img className='w-100 rounded-3' src='https://image.made-in-china.com/202f0j00vzJeGPLHZIoB/Gold-Restaurant-Bar-Counter-Square-U-Stylish-Wholesale-Night-Club-Bar-Design.webp'></img>
                        <div className='fs-6 fw-bold text-center mt-2'>Happy corp 2</div>
                        <div className='mt-1'>Khung giờ trống:</div>
                        <ul className='mt-1' style={{ listStyle: 'disc', paddingLeft: '1.1rem' }}>
                          <li>9h30 - 15h00</li>
                          <li>9h30 - 15h00</li>
                        </ul>
                      </Card>
                    </div> */}
                  </div>
                </List>
              </Block>
            </Page>
          </View>
        </Popup>


        <Popup id="booking-detail">
          <View>
            <Page>
              <Navbar title="Chi tiết đặt lịch">
                <NavRight>
                  <Link popupClose>Close</Link>
                </NavRight>
              </Navbar>
              <Block className='mt-0 '>
                <div className='fw-bold fs-6 mt-4'>Thông tin khách hàng</div>
                <List className='my-2 fs-13'>
                  <div className='d-flex justify-content-between align-items-center pb-2 mt-3 border-bottom'>
                    Khách hàng<div className='fw-bold'>MR TRUNG & HUY NGUYỄN (K.BI)</div>
                  </div>
                  <div className='d-flex justify-content-between align-items-center pb-2 mt-3 border-bottom'>
                    Ghi chú<div className='fw-bold'>Không có</div>
                  </div>
                </List>
                <div className='fw-bold fs-6 mt-4'>Thông tin đặt phòng</div>
                <List className='my-2 fs-13'>
                  <div className='d-flex justify-content-between align-items-center pb-2 mt-3 border-bottom'>
                    Nhà hàng<div className='fw-bold'>90s House</div>
                  </div>
                  <div className='d-flex justify-content-between align-items-center pb-2 mt-3 border-bottom'>
                    Mã booking<div className='fw-bold'>#8732465</div>
                  </div>
                  <div className='d-flex justify-content-between align-items-center pb-2 mt-3 border-bottom'>
                    Ngày<div className='fw-bold'>31/07/2025 12:00:00</div>
                  </div>
                  <div className='d-flex justify-content-between align-items-center pb-2 mt-3 border-bottom'>
                    Số người<div className='fw-bold'>3</div>
                  </div>

                  <div className='d-flex justify-content-between align-items-center pb-2 mt-3 border-bottom'>
                    Khu vực/ Phòng<div className='fw-bold'>V4</div>
                  </div>
                  <div className='d-flex justify-content-between align-items-center pb-2 mt-3 border-bottom'>
                    Trạng thái<span className='px-2 pb-1 bg-primary rounded-pill text-white'>Đã nhận phòng</span>
                  </div>
                  <div className='d-flex justify-content-between align-items-center pb-2 mt-3 border-bottom'>
                    Người đặt<div className='fw-bold'>Jatbirat</div>
                  </div>
                  <div className='d-flex justify-content-between align-items-center pb-2 mt-3 border-bottom'>
                    Ghi chú<div className='fw-bold'>Không có</div>
                  </div>
                </List>
                <div className='fw-bold fs-6 mt-4'>Thanh toán</div>
                <List className='my-2 fs-13'>
                  <div className='d-flex justify-content-between align-items-center pb-2 mt-3 border-bottom'>
                    Tổng tiền<div className='fw-bold'>0</div>
                  </div>
                </List>
              </Block>
              <div className='fixed-bottom grid grid-cols-2 grid-gap px-2 mb-4'>
                <div>
                  <button className='border border-0 rounded-pill p-3 bg-warning fs-13 fw-đơnd'>Tải hóa đơn</button>
                </div>
                <div>
                  <button className='border border-0 rounded-pill p-3 bg-warning fs-13 fw-đơnd'>Chia sẻ</button>
                </div>
              </div>
            </Page>
          </View>
        </Popup>
      </PageContent>
      <SheetBooking
        opened={sheetOpened}
        onClose={() => setSheetOpened(false)}
      />
      <SheetMenu
        opened={sheetOpenedMenu}
        onClose={() => setSheetOpenedMenu(false)}
      />
      <SheetEvent
        opened={sheetOpenedEvent}
        onClose={() => setSheetOpenedEvent(false)}
      />
      <SheetEventDetail
        opened={sheetOpenedEventDetail}
        onClose={() => setSheetOpenedEventDetail(false)}
      />
      <SheetEndow
        opened={sheetOpenedEndow}
        onClose={() => setSheetOpenedEndow(false)}
      />
      <SheetEndowDetail
        opened={sheetOpenedEndowDetail}
        onClose={() => setSheetOpenedEndowDetail(false)}
      />
      <SheetRevenue
        opened={sheetOpenedRevenue}
        onClose={() => setSheetOpenedRevenue(false)}
      />
      <SheetInvoices
        opened={sheetOpenedInvoices}
        onClose={() => setSheetOpenedInvoices(false)}
      />

      <SheetBrand
        opened={sheetOpenedBrand}
        onClose={() => setSheetOpenedBrand(false)}
      />
      <SheetRoomDetail
        opened={sheetOpenebMenu}
        onClose={() => setSheetOpenebMenu(false)}
      />
    </Page>

  );
}
export default HomePage;