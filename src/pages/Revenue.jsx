import React, { useEffect, useState } from 'react';
import {
    Page,
    Navbar,
    NavLeft,
    NavTitle,
    NavRight,
    Link,
    Block,
    BlockTitle,
    Card,
    Icon,
    Button,
    Segmented,
    f7,
    List
} from 'framework7-react';
import moment from 'moment';
import CommonNavbar from '../components/CommonNavbar';
import PageTransition from '../components/PageTransition';

const RevenuePage = () => {
    const [selectedPeriod, setSelectedPeriod] = useState('date');
    const [currentDate, setCurrentDate] = useState(moment());
    const [showDatePicker, setShowDatePicker] = useState(false);

    // Thêm state cho date picker
    const [tempDate, setTempDate] = useState(moment().date());
    const [tempMonth, setTempMonth] = useState(moment().month());
    const [tempYear, setTempYear] = useState(moment().year());


    // Format hiển thị ngày tháng theo period
    const formatDate = (date, period) => {
        switch (period) {
            case 'date':
                const dayOfWeek = date.format('dddd');
                const dayMap = {
                    'Monday': 'T2',
                    'Tuesday': 'T3',
                    'Wednesday': 'T4',
                    'Thursday': 'T5',
                    'Friday': 'T6',
                    'Saturday': 'T7',
                    'Sunday': 'CN'
                };
                return `${dayMap[dayOfWeek] || 'T2'} - ${date.format('DD/MM/YYYY')}`;
            case 'week':
                const startWeek = date.clone().startOf('week');
                const endWeek = date.clone().endOf('week');
                return `${startWeek.format('DD/MM')} - ${endWeek.format('DD/MM/YYYY')}`;
            case 'month':
                return date.format('MM/YYYY');
            default:
                return date.format('DD/MM/YYYY');
        }
    };

    // Xử lý khi chọn period
    const handlePeriodChange = (period) => {
        setSelectedPeriod(period);
        setCurrentDate(moment());
        loadRevenueData(moment(), period);
        setShowDatePicker(false); // Đóng date picker khi đổi period
    };

    // Điều hướng lùi
    const handlePrevious = () => {
        let newDate;
        if (selectedPeriod === 'date') {
            newDate = currentDate.clone().subtract(1, 'day');
        } else if (selectedPeriod === 'week') {
            newDate = currentDate.clone().subtract(1, 'week');
        } else {
            newDate = currentDate.clone().subtract(1, 'month');
        }
        setCurrentDate(newDate);
        loadRevenueData(newDate, selectedPeriod);
    };

    // Điều hướng tiến
    const handleNext = () => {
        let newDate;
        if (selectedPeriod === 'date') {
            newDate = currentDate.clone().add(1, 'day');
        } else if (selectedPeriod === 'week') {
            newDate = currentDate.clone().add(1, 'week');
        } else {
            newDate = currentDate.clone().add(1, 'month');
        }
        setCurrentDate(newDate);
        loadRevenueData(newDate, selectedPeriod);
    };

    // Xử lý khi click vào ngày tháng để mở/đóng date picker
    const handleDateClick = () => {
        setShowDatePicker(!showDatePicker);
        // Set temp values to current date
        setTempDate(currentDate.date());
        setTempMonth(currentDate.month());
        setTempYear(currentDate.year());
    };

    // Xử lý khi apply date picker
    const handleApplyDate = () => {
        let newDate;
        if (selectedPeriod === 'date') {
            newDate = moment({
                year: tempYear,
                month: tempMonth,
                day: tempDate
            });
        } else if (selectedPeriod === 'week') {
            // Với week, chọn ngày cụ thể và lấy tuần chứa ngày đó
            newDate = moment({
                year: tempYear,
                month: tempMonth,
                day: tempDate
            }).startOf('week');
        } else {
            // Chọn ngày đầu tiên của tháng
            newDate = moment({
                year: tempYear,
                month: tempMonth,
                day: 1
            });
        }
        setCurrentDate(newDate);
        loadRevenueData(newDate, selectedPeriod);
        setShowDatePicker(false);
    };

    // Load dữ liệu revenue theo period
    const loadRevenueData = (date, period) => {
        console.log(`Loading revenue data for ${period}:`, date.format('YYYY-MM-DD'));

        const mockData = {
            date: {
                totalBookings: Math.floor(Math.random() * 10),
                paid: Math.floor(Math.random() * 5),
                cancelled: Math.floor(Math.random() * 3),
            },
            week: {
                totalBookings: Math.floor(Math.random() * 50),
                paid: Math.floor(Math.random() * 30),
                cancelled: Math.floor(Math.random() * 10),
            },
            month: {
                totalBookings: Math.floor(Math.random() * 200),
                paid: Math.floor(Math.random() * 150),
                cancelled: Math.floor(Math.random() * 30),
            }
        };

        // setTimeout(() => {
        //     setRevenueData(prev => ({
        //         ...prev,
        //         ...mockData[period]
        //     }));
        // }, 300);
    };

    // Check xem có thể điều hướng tiến không
    const canGoNext = () => {
        const today = moment();
        if (selectedPeriod === 'date') {
            return currentDate.isBefore(today, 'day');
        } else if (selectedPeriod === 'week') {
            return currentDate.isBefore(today, 'week');
        } else {
            return currentDate.isBefore(today, 'month');
        }
    };

    useEffect(() => {
        loadRevenueData(currentDate, selectedPeriod);
    }, []);

    return (
        <Page name="revenue" >
            {/* Top Navbar */}
            <CommonNavbar />

            {/* Period Selector */}
            <List className='m-2' simpleList>
                <div className='d-flex align-items-center fs-6 fw-bold'>
                    {/* <PageTransition href="/home/">
                        <img src='../img/backward.gif' className='size-icon me-1'></img>
                    </PageTransition> */}
                    <PageTransition
                        href="/"
                        className="me-1"
                    >
                        <img
                            src='../img/backward.gif'
                            className='size-icon'
                            alt="Back"
                            style={{
                                width: '24px',
                                height: '24px',
                                objectFit: 'contain'
                            }}
                        />
                    </PageTransition>
                    Báo cáo doanh thu
                </div>
            </List>
            <div className="px-3 py-3">
                <div className="row g-2">
                    <div className="col-4">
                        <Button
                            fill={selectedPeriod === 'date'}
                            round
                            color={selectedPeriod === 'date' ? 'pink' : 'gray'}
                            className={`w-100 p-3 ${selectedPeriod === 'date' ? 'text-white bg-pink' : 'text-dark'}`}
                            onClick={() => handlePeriodChange('date')}
                        >
                            <Icon f7="calendar" className="me-2" size="16px"></Icon>
                            Date
                        </Button>
                    </div>
                    <div className="col-4">
                        <Button
                            fill={selectedPeriod === 'week'}
                            round
                            color={selectedPeriod === 'week' ? 'pink' : 'gray'}
                            className={`w-100 p-3 ${selectedPeriod === 'week' ? 'text-white' : 'text-dark'}`}
                            onClick={() => handlePeriodChange('week')}
                        >
                            <Icon f7="calendar" className="me-2" size="16px"></Icon>
                            Week
                        </Button>
                    </div>
                    <div className="col-4">
                        <Button
                            fill={selectedPeriod === 'month'}
                            round
                            color={selectedPeriod === 'month' ? 'pink' : 'gray'}
                            className={`w-100 p-3 ${selectedPeriod === 'month' ? 'text-white' : 'text-dark'}`}
                            onClick={() => handlePeriodChange('month')}
                        >
                            <Icon f7="calendar" className="me-2" size="16px"></Icon>
                            Month
                        </Button>
                    </div>
                </div>
            </div>

            {/* Date Navigation */}
            <div className="d-flex justify-content-between align-items-center px-3 py-2">
                <Button fill={false} onClick={handlePrevious}>
                    <Icon f7="chevron_left" size="20px"></Icon>
                </Button>

                <div className="d-flex align-items-center" onClick={handleDateClick} style={{ cursor: 'pointer' }}>
                    <span className="fw-semibold">{formatDate(currentDate, selectedPeriod)}</span>
                    <Button fill={false} className="ms-2">
                        <Icon f7="line_horizontal_3_decrease" size="16px"></Icon>
                    </Button>
                </div>

                <Button
                    fill={false}
                    onClick={handleNext}
                    disabled={!canGoNext()}
                    className={!canGoNext() ? 'opacity-50' : ''}
                >
                    <Icon f7="chevron_right" size="20px"></Icon>
                </Button>
            </div>

            {/* Date Picker Collapse */}
            {showDatePicker && (
                <div className="px-3">
                    <Card className="p-3 border border-0 m-0">
                        {/* Picker cho Date và Week - giao diện giống nhau */}
                        {(selectedPeriod === 'date' || selectedPeriod === 'week') && (
                            <>
                                <div className="row g-2 mb-3">
                                    <div className="col-4">
                                        <select
                                            className="form-select form-select-sm bg-light border-1 rounded-3"
                                            value={tempDate}
                                            onChange={(e) => setTempDate(parseInt(e.target.value))}
                                        >
                                            {Array.from({ length: 31 }, (_, i) => (
                                                <option key={i + 1} value={i + 1}>{i + 1}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-4">
                                        <select
                                            className="form-select form-select-sm bg-light border-1 rounded-3"
                                            value={tempMonth}
                                            onChange={(e) => setTempMonth(parseInt(e.target.value))}
                                        >
                                            {moment.months().map((month, idx) => (
                                                <option key={idx} value={idx}>{month}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-4">
                                        <select
                                            className="form-select form-select-sm bg-light border-1 rounded-3"
                                            value={tempYear}
                                            onChange={(e) => setTempYear(parseInt(e.target.value))}
                                        >
                                            {Array.from({ length: 10 }, (_, i) => {
                                                const year = moment().year() - 5 + i;
                                                return <option key={year} value={year}>{year}</option>;
                                            })}
                                        </select>
                                    </div>
                                </div>
                            </>
                        )}

                        {/* Picker cho Month */}
                        {selectedPeriod === 'month' && (
                            <>
                                <div className="row g-2 mb-3">
                                    <div className="col-6">
                                        <select
                                            className="form-select form-select-sm bg-light border-1 rounded-3"
                                            value={tempMonth}
                                            onChange={(e) => setTempMonth(parseInt(e.target.value))}
                                        >
                                            {moment.months().map((month, idx) => (
                                                <option key={idx} value={idx}>{month}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-6">
                                        <select
                                            className="form-select form-select-sm bg-light border-1 rounded-3"
                                            value={tempYear}
                                            onChange={(e) => setTempYear(parseInt(e.target.value))}
                                        >
                                            {Array.from({ length: 10 }, (_, i) => {
                                                const year = moment().year() - 5 + i;
                                                return <option key={year} value={year}>{year}</option>;
                                            })}
                                        </select>
                                    </div>
                                </div>
                            </>
                        )}

                        {/* Button Apply */}
                        <Button
                            fill
                            // color="pink" 
                            className="w-100 bg-pink text-white  rounded-pill py-3"
                            onClick={handleApplyDate}
                        >
                            <span className="fw-semibold">Xem</span>
                        </Button>
                    </Card>
                </div>
            )}

            {/* Statistics Cards */}
            <div className="row px-3 g-3 mb-4 mt-2">
                <div className="col-4">
                    <Card className="text-center m-1 p-3 border-0 shadow-sm text-pink">
                        <div
                            className="display-4 fw-bold mb-1"
                        >
                            0
                        </div>
                        <div className='fs-13'>Total </div>
                    </Card>
                </div>
                <div className="col-4">
                    <Card className="text-center m-1 p-3 border-0 shadow-sm  text-success">
                        <div className="display-4 fw-bold mb-1">0</div>
                        <div className='fs-13'>Paid</div>
                    </Card>
                </div>
                <div className="col-4">
                    <Card className="text-center m-1 p-3 border-0 shadow-sm text-secondary">
                        <div className="display-4 fw-bold  mb-1">0</div>
                        <div className='fs-13'>Cancelled</div>
                    </Card>
                </div>
            </div>

            {/* Legend */}
            <div class="grid grid-cols-3 fs-13 mt-2 px-3">
                <div className='d-flex align-items-center mt-2'>
                    <div className='hinh-vuong bg-primary rounded-2 me-1'></div>
                    4 Nhận khách
                </div>
                <div className='d-flex align-items-center mt-2'>
                    <div className='hinh-vuong bg-success rounded-2 me-1'></div>
                    4 Thanh toán
                </div>
                <div className='d-flex align-items-center mt-2'>
                    <div className='hinh-vuong bg-warning rounded-2 me-1'></div>
                    4 Đợi duyệt
                </div>
                <div className='d-flex align-items-center mt-2'>
                    <div className='hinh-vuong bg-info rounded-2 me-1'></div>
                    0 Chờ duyệt
                </div>
                <div className='d-flex align-items-center mt-2'>
                    <div className='hinh-vuong bg-danger rounded-2 me-1'></div>
                    0 Không duyệt
                </div>
                <div className='d-flex align-items-center mt-2'>
                    <div className='hinh-vuong bg-secondary rounded-2 me-1'></div>
                    0 Đã hủy
                </div>
            </div>
            <div className="m-3">
                <div onClick={() => { bookingDetail(1) }} className='border-bottom hieuung p-2 rounded-2 d-flex align-items-center fs-13'>
                    <div className='bg-primary rounded-2' style={{ width: "35px", height: "35px" }}></div>
                    <div className='ms-2'>
                        <div className='fw-bold mb-1'>MR TRUNG & HUY NGUYỄN (K.BI)</div>
                        <div>31/07/2025 12:00:00</div>
                    </div>
                </div>
                <div onClick={() => { bookingDetail(1) }} className=' hieuung mt-2 p-2 rounded-2 d-flex align-items-center fs-13'>
                    <div className='bg-primary rounded-2' style={{ width: "35px", height: "35px" }}></div>
                    <div className='ms-2'>
                        <div className='fw-bold mb-1'>MR TRUNG & HUY NGUYỄN (K.BI)</div>
                        <div>31/07/2025 12:00:00</div>
                    </div>
                </div>
            </div>
            {/* Map/Chart Area */}
            <Card className="mx-3 p-4 text-center border-0 shadow-sm" style={{ minHeight: '300px' }}>
                <div className="position-relative d-flex align-items-center justify-content-center" style={{ height: '250px' }}>
                    <img src='../img/not-booking.svg' className='w-100'></img>
                </div>

            </Card>

            <div className="pb-4"></div>
        </Page>
    );
};

export default RevenuePage;