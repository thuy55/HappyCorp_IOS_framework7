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

    const data = [
        {
            brand: 1,
            menu: [
                {
                    "image": "../MENU1/IMG_8481.JPG",
                    "name": "Menu-COGNAC-GIN-VODKA-TEQUILA",
                    "price": 0,
                    "content": "Combo món ăn sang trọng thường kết hợp các món khai vị tinh tế, món chính cao cấp với nguyên liệu hảo hạng."
                },
                {
                    "image": "../MENU1/IMG_8483.JPG",
                    "name": "CIGAR",
                    "price": 0,
                    "content": "Combo món ăn sang trọng thường kết hợp các món khai vị tinh tế, món chính cao cấp với nguyên liệu hảo hạng."
                },
                {
                    "image": "../MENU1/IMG_8485.JPG",
                    "name": "Menu Private Lounge",
                    "price": 0,
                    "content": "Combo món ăn sang trọng thường kết hợp các món khai vị tinh tế, món chính cao cấp với nguyên liệu hảo hạng."
                },
                {
                    "image": "../MENU1/IMG_8486.JPG",
                    "name": "Introduction",
                    "price": 0,
                    "content": "Combo món ăn sang trọng thường kết hợp các món khai vị tinh tế, món chính cao cấp với nguyên liệu hảo hạng."
                },
                {
                    "image": "../MENU1/IMG_8487.JPG",
                    "name": "Standard Room",
                    "price": 0,
                    "content": "Combo món ăn sang trọng thường kết hợp các món khai vị tinh tế, món chính cao cấp với nguyên liệu hảo hạng."
                },
                {
                    "image": "../MENU1/IMG_8488.JPG",
                    "name": "Diamond Room",
                    "price": 0,
                    "content": "Trải nghiệm ẩm thực châu Âu với gan ngỗng áp chảo, mì Ý nấm truffle và bò bít tết sốt rượu vang."
                },
                {
                    "image": "../MENU1/IMG_8492.JPG",
                    "name": "Menu 90S Gold",
                    "price": 27500,
                    "content": "Combo món ăn sang trọng thường kết hợp các món khai vị tinh tế, món chính cao cấp với nguyên liệu hảo hạng."
                },
                {
                    "image": "../MENU1/IMG_8493.JPG",
                    "name": "Menu Food",
                    "price": 0,
                    "content": "Thư giãn với các loại trà thượng hạng, bánh ngọt Pháp và sandwich nhỏ xinh trong không gian sang trọng."
                },
                {
                    "image": "../MENU1/IMG_8494.JPG",
                    "name": "Menu Food 2",
                    "price": 6800000,
                    "content": "Hành trình ẩm thực dọc miền đất nước với phở Hà Nội, bún bò Huế và cơm tấm Sài Gòn."
                },
                {
                    "image": "../MENU1/IMG_8496.JPG",
                    "name": "Dried Stock",
                    "price": 0,
                    "content": "Các món ăn nhỏ gọn, dễ cầm tay, phù hợp cho các bữa tiệc đứng, hội nghị hay sự kiện đặc biệt."
                },
                {
                    "image": "../MENU1/IMG_8497.JPG",
                    "name": "Menu Drink",
                    "price": 0,
                    "content": "Thỏa sức lựa chọn với hàng chục món ăn đa dạng từ khai vị, món chính đến tráng miệng hấp dẫn."
                },
                {
                    "image": "../MENU1/IMG_8498.JPG",
                    "name": "Menu Drink 2",
                    "price": 0,
                    "content": "Bữa trưa dinh dưỡng và tiện lợi cho dân văn phòng với thực đơn thay đổi mỗi ngày."
                },
                {
                    "image": "../MENU1/IMG_8502.JPG",
                    "name": "Thank You",
                    "price": 0,
                    "content": "Thưởng thức các món ăn vặt đường phố nổi tiếng như bánh tráng trộn, cá viên chiên, trà sữa..."
                },
                {
                    "image": "../MENU1/IMG_8628.JPG",
                    "name": "Private Room Entertaiment Hour",
                    "price": 0,
                    "content": "Combo bao gồm bánh kem, gà rán, pizza và nước ngọt, mang đến bữa tiệc sinh nhật đáng nhớ cho bé."
                },
                {
                    "image": "../MENU1/IMG_8629.JPG",
                    "name": "Menu Ace Golden",
                    "price": 6200000,
                    "content": "Trải nghiệm vị cay đặc trưng của ẩm thực Hàn với tokbokki, kim chi, gà cay phô mai và cơm trộn."
                },
                {
                    "image": "../MENU1/IMG_8630.JPG",
                    "name": "Menu 90S Brevilege",
                    "price": 3200000,
                    "content": "Khởi đầu ngày mới tràn đầy năng lượng với dimsum, há cảo, bánh bao và cháo nóng hổi."
                },
                {
                    "image": "../MENU1/IMG_8634.JPG",
                    "name": "Menu 90S Brevilege 2",
                    "price": 11000000,
                    "content": "Bữa tối dưới ánh nến dành cho 2 người với rượu vang, hoa hồng và các món ăn được trang trí tinh tế."
                },
                {
                    "image": "../MENU1/IMG_8639.JPG",
                    "name": "Menu 90S Brevilege 3",
                    "price": 2800000,
                    "content": "Các món ăn thanh mát như gỏi cuốn, salad trái cây và chè lạnh giúp xua tan cái nóng ngày hè."
                },
                {
                    "image": "../MENU1/IMG_8640.JPG",
                    "name": "Rượu BlueLabel",
                    "price": 13500000,
                    "content": "Thưởng thức hương vị độc đáo của núi rừng với thịt lợn mán, gà đồi, cơm lam và rau rừng."
                },
                {
                    "image": "../MENU1/IMG_8643.JPG",
                    "name": "Menu Private Lounge",
                    "price": 0,
                    "content": "Thưởng thức hương vị độc đáo của núi rừng với thịt lợn mán, gà đồi, cơm lam và rau rừng."
                }
            ]
        },
        {
            brand: 2,
            menu: [
                {
                    "image": "../MENU2/anh_1.png",
                    "name": "Combo",
                    "price": 0,
                    "content": "Combo món ăn sang trọng thường kết hợp các món khai vị tinh tế, món chính cao cấp với nguyên liệu hảo hạng"
                },
                {
                    "image": "../MENU2/anh_2.png",
                    "name": "Menu nhâm nhi bò tôm ốc",
                    "price": 0,
                    "content": "Combo món ăn sang trọng thường kết hợp các món khai vị tinh tế, món chính cao cấp với nguyên liệu hảo hạng"
                },
                {
                    "image": "../MENU2/anh_3.png",
                    "name": "Nhâm nhi xúc xích tôm",
                    "price": 0,
                    "content": "Combo món ăn sang trọng thường kết hợp các món khai vị tinh tế, món chính cao cấp với nguyên liệu hảo hạng"
                },
                {
                    "image": "../MENU2/anh_4.png",
                    "name": "Nhâm nhi cá salad",
                    "price": 0,
                    "content": "Combo món ăn sang trọng thường kết hợp các món khai vị tinh tế, món chính cao cấp với nguyên liệu hảo hạng"
                },
                {
                    "image": "../MENU2/anh_5.png",
                    "name": "Nhâm nhi và món chay",
                    "price": 0,
                    "content": "Combo món ăn sang trọng thường kết hợp các món khai vị tinh tế, món chính cao cấp với nguyên liệu hảo hạng"
                },
                {
                    "image": "../MENU2/anh_6.png",
                    "name": "Menu no nê",
                    "price": 0,
                    "content": "Combo món ăn sang trọng thường kết hợp các món khai vị tinh tế, món chính cao cấp với nguyên liệu hảo hạng"
                },
                {
                    "image": "../MENU2/anh_7.png",
                    "name": "Menu no nê cơm",
                    "price": 0,
                    "content": "Combo món ăn sang trọng thường kết hợp các món khai vị tinh tế, món chính cao cấp với nguyên liệu hảo hạng"
                },
                {
                    "image": "../MENU2/anh_8.png",
                    "name": "Menu rượu nhạnh 1",
                    "price": 0,
                    "content": "Combo món ăn sang trọng thường kết hợp các món khai vị tinh tế, món chính cao cấp với nguyên liệu hảo hạng"
                },
                {
                    "image": "../MENU2/anh_9.png",
                    "name": "Nước uống",
                    "price": 0,
                    "content": "Combo món ăn sang trọng thường kết hợp các món khai vị tinh tế, món chính cao cấp với nguyên liệu hảo hạng"
                },
                {
                    "image": "../MENU2/anh_10.png",
                    "name": "Bia",
                    "price": 0,
                    "content": "Combo món ăn sang trọng thường kết hợp các món khai vị tinh tế, món chính cao cấp với nguyên liệu hảo hạng"
                }
            ]
        },
        {
            brand: 3,
            menu: [
                {
                    "image": "../MENU3/1.png",
                    "name": "Combo",
                    "price": 0,
                    "content": "Combo món ăn sang trọng thường kết hợp các món khai vị tinh tế, món chính cao cấp với nguyên liệu hảo hạng"
                },
                {
                    "image": "../MENU3/2.png",
                    "name": "Menu nhâm nhi 1",
                    "price": 0,
                    "content": "Combo món ăn sang trọng thường kết hợp các món khai vị tinh tế, món chính cao cấp với nguyên liệu hảo hạng"
                },
                {
                    "image": "../MENU3/3.png",
                    "name": "Menu nhâm nhi 2",
                    "price": 0,
                    "content": "Combo món ăn sang trọng thường kết hợp các món khai vị tinh tế, món chính cao cấp với nguyên liệu hảo hạng"
                },
                {
                    "image": "../MENU3/4.png",
                    "name": "Menu nhâm nhi 3",
                    "price": 0,
                    "content": "Combo món ăn sang trọng thường kết hợp các món khai vị tinh tế, món chính cao cấp với nguyên liệu hảo hạng"
                },
                {
                    "image": "../MENU3/5.png",
                    "name": "Menu nhâm nhi 4",
                    "price": 0,
                    "content": "Combo món ăn sang trọng thường kết hợp các món khai vị tinh tế, món chính cao cấp với nguyên liệu hảo hạng"
                },
                {
                    "image": "../MENU3/6.png",
                    "name": "Menu no nê 1",
                    "price": 0,
                    "content": "Combo món ăn sang trọng thường kết hợp các món khai vị tinh tế, món chính cao cấp với nguyên liệu hảo hạng"
                },
                {
                    "image": "../MENU3/7.png",
                    "name": "Menu no nê 2",
                    "price": 0,
                    "content": "Combo món ăn sang trọng thường kết hợp các món khai vị tinh tế, món chính cao cấp với nguyên liệu hảo hạng"
                },
                {
                    "image": "../MENU3/8.png",
                    "name": "WINE",
                    "price": 0,
                    "content": "Combo món ăn sang trọng thường kết hợp các món khai vị tinh tế, món chính cao cấp với nguyên liệu hảo hạng"
                },
                {
                    "image": "../MENU3/9.png",
                    "name": "WINE - SOFT DRINK",
                    "price": 0,
                    "content": "Combo món ăn sang trọng thường kết hợp các món khai vị tinh tế, món chính cao cấp với nguyên liệu hảo hạng"
                },
                {
                    "image": "../MENU3/10.png",
                    "name": "BEER",
                    "price": 0,
                    "content": "Combo món ăn sang trọng thường kết hợp các món khai vị tinh tế, món chính cao cấp với nguyên liệu hảo hạng"
                }
            ]
        }
    ];

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
                        {room ? room.map((diagram, key) => {
                            return (
                                <>
                                    {
                                        diagram.rooms && diagram.rooms.map((roomItem, index) => {
                                            // const imageUrl = roomItem.images || defaultImageUrl;

                                            // --- ĐÂY LÀ THAY ĐỔI ---
                    // 1. Định nghĩa base URL
                    const baseUrl = "https://dev-happy.eclo.io/";

                    // 2. Ghép URL nếu roomItem.images tồn tại,
                    //    nếu không thì dùng ảnh mặc định.
                    const imageUrl = roomItem.images 
                                     ? `${baseUrl}${roomItem.images}` 
                                     : defaultImageUrl;
                    // --- KẾT THÚC THAY ĐỔI ---
                                            return (
                                                <>
                                                    <div className='col-5 px-1'>
                                                        <Card className='m-0 border border-1 p-0 fs-13'>
                                                            <div className="" onClick={() => { setSheetOpenebRoomDetail(true); localStorage.setItem("HappyCorp_active_room", roomItem.active) }}>
                                                                <img src={imageUrl} className='w-100 rounded-3'></img>
                                                                <div className="p-1">
                                                                    <div className='fw-bold text-pink my-1'>Phòng {roomItem.name}</div>
                                                                    <div className='limited-lines2 fs-11 fst-italic'>Không gian giải trí cung cấp hệ thống âm thanh, ánh sáng và màn hình để khách hát, được thiết kế với diện tích tối thiểu 20m², đảm bảo cách âm, tiêu âm tốt, và bố trí nội thất hợp lý để tạo sự thoải mái, sôi động, đáp ứng nhiều phong cách từ hiện đại, hoàng gia đến mini bar</div>
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
                        }) : (
                            <>
                                <div className="fs-13 text-center">Không có dữ liệu</div>
                            </>
                        )}

                    </div>

                    <div className='fs-6 fw-bold mx-3 mt-4 ' onClick={() => { setSheetOpenebMenu(true) }}> Menu <Icon f7="arrow_right" size="15px" className="ms-2"></Icon></div>
                    <div className='row d-flex flex-nowrap mx-2 mt-2 pb-2' style={{ overflowX: "auto", whiteSpace: "nowrap" }}>

                        {data && data.map((data) => {
                            const targetBrand = localStorage.getItem("happyCorp_brand");
                            if (data.brand == targetBrand) {
                                return data.menu.map((menuItem, index) => {
                                    return (
                                        <div className='col-5 px-1'>
                                            <Card className='m-0 border border-1 p-0 fs-13'>
                                                <div className="">
                                                    <img src={menuItem.image && menuItem.image.trim() !== "" ? `${menuItem.image}` : "../image/no-image.jpg"} className='w-100 rounded-3'></img>
                                                    <div className="p-1">
                                                        <div className='fw-bold text-pink my-1  text-wrap'>{menuItem.name}</div>
                                                        {/* {menuItem.price > 0 ? (
                                                            <div className="fw-bold mb-1 fs-13">
                                                                {formatPrice(menuItem.price)}
                                                                <span className="fs-12 text-muted">đ</span>
                                                            </div>
                                                        ) : (
                                                            <>
                                                                <div className="fw-bold py-2 fs-13">

                                                                </div>
                                                            </>
                                                        )} */}
                                                        <div className='limited-lines2 fs-11 fst-italic'>Combo món ăn sang trọng thường kết hợp các món khai vị tinh tế, món chính cao cấp với nguyên liệu hảo hạng</div>
                                                    </div>
                                                </div>
                                            </Card>
                                        </div>
                                    );
                                });
                            }
                        })}
                        {/* {menu ? menu.map((item) => {
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
                        }) : (
                            <>
                                <div className="fs-13 text-center">Không có dữ liệu</div>
                            </>
                        )} */}
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
