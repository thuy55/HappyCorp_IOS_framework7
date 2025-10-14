import { Sheet, Toolbar, PageContent, Block, Link, Card, ListInput, List, Icon, Button, Segmented, ListItem, f7 } from "framework7-react";
import { useEffect, useState } from "react";
import moment from 'moment';
import SheetBookingMenu from "./SheetBookingMenu";
import axios from "axios";
export default function SheetBookingCompleted({ opened, onClose }) {
    // ...existing code...

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

    const [invoices, setInvoices] = useState();
    const [bill, setBill] = useState([]);
    const [pay, setPay] = useState();

    useEffect(() => {
        if (opened) {
            const active = localStorage.getItem("HappyCorp_id_invoices");
            const token = localStorage.getItem("HappyCorp-token-app");
            const data = {
                "token": token,
                "active": active
            }

            console.log("Call API /event with:", data);

            const api = axios.create({
                baseURL: "https://api-happy.eclo.io/api",
            });

            api.post("/invoices/" + active, data, {
                headers: { "Content-Type": "application/json" },
            })
                .then((res) => {
                    if (res.data.status === "error") {
                        console.log("lỗi");
                        f7.dialog.alert(res.data.content, "Error");
                    } else if (res.data.status === "success") {
                        console.log(res.data.data);
                        setInvoices(res.data.data);
                        setBill(res.data.invoiceDetail);
                        setPay(res.data.pay)
                    }
                })
                .catch((error) => {
                    f7.dialog.alert(error, "Error");
                    console.log("k ket noi dc api");
                });
        }
    }, [opened]);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
    };
    return (
        <>
            <Sheet
                className="demo-sheet-2 h-100"
                opened={opened}
                onSheetClosed={onClose}
            >
                <Toolbar className="">
                    
                    <div className="left fw-bold d-flex align-items-center">

                        Hóa đơn #{invoices && invoices.code}
                    </div>
                    <div className="right fs-13">
                        <Link onClick={() => { handleCloseAllModals() }}>Đóng</Link>
                    </div>
                </Toolbar>
                <PageContent >
                    {/* <div className='d-flex justify-content-center mt-4'>
                        <div className='bg-white w-50 p-3 rounded-4 shadow-sm'>
                            <img src='https://quickchart.io/qr?text=akjshdiasjhdiauhsdiuasdi&ecLevel=Q&margin=0&size=500' className=' w-100'></img>
                        </div>
                    </div> */}
                    {/* <div className='d-flex justify-content-center mt-2 fs-13 fw-bold'>#0000111</div> */}
                    <Card className="rounded-4 p-3 shadow-none border border-0 fs-13">
                        <div className=" fs-13 text-pink mb-2 fw-bold">
                            Thông tin khách hàng
                        </div>
                        <div className='d-flex align-items-center justify-content-between p-2'>
                            Khách hàng <div className='fw-bold'>{invoices && invoices.name}</div>
                        </div>
                        <div className='d-flex align-items-center justify-content-between p-2'>
                            Điện thoại <div className='fw-bold'>{invoices && invoices.phone}</div>
                        </div>
                        <div className='d-flex align-items-center justify-content-between p-2'>
                            Ghi chú <div className='fw-bold'>{invoices && invoices.notes_customer}</div>
                        </div>
                        <div className='d-flex align-items-center justify-content-between p-2'>
                            Xác nhận <div className='fw-bold'>Đã xác nhận qua Zalo</div>
                        </div>
                    </Card>
                    <Card className="rounded-4 p-3 shadow-none border border-0 fs-13">
                        <div className=" fs-13 text-pink mb-2 fw-bold">
                            Thông tin đặt bàn
                        </div>
                        <div className='d-flex align-items-center justify-content-between p-2'>
                            Nhà hàng <div className='fw-bold'>{invoices && invoices.brands}</div>
                        </div>
                        <div className='d-flex align-items-center justify-content-between p-2'>
                            Mã booking <div className='fw-bold'>#{invoices && invoices.code}</div>
                        </div>
                        <div className='d-flex align-items-center justify-content-between p-2'>
                            Ngày <div className='fw-bold'>{invoices && invoices.date}</div>
                        </div>
                        <div className='d-flex align-items-center justify-content-between p-2'>
                            Số người <div className='fw-bold'>{invoices && invoices.amount}</div>
                        </div>
                        <div className='d-flex align-items-center justify-content-between p-2'>
                            Khu vực / Phòng<div className='fw-bold'>{invoices && invoices.areas_name}</div>
                        </div>
                        <div className='d-flex align-items-center justify-content-between p-2'>
                            Trạng thái

                            <span className='text-warning'>Đợi duyệt</span>

                        </div>
                        <div className='d-flex align-items-center justify-content-between p-2'>
                            Ghi chú <div className='fw-bold'>{invoices && invoices.notes}</div>
                        </div>
                    </Card>
                    <Card className="rounded-4 p-3 shadow-none border border-0 fs-13">
                        <div className=" fs-13 text-pink mb-2 fw-bold">
                            Chi tiết dịch vụ/ Món ăn
                        </div>
                        {bill.length > 0 ? bill.map((menu) => {
                            return (
                                <>
                                    <div className='d-flex justify-content-between align-items-center p-2'>
                                        <div className=''>
                                            <div>{menu.name} <span className='fw-bold text-pink'>x {menu.amount}</span></div>
                                            <div>{menu.price}đ</div>
                                        </div>
                                        <div className='fw-bold'>{menu.total}đ</div>
                                    </div>
                                </>
                            )
                        }) : (
                            <>
                                <div className="mt-3 text-center fs-13">
                                    Không có dữ liệu
                                </div>
                            </>
                        )}
                    </Card>
                    <Card className="rounded-4 p-3 shadow-none border border-0 fs-13">
                        <div className=" fs-13 text-pink mb-2 fw-bold">
                            Thông tin thanh toán
                        </div>
                        <div className='d-flex justify-content-between align-items-center text-success fw-bold p-2'>
                            {/* Tổng tiền hàng ban đầu (trước giảm trừ, phí) */}
                            <div>Tổng tiền hàng:</div>
                            <div>{pay && formatCurrency(pay.total)}</div>
                        </div>
                        <div className='d-flex justify-content-between align-items-center text-danger fw-bold p-2'>
                            <div>Giảm giá:</div>
                            <div>{pay && formatCurrency(pay.discount_price)}</div>
                        </div>
                        <div className='d-flex justify-content-between align-items-center text-warning fw-bold p-2'>
                            {/* Gán đúng giá trị tiền cọc (deposit_price) */}
                            <div>Đã cọc:</div>
                            <div>{pay && formatCurrency(pay.deposit_price)}</div>
                        </div>
                        <div className='d-flex justify-content-between align-items-center text-xanh fw-bold p-2'>
                            <div>Phụ thu ({pay?.services_fee}%):</div>
                            <div>{pay && formatCurrency(pay.services_price)}</div>
                        </div>
                        <div className='d-flex justify-content-between align-items-center text-xanh fw-bold p-2'>
                            {/* Sử dụng tax rate 10% từ dữ liệu */}
                            <div>Thuế ({pay?.tax && Object.keys(pay.tax)[0]}%):</div>
                            <div>{pay && formatCurrency(pay.total_tax)}</div>
                        </div>

                        {/* --- TỔNG KẾT --- */}
                        <div className='d-flex justify-content-between align-items-center fs-15 fw-bold p-2'>
                            {/* Tổng tiền phải thanh toán cuối cùng (Grand Total) */}
                            <div>TỔNG CỘNG:</div>
                            <div>{pay && formatCurrency(pay.total_payments)}</div>
                        </div>

                        <div className='d-flex justify-content-between align-items-center text-danger fw-bold p-2'>
                            {/* Hiển thị Nợ (còn thiếu): Lấy trị tuyệt đối để bỏ dấu âm */}
                            <div>Còn thiếu:</div>
                            <div>{pay && formatCurrency(Math.abs(pay["into-money"]?.price ?? 0))}</div>
                        </div>

                    </Card>
                    <Card className="rounded-4 p-3 shadow-none border border-0 fs-13 mb-5">
                        <div className=" fs-13 text-pink mb-2 fw-bold">
                            Phương thức thanh toán
                        </div>

                        <div className='d-flex justify-content-between align-items-center p-2'>
                            <div className=''>Phương thức thanh toán</div>
                            <div className='fw-bold'>{pay && pay.details_payments.length > 0 && pay.details_payments[0].form}</div>
                        </div>
                        <div className='d-flex justify-content-between align-items-center p-2'>
                            <div className=''>Ngày thanh toán</div>
                            <div className='fw-bold'>{invoices && invoices.completed_date}</div>
                        </div>
                        {/* <div className='d-flex justify-content-between align-items-center p-2'>
                            <div className=''>Lễ tân</div>
                            <div className='fw-bold'>Ms Xinh</div>
                        </div> */}
                        <div className='d-flex justify-content-between align-items-center p-2'>
                            <div className=''>Người đặt</div>
                            <div className='fw-bold'>{invoices && invoices.account}</div>
                        </div>
                    </Card>
                </PageContent>
                {/* <footer className="fixed-bottom p-3 py-1 ">
                    <div className=' grid grid-cols-2 grid-gap px-2 my-2'>
                        <div>
                            <button className='border border-0 rounded-pill p-3 bg-warning fs-13 fw-đơnd'>Tải hóa đơn</button>
                        </div>
                        <div>
                            <button className='border border-0 rounded-pill p-3 bg-warning fs-13 fw-đơnd'>Chia sẻ</button>
                        </div>
                    </div>
                </footer> */}
            </Sheet>


        </>


    );
}
