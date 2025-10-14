import { Sheet, Toolbar, PageContent, Block, Link, Card, ListInput, List, Icon, Button, Segmented, ListItem, f7 } from "framework7-react";
import { useEffect, useState } from "react";
import moment from 'moment';
import SheetInvoices from "./Invoices";
import axios from "axios";
export default function SheetRevenue({ opened, onClose }) {
    const [sheetOpened1, setSheetOpened1] = useState(false);


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
            historyDate();
        } else if (selectedPeriod === 'week') {
            // Với week, chọn ngày cụ thể và lấy tuần chứa ngày đó
            newDate = moment({
                year: tempYear,
                month: tempMonth,
                day: tempDate
            }).startOf('week');
            historyWeek();
        } else {
            // Chọn ngày đầu tiên của tháng
            newDate = moment({
                year: tempYear,
                month: tempMonth,
                day: 1
            });
            historyMonth()
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
        if (opened) {
            historyDate();
        }
    }, [opened]);

    const [invoices, setInvoices] = useState([]);
    function historyDate() {
        const brand = localStorage.getItem("happyCorp_brand");
        const token = localStorage.getItem("HappyCorp-token-app");
        const data = {
            "token": token,
            "brand": brand,
            "day": tempDate,
            "month": tempMonth + 1,
            "year": tempYear
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
                    console.log("date", res.data.data);
                    setInvoices(res.data.data);
                }
            })
            .catch((error) => {
                f7.dialog.alert(error, "Error");
                console.log("k ket noi dc api");
            });
    }
    function historyWeek() {
        const brand = localStorage.getItem("happyCorp_brand");
        const token = localStorage.getItem("HappyCorp-token-app");
        const data = {
            "token": token,
            "brand": brand,
            "day": tempDate,
            "month": tempMonth + 1,
            "year": tempYear
        }

        const api = axios.create({
            baseURL: "https://api-happy.eclo.io/api",
        });

        api.post("/invoicesWeek", data, {
            headers: { "Content-Type": "application/json" },
        })
            .then((res) => {
                if (res.data.status === "error") {
                    console.log("lỗi");
                    f7.dialog.alert(res.data.content, "Error");
                } else if (res.data.status === "success") {
                    console.log("week", res.data.data);
                    setInvoices(res.data.data);
                }
            })
            .catch((error) => {
                f7.dialog.alert(error, "Error");
                console.log("k ket noi dc api");
            });
    }
    function historyMonth() {
        const brand = localStorage.getItem("happyCorp_brand");
        const token = localStorage.getItem("HappyCorp-token-app");
        const data = {
            "token": token,
            "brand": brand,
            "day": tempDate,
            "month": tempMonth + 1,
            "year": tempYear
        }

        const api = axios.create({
            baseURL: "https://api-happy.eclo.io/api",
        });
        api.post("/invoicesMonth", data, {
            headers: { "Content-Type": "application/json" },
        })
            .then((res) => {
                if (res.data.status === "error") {
                    console.log("lỗi");
                    f7.dialog.alert(res.data.content, "Error");
                } else if (res.data.status === "success") {
                    console.log("month", res.data.data);
                    setInvoices(res.data.data);
                }
            })
            .catch((error) => {
                f7.dialog.alert(error, "Error");
                console.log("k ket noi dc api");
            });
    }
    return (
        <>
            <Sheet
                className="demo-sheet-2 h-100"
                opened={opened}
                onSheetClosed={onClose}
            >
                <Toolbar className="">
                    <div className="left fw-bold d-flex align-items-center">
                        Doanh thu
                    </div>
                    <div className="right fs-13">
                        <Link sheetClose>Close</Link>
                    </div>
                </Toolbar>
                <PageContent className="pb-5 pt-0">

                    <div className="px-3 py-3">
                        <div className="row g-2">
                            <div className="col-4">
                                <Button
                                    fill={selectedPeriod === 'date'}
                                    round
                                    color={selectedPeriod === 'date' ? 'pink' : 'gray'}
                                    className={`w-100 p-3 ${selectedPeriod === 'date' ? 'text-white bg-pink' : ''}`}
                                    onClick={() => { handlePeriodChange('date'); historyDate }}
                                >
                                    <Icon f7="calendar" className="me-2" size="16px"></Icon>
                                    Ngày
                                </Button>
                            </div>
                            <div className="col-4">
                                <Button
                                    fill={selectedPeriod === 'week'}
                                    round
                                    color={selectedPeriod === 'week' ? 'pink' : 'gray'}
                                    className={`w-100 p-3 ${selectedPeriod === 'week' ? 'text-white bg-pink' : ''}`}
                                    onClick={() => { handlePeriodChange('week'); historyWeek }}
                                >
                                    <Icon f7="calendar" className="me-2" size="16px"></Icon>
                                    Tuần
                                </Button>
                            </div>
                            <div className="col-4">
                                <Button
                                    fill={selectedPeriod === 'month'}
                                    round
                                    color={selectedPeriod === 'month' ? 'pink' : 'gray'}
                                    className={`w-100 p-3 ${selectedPeriod === 'month' ? 'text-white bg-pink' : ''}`}
                                    onClick={() => { handlePeriodChange('month'); historyMonth() }}
                                >
                                    <Icon f7="calendar" className="me-2" size="16px"></Icon>
                                    Tháng
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
                                                    className="form-select form-select-sm bg-light border-1 rounded-3 text-dark"
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
                                                    className="form-select form-select-sm bg-light border-1 rounded-3  text-dark"
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
                                                    className="form-select form-select-sm bg-light border-1 rounded-3  text-dark"
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
                                                    className="form-select form-select-sm bg-light border-1 rounded-3  text-dark"
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
                                                    className="form-select form-select-sm bg-light border-1 rounded-3 text-dark"
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
                    <div className="row mx-2 g-3 mb-4 mt-2">
                        <div className="col-4 p-1">
                            <Card className="text-center m-1 p-3 px-1 border-0 shadow-none text-pink">
                                <div
                                    className="display-4 fw-bold mb-1"
                                >
                                    0
                                </div>
                                <div className='fs-13'>Tổng </div>
                            </Card>
                        </div>
                        <div className="col-4 p-1">
                            <Card className="text-center m-1 p-3 px-1 border-0 shadow-none  text-success">
                                <div className="display-4 fw-bold mb-1">0</div>
                                <div className='fs-13'>Đã thanh toán</div>
                            </Card>
                        </div>
                        <div className="col-4 p-1">
                            <Card className="text-center m-1 p-3 px-1 border-0 shadow-none text-secondary">
                                <div className="display-4 fw-bold  mb-1">0</div>
                                <div className='fs-13'>Đã huỷ</div>
                            </Card>
                        </div>
                    </div>

                    {/* Legend */}
                    <div class="grid grid-cols-3 fs-13 mt-2 px-3">
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
                    <List className='px-4 mb-3 mt-3'>
                        {invoices.length > 0 ? invoices.map((invoice) => {
                            return (
                                <>
                                    <ListItem onClick={() => { setSheetOpened1(true); localStorage.setItem("HappyCorp_id_invoices", invoice.active) }} className='row mt-2'>
                                        <div className='col-2'>
                                            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlyd6LH2s0z9gH9I33pj9ZTUzbO_GEv5fCPQ&s' className='w-100 border border-2 rounded-3 border-danger'></img>
                                        </div>
                                        <div className='col-10 fs-13 ms-2 border-bottom '>
                                            <div className='fw-bold d-flex justify-content-between'>
                                                Phòng: {invoice.room_name}
                                                <div>
                                                    {invoice.process == 1 || invoice.process == 100 &&
                                                        <span className='text-primary'>Nhận khách</span>
                                                    }
                                                    {invoice.process == 2 &&
                                                        <span className='text-warning'>Đợi duyệt</span>
                                                    }
                                                    {invoice.process == 3 || invoice.process == 300 &&
                                                        <span className='text-secondary'>Đã hủy</span>
                                                    }
                                                    {invoice.process == 20 &&
                                                        <span className='text-danger'>Đã hủy</span>
                                                    }
                                                    {invoice.process == 200 &&
                                                        <span className='text-success'>Đã hoàn tất</span>
                                                    }
                                                </div>
                                            </div>
                                            <div className=' mt-1 mb-2'>{invoice.date}</div>
                                        </div>
                                    </ListItem>
                                </>
                            )
                        }) : (
                            <>
                                <img src='../image/not-booking.svg' className='w-100'></img>
                                <div className='text-center fs-15 mt-2'>Không có dữ liệu</div>
                            </>
                        )}

                    </List>
                </PageContent>

            </Sheet>
            <SheetInvoices
                opened={sheetOpened1}
                onClose={() => setSheetOpened1(false)}
            />

        </>


    );
}
