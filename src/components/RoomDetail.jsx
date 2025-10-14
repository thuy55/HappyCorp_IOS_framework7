import { Sheet, Toolbar, PageContent, Block, Link, Card, ListInput, List, Icon, Button, Segmented, ListItem, f7 } from "framework7-react";
import { useEffect, useState } from "react";
import SheetBookingMenu from "./SheetBookingMenu";
import axios from "axios";
export default function SheetRoomDetail({ opened, onClose }) {
    const [sheetOpenebMenu, setSheetOpenebMenu] = useState(false);

    const [roomDetail, setRoomDetail]= useState();

    const [invoices, setInvoices]= useState();
    const [area, setArea]= useState();
    useEffect(() => {
        if (opened) {
            const activeRoom = localStorage.getItem("HappyCorp_active_room");
            const token = localStorage.getItem("HappyCorp-token-app");
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
                        setArea(res.data.areas)
                    }
                })
                .catch((error) => {
                    f7.dialog.alert(error, "Error");
                    console.log("k ket noi dc api");
                });
        }
    }, [opened]);
    return (
        <>
            <Sheet
                className="demo-sheet-2 h-100"
                opened={opened}
                onSheetClosed={onClose}
            >
                {/* <Toolbar className="">
                    <div className="left fw-bold d-flex align-items-center">

                        Chi tiết phòng
                    </div>
                    <div className="right fs-13">
                        <Link sheetClose>Close</Link>
                    </div>
                </Toolbar> */}
                <PageContent className="pb-5">
                    {/* <div className=''>
                        <img src='https://thietkethicong.org/images/Product/Mau-phong-hat-karaoke-vip-phong-cach-Tan-Co-Dien-1.jpg' className=' w-100'></img>
                    </div> */}
                    <div className="position-relative">
                        <img
                            src="https://thietkethicong.org/images/Product/Mau-phong-hat-karaoke-vip-phong-cach-Tan-Co-Dien-1.jpg"
                            className="w-100"
                            alt="karaoke"
                        />

                        {/* nút đóng */}
                        <div className="p-60 position-absolute top-0 start-0">
                            <button
                                className="rounded-circle border-0 bg-light  m-2 d-flex justify-content-center p-2"
                                style={{ width: "30px", height: "30px", lineHeight: "30px", marginTop: '50px !important' }}
                                onClick={() => f7.sheet.close()}
                            >
                                    <Icon f7="arrow_left" size='15px' color='black' ></Icon>
                        
                            </button>
                        </div>
                    </div>

                    <div className="row m-3 pb-2 mx-0 d-flex align-items-center border-bottom">
                        <div className="col-9 fs-15 fw-bold">
                           Phòng {roomDetail && roomDetail.name}
                        </div>
                        <div className="col-3 text-end">
                            Khu vực {area && area.name}
                        </div>
                    </div>
                    <div className="row mt-3 pb-1 mx-0 d-flex align-items-center border-bottom">
                        <div>Giới thiệu phòng</div>
                        <ul className="fst-italic fs-13 px-5 mt-2">
                            <li className="mt-1">
                                Địa chỉ: 90 – 92 Lê Thị Riêng, Quận 1, TP.HCM
                            </li>
                            <li className="mt-1">
                                Kích thước: 30 m²
                            </li>
                            <li className="mt-1">
                                Sức chứa: 30 người
                            </li>
                        </ul>

                    </div>

                    <div className="p-3 fs-13">
                        <div className="fw-bold">Mô tả </div>
                        <div className="mt-2 px-0">
                            <ul>
                                <li className="mt-2">
                                    Cách âm và tiêu âm:
                                    Cách âm:
                                    Sử dụng các vật liệu như bông khoáng, mút trứng, cao su non, thạch cao kết hợp các lớp cách âm để ngăn âm thanh lọt ra ngoài và giữ âm thanh trong phòng.
                                    Tiêu âm:
                                    Bố trí các vật liệu tiêu âm như mút gai, mút trứng, hoặc các vật dụng trang trí có khả năng hấp thụ âm thanh để giảm tiếng vang và tạo không gian âm thanh tốt hơn.
                                </li>
                                <li className="mt-2">
                                    Âm thanh:
                                    Hệ thống âm thanh chất lượng:
                                    Bao gồm loa, micro, amply, vang số, và các thiết bị xử lý âm thanh khác để đảm bảo chất lượng âm thanh tốt, rõ ràng và sống động.
                                    Bố trí loa:
                                    Đặt loa ở các vị trí phù hợp để tạo hiệu ứng âm thanh stereo, tránh gây khó chịu cho người nghe và người hát.
                                    Điều chỉnh âm thanh:
                                    Cần có các thiết bị điều chỉnh âm thanh để người dùng có thể tùy chỉnh âm lượng, âm sắc, độ vang theo sở thích cá nhân.
                                </li>
                                <li className="mt-2">
                                    Ánh sáng:
                                    Ánh sáng đa dạng:
                                    Sử dụng ánh sáng có thể thay đổi màu sắc, cường độ để tạo không gian ấm cúng, sôi động hoặc lãng mạn.
                                    Đèn chiếu sáng sân khấu:
                                    Bố trí đèn sân khấu như đèn moving head, đèn laser, đèn led để tạo hiệu ứng ánh sáng độc đáo và ấn tượng.
                                    Ánh sáng tập trung:
                                    Sử dụng đèn chiếu sáng tập trung vào khu vực sân khấu, màn hình để tạo điểm nhấn và thu hút sự chú ý.
                                </li>
                                <li className="mt-2">
                                    Nội thất:
                                    Ghế sofa:
                                    Chọn ghế sofa êm ái, thoải mái để người hát có thể ngồi thư giãn.
                                    Bàn:
                                    Bố trí bàn để đặt đồ uống, đồ ăn và các thiết bị điều khiển.
                                    Bàn karaoke:
                                    Bàn karaoke có thể được tích hợp màn hình cảm ứng hoặc các phím điều khiển để dễ dàng chọn bài hát.
                                    Trang trí:
                                    Sử dụng các vật dụng trang trí như tranh ảnh, cây xanh, kệ sách để tạo không gian độc đáo và ấn tượng.
                                </li>
                            </ul>


                        </div>
                    </div>


                </PageContent>
                <footer className="fixed-bottom p-3 py-2">
                    <div className="grid grid-cols-2 grid-gap">
                        <Button sheetClose className="bg-light text-dark  p-3 rounded-pill  fs-15">Đóng</Button>
                        <Button className="bg-pink p-3 rounded-pill text-white fs-15" onClick={() => {
                            setSheetOpenebMenu(true), console.log(32354);
                        }}>Tiếp tục</Button>
                    </div>
                </footer>
            </Sheet>
            <SheetBookingMenu
                opened={sheetOpenebMenu}
                onClose={() => setSheetOpenebMenu(false)}
            />

        </>


    );
}
