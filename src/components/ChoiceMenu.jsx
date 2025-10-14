import { Sheet, Toolbar, PageContent, Block, Link, Card, ListInput, List, Icon, Button, AccordionToggle, AccordionItem, AccordionContent } from "framework7-react";
import { useEffect, useState } from "react";
import moment from 'moment';
import SheetBooking1 from "./SheetBooking1";
import SheetMenuDetail from "./MenuDetail";
export default function SheetChoiceMenu({ opened, onClose }) {

    const formatPrice = (price) => {
        if (price === 0) return '0';
        return price.toLocaleString('vi-VN');
    };

    const [menu, setMenu] = useState([]);

    // tăng giảm
    const increaseQty = (id) => {
        setMenu(prev => {
            const updated = prev.map(item =>
                item.id === id
                    ? { ...item, amount: item.amount + 1 }
                    : item
            );
            localStorage.setItem("selectedBookingMenu", JSON.stringify(updated));
            return updated;
        });
    };
    const decreaseQty = (id) => {
        setMenu(prev => {
            const updated = prev
                .map(item =>
                    item.id === id
                        ? { ...item, amount: item.amount - 1 }
                        : item
                )
                .filter(item => item.amount > 0); // loại bỏ item có amount = 0
            localStorage.setItem("selectedBookingMenu", JSON.stringify(updated));
            return updated;
        });
    };


    const [sheetOpened1, setSheetOpened1] = useState(false);
    const [sheetOpened2, setSheetOpened2] = useState(false);
    return (
        <>
            <Sheet
                className="demo-sheet-2 h-100"
                opened={opened}
                onSheetClosed={onClose}
                onSheetOpened={() => {
                    const a = localStorage.getItem("selectedBookingMenu");
                    if (a) {
                        try {
                            setMenu(JSON.parse(a));
                        } catch (e) {
                            console.error("Không parse được selectedBookingMenu:", e);
                        }
                    }
                }}
            >
                <Toolbar className="">
                    <div className="left fw-bold d-flex align-items-center mb-3">
                        <button
                            className="rounded-circle border-0 bg-light  me-3 d-flex justify-content-center p-1"
                            style={{ width: "25px", height: "25px", lineHeight: "25px" }}
                            onClick={() => f7.sheet.close()}
                        >
                            <Icon f7="arrow_left" size='15px' className="icon-dark"></Icon>

                        </button>
                        Danh sách món đã chọn
                    </div>
                </Toolbar>
                <PageContent>
                    <Card className="rounded-4 p-3 shadow-none fs-13">
                        {menu ? menu.map((item) => (
                            <>

                                {/* <div key={item.id} className="col-6">
                                            <Card className="m-0 p-0 rounded-3 shadow-none border-light">
                                                <img src={item.image} className="w-100 rounded-top-3" onClick={() => { setSheetOpened2(true) }} />
                                                <div className="p-2">
                                                    <div className="fw-bold fs-13">
                                                        {item.name}
                                                    </div>
                                                    <div className="d-flex align-items-center justify-content-between">
                                                        <div className="fs-11 fw-bold text-secondary">
                                                            {formatPrice(item.price)}đ
                                                        </div>
                                                        <div className="d-flex align-items-center gap-2 mt-2 fs-13">
                                                            <button
                                                                className="bg-light p-1 d-flex align-items-center"
                                                                onClick={() => decreaseQty(item.id)}
                                                            >
                                                                <Icon f7="minus" size="10px" />
                                                            </button>
                                                            <span style={{ minWidth: "10px", textAlign: "center" }}>
                                                                {item.quantity}
                                                            </span>
                                                            <button
                                                                className="bg-light p-1 d-flex align-items-center"
                                                                onClick={() => increaseQty(item.id)}
                                                            >
                                                                <Icon f7="plus" size="10px" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Card>
                                        </div> */}
                                <div className="row w-10 mt-3">
                                    <div className="col-2 p-1">
                                        <img  src={item.images && item.images.trim() !== "" ? `${item.images}` : "../image/no-image.jpg"} className="w-100 rounded-3"></img>
                                    </div>
                                    <div className="col-10 p-1 pe-2">
                                        <div className="fs-13 fw-bold ">{item.name}</div>
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div className="fs-11 text-secondary">{formatPrice(item.price)}đ</div>
                                            <div className="d-flex align-items-center gap-2 mt-2 fs-13">
                                                <button
                                                    className="bg-light p-1 d-flex align-items-center rounded-circle"
                                                    onClick={() => decreaseQty(item.id)}
                                                >
                                                    <Icon f7="minus" size="10px" />
                                                </button>
                                                <span style={{ minWidth: "10px", textAlign: "center" }}>
                                                    {item.amount}
                                                </span>
                                                <button
                                                    className="bg-light p-1 d-flex align-items-center rounded-circle"
                                                    onClick={() => increaseQty(item.id)}
                                                >
                                                    <Icon f7="plus" size="10px" />
                                                </button>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </>
                        )):(
                            <>
                            <div className="fs-13 text-center mt-3">
                                Bạn đã không chọn món ăn
                            </div>
                            </>
                        )}

                    </Card>
                </PageContent>
                <footer className="fixed-bottom p-3 py-2 ">
                    <div className="grid grid-cols-2 grid-gap">
                        <Button sheetClose className="bg-secondary text-white p-3 rounded-pill  fs-15">Quay lại</Button>
                        <Button className="bg-pink p-3 rounded-pill text-white fs-15" onClick={() => {
                            setSheetOpened1(true), console.log(32354);
                        }}> Tiếp tục</Button>
                    </div>
                </footer>
            </Sheet>
            <SheetBooking1
                opened={sheetOpened1}
                onClose={() => setSheetOpened1(false)}
            />
        </>
    );
}
