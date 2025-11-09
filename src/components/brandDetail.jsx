import { Sheet, Toolbar, PageContent, Block, Link, Card, ListInput, List, Icon, Button, Segmented, ListItem, f7 } from "framework7-react";
import { useEffect, useState } from "react";
import SheetEventDetail from "./EventDetail";
import axios from "axios";
import SheetBooking from "./SheetBooking";
import SheetMenu from "./Menu";
import SheetMenuDetail from "./MenuDetail";
import SheetRoomDetail from "./RoomDetail";
export default function SheetBrandDetail({ opened, onClose }) {
    const [sheetOpened1, setSheetOpened1] = useState(false);
    const [sheetOpenebMenu, setSheetOpenebMenu] = useState(false);
    const [sheetOpenebRoom, setSheetOpenebRoom] = useState(false);
    const [sheetOpenebMenuDetail, setSheetOpenebMenuDetail] = useState(false);
    const [sheetOpenebRoomDetail, setSheetOpenebRoomDetail] = useState(false);



    const [room, setRoom] = useState([]);
    const [menu, setMenu] = useState([]);
    useEffect(() => {
        if (opened) {
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

            api.post("/menu", data, {
                headers: {
                    "Content-Type": "application/json",
                },
            }).then((res) => {
                if (res.data.status === "error") {
                    console.log('lỗi');
                    f7.dialog.alert(res.data.content, 'Error');

                } else if (res.data.status === "success") {
                    console.log(res.data.data);
                    setMenu(res.data.data.slice(0, 20));
                }
            })
                .catch((error) => {
                    f7.dialog.alert(error, 'Error');
                    console.log("k ket noi dc api");

                });
        }
    }, [opened]);


    const formatPrice = (price) => {
        if (price === 0) return '0';
        return price.toLocaleString('vi-VN');
    };

    const [activeId, setActiveId] = useState(null);
    const handleCardClick = (active) => {
        setActiveId(active);          // lưu lại id/active để modal detail dùng
        setSheetOpened1(true);
    };

    const defaultImageUrl = 'https://img.freepik.com/premium-photo/elite-karaoke-suite-with-velvet-ropes-bartender_416256-24715.jpg';
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
                        {/* 90S House */}
                        {localStorage.getItem("happyCorp_brand_name")}

                    </div>
                    {/* <div className="right fs-13">
                        <Link sheetClose>Close</Link>
                    </div> */}
                </Toolbar>
                <PageContent className="pb-5">

                    <div className='fs-6 fw-bold mx-3 mt-4 ' onClick={() => { setSheetOpenebRoom(true) }}> Khám phá phòng <Icon f7="arrow_right" size="15px" className="ms-2"></Icon></div>
                    <div className='row d-flex flex-nowrap mx-2 mt-2 pb-2' style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
                        {room && room.map((diagram, key) => {
                            return (
                                <>
                                    {
                                        diagram.rooms && diagram.rooms.map((roomItem, index) => {
                                            const imageUrl = roomItem.images || defaultImageUrl;
                                            return (
                                                <>
                                                    <div className='col-5 px-1'>
                                                        <Card className='m-0 border border-1 p-0 fs-13'>
                                                            <div className="" onClick={() => { setSheetOpenebRoomDetail(true); localStorage.setItem("HappyCorp_active_room", roomItem.active) }}>
                                                                <img src={imageUrl} className='w-100 rounded-3'></img>
                                                                <div className="p-1">
                                                                    <div className='fw-bold text-pink my-1'>Phòng {roomItem.name}</div>
                                                                    <div className='limited-lines2'>Không gian giải trí cung cấp hệ thống âm thanh, ánh sáng và màn hình để khách hát, được thiết kế với diện tích tối thiểu 20m², đảm bảo cách âm, tiêu âm tốt, và bố trí nội thất hợp lý để tạo sự thoải mái, sôi động, đáp ứng nhiều phong cách từ hiện đại, hoàng gia đến mini bar</div>
                                                                </div>
                                                            </div>
                                                        </Card>
                                                    </div>
                                                </>
                                            )
                                        })
                                    }
                                </>
                            )
                        })}

                    </div>

                    <div className='fs-6 fw-bold mx-3 mt-4 ' onClick={() => { setSheetOpenebMenu(true) }}> Menu <Icon f7="arrow_right" size="15px" className="ms-2"></Icon></div>
                    <div className='row d-flex flex-nowrap mx-2 mt-2 pb-2' style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
                        {menu && menu.map((item) => {
                            return (
                                <div className='col-5 px-1'>
                                    <Card className='m-0 border border-1 p-0 fs-13'>
                                        <div className="" onClick={() => { handleCardClick(item.active) }}>
                                            <img src={item.images && item.images.trim() !== "" ? `${item.images}` : "../image/no-image.jpg"} className='w-100 rounded-3'></img>
                                            <div className="p-1">
                                                <div className='fw-bold text-pink my-1'>{item.name}</div>
                                                <div className="fw-bold mb-1 fs-13">
                                                    {formatPrice(item.price)}
                                                    {item.price > 0 && (
                                                        <span className="fs-12 text-muted">đ</span>
                                                    )}
                                                </div>
                                                <div className='limited-lines2'>Combo món ăn sang trọng thường kết hợp các món khai vị tinh tế, món chính cao cấp với nguyên liệu hảo hạng</div>
                                            </div>
                                        </div>
                                    </Card>
                                </div>

                            )
                        })}
                    </div>

                    <div className='fs-6 fw-bold mx-3 mt-4 '> Mood chơi khách/ Social post <Icon f7="arrow_right" size="15px" className="ms-2"></Icon></div>
                    <div className="m-2 mx-1">
                        <Card className='border border-1 my-2 mx-2 shadow-sm p-1 rounded-3' >
                            <div
                                className="position-absolute top-0 start-0 w-100 h-100 position-relative"
                                style={{ zIndex: 10, cursor: "pointer" }}
                            ></div>
                            <div className="row ">
                                <div className='col-5'>
                                    <img src="https://img.freepik.com/premium-photo/elite-karaoke-suite-with-velvet-ropes-bartender_416256-24715.jpg" className='rounded-3 w-100'></img>
                                </div>
                                <div className='col-7 ps-0 fs-13'>
                                    <div className='d-flex align-items-center fw-bold'>
                                        <img src='../image/6.gif' style={{ width: "25px", height: "25px" }}></img>Hôm nay của bạn thế nào?
                                    </div>
                                    <div className='limited-lines2 fst-italic fs-11 mt-1'>90's House - Biểu tượng mới của giải trí và ẩm thực cao cấp tạp thành phố Hồ Chí Minh</div>
                                    <div className='d-flex justify-content-end  mt-2'>
                                        <button className=' p-1 px-3 rounded-3 border-btn text-pink' style={{ width: "auto", display: "inline-block" }} >Xem ngay</button>
                                    </div>
                                </div>
                            </div>
                        </Card >
                        <Card className='border border-1 my-2 mx-2 shadow-sm p-1 rounded-3' >
                            <div
                                className="position-absolute top-0 start-0 w-100 h-100 position-relative"
                                style={{ zIndex: 10, cursor: "pointer" }}
                            ></div>
                            <div className="row ">
                                <div className='col-5'>
                                    <img src="https://img.freepik.com/premium-photo/elite-karaoke-suite-with-velvet-ropes-bartender_416256-24715.jpg" className='rounded-3 w-100'></img>
                                </div>
                                <div className='col-7 ps-0 fs-13'>
                                    <div className='d-flex align-items-center fw-bold'>
                                        <img src='../image/6.gif' style={{ width: "25px", height: "25px" }}></img>Hôm nay của bạn thế nào?
                                    </div>
                                    <div className='limited-lines2 fst-italic fs-11 mt-1'>90's House - Biểu tượng mới của giải trí và ẩm thực cao cấp tạp thành phố Hồ Chí Minh</div>
                                    <div className='d-flex justify-content-end  mt-2'>
                                        <button className=' p-1 px-3 rounded-3 border-btn text-pink' style={{ width: "auto", display: "inline-block" }} >Xem ngay</button>
                                    </div>
                                </div>
                            </div>
                        </Card >
                    </div>

                </PageContent>

            </Sheet >

            <SheetBooking
                opened={sheetOpenebRoom}
                onClose={() => setSheetOpenebRoom(false)}
            />
            <SheetMenu
                opened={sheetOpenebMenu}
                onClose={() => setSheetOpenebMenu(false)}
            />
            <SheetRoomDetail
                opened={sheetOpenebRoomDetail}
                onClose={() => setSheetOpenebRoomDetail(false)}
            />
            <SheetMenuDetail
                opened={sheetOpened1}
                onClose={() => setSheetOpened1(false)}
                active={activeId}
            />

        </>


    );
}
