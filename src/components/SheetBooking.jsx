import { Sheet, Toolbar, PageContent, Block, Link, Button, Card, BlockTitle, List } from "framework7-react";
import SheetBooking1 from "./SheetBooking1";
import { useEffect, useState } from "react";
import SheetBookingMenu from "./SheetBookingMenu";
import SheetRoomDetail from "./RoomDetail";
import axios from "axios";
import React from "react";

export default function SheetBooking({ opened, onClose }) {
    const [sheetOpenebMenu, setSheetOpenebMenu] = useState(false);

    const [room, setRoom] = useState([]);

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
        }
    }, [opened]);

    const defaultImageUrl = 'https://img.freepik.com/premium-photo/elite-karaoke-suite-with-velvet-ropes-bartender_416256-24715.jpg';

    return (
        <Sheet
            className="demo-sheet-1 h-100"
            opened={opened}
            onSheetClosed={onClose}
        >
            <Toolbar className="px-3 text-pink">
                <div className="left fw-bold fst-italic ">Sơ đồ phòng</div>
                <div className="right">
                    <Link sheetClose className="fs-13">Close</Link>
                </div>
            </Toolbar>

            <PageContent className="px-3 fs-13 pb-4" >
                <div className='my-2 px-2'>
                    <div className="d-flex align-items-center bg-light border border-secondary-10 rounded-pill p-1 row" style={{ cursor: 'pointer' }}>
                        <input className='border bg-light rounded-pill border-0 p-2 px-3 col-10 text-dark' placeholder='Tìm kiếm'></input>
                        <Button fill={false} className=" col-2 pe-0 d-flex justify-content-end">
                            <lord-icon
                                src="https://cdn.lordicon.com/wjyqkiew.json"
                                trigger="loop"
                                colors="primary:#000000,secondary:#f30771"
                                className=' me-2'
                                style={{ width: '30px', height: '30px' }}>
                            </lord-icon>
                        </Button>
                    </div>
                </div>

                {/* <div className='fw-bold d-flex align-items-center fs-13 mt-3 fst-italic'>
                    Chốt phòng đã xem ngay !
                </div>
                <swiper-container
                    loop
                    autoplay='{"delay":5000, "disableOnInteraction": false}'
                    class=" mt-3 demo-swiper-multiple demo-swiper-multiple-auto mb-2"
                    space-between="10"
                    slides-per-view="1.15">
                    <swiper-slide>
                        <Card className="border border-light shadow-sm rounded-3  m-0 me-3 mb-2 p-0">
                            <div className="row d-flex align-items-center">
                                <div className="col-5 pe-0" onClick={() => setSheetOpenebMenu(true)}>
                                    <img src="https://ngominhaudio.com.vn/wp-content/uploads/2017/04/phoi-canh-3d-phong-karaoke-25m2.jpg" className="w-100 rounded-3" style={{

                                        objectFit: "cover",   // cắt ảnh thừa, fill khung
                                        objectPosition: "center", // căn giữa ảnh
                                        display: "block",     // tránh ảnh bị inline làm hở khoảng trắng
                                    }}></img>
                                </div>
                                <div className="col-7 fs-13 " onClick={() => setSheetOpenebMenu(true)}>
                                    <div className='fw-bold mt-2'>Phòng Private 1 - Lầu 2</div>
                                    <div className="d-flex gap-1 my-1">
                                        {[...Array(5)].map((_, i) => (
                                            <lord-icon
                                                key={i}
                                                src="https://cdn.lordicon.com/cvwrvyjv.json"
                                                trigger="loop"
                                                colors="primary:#eba707,secondary:#eba707"
                                                style={{ width: '15px', height: '15px' }}
                                            />
                                        ))}
                                    </div>

                                    <div className='limited-lines2 fst-italic fs-11 fst-italic'>Cách âm:
                                        Sử dụng các vật liệu như bông khoáng, mút trứng, cao su non, thạch cao kết hợp các lớp cách âm để ngăn âm thanh lọt ra ngoài và giữ âm thanh trong phòng.
                                        Tiêu âm:
                                        Bố trí các vật liệu tiêu âm như mút gai, mút trứng, hoặc các vật dụng trang trí có khả năng hấp thụ âm thanh để giảm tiếng vang và tạo không gian âm thanh tốt hơn.</div>
                                </div>
                            </div>
                        </Card>
                    </swiper-slide>
                    <swiper-slide>
                        <Card className="border border-light shadow-sm rounded-3  m-0 me-3 mb-2 p-0">
                            <div className="row">
                                <div className="col-5 pe-0" onClick={() => setSheetOpenebMenu(true)}>
                                    <img src="https://dltm-cdn.vnptit3.vn/resources/portal//Images/AGG/quantrivien.vnptagg/images/entertainment/karaoke/cropper_988595705.jpg" className="w-100 rounded-3"></img>
                                </div>
                                <div className="col-7 fs-13 " onClick={() => setSheetOpenebMenu(true)}>
                                    <div className='fw-bold mt-2'>Phòng Private 1 - Lầu 2</div>
                                    <div className="d-flex gap-1 my-1">
                                        {[...Array(5)].map((_, i) => (
                                            <lord-icon
                                                key={i}
                                                src="https://cdn.lordicon.com/cvwrvyjv.json"
                                                trigger="loop"
                                                colors="primary:#eba707,secondary:#eba707"
                                                style={{ width: '15px', height: '15px' }}
                                            />
                                        ))}
                                    </div>

                                    <div className='limited-lines2 fst-italic fs-11 fst-italic'>Cách âm:
                                        Sử dụng các vật liệu như bông khoáng, mút trứng, cao su non, thạch cao kết hợp các lớp cách âm để ngăn âm thanh lọt ra ngoài và giữ âm thanh trong phòng.
                                        Tiêu âm:
                                        Bố trí các vật liệu tiêu âm như mút gai, mút trứng, hoặc các vật dụng trang trí có khả năng hấp thụ âm thanh để giảm tiếng vang và tạo không gian âm thanh tốt hơn.</div>
                                </div>
                            </div>
                        </Card>
                    </swiper-slide>
                    <swiper-slide>
                        <Card className="border border-light shadow-sm rounded-3  m-0 me-3 mb-2 p-0">
                            <div className="row">
                                <div className="col-5 pe-0" onClick={() => setSheetOpenebMenu(true)}>
                                    <img src="https://viet-solar.com/wp-content/uploads/2021/02/bab-jpg.webp" className="w-100 rounded-3"></img>
                                </div>
                                <div className="col-7 fs-13 " onClick={() => setSheetOpenebMenu(true)}>
                                    <div className='fw-bold mt-2'>Phòng Private 1 - Lầu 2</div>
                                    <div className="d-flex gap-1 my-1">
                                        {[...Array(5)].map((_, i) => (
                                            <lord-icon
                                                key={i}
                                                src="https://cdn.lordicon.com/cvwrvyjv.json"
                                                trigger="loop"
                                                colors="primary:#eba707,secondary:#eba707"
                                                style={{ width: '15px', height: '15px' }}
                                            />
                                        ))}
                                    </div>

                                    <div className='limited-lines2 fst-italic fs-11 fst-italic'>Cách âm:
                                        Sử dụng các vật liệu như bông khoáng, mút trứng, cao su non, thạch cao kết hợp các lớp cách âm để ngăn âm thanh lọt ra ngoài và giữ âm thanh trong phòng.
                                        Tiêu âm:
                                        Bố trí các vật liệu tiêu âm như mút gai, mút trứng, hoặc các vật dụng trang trí có khả năng hấp thụ âm thanh để giảm tiếng vang và tạo không gian âm thanh tốt hơn.</div>
                                </div>
                            </div>
                        </Card>
                    </swiper-slide>
                    <swiper-slide>
                        <Card className="border border-light shadow-sm rounded-3  m-0 me-3 mb-2 p-0">
                            <div className="row">
                                <div className="col-5 pe-0" onClick={() => setSheetOpenebMenu(true)}>
                                    <img src="https://img.freepik.com/premium-photo/elite-karaoke-suite-with-velvet-ropes-bartender_416256-24715.jpg" className="w-100 rounded-3"></img>
                                </div>
                                <div className="col-7 fs-13 " onClick={() => setSheetOpenebMenu(true)}>
                                    <div className='fw-bold mt-2'>Phòng Private 1 - Lầu 2</div>
                                    <div className="d-flex gap-1 my-1">
                                        {[...Array(5)].map((_, i) => (
                                            <lord-icon
                                                key={i}
                                                src="https://cdn.lordicon.com/cvwrvyjv.json"
                                                trigger="loop"
                                                colors="primary:#eba707,secondary:#eba707"
                                                style={{ width: '15px', height: '15px' }}
                                            />
                                        ))}
                                    </div>

                                    <div className='limited-lines2 fst-italic fs-11 fst-italic'>Cách âm:
                                        Sử dụng các vật liệu như bông khoáng, mút trứng, cao su non, thạch cao kết hợp các lớp cách âm để ngăn âm thanh lọt ra ngoài và giữ âm thanh trong phòng.
                                        Tiêu âm:
                                        Bố trí các vật liệu tiêu âm như mút gai, mút trứng, hoặc các vật dụng trang trí có khả năng hấp thụ âm thanh để giảm tiếng vang và tạo không gian âm thanh tốt hơn.</div>
                                </div>
                            </div>
                        </Card>

                    </swiper-slide>
                </swiper-container> */}

                <div className="p-1">
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
                                            <div className='col-4 p-1 mt-2' onClick={()=>{setSheetOpenebMenu(true); localStorage.setItem("HappyCorp_active_room", roomItem.active)}} key={index}>
                                                <div className=' position-relative' style={{
                                                    // Thêm box-shadow để tạo viền phát sáng
                                                    boxShadow: '0 0 5px 0 #ff9700, 0 0 10px 0 #fd1678', 
                                                    borderRadius: '8px', 
                                                    border: '0.5px solid #ff9700'
                                                }}>
                                                    <img src={imageUrl} className=' rounded-3 w-100' style={{ objectFit: 'cover' }}></img>

                                                    <div className='position-absolute bottom-0 start-0 m-1'>
                                                        <div className='fw-bold fs-13 text-white rounded-3 px-1' style={{letterSpacing: '1px'}}>
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
                </div>

                {/* <div className="d-flex align-items-center fw-bold mt-3  fst-italic">
                    Phòng được yêu thích
                </div>

                <div className='row d-flex flex-nowrap  mt-2 pb-2' style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
                    <div className='col-5 px-1'>
                        <Card className='m-0 border-light p-0 fs-13 rounded-3 shadow-sm'>
                            <div>
                                <img src='https://dltm-cdn.vnptit3.vn/resources/portal//Images/AGG/quantrivien.vnptagg/images/entertainment/karaoke/cropper_988595705.jpg' className='w-100 rounded-top-3'></img>
                                <div className='p-1 w-100 bg-pink1 text-white text-center fw-bold'>Yêu thích</div>
                                <div className='p-2'>
                                    <div className='fw-bold'>L1 - Phòng Private 1</div>
                                    <div className="d-flex gap-1 my-1">
                                        {[...Array(5)].map((_, i) => (
                                            <lord-icon
                                                key={i}
                                                src="https://cdn.lordicon.com/cvwrvyjv.json"
                                                trigger="loop"
                                                colors="primary:#f30771,secondary:#f30771"
                                                style={{ width: '15px', height: '15px' }}
                                            />
                                        ))}
                                    </div>
                                    <div className='limited-lines2 fst-italic fs-11'>Cách âm:
                                        Sử dụng các vật liệu như bông khoáng, mút trứng, cao su non, thạch cao kết hợp các lớp cách âm để ngăn âm thanh lọt ra ngoài và giữ âm thanh trong phòng.
                                        Tiêu âm:
                                        Bố trí các vật liệu tiêu âm như mút gai, mút trứng, hoặc các vật dụng trang trí có khả năng hấp thụ âm thanh để giảm tiếng vang và tạo không gian âm thanh tốt hơn.</div>
                                </div>
                            </div>
                        </Card>
                    </div>
                    <div className='col-5 px-1'>
                        <Card className='m-0 border-light p-0 fs-13 rounded-3 shadow-sm'>
                            <div>
                                <img src='https://viet-solar.com/wp-content/uploads/2021/02/bab-jpg.webp' className='w-100 rounded-top-3'></img>
                                <div className='p-1 w-100 bg-pink1 text-white text-center fw-bold'>Yêu thích</div>
                                <div className='p-2'>
                                    <div className='fw-bold'>L1 - Phòng Private 1</div>
                                    <div className="d-flex gap-1 my-1">
                                        {[...Array(5)].map((_, i) => (
                                            <lord-icon
                                                key={i}
                                                src="https://cdn.lordicon.com/cvwrvyjv.json"
                                                trigger="loop"
                                                colors="primary:#f30771,secondary:#f30771"
                                                style={{ width: '15px', height: '15px' }}
                                            />
                                        ))}
                                    </div>
                                    <div className='limited-lines2 fst-italic fs-11'>Cách âm:
                                        Sử dụng các vật liệu như bông khoáng, mút trứng, cao su non, thạch cao kết hợp các lớp cách âm để ngăn âm thanh lọt ra ngoài và giữ âm thanh trong phòng.
                                        Tiêu âm:
                                        Bố trí các vật liệu tiêu âm như mút gai, mút trứng, hoặc các vật dụng trang trí có khả năng hấp thụ âm thanh để giảm tiếng vang và tạo không gian âm thanh tốt hơn.</div>
                                </div>
                            </div>
                        </Card>
                    </div>
                    <div className='col-5 px-1'>
                        <Card className='m-0 border-light p-0 fs-13 rounded-3 shadow-sm'>
                            <div>
                                <img src='https://viet-solar.com/wp-content/uploads/2021/02/bab-jpg.webp' className='w-100 rounded-top-3'></img>
                                <div className='p-1 w-100 bg-pink1 text-white text-center fw-bold'>Yêu thích</div>
                                <div className='p-2'>
                                    <div className='fw-bold'>L1 - Phòng Private 1</div>
                                    <div className="d-flex gap-1 my-1">
                                        {[...Array(5)].map((_, i) => (
                                            <lord-icon
                                                key={i}
                                                src="https://cdn.lordicon.com/cvwrvyjv.json"
                                                trigger="loop"
                                                colors="primary:#f30771,secondary:#f30771"
                                                style={{ width: '15px', height: '15px' }}
                                            />
                                        ))}
                                    </div>
                                    <div className='limited-lines2 fst-italic fs-11'>Cách âm:
                                        Sử dụng các vật liệu như bông khoáng, mút trứng, cao su non, thạch cao kết hợp các lớp cách âm để ngăn âm thanh lọt ra ngoài và giữ âm thanh trong phòng.
                                        Tiêu âm:
                                        Bố trí các vật liệu tiêu âm như mút gai, mút trứng, hoặc các vật dụng trang trí có khả năng hấp thụ âm thanh để giảm tiếng vang và tạo không gian âm thanh tốt hơn.</div>
                                </div>
                            </div>
                        </Card>
                    </div>
                    <div className='col-5 px-1'>
                        <Card className='m-0 border-light p-0 fs-13 rounded-3 shadow-sm'>
                            <div>
                                <img src='https://img.freepik.com/premium-photo/elite-karaoke-suite-with-velvet-ropes-bartender_416256-24715.jpg' className='w-100 rounded-top-3'></img>
                                <div className='p-1 w-100 bg-pink1 text-white text-center fw-bold'>Yêu thích</div>
                                <div className='p-2'>
                                    <div className='fw-bold'>L1 - Phòng Private 1</div>
                                    <div className="d-flex gap-1 my-1">
                                        {[...Array(5)].map((_, i) => (
                                            <lord-icon
                                                key={i}
                                                src="https://cdn.lordicon.com/cvwrvyjv.json"
                                                trigger="loop"
                                                colors="primary:#f30771,secondary:#f30771"
                                                style={{ width: '15px', height: '15px' }}
                                            />
                                        ))}
                                    </div>
                                    <div className='limited-lines2 fst-italic fs-11'>Cách âm:
                                        Sử dụng các vật liệu như bông khoáng, mút trứng, cao su non, thạch cao kết hợp các lớp cách âm để ngăn âm thanh lọt ra ngoài và giữ âm thanh trong phòng.
                                        Tiêu âm:
                                        Bố trí các vật liệu tiêu âm như mút gai, mút trứng, hoặc các vật dụng trang trí có khả năng hấp thụ âm thanh để giảm tiếng vang và tạo không gian âm thanh tốt hơn.</div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div> */}
          


            </PageContent>
            {/* <footer className="fixed-bottom p-3 py-2 bg-white">
                <Button className="bg-pink p-3 rounded-pill text-white fs-15">Tiếp tục</Button>
            </footer> */}
            <SheetRoomDetail
                opened={sheetOpenebMenu}
                onClose={() => setSheetOpenebMenu(false)}
            />
        </Sheet>
    );
}
