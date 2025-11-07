import { Sheet, Toolbar, PageContent, Block, Link, Card, ListInput, List, Icon, Button, Segmented, Popover, ListItem, f7 } from "framework7-react";
import { useEffect, useState } from "react";
import moment from 'moment';
import SheetBookingCompleted from "./BookingCompleted";
import axios from "axios";
export default function SheetBooking1({ opened, onClose }) {
    const [selectedMonth, setSelectedMonth] = useState(moment().month()); // 0 - 11
    const [selectedYear, setSelectedYear] = useState(moment().year());
    const [selectedDate, setSelectedDate] = useState(moment().date());

    const listDate = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

    const [searchDate, setSearchDate] = useState(moment().date());
    const [searchMonth, setSearchMonth] = useState(moment().month()); // 0 - 11
    const [searchYear, setSearchYear] = useState(moment().year());
    const [date, setdate] = useState("");
     const handleCloseAllModals = () => {
            try {
                // Đóng tất cả sheet
                const openedSheets = document.querySelectorAll('.sheet.modal-in, .sheet-modal.modal-in');
                openedSheets.forEach(sheet => {
                    f7.sheet.close(sheet);
                });
                f7.dialog.close();
                f7.toast.close();
                console.log("All modals closed successfully");
            } catch (error) {
                console.error("Error closing modals:", error);
            }
        };
    
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

    const [time, setTime] = useState("");
    useEffect(() => {
        const now = new Date();
        const hh = String(now.getHours()).padStart(2, "0");
        const mm = String(now.getMinutes()).padStart(2, "0");
        setTime(`${hh}:${mm}`);
    }, []);


    const [activeStrongButton, setActiveStrongButton] = useState(0);
    const [sheetOpenedCompleted, setSheetOpenedCompleted] = useState(false);

    const [roomDetail, setRoomDetail] = useState();

    const [invoices, setInvoices] = useState();
    const [area, setArea] = useState();
    const [payment, setPayment] = useState([]);

    const [selectPayment, setSelectPayment] = useState(1);

    const [customers, setCustomers] = useState([]);
    useEffect(() => {
        if (opened) {
            const activeRoom = localStorage.getItem("HappyCorp_active_room");
            const token = localStorage.getItem("HappyCorp-token-app");
            const brand = localStorage.getItem("happyCorp_brand");
            const a= localStorage.getItem("HappyCorp-id-account");
            {a && setIdCus(a)}
            const data = {
                "token": token,
                "active": activeRoom
            }

            const api = axios.create({
                baseURL: "https://api-happy.eclo.io/api",
            });

            api.post("/booking-room-detail", data, {
                headers: { "Content-Type": "application/json" },
            })
                .then((res) => {
                    if (res.data.status === "error") {
                        console.log("lỗi");
                        f7.dialog.alert(res.data.content, "Error");
                    } else if (res.data.status === "success") {
                        console.log(res.data.data);
                        setRoomDetail(res.data.roomDetail);
                        setInvoices(res.data.invoices);
                        setArea(res.data.areas);

                        const forms = res.data.forms;
                        setPayment(forms); // Lưu danh sách forms

                        // Lấy ID của phương thức thanh toán đầu tiên
                        if (forms.length > 0) {
                            const firstPaymentId = forms[0].id;
                            setSelectPayment(firstPaymentId); // Gán ID đầu tiên vào state
                        }
                    }
                })
                .catch((error) => {
                    f7.dialog.alert(error, "Error");
                    console.log("k ket noi dc api");
                });


            const data2 = {
                "token": token,
                "brand": brand
            }

            api.post("/customers", data2, {
                headers: { "Content-Type": "application/json" },
            })
                .then((res) => {
                    if (res.data.status === "error") {
                        console.log("lỗi");
                        f7.dialog.alert(res.data.content, "Error");
                    } else if (res.data.status === "success") {
                        console.log(res.data.data);
                        setCustomers(res.data.data);
                    }
                })
                .catch((error) => {
                    f7.dialog.alert(error, "Error");
                    console.log("k ket noi dc api");
                });
        }
    }, [opened]);


    const [idCus, setIdCus] = useState();
    const [price, setPrice] = useState(0);
    function booking() {

        const datePartMoment = moment(`${selectedYear}-${selectedMonth + 1}-${selectedDate}`, 'YYYY-M-D');
        const dateString = datePartMoment.format('YYYY-MM-DD');
        // Ví dụ: "2025-11-07"

        // 2. Chuẩn bị phần Giờ: Lấy giá trị từ state `time` (HH:mm) và thêm giây (:00)
        // Lấy giá trị HH:mm (vd: "18:06") và nối thêm ":00" cho giây
        const timeStringWithSeconds = time ? `${time}:00` : moment().format('HH:mm:00');
        // Ví dụ: "18:06:00"

        // 3. Kết hợp
        const combinedDateTime = `${dateString} ${timeStringWithSeconds}`;


        const activeRoom = localStorage.getItem("HappyCorp_active_room");
        const token = localStorage.getItem("HappyCorp-token-app");
        const brand = localStorage.getItem("happyCorp_brand");
        const data = {
            "token": token,
            "active-room": activeRoom,
            "brand": brand,
            "date": combinedDateTime,
            "amount": amount,
            "note": note,
            "customers": idCus,
            "process": 1,
            "card": "",
            "price": price
        }

        const api = axios.create({
            baseURL: "https://api-happy.eclo.io/api",
        });

        api.post("/add-booking", data, {
            headers: { "Content-Type": "application/json" },
        })
            .then((res) => {
                if (res.data.status === "error") {
                    console.log("lỗi");
                    f7.dialog.alert(res.data.content, "Error");
                } else if (res.data.status === "success") {
                    console.log(res.data.active);
                    addPayment(res.data.active);
                    localStorage.setItem("HappyCorp_id_invoices", res.data.active)

                }
            })
            .catch((error) => {
                f7.dialog.alert(error, "Error");
                console.log("k ket noi dc api");
            });


    }

    function addPayment(e) {
        const token = localStorage.getItem("HappyCorp-token-app");
        const brand = localStorage.getItem("happyCorp_brand");
        const listMenu = localStorage.getItem("selectedBookingMenu")
        const data = {
            "token": token,
            "payment": selectPayment,
            "brand": brand,
            "active": e
        }

        const data2 = {
            "token": token,
            "brand": brand,
            "active": e,
            "items": listMenu

        }
        const api = axios.create({
            baseURL: "https://api-happy.eclo.io/api",
        });

        api.post("/add-booking-payment", data, {
            headers: { "Content-Type": "application/json" },
        })
            .then((res) => {
                if (res.data.status === "error") {
                    console.log("lỗi");
                    f7.dialog.alert(res.data.content, "Error");
                } else if (res.data.status === "success") {
                    console.log(res.data.content);


                }
            })
            .catch((error) => {
                f7.dialog.alert(error, "Error");
                console.log("k ket noi dc api");
            });

        api.post("/add-booking-product", data2, {
            headers: { "Content-Type": "application/json" },
        })
            .then((res) => {
                if (res.data.status === "error") {
                    console.log("lỗi");
                    f7.dialog.alert(res.data.content, "Error");
                } else if (res.data.status === "success") {
                    console.log(res.data.content);
                    setSheetOpenedCompleted(true);
                    localStorage.removeItem("selectedBookingMenu")

                }
            })
            .catch((error) => {
                f7.dialog.alert(error, "Error");
                console.log("k ket noi dc api");
            });
    }

    const [amount, setAmount] = useState(0);
    const [note, setNote] = useState("");

    const [searchTerm, setSearchTerm] = useState('');

    const filteredCustomers = (customers || []).filter(customer => {
        // 1. Chuyển giá trị tìm kiếm và các trường cần tìm kiếm về chữ thường để tìm kiếm không phân biệt hoa/thường
        const lowerCaseSearchTerm = searchTerm.toLowerCase();

        // 2. Kiểm tra xem số điện thoại hoặc tên có chứa chuỗi tìm kiếm không
        const phoneMatches = customer.phone.toLowerCase().includes(lowerCaseSearchTerm);
        const nameMatches = customer.name.toLowerCase().includes(lowerCaseSearchTerm);

        // Trả về true nếu một trong hai điều kiện khớp
        return phoneMatches || nameMatches;
    });

    const [customerPhone, setCustomerPhone] = useState('');
    const [customerName, setCustomerName] = useState('');

    // Hàm này sẽ được gọi khi bạn chọn một khách hàng từ danh sách
    const handleCustomerSelect = (phone, name, id) => {
        setCustomerPhone(phone);
        setCustomerName(name);
        setIdCus(id)

    };


    return (
        <>
            <Sheet
                className="demo-sheet-2 h-100"
                opened={opened}
                onSheetClosed={onClose}
            >
                <Toolbar className="">
                    <div className="left fw-bold d-flex align-items-center text-dark mb-3">
                        <button
                            className="rounded-circle border-0 bg-light  me-3 d-flex justify-content-center p-1"
                            style={{ width: "25px", height: "25px", lineHeight: "25px" }}
                            onClick={() => f7.sheet.close()}
                        >
                            <Icon f7="arrow_left" size='15px' className="icon-dark"></Icon>

                        </button>
                        Tạo đơn đặt phòng
                    </div>
                </Toolbar>
                <PageContent className="pb-5">
                    <Card className="rounded-4 p-3 shadow-none border border-light">
                        <div className="text-pink fw-bold">
                            Ngày đặt <span className=" text-danger">(*)</span>
                        </div>
                        <List className="mx-0" strongIos dividersIos insetIos>
                            <input
                                type="time"
                                className="rounded-3 border border-secondary-10 p-2 mt-3 fs-14 w-100"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                            />
                            <div className='mt-3 row px-2'>
                                <div className='col-4 p-1'>
                                    <select className='p-2 rounded-3 fs-14 border border-1 w-100 select-white-text' value={selectedDate} onChange={(e) => setSelectedDate(parseInt(e.target.value))}>
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
                                <div className='col-4 p-1'>
                                    <select className='p-2 rounded-3 fs-14 border border-1 w-100 select-white-text' value={selectedMonth}
                                        onChange={(e) => setSelectedMonth(parseInt(e.target.value))}>
                                        {moment.months().map((month, idx) => (
                                            <option key={idx} value={idx}>{month}</option>
                                        ))}
                                    </select>

                                </div>
                                <div className='col-4 p-1'>
                                    <select className='p-2 rounded-3 fs-14 border border-1 w-100 select-white-text' value={selectedYear}
                                        onChange={(e) => setSelectedYear(parseInt(e.target.value))}>
                                        {Array.from({ length: 10 }, (_, i) => {
                                            const year = moment().year() - 5 + i;
                                            return <option key={year} value={year}>{year}</option>;
                                        })}
                                    </select>
                                </div>
                            </div>

                        </List>

                        <div className="mt-4 fs-13 text-pink fw-bold">
                            Thông tin người đặt
                        </div>
                        <div className="position-relative rounded-3 mt-2 w-100 border border-1" style={{ padding: "12px" }}>
                            <span
                                style={{
                                    position: 'absolute',
                                    left: '10px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    cursor: 'pointer',
                                }}
                            >
                                <lord-icon
                                    slot="media"
                                    src="https://cdn.lordicon.com/shcfcebj.json"
                                    trigger="loop"
                                    colors="primary:#0055A0,secondary:#0055A0"
                                    style={{ width: '20px', height: '20px' }}
                                ></lord-icon>
                            </span>
                            <input
                                className="rounded-3  w-100 " style={{ paddingLeft: "10%", paddingRight: "10%" }}
                                placeholder="Số điện thoại" value={customerPhone} // Gán giá trị state
                                onChange={(e) => setCustomerPhone(e.target.value)}
                                type="tel"
                            />
                            <Link fill popoverOpen=".popover-customer"
                                style={{
                                    position: 'absolute',
                                    right: '10px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    cursor: 'pointer',

                                }}
                            >
                                <lord-icon
                                    slot="media"
                                    src="https://cdn.lordicon.com/sjoccsdj.json"
                                    trigger="loop"
                                    colors="primary:#0055A0,primary:#0055A0,secondary:#0055A0"
                                    style={{ width: '20px', height: '20px' }}
                                ></lord-icon>
                            </Link>
                        </div>
                        <div className="position-relative rounded-3 mt-3 w-100 border border-1" style={{ padding: "12px" }}>
                            <span
                                style={{
                                    position: 'absolute',
                                    left: '10px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    cursor: 'pointer',
                                }}
                            >
                                <lord-icon
                                    slot="media"
                                    src="https://cdn.lordicon.com/shcfcebj.json"
                                    trigger="loop"
                                    colors="primary:#0055A0,secondary:#0055A0"
                                    style={{ width: '20px', height: '20px' }}
                                ></lord-icon>
                            </span>
                            <input
                                className="rounded-3  w-100 " style={{ paddingLeft: "10%", paddingRight: "10%" }}
                                placeholder="Họ và tên" value={customerName} // Gán giá trị state
                                onChange={(e) => setCustomerName(e.target.value)}
                                type="text"
                            />
                        </div>
                        <div className="mt-3">
                            <Button className="p-3 bg-secondary bg-opacity-25 rounded-pill">Lưu thông tin người đặt</Button>
                        </div>

                        <div className="mt-4 fs-13 text-pink fw-bold">
                            Thông tin đặt
                        </div>
                        <div className="position-relative rounded-3 mt-3 w-100 border border-1" style={{ padding: "12px" }}>
                            <span
                                style={{
                                    position: 'absolute',
                                    left: '10px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    cursor: 'pointer',
                                }}
                            >
                                <lord-icon
                                    slot="media"
                                    src="https://cdn.lordicon.com/shcfcebj.json"
                                    trigger="loop"
                                    colors="primary:#0055A0,secondary:#0055A0"
                                    style={{ width: '20px', height: '20px' }}
                                ></lord-icon>
                            </span>
                            <input
                                className="rounded-3  w-100 " style={{ paddingLeft: "10%", paddingRight: "10%" }}
                                placeholder="Số người" value={amount} onChange={(e) => { setAmount(e.target.value) }}
                                type="number"
                            />
                        </div>

                        <div className="position-relative rounded-3 mt-3 w-100 border align-items-top border-1" style={{ padding: "12px" }}>
                            <span
                                style={{
                                    position: 'absolute',
                                    left: '10px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    cursor: 'pointer',
                                }}
                            >
                                <lord-icon
                                    slot="media"
                                    src="https://cdn.lordicon.com/shcfcebj.json"
                                    trigger="loop"
                                    colors="primary:#0055A0,secondary:#0055A0"
                                    style={{ width: '20px', height: '20px' }}
                                ></lord-icon>
                            </span>
                            <textarea rows={5}
                                className="rounded-3  w-100 " style={{ paddingLeft: "10%", paddingRight: "10%" }}
                                placeholder="Ghi chú" value={note} onChange={(e) => { setNote(e.target.value) }}
                            />
                        </div>

                        <div className="mt-4 fs-13 text-pink fw-bold">
                            Phương thức thanh toán
                        </div>
                        <div className="position-relative rounded-3 mt-3 w-100 border border-1" style={{ padding: "12px" }}>
                            <span
                                style={{
                                    position: 'absolute',
                                    left: '10px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    cursor: 'pointer',
                                }}
                            >
                                <lord-icon
                                    slot="media"
                                    src="https://cdn.lordicon.com/shcfcebj.json"
                                    trigger="loop"
                                    colors="primary:#0055A0,secondary:#0055A0"
                                    style={{ width: '20px', height: '20px' }}
                                ></lord-icon>
                            </span>
                            <input
                                className="rounded-3  w-100 " style={{ paddingLeft: "10%", paddingRight: "10%" }}
                                placeholder="Cọc trước" value={price} onChange={(e) => { setPrice(e.target.value) }}
                                type="number"
                            />
                        </div>

                        <div className=' fs-13 mt-3'>Hình thức</div>
                        {/* <Segmented strong tag="p" className="w-100 ">
                            <Button active={activeStrongButton === 0} onClick={() => setActiveStrongButton(0)}>
                                Chuyển khoản
                            </Button>
                            <Button active={activeStrongButton === 1} onClick={() => setActiveStrongButton(1)}>
                                Tiền mặt
                            </Button>
                        </Segmented> */}
                        <select className='p-2 mt-2 rounded-3 fs-14 border border-1 w-100 select-white-text' value={selectPayment}
                            onChange={(e) => setSelectPayment(parseInt(e.target.value))}>
                            {payment && payment.map((payment, key) => {
                                return (
                                    <option value={payment.id}>{payment.name}</option>
                                )
                            })}

                        </select>
                    </Card>
                </PageContent>
                <footer className="fixed-bottom p-3 py-2 ">
                    <div className="grid grid-cols-2 grid-gap">
                        <Button sheetClose className="bg-light p-3 rounded-pill text-dark fs-15" onClick={()=>{handleCloseAllModals()}}>Hủy đơn</Button>
                        <Button className="bg-pink p-3 rounded-pill text-white fs-15" onClick={() => { booking(); }}>Hoàn thành</Button>
                    </div>
                </footer>
            </Sheet>
            <SheetBookingCompleted
                opened={sheetOpenedCompleted}
                onClose={() => setSheetOpenedCompleted(false)}
            />
            <Popover className="popover-customer " style={{ width: "250px", maxHeight: "400px" }}>
                <List className='px-3 pt-2'>
                    <div className="d-flex align-items-center bg-input  rounded-pill p-1 row " style={{ cursor: 'pointer' }}>
                        <input className='border bg-input rounded-pill border-0 p-2 px-3 col-10 text-dark' value={searchTerm} // Gán giá trị
                            onChange={(e) => setSearchTerm(e.target.value)} placeholder='Tìm kiếm'></input>
                        <Button fill={false} className=" col-2 pe-0 d-flex justify-content-end">
                            <lord-icon
                                src="https://cdn.lordicon.com/wjyqkiew.json"
                                trigger="loop"
                                colors="primary:#0055A0,secondary:#0055A0"
                                className=' me-2'
                                style={{ width: '30px', height: '30px' }}>
                            </lord-icon>
                        </Button>
                    </div>
                    <div style={{ maxHeight: '350px', overflowY: 'auto' }}>
                        {filteredCustomers && filteredCustomers.map((customers, key) => {
                            return (
                                <>
                                    <ListItem >
                                        <Link onClick={() => { handleCustomerSelect(customers.phone, customers.name, customers.id) }} className='d-flex align-items-center fs-14 text-dark' popoverClose >
                                            {customers.phone}-{customers.name}
                                        </Link>
                                    </ListItem>
                                </>
                            )
                        })}
                    </div>

                </List>
            </Popover>


        </>


    );
}
