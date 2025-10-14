import axios from "axios";
import { Sheet, Toolbar, PageContent, Block, Link, Card, ListInput, List, Icon, Button, Segmented, ListItem, f7 } from "framework7-react";
import { useEffect, useState } from "react";
export default function SheetEventDetail({ opened, onClose }) {

    const [event, setevent] = useState();

    useEffect(() => {
        if (opened) {
            const active = localStorage.getItem("HappyCorp_Event_id");
            const token = localStorage.getItem("HappyCorp-token-app");
            const data = {
                "token": token,
                "active": active
            }

            console.log("Call API /event with:", data);

            const api = axios.create({
                baseURL: "https://api-happy.eclo.io/api",
            });

            api.post("/events/" + active, data, {
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

    return (
        <>
            <Sheet
                className="demo-sheet-2 h-100"
                opened={opened}
                onSheetClosed={onClose}
            >
                {/* <Toolbar className="">
                    <div className="left fw-bold d-flex align-items-center">
                        <Link sheetClose>
                            <img src='../img/backward.gif' className='size-icon me-1'></img>
                        </Link>
                        Chi tiết Sự kiện
                    </div>
                    <div className="right fs-13">
                    </div>
                </Toolbar> */}
                <PageContent className="pb-2">
                    <div className="position-relative">
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKv4lB6fNSa_h68PcOdC13yJFniPqZaq2uow&s"
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


                    <List className='mb-2 mx-2' style={{
                        position: 'relative',
                        marginTop: '-8%', // đè lên 1/5 list trên
                        zIndex: 10,        // đảm bảo nổi lên
                    }}>
                        <Card className='rounded-4 border border-0 p-3 shadow-sm m-2'>
                            <div className='text-center fw-bold'>
                                {event && event.name}
                            </div>
                            <div className='fs-13 text-center mt-2 pb-4 border-bottom'>90's House - Biểu tượng mới của giải trí và ẩm thực cao cấp tại thành phố Hồ Chí Minh </div>
                            <div className='fs-13 mt-2 text-center '>𝐇𝐀𝐏𝐏𝐘 𝐂𝐎𝐑𝐏</div>
                        </Card>
                    </List>
                    <List className='m-2 mt-3'>
                        <Card className='rounded-4 border border-0 p-2 shadow-sm fs-13 m-2'>
                            <div className='fw-bold'>Thông tin sự kiện</div>
                            <div className="m-2 text-white" style={{ whiteSpace: "pre-line" }}>
                                {`✨ 90’s HOUSE – BIỂU TƯỢNG MỚI CỦA GIẢI TRÍ & ẨM THỰC CAO CẤP TẠI TP.HCM ✨
                                Một tuyệt phẩm sắp chính thức trình làng từ Happy Corp – phát triển mạnh mẽ trong lĩnh vực F&B và giải trí đẳng cấp.
                                📍 90’s House – nơi giao thoa giữa ẩm thực cao cấp tinh tế, âm nhạc đỉnh cao và dịch vụ cá nhân hóa chưa từng có tại Hồ Chí Minh, hứa hẹn sẽ trở thành điểm đến hàng đầu cho giới nightlife tại Sài Gòn.
                                Điểm nhấn khác biệt tạo nên đẳng cấp của 90’s House:
                                🔹 Thực đơn fine dining đa phong cách
                                🔹 Dancer thực hiện đa dạng concept
                                🔹 DJ Inhouse biểu diễn mỗi đêm
                                🔹 Dịch vụ tổ chức tiệc VIP theo yêu cầu cá nhân hóa từng khoảnh khắc trải nghiệm.
                                🔹 Hệ thống phòng lounge & phòng ăn VIP
                                🔹 Quy mô 9 tầng – tổng cộng 16 phòng, sức chứa lên đến 300 khách/ngày.
                                🌃 90’s House không chỉ là một địa điểm, mà là tuyên ngôn phong cách sống của giới thượng lưu thành thị đúng nghĩa cho những ai yêu trải nghiệm đỉnh cao trong không gian riêng tư và thời thượng.
                                📍Add: 90-92 Le Thi Rieng st, District 1, Ho Chi Minh City.
                                -------------------------------------------------
                                𝐇𝐀𝐏𝐏𝐘 𝐂𝐎𝐑𝐏
                                ☎️ Hotline: 1900638008
                                🏠 Văn phòng đại diện: 343 Phạm Ngũ Lão, Phạm Ngũ Lão, Quận 1, TP HCM   
                                Website: happycorp.com.vn
                                #90sHouse #PrivateLounge #FineDining #HappyCorp #LuxuryNightlife #ComingSoon #90'sHouse #90lethirieng #lounge #giảitrí #vuichoigiaitri #nightlife #hochiminhcity`}
                            </div>

                        </Card>
                       
                    </List>


                </PageContent>

            </Sheet>


        </>


    );
}
