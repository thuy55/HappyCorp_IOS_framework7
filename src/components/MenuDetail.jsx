import axios from "axios";
import { Sheet, Toolbar, PageContent, Block, Link, Card, ListInput, List, Icon, Button, Segmented, ListItem, f7 } from "framework7-react";
import { useEffect, useState } from "react";
export default function SheetMenuDetail({ opened, onClose, active }) {


    useEffect(() => {
        if (active) {
            // gọi API hoặc xử lý dữ liệu theo active
            console.log("Active từ cha:", active);
            OnclickDetail(active)
        }
    }, [active]);

    const [food, setFood]= useState("");
    function OnclickDetail(active) {
        const brand = localStorage.getItem("happyCorp_brand")
        const token = localStorage.getItem("HappyCorp-token-app")
        const data = {
            "token": token,
            "brand": brand,
            "active": active
        }
        console.log(36456);

        const api = axios.create({
            baseURL: "https://api-happy.eclo.io/api",
        });
        api.post("/menu/" + active, data, {
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => {
            if (res.data.status === "error") {
                console.log('lỗi');
                f7.dialog.alert(res.data.content, 'Error');

            } else if (res.data.status === "success") {
                console.log(res.data.data);
                setFood(res.data.data)

            }
        })
            .catch((error) => {
                f7.dialog.alert(error, 'Error');
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
                {/* <Toolbar className="">
                    <div className="left fw-bold d-flex align-items-center">

                        Chi tiết món ăn
                    </div>
                    <div className="right fs-13">
                        <Link sheetClose>Close</Link>
                    </div>
                </Toolbar> */}
                <PageContent className="pb-5">
                    {/* <div className=' mt-3'>
                        <img src='https://tse1.mm.bing.net/th/id/OIP.oLxcg5eheNmd3t3ansSW-wHaEK?pid=Api&P=0&h=180' className=' w-100'></img>
                    </div> */}
                    <div className="position-relative">
                        <img
                            src="https://tse1.mm.bing.net/th/id/OIP.oLxcg5eheNmd3t3ansSW-wHaEK?pid=Api&P=0&h=180"
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
                    <div className="row m-3 mx-0 d-flex align-items-center">
                        <div className="col-9 fs-15 fw-bold">
                            {food && food.name} - {food && food.category}
                        </div>
                        <div className="col-3 text-end">
                            {food && new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(food.price)}
                        </div>
                    </div>
                    <div className="border border-bottom"></div>
                    <div className="p-3 fs-13">
                        <div className="fw-bold">Mô tả món ăn</div>
                        <div className="mt-2 px-2">
                            1.Thực Đơn Khai Vị
                            Gà Chiên Giòn: Giòn tan, thơm ngon, dễ ăn và luôn được yêu thích.
                            Nem Rán: Món ăn quen thuộc, vị ngọt của nhân và lớp vỏ giòn rụm khiến ai cũng muốn thử.
                            Đậu Phụ Sốt Cà: Món chay nhẹ nhàng, đậm đà hương vị và rất dễ làm.
                            2. Thực Đơn Chính
                            Cơm Rang Thập Cẩm: Món ăn đầy đủ dinh dưỡng với nhiều nguyên liệu phong phú, vừa ngon vừa no.
                            Phở Xào: Một món ăn đặc trưng Việt Nam, hấp dẫn với hương vị thơm ngon.
                            Bánh Mì Thịt Nướng: Lựa chọn hoàn hảo cho những ai yêu thích ẩm thực đường phố.
                            3. Thực Đơn Tráng Miệng
                            Bánh Flan: Món tráng miệng nhẹ nhàng, ngọt ngào, dễ tiêu hóa sau bữa ăn.
                            Xôi Xoài: Sự kết hợp giữa xôi dẻo và xoài chín ngọt, tạo nên một món tráng miệng tuyệt vời.
                            Thạch Trái Cây: Mát lạnh, tươi ngon, rất thích hợp cho những ai thích sự thanh mát.
                        </div>
                    </div>


                </PageContent>

            </Sheet>


        </>


    );
}
