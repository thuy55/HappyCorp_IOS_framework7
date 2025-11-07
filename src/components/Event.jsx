import { Sheet, Toolbar, PageContent, Block, Link, Card, ListInput, List, Icon, Button, Segmented, ListItem, f7 } from "framework7-react";
import { useEffect, useState } from "react";
import SheetEventDetail from "./EventDetail";
import axios from "axios";
export default function SheetEvent({ opened, onClose }) {
    const [sheetOpened1, setSheetOpened1] = useState(false);

    const [event, setevent] = useState([]);

    useEffect(() => {
        if (opened) {
            const brand = localStorage.getItem("happyCorp_brand");
            const token = localStorage.getItem("HappyCorp-token-app");
            const data = { token, brand };

            console.log("Call API /event with:", data);

            const api = axios.create({
                baseURL: "https://api-happy.eclo.io/api",
            });

            api.post("/events", data, {
                headers: { "Content-Type": "application/json" },
            })
                .then((res) => {
                    if (res.data.status === "error") {
                        console.log("lỗi");
                        f7.dialog.alert(res.data.content, "Error");
                    } else if (res.data.status === "success") {
                        console.log(res.data.data);
                        setevent(res.data.data);
                    }
                })
                .catch((error) => {
                    f7.dialog.alert(error, "Error");
                    console.log("k ket noi dc api");
                });
        }
    }, [opened]);

    function onClickDetailEvent(e) {
        localStorage.setItem("HappyCorp_Event_id", e)
        console.log(123);
        setSheetOpened1(true);

    }

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
                        Sự kiện

                    </div>
                    {/* <div className="right fs-13">
                        <Link sheetClose>Close</Link>
                    </div> */}
                </Toolbar>
                <PageContent className="pb-5">

                    {/* <div className='bg-warning bg-opacity-10 '> */}
                    {/* <div className="row w-100"> */}

                    <div className=' position-relative'>
                        <img src="../image/image-event.png" className='  w-100' style={{ objectFit: 'cover' }}></img>

                        <div className='position-absolute top-0 end-0 m-2'>
                            <img src='../image/happy-corp-logo.png' style={{ height: "30px" }}></img>
                        </div>
                        <div className='position-absolute bottom-0 start-0 m-3 mt-0 fs-15 fw-bold fst-italic' style={{ color: "#ff9700" }}>
                            <div className="mb-2"> Where style meets nightlife</div>

                            Thưởng thức từng giọt – Sống trọn từng đêm
                        </div>

                    </div>

                    <List className=' mb-3 mt-0'>
                        {event && event.map((event, key) => {
                            return (
                                <>
                                    <Card className='border border-0 my-2 mx-2 shadow-none p-1 rounded-3' >
                                        <div
                                            className="position-absolute top-0 start-0 w-100 h-100 position-relative"
                                            style={{ zIndex: 10, cursor: "pointer" }}
                                            onClick={() => { onClickDetailEvent(event.active) }}
                                        ></div>
                                        <div className="row ">
                                            <div className='col-4'>
                                                <img src={`https://api-happy.eclo.io/${event.images}`} className='rounded-3 w-100'></img>
                                            </div>
                                            <div className='col-8 ps-0 fs-13'>
                                                <div className='d-flex align-items-center fw-bold'>
                                                    <img src='../image/6.gif' style={{ width: "25px", height: "25px" }}></img>{event.name}
                                                </div>
                                                <div className='limited-lines2 fst-italic fs-11 mt-1'>90's House - Biểu tượng mới của giải trí và ẩm thực cao cấp tạp thành phố Hồ Chí Minh</div>
                                                <div className='d-flex justify-content-end  mt-2'>
                                                    <button className=' p-1 px-3 rounded-3 border-btn text-pink' style={{ width: "auto", display: "inline-block" }} onClick={() => setSheetOpened1(true)}>Xem ngay</button>
                                                </div>
                                            </div>
                                        </div>
                                    </Card >
                                </>
                            )
                        })}
                    </List>

                    <div className='fs-6 fw-bold mx-3 mt-4 d-flex align-items-center'><img src='../image/6.gif' className='size-icon'></img>  Ưu đãi</div>
                    <div className='row d-flex flex-nowrap mx-2 mt-2 pb-2' style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
                        <div className='col-5 px-1'>
                            <Card className='m-0 border border-0 p-1 fs-13'>
                                <div>
                                    <img src='https://image.made-in-china.com/202f0j00vzJeGPLHZIoB/Gold-Restaurant-Bar-Counter-Square-U-Stylish-Wholesale-Night-Club-Bar-Design.webp' className='w-100 rounded-3'></img>
                                    <div className='d-flex'>
                                        <div className='mt-2 fst-italic'> <img src='../image/6.gif' style={{ width: "25px", height: "25px" }}></img>Giảm giá sốc</div>
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
                                        <div className='mt-2 fst-italic'> <img src='../image/6.gif' style={{ width: "25px", height: "25px" }}></img>Giảm giá sốc</div>
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
                                        <div className='mt-2 fst-italic'> <img src='../image/6.gif' style={{ width: "25px", height: "25px" }}></img>Giảm giá sốc</div>
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
                                        <div className='mt-2 fst-italic'> <img src='../image/6.gif' style={{ width: "25px", height: "25px" }}></img>Giảm giá sốc</div>
                                    </div>
                                    <div className='fw-bold text-pink my-1'>Giảm 10%</div>
                                    <div className='limited-lines1'>Giảm tối đa tiền mặt 1.000.000đ cho hóa đơn từ 50.000.000đ</div>
                                </div>
                            </Card>
                        </div>

                    </div>


                </PageContent>

            </Sheet >
            <SheetEventDetail
                opened={sheetOpened1}
                onClose={() => setSheetOpened1(false)}
            />

        </>


    );
}
