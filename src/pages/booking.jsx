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
    PageContent,
    AccordionItem,
    AccordionToggle,
    Segmented
} from 'framework7-react';
import moment from 'moment';
import { number } from 'prop-types';
import CommonNavbar from '../components/CommonNavbar';


const BookingPage = () => {

    const handleClick = (e) => {
        f7.views.main.router.navigate('/event-detail/');
        console.log("jhgdsjhf", e);
    };

    function handleRefresh(event) {
        setTimeout(() => {
            // Any calls to load data go here
            event.detail.complete();
        }, 2000);
    }

    //search
    const [selectedMonth, setSelectedMonth] = useState(moment().month()); // 0 - 11
    const [selectedYear, setSelectedYear] = useState(moment().year());
    const [selectedDate, setSelectedDate] = useState(moment().date());

    const listDate = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

    const [searchDate, setSearchDate] = useState(moment().date());
    const [searchMonth, setSearchMonth] = useState(moment().month()); // 0 - 11
    const [searchYear, setSearchYear] = useState(moment().year());
    const [date, setdate] = useState("");
    useEffect(() => {
        const selectedMoment = moment({
            year: searchYear,
            month: searchMonth,
            day: searchDate
        });

        const weekdayNumber = selectedMoment.day();
        const weekday = listDate[weekdayNumber];
        setdate(weekday)
    }, [])

    function handleSearchMonth() {
        setSearchMonth(selectedMonth);
        setSearchYear(selectedYear)
        setSearchDate(selectedDate);
        const selectedMoment = moment({
            year: selectedYear,
            month: selectedMonth,
            day: selectedDate
        });
        console.log(selectedDate + "-" + selectedMonth + "-" + selectedYear);

        const weekdayNumber = selectedMoment.day();
        const weekday = listDate[weekdayNumber];
        setdate(weekday)
    }

    const [step, setStep] = useState(0);

    const menuData = {
        service: {
            categories: [
                {
                    id: 'private-room',
                    title: 'Private Room',
                    isOpen: false,
                    items: []
                },
                {
                    id: 'phu-thu',
                    title: 'Phụ thu',
                    isOpen: false,
                    items: []
                },
                {
                    id: 'giam-gia',
                    title: 'Giảm giá',
                    isOpen: false,
                    items: []
                },
                {
                    id: 'promotion',
                    title: 'Promotion',
                    isOpen: true,
                    items: [
                        {
                            id: 1,
                            name: 'KHĂN LẠNH',
                            price: 0,
                            image: 'https://cdn11.dienmaycholon.vn/filewebdmclnew/public/userupload/files/Image%20FP_2024/anh-dai-dien-tet-41.jpg'
                        },
                        {
                            id: 2,
                            name: 'WELCOME DRINK',
                            price: 0,
                            image: 'https://cdn11.dienmaycholon.vn/filewebdmclnew/public/userupload/files/Image%20FP_2024/anh-dai-dien-tet-41.jpg'
                        }
                    ]
                }
            ]
        },
        food: {
            categories: [
                {
                    id: 'thuc-an',
                    title: 'Thức ăn',
                    isOpen: false,
                    items: []
                },
                {
                    id: 'do-uong',
                    title: 'Đồ uống',
                    isOpen: false,
                    items: []
                },
                {
                    id: 'trai-cay',
                    title: 'TRÁI CÂY',
                    isOpen: true,
                    items: [
                        {
                            id: 3,
                            name: 'FRUIT PLATTER',
                            price: 690000,
                            image: '../image/fruit-1.png'
                        },
                        {
                            id: 4,
                            name: 'Fruit Platter',
                            price: 0,
                            image: '../image/fruit-2.png'
                        }
                    ]
                },
                {
                    id: 'do-kho',
                    title: 'ĐỒ KHÔ',
                    isOpen: false,
                    items: []
                },
                {
                    id: 'promotion-food',
                    title: 'Promotion',
                    isOpen: false,
                    items: []
                },
                {
                    id: 'funky',
                    title: 'FUNKY',
                    isOpen: false,
                    items: []
                },
                {
                    id: 'ss-tl-pod',
                    title: 'SS/TL/POD',
                    isOpen: false,
                    items: []
                }
            ]
        },
        combo: {
            categories: [
                {
                    id: 'combo-vip',
                    title: 'Combo VIP',
                    isOpen: false,
                    items: []
                },
                {
                    id: 'combo-add-on',
                    title: 'Combo Add On',
                    isOpen: false,
                    items: []
                },
                {
                    id: 'food-combo',
                    title: 'Food Combo',
                    isOpen: true,
                    items: [
                        {
                            id: 5,
                            name: 'CHILL & CHEER',
                            price: 1900000,
                            image: '../image/combo-1.png'
                        },
                        {
                            id: 6,
                            name: 'GLAMOUR NIGHT',
                            price: 1900000,
                            image: '../image/combo-2.png'
                        }
                    ]
                },
                {
                    id: 'combo-8',
                    title: 'COMBO 8',
                    isOpen: false,
                    items: []
                },
                {
                    id: 'combo-16',
                    title: 'COMBO 16',
                    isOpen: false,
                    items: []
                }
            ]
        }
    };

    const formatPrice = (price) => {
        if (price === 0) return '0';
        return price.toLocaleString('vi-VN');
    };

    const getCurrentData = () => {
        return menuData[activeTab] || { categories: [] };
    };

    return (


        <Page name="home">
            {/* Top Navbar */}
            <CommonNavbar />

            {/* Page content */}
            <PageContent>
                <List className='mx-2 my-2' simpleList>
                    <div className='d-flex align-items-center fs-6 fw-bold'>
                        <Link back>
                            <img src='../img/backward.gif' className='size-icon me-1'></img>
                        </Link>
                        Sơ đồ phòng
                    </div>
                </List>

                <div className='d-flex align-items-center row px-2'>
                    <div className='col-3'>

                        <img src='../image/left-arrow.gif' className='size-icon '></img>
                    </div>

                    <div className='col-6'>
                        <div data-bs-toggle="collapse" data-bs-target="#collapseSearch" aria-expanded="true" aria-controls="collapseSearch" className="d-flex align-items-center p-2 bg-light rounded-pill  w-100 fs-13" style={{ height: '45px' }}>
                            <input
                                type="text"
                                className="form-control bg-light border-0 shadow-none fs-13 fw-bold"
                                placeholder="Tìm kiếm"
                                style={{
                                    flex: 1,
                                    borderRadius: '50px',
                                }}
                                value={`${date} - ${searchDate}/${searchMonth + 1}/${searchYear}`}
                            />
                            <div id="open-modal-search-date-home"
                                className=" d-flex justify-content-center align-items-center me-0"
                                style={{
                                    backgroundColor: 'white',
                                    borderRadius: '50%',
                                    width: '35px',
                                    height: '35px',
                                }}
                            >
                                <lord-icon
                                    src="https://cdn.lordicon.com/uphbloed.json"
                                    trigger="loop"
                                    colors="primary:#f30771,secondary:#f30771"
                                    className=' me-1'
                                    style={{ width: '25px', height: '25px' }}>
                                </lord-icon>
                            </div>
                        </div>
                    </div>
                    <div className='text-end col-3'>
                        <img src='../image/right-arrow.gif' className='size-icon '></img>

                    </div>
                </div>
                <div className="collapse show" id="collapseSearch">
                    <div className='mt-3 row px-3'>
                        <div className='col-4'>

                            <select className='p-2 rounded-4 fs-13 border border-1 w-100 bg-light' value={selectedDate} onChange={(e) => setSelectedDate(parseInt(e.target.value))}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                                <option value="13">13</option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                                <option value="16">16</option>
                                <option value="17">17</option>
                                <option value="18">18</option>
                                <option value="19">19</option>
                                <option value="20">20</option>
                                <option value="21">21</option>
                                <option value="22">22</option>
                                <option value="23">23</option>
                                <option value="24">24</option>
                                <option value="25">25</option>
                                <option value="26">26</option>
                                <option value="27">27</option>
                                <option value="28">28</option>
                                <option value="29">29</option>
                                <option value="30">30</option>
                                <option value="31">31</option>
                            </select>

                        </div>
                        <div className='col-4'>
                            <select className='p-2 rounded-4 fs-13 border border-1 w-100 bg-light' value={selectedMonth}
                                onChange={(e) => setSelectedMonth(parseInt(e.target.value))}>
                                {moment.months().map((month, idx) => (
                                    <option key={idx} value={idx}>{month}</option>
                                ))}
                            </select>

                        </div>
                        <div className='col-4'>
                            <select className='p-2 rounded-4 fs-13 border border-1 w-100 bg-light' value={selectedYear}
                                onChange={(e) => setSelectedYear(parseInt(e.target.value))}>
                                {Array.from({ length: 10 }, (_, i) => {
                                    const year = moment().year() - 5 + i;
                                    return <option key={year} value={year}>{year}</option>;
                                })}
                            </select>
                        </div>
                    </div>
                    <div className='d-flex justify-content-center mt-3 px-3 mb-3'>
                        <button className='border-btn fs-13 fw-bold p-2 rounded-pill w-100' onClick={() => { handleSearchMonth() }}>Xem</button>
                    </div>
                </div>

                <swiper-container pagination loop class="demo-swiper-multiple px-4" space-between="50">
                    <swiper-slide>
                        {/* <div className='p-2 position-relative'>
                            <img src="https://cdn11.dienmaycholon.vn/filewebdmclnew/public/userupload/files/Image%20FP_2024/anh-dai-dien-tet-44.jpg" className=' rounded-circle w-100' style={{ objectFit: 'cover', filter: 'blur(5px)' }}></img>
                            <img src="https://cdn11.dienmaycholon.vn/filewebdmclnew/public/userupload/files/Image%20FP_2024/anh-dai-dien-tet-44.jpg" className='rounded-circle border border-4 border-dark position-absolute   m-3 avatar' style={{ height: "150px", width: "150px" }}></img>
                        </div> */}
                        <div>
                            <div className='p-2 position-relative pb-4'>
                                <img src="https://cdn11.dienmaycholon.vn/filewebdmclnew/public/userupload/files/Image%20FP_2024/anh-dai-dien-tet-44.jpg" className=' rounded-circle  w-100' style={{ objectFit: 'cover', filter: 'blur(5px)' }}></img>
                                <img src="https://cdn11.dienmaycholon.vn/filewebdmclnew/public/userupload/files/Image%20FP_2024/anh-dai-dien-tet-44.jpg" className='rounded-circle border border-4 border-dark position-absolute top-100 start-50 translate-middle m-3' style={{ height: "150px", width: "150px" }}></img>
                            </div>
                        </div>
                    </swiper-slide>
                    <swiper-slide>
                        <Card className='fs-13 border border-0 bg-warning text-white m-0 mt-3 rounded-3 p-1 pb-2'>
                            <img src='https://baochauelec.com/cdn/images/cong%20trinh/1-Cong-trinh-t4-2019/Ha-Noi/4-son-la/karaoke-kinh-doanh-o-son-la-h3.jpg' className='w-100 rounded-3'></img>
                            <div className='fw-bold mt-1'>Phòng VIP 4 dành cho 10 người</div>

                            <div className='d-flex align-items-center mt-1'>
                                <i class="f7-icons fs-13 me-1">house</i>Nguyễn Thị A
                            </div>
                            <div className='d-flex align-items-center mt-1'>
                                <i class="f7-icons fs-13 me-1">house</i> 9:00-12:00
                            </div>
                        </Card>
                    </swiper-slide>
                    <swiper-slide>
                        <Card className='fs-13 border border-0 bg-white m-0 mt-3 rounded-3 p-1 pb-2'>
                            <img src='https://baochauelec.com/cdn/images/cong%20trinh/1-Cong-trinh-t4-2019/Ha-Noi/4-son-la/karaoke-kinh-doanh-o-son-la-h3.jpg' className='w-100 rounded-3'></img>
                            <div className='fw-bold mt-1'>Phòng VIP 4 dành cho 10 người</div>

                            <div className='d-flex align-items-center mt-1'>
                                <i class="f7-icons fs-13 me-1">house</i>Nguyễn Thị A
                            </div>
                            <div className='d-flex align-items-center mt-1'>
                                <i class="f7-icons fs-13 me-1">house</i> 9:00-12:00
                            </div>
                        </Card>
                    </swiper-slide>
                </swiper-container>


                <div className='px-4'>
                    {step === 0 && (
                        <>
                            <div className='fs-13 fw-bold mt-3'>Sơ đồ phòng</div>
                            <div className="d-flex justify-content-between align-items-center gap-3  p-2 ">
                                <div className="d-flex align-items-center gap-1">
                                    <Badge className='bg-primary'> </Badge>
                                    <span className='fs-13'> Tổng booking</span>
                                </div>
                                <div className="d-flex align-items-center gap-1">
                                    <Badge className='bg-warning'> </Badge>
                                    <span className='fs-13'> Đã thanh toán</span>
                                </div>
                                <div className="d-flex align-items-center gap-1">
                                    <Badge className='bg-white'> </Badge>
                                    <span className='fs-13'> Còn chờ</span>
                                </div>
                            </div>
                            <div className='row' style={{ display: 'flex', alignItems: 'stretch' }}>
                                <div className='col-6 px-2' style={{ display: 'flex' }}>
                                    <Card className='fs-13 border border-0 bg-primary text-white m-0 mt-3 rounded-3 p-1 pb-2'>
                                        <img src='https://baochauelec.com/cdn/images/cong%20trinh/1-Cong-trinh-t4-2019/Ha-Noi/4-son-la/karaoke-kinh-doanh-o-son-la-h3.jpg' className='w-100 rounded-3'></img>
                                        <div className='fw-bold mt-1'>Phòng VIP 4 dành cho 10 người</div>

                                        <div className='d-flex align-items-center mt-1'>
                                            <i class="f7-icons fs-13 me-1">house</i>Nguyễn Thị A
                                        </div>
                                        <div className='d-flex align-items-center mt-1'>
                                            <i class="f7-icons fs-13 me-1">house</i> 9:00-12:00
                                        </div>
                                    </Card>
                                </div>
                                <div className='col-6 px-2' style={{ display: 'flex' }}>
                                    <Card className='fs-13 border border-0 bg-warning bg-opacity-75 text-white m-0 mt-3 rounded-3 p-1 pb-2'>
                                        <img src='https://baochauelec.com/cdn/images/cong%20trinh/1-Cong-trinh-t4-2019/Ha-Noi/4-son-la/karaoke-kinh-doanh-o-son-la-h3.jpg' className='w-100 rounded-3'></img>
                                        <div className='fw-bold mt-1'>Phòng VIP 4 dành cho 10 người</div>

                                        <div className='d-flex align-items-center mt-1'>
                                            <i class="f7-icons fs-13 me-1">house</i>Nguyễn Thị A
                                        </div>
                                        <div className='d-flex align-items-center mt-1'>
                                            <i class="f7-icons fs-13 me-1">house</i> 9:00-12:00
                                        </div>
                                    </Card>
                                </div>
                                <div className='col-6 px-2' style={{ display: 'flex' }}>
                                    <Card className='fs-13 border border-0 bg-white shadow-sm m-0 mt-3 rounded-3 p-1 pb-2'>
                                        <img src='https://baochauelec.com/cdn/images/cong%20trinh/1-Cong-trinh-t4-2019/Ha-Noi/4-son-la/karaoke-kinh-doanh-o-son-la-h3.jpg' className='w-100 rounded-3'></img>
                                        <div className='fw-bold mt-1'>Phòng VIP 4 dành cho 10 người</div>
                                    </Card>
                                </div>
                                <div className='col-6 px-2' style={{ display: 'flex' }}>
                                    <Card className='fs-13 border border-0 bg-warning bg-opacity-75 text-white m-0 mt-3 rounded-3 p-1 pb-2'>
                                        <img src='https://baochauelec.com/cdn/images/cong%20trinh/1-Cong-trinh-t4-2019/Ha-Noi/4-son-la/karaoke-kinh-doanh-o-son-la-h3.jpg' className='w-100 rounded-3'></img>
                                        <div className='fw-bold mt-1'>Phòng VIP 4 dành cho 10 người</div>

                                        <div className='d-flex align-items-center mt-1'>
                                            <i class="f7-icons fs-13 me-1">house</i>Nguyễn Thị A
                                        </div>
                                        <div className='d-flex align-items-center mt-1'>
                                            <i class="f7-icons fs-13 me-1">house</i> 9:00-12:00
                                        </div>
                                    </Card>
                                </div>
                                <div className='col-6 px-2' style={{ display: 'flex' }}>
                                    <Card className='fs-13 border border-0 bg-white shadow-sm m-0 mt-3 rounded-3 p-1 pb-2'>
                                        <img src='https://baochauelec.com/cdn/images/cong%20trinh/1-Cong-trinh-t4-2019/Ha-Noi/4-son-la/karaoke-kinh-doanh-o-son-la-h3.jpg' className='w-100 rounded-3'></img>
                                        <div className='fw-bold mt-1'>Phòng VIP 4 dành cho 10 người</div>
                                    </Card>
                                </div>

                            </div>
                            <div className='p-2 mt-3'>
                                <button className='rounded-pill border-btn fs-13 fw-bold p-2 fs-13 w-100' onClick={() => setStep(2)}>Tiếp tục</button>
                            </div>
                        </>
                    )}
                    {step === 1 && (
                        <>
                            <Card className='m-0  p-3 py-4 rounded-4 mt-3 fs-13 shadow-sm '>
                                <div className='fw-bold'>Thông tin phòng</div>
                                <div className='my-2'>Tên: <span className='fw-bold ms-2'>Happy 1</span></div>
                                <div> Ngày đặt: <span className='fw-bold ms-2'>{moment().format("DD/MM/YYYY")}</span></div>

                            </Card>
                            <Card className='m-0  p-3 py-4 rounded-4 mt-3 fs-13 shadow-sm '>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <div className='fw-bold'>Thông tin khách hàng</div>
                                </div>
                                <div className=' fs-13 fw-bold mt-3'>Tên <span className='text-danger ms-1'>(*)</span></div>
                                <div className='mt-2'>
                                    <input type='text' className='p-3 rounded-4 fs-13 border border-0 shadow-sm bg-secondary bg-opacity-25  w-100' placeholder="Tên"></input>
                                </div>
                                <div className=' fs-13 fw-bold mt-3'>Điện thoại <span className='text-danger ms-1'>(*)</span></div>
                                <div className='mt-2'>
                                    <input type='tel' className='p-3 rounded-4 fs-13 border border-0 shadow-sm bg-secondary bg-opacity-25  w-100' placeholder="Điện thoại"></input>
                                </div>
                                <div className=' fs-13 fw-bold mt-3'>Giờ <span className='text-danger ms-1'>(*)</span></div>
                                <div className='mt-2'>
                                    <input type='time' className='p-3 rounded-4 fs-13 border border-0 shadow-sm bg-secondary bg-opacity-25  w-100' ></input>
                                </div>
                                <div className=' fs-13 fw-bold mt-3'>Số người <span className='text-danger ms-1'>(*)</span></div>
                                <div className='mt-2'>
                                    <input type='number' className='p-3 rounded-4 fs-13 border border-0 shadow-sm bg-secondary bg-opacity-25  w-100' placeholder="0"></input>
                                </div>
                                <div className=' fs-13 fw-bold mt-3'>Yêu cầu</div>
                                <div className='mt-2'>
                                    <textarea rows={5} className='p-3 rounded-4 fs-13 border border-0 shadow-sm bg-secondary bg-opacity-25  w-100' placeholder="Yêu cầu"></textarea>
                                </div>
                            </Card>
                            <div className='p-2 mt-3'>
                                <button className='rounded-pill bg-pink text-white fs-13 p-3 w-100' onClick={() => setStep(2)}>Tiếp tục</button>
                            </div>
                        </>
                    )}
                    {step === 2 && (
                        <>
                            <Card className='m-0 p-3 py-4  rounded-4 mt-3 fs-13 shadow-sm '>
                                <div className='fw-bold'>Thông tin đặt phòng</div>
                                <div className=' fs-13 fw-bold mt-3'>Ngày <span className='text-danger ms-1'>(*)</span></div>
                                <div className='mt-2'>
                                    <input type='date' className='p-3 rounded-4 fs-13 border border-0 shadow-sm bg-secondary bg-opacity-25  w-100' placeholder='dd/mm/yyyy'></input>
                                </div>
                                <div className=' fs-13 fw-bold mt-3'>Giờ <span className='text-danger ms-1'>(*)</span></div>
                                <div className='mt-2'>
                                    <input type='time' className='p-3 rounded-4 fs-13 border border-0 shadow-sm bg-secondary bg-opacity-25  w-100' placeholder='Điện thoại'></input>
                                </div>
                                <div className=' fs-13 fw-bold mt-3'>Số người <span className='text-danger ms-1'>(*)</span></div>
                                <div className='mt-2'>
                                    <input type='number' className='p-3 rounded-4 fs-13 border border-0 shadow-sm bg-secondary bg-opacity-25  w-100' placeholder='0'></input>
                                </div>
                                <div className=' fs-13 fw-bold mt-3'>Yêu cầu <span className='text-danger ms-1'>(*)</span></div>
                                <div className='mt-2'>
                                    <textarea rows={5} className='p-3 rounded-4 fs-13 border border-0 shadow-sm bg-secondary bg-opacity-25  w-100' placeholder="Yêu cầu"></textarea>
                                </div>
                            </Card>
                            <div className='p-2 mt-3 d-flex align-items-center '>
                                <div className='col-6'>
                                    <button className='rounded-pill bg-secondary text-white fs-13 p-3 w-100' onClick={() => setStep(1)}>Quay lại</button>
                                </div>
                                <div className='col-6'>
                                    <button className='rounded-pill bg-pink text-white fs-13 p-3 w-100' onClick={() => setStep(3)}>Tiếp tục</button>
                                </div>
                            </div>
                        </>
                    )}

                    {step === 3 && (
                        <>
                            <Card className='m-0 p-3  py-4 rounded-4 mt-3 fs-13 shadow'>
                                <div className='fw-bold'>Món ăn / Dịch vụ</div>
                                <div className="px-3 py-2">
                                    <div className="row g-2">
                                        <div className="col-4">
                                            <Button
                                                fill={activeTab === 'service'}
                                                round
                                                className={`w-100 py-3 ${activeTab === 'service'
                                                    ? 'bg-pink text-white border-0'
                                                    : 'bg-light text-pink border-0'
                                                    }`}
                                                onClick={() => setActiveTab('service')}
                                            >
                                                Dịch vụ
                                            </Button>
                                        </div>
                                        <div className="col-4">
                                            <Button
                                                fill={activeTab === 'food'}
                                                round
                                                className={`w-100 py-3 ${activeTab === 'food'
                                                    ? 'bg-pink text-white border-0'
                                                    : 'bg-light text-pink border-0'
                                                    }`}
                                                onClick={() => setActiveTab('food')}
                                            >
                                                Món ăn
                                            </Button>
                                        </div>
                                        <div className="col-4">
                                            <Button
                                                fill={activeTab === 'combo'}
                                                round
                                                className={`w-100 py-3 ${activeTab === 'combo'
                                                    ? 'bg-pink text-white border-0'
                                                    : 'bg-light text-pink border-0'
                                                    }`}
                                                onClick={() => setActiveTab('combo')}
                                            >
                                                Combo
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                {/* Accordion Content */}
                                <div className="px-4">
                                    <div accordionList className='my-3'>
                                        {getCurrentData().categories.map((category) => (
                                            <AccordionItem
                                                key={category.id}
                                                accordionOpened={category.isOpen}
                                            >
                                                <AccordionToggle>
                                                    <div className="d-flex justify-content-between align-items-center w-100 py-3 mt-2">
                                                        <span className="fw-semibold text-dark fs-6">
                                                            {category.title}
                                                        </span>
                                                        <Icon
                                                            f7="chevron_down"
                                                            size="16px"
                                                            className="text-muted accordion-toggle-icon"
                                                        />
                                                    </div>
                                                </AccordionToggle>

                                                <AccordionContent>
                                                    {category.items.length > 0 ? (
                                                        <div className="row g-3 py-3">
                                                            {category.items.map((item) => (
                                                                <div key={item.id} className="col-6">
                                                                    <Card className="m-0 border-0 shadow-sm p-2 h-100">
                                                                        <div className="text-center">
                                                                            <div className="mb-3">
                                                                                <img
                                                                                    src={item.image}
                                                                                    alt={item.name}
                                                                                    className="w-100 rounded-3"
                                                                                    style={{
                                                                                        height: '120px',
                                                                                        objectFit: 'cover',
                                                                                        backgroundColor: '#f8f9fa'
                                                                                    }}
                                                                                    onError={(e) => {
                                                                                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiBmaWxsPSIjRjhGOUZBIi8+CjxjaXJjbGUgY3g9IjYwIiBjeT0iNjAiIHI9IjIwIiBmaWxsPSIjREVFMkU2Ii8+PC9zdmc+';
                                                                                    }}
                                                                                />
                                                                            </div>

                                                                            <div className="mb-2">
                                                                                <h6 className="fw-bold mb-1 fs-13 text-uppercase">
                                                                                    {item.name}
                                                                                </h6>
                                                                                <p className="text-dark fw-bold mb-0 fs-6">
                                                                                    {formatPrice(item.price)}
                                                                                    {item.price > 0 && <span className="fs-12 text-muted">đ</span>}
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </Card>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    ) : (
                                                        <div className="text-center py-4">
                                                            <p className="text-muted fs-13 mb-0">
                                                                Không có dữ liệu
                                                            </p>
                                                        </div>
                                                    )}
                                                </AccordionContent>
                                            </AccordionItem>
                                        ))}
                                    </div>
                                </div>

                            </Card>
                            <div className='p-2 mt-3 d-flex align-items-center grid grid-cols-2 grid-gap '>
                                <div>
                                    <button className='rounded-pill bg-secondary text-white fs-13 p-3 w-100' onClick={() => setStep(2)}>Quay lại</button>
                                </div>
                                <div>
                                    <button className='rounded-pill bg-pink text-white fs-13 p-3 w-100' onClick={() => setStep(4)}>Tiếp tục</button>
                                </div>
                            </div>
                        </>
                    )}
                    {step === 4 && (
                        <>
                            <Card className='m-0 p-3  py-4 rounded-4 mt-3 fs-13 shadow'>
                                <div className='fw-bold'>Thông tin thanh toán</div>
                                <div className=' fs-13 fw-bold mt-3'>Cọc trước</div>
                                <div className='mt-2'>
                                    <input type='text' className='p-3 rounded-4 fs-13 border border-0 shadow-sm bg-secondary bg-opacity-25  w-100' placeholder='Cọc trước'></input>
                                </div>

                                <div className=' fs-13 fw-bold mt-3'>Hình thức</div>
                                <Segmented value="1">
                                    <Button value="1">
                                        Chuyển khoản
                                    </Button>
                                    <Button value="2">
                                        Tiền mặt
                                    </Button>
                                </Segmented>

                            </Card>
                            <div className='p-2 mt-3 d-flex align-items-center  grid grid-cols-2 grid-gap'>
                                <div>
                                    <button className='rounded-pill bg-secondary text-white fs-13 p-3 w-100' onClick={() => setStep(3)}>Quay lại</button>
                                </div>
                                <div>
                                    <button className='rounded-pill bg-pink text-white fs-13 p-3 w-100' onClick={() => { success() }}>Hoàn tất</button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </PageContent>
        </Page>

    );
}
export default BookingPage;