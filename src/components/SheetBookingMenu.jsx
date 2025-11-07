import { Sheet, Toolbar, PageContent, Link, Card, Icon, Button, AccordionToggle, AccordionItem, AccordionContent, f7 } from "framework7-react";
import { useEffect, useState } from "react";
import moment from 'moment';
// import SheetBooking1 from "./SheetBooking1"; 
import SheetMenuDetail from "./MenuDetail";
import SheetChoiceMenu from "./ChoiceMenu";
import axios from "axios";

const typeMap = {
    service: "services",
    food: "menu",
    combos: "combos",
};

// Định nghĩa props cho component
export default function SheetBookingMenu({ opened, onClose }) {
    
    const [activeTab, setActiveTab] = useState('service');

    // Hàm format giá tiền
    const formatPrice = (price) => {
        if (price === 0) return '0';
        return Number(price).toLocaleString('vi-VN');
    };

    const [sheetOpened1, setSheetOpened1] = useState(false);
    const [sheetOpened2, setSheetOpened2] = useState(false);

    const [menu, setMenu] = useState([]);

    // =======================================================
    // 1. KHÔI PHỤC DỮ LIỆU TỪ LOCALSTORAGE (RESTORE LOGIC)
    // =======================================================
    const [selectedItems, setSelectedItems] = useState(() => {
        try {
            const storedItems = localStorage.getItem("selectedBookingMenu");
            
            if (!storedItems || storedItems === '[]') {
                return {}; // Trả về Object rỗng
            }
            
            // Đọc chuỗi JSON và chuyển thành MẢNG
            const selectedArray = JSON.parse(storedItems);
            
            // Chuyển Mảng về lại OBJECT (Dùng item.id làm khóa)
            return selectedArray.reduce((acc, item) => {
                // CHỈNH SỬA QUAN TRỌNG: Ép item.id thành chuỗi (String) khi đặt làm khóa
                if (item && item.id && item.amount > 0) { 
                    acc[String(item.id)] = item; 
                }
                return acc;
            }, {});
            
        } catch (error) { 
            console.error("Lỗi khi khôi phục selectedItems từ localStorage:", error);
            return {};
        }
    });

    // useEffect để gọi API lấy menu
    useEffect(() => {
        const brand = localStorage.getItem("happyCorp_brand");
        const token = localStorage.getItem("HappyCorp-token-app");
        const data = {
            "token": token,
            "brand": brand
        };
        const api = axios.create({
            baseURL: "https://api-happy.eclo.io/api",
        });

        api.post("/menu", data, {
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => {
            if (res.data.status === "error") {
                f7.dialog.alert(res.data.content, 'Error');
            } else if (res.data.status === "success") {
                setMenu(res.data.data);
            }
        })
            .catch((error) => {
                f7.dialog.alert(error.message || 'Lỗi kết nối API', 'Error');
            });
    }, [f7]); 

    // =======================================================
    // 2. LƯU DỮ LIỆU VÀO LOCALSTORAGE (SAVE LOGIC)
    // =======================================================
    // useEffect để lưu selectedItems vào localStorage khi có thay đổi
    useEffect(() => {
        // Chuyển đổi đối tượng selectedItems sang dạng mảng trước khi lưu
        const selectedItemsArray = Object.values(selectedItems);

        // Chuyển mảng thành chuỗi JSON
        const itemsToStore = JSON.stringify(selectedItemsArray);

        // Lưu chuỗi JSON vào localStorage
        localStorage.setItem("selectedBookingMenu", itemsToStore);
    }, [selectedItems]);

    // Hàm xử lý tăng/giảm số lượng
    const handleAmountChange = (item, change) => {
        // CHỈNH SỬA QUAN TRỌNG: Ép kiểu item.id thành chuỗi (String) khi dùng làm khóa
        const itemId = String(item.id); 
        
        const currentAmount = selectedItems[itemId]?.amount || 0;
        let newAmount = currentAmount + change;

        if (newAmount < 0) {
            newAmount = 0;
        }

        setSelectedItems(prevItems => {
            const updatedItems = { ...prevItems };

            if (newAmount > 0) {
                // Thêm hoặc cập nhật món ăn với số lượng mới
                updatedItems[itemId] = { // Sử dụng itemId đã được ép kiểu chuỗi
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    active: item.active,
                    images: item.images, 
                    amount: newAmount,
                };
            } else {
                // Nếu số lượng về 0, xóa món ăn khỏi danh sách đã chọn
                delete updatedItems[itemId];
            }

            return updatedItems;
        });
    };

    function getTab() {
        const currentType = typeMap[activeTab];
        const filtered = menu.filter((item) => item.type === currentType);

        const categories = filtered.reduce((acc, item) => {
            const found = acc.find((c) => c.title === item.categorys_name);
            const newItem = {
                id: item.id,
                active: item.active,
                name: item.name,
                price: item.price,
                images: item.images || "",
            };

            if (found) {
                found.items.push(newItem);
            } else {
                acc.push({
                    id: item.categorys,
                    title: item.categorys_name,
                    isOpen: false,
                    items: [newItem],
                });
            }
            return acc;
        }, []);

        return { categories };
    }

    const [activeId, setActiveId] = useState(null);

    // Hàm xử lý khi click card (để mở modal detail)
    const handleCardClick = (active) => {
        setActiveId(active);
        setSheetOpened2(true); // Mở SheetMenuDetail
    };

    // Hàm tính tổng số loại món đã chọn (đã có sẵn trong Toolbar)
    const numberOfUniqueItems = Object.keys(selectedItems).length;

    return (
        <>
            <Sheet
                className="demo-sheet-2 h-100 "
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
                        Chọn món
                    </div>
                </Toolbar>
                <PageContent>
                    <Card className="rounded-4 p-3 shadow-none border border-light fs-13 bg-transparent">

                        {/* Tabs để chuyển đổi giữa Dịch vụ, Món ăn, Combo */}
                        <div className="px-1 py-2">
                            <div className="row g-2">
                                {/* ... (Phần buttons ActiveTab) ... */}
                                <div className="col-4">
                                    <Button
                                        fill={activeTab === "service"}
                                        round
                                        className={`w-100 py-3 ${activeTab === "service"
                                            ? "bg-pink text-white border-0"
                                            : " text-color border-0"
                                            }`}
                                        onClick={() => setActiveTab("service")}
                                    >
                                        Dịch vụ
                                    </Button>
                                </div>
                                <div className="col-4">
                                    <Button
                                        fill={activeTab === "food"}
                                        round
                                        className={`w-100 py-3 ${activeTab === "food"
                                            ? "bg-pink text-white border-0"
                                            : " text-color border-0"
                                            }`}
                                        onClick={() => setActiveTab("food")}
                                    >
                                        Món ăn
                                    </Button>
                                </div>
                                <div className="col-4">
                                    <Button
                                        fill={activeTab === "combos"}
                                        round
                                        className={`w-100 py-3 ${activeTab === "combos"
                                            ? "bg-pink text-white border-0"
                                            : " text-color border-0"
                                            }`}
                                        onClick={() => setActiveTab("combos")}
                                    >
                                        Combo
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Accordion theo category */}
                        <div className="px-2 fs-13">
                            <div accordionList className="my-3">
                                {getTab().categories.map((category) => (
                                    <AccordionItem
                                        key={category.id}
                                        accordionOpened={category.isOpen}
                                    >
                                        <AccordionToggle>
                                            <div className="d-flex justify-content-between align-items-center w-100 py-3 mt-2">
                                                <span className="fw-semibold fs-13">{category.title}</span>
                                                <Icon
                                                    f7="chevron_down"
                                                    size="16px"
                                                    className="text-icon accordion-toggle-icon"
                                                />
                                            </div>
                                        </AccordionToggle>

                                        <AccordionContent>
                                            {category.items.length > 0 ? (
                                                <div className="row g-3 py-3">
                                                    {category.items.map((item) => {
                                                        // Truy cập bằng String(item.id) để khớp với khóa trong selectedItems
                                                        const currentAmount = selectedItems[String(item.id)]?.amount || 0;
                                                        return (
                                                            <div key={item.id} className="col-6 px-0 m-0">
                                                                <Card className="m-0 border-0 shadow-sm p-2 pb-0 h-100 bg-transparent position-relative" style={{ backgroundColor: "#292489" }}>
                                                                    
                                                                    {/* Phần thông tin món ăn */}
                                                                    <div className="text-center" onClick={() => { handleCardClick(item.active) }} style={{ cursor: "pointer" }}>
                                                                        <div className="mb-3">
                                                                            <img
                                                                                src={item.images && item.images.trim() !== "" ? `${item.images}` : "../image/no-image.jpg"}
                                                                                alt={item.name}
                                                                                className="w-100 rounded-3"
                                                                                style={{
                                                                                    height: "120px",
                                                                                    objectFit: "cover",
                                                                                    backgroundColor: "#f8f9fa",
                                                                                }}
                                                                            />
                                                                        </div>

                                                                        <div className="mb-1">
                                                                            <h6 className="mb-1 fs-13 text-uppercase">
                                                                                {item.name}
                                                                            </h6>
                                                                            <p className="fw fs-13">
                                                                                {formatPrice(item.price)} <span className="fs-12 text-white"> đ</span>
                                                                               
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                    
                                                                    {/* Bộ điều chỉnh số lượng */}
                                                                    <div className="d-flex justify-content-center align-items-center mb-2">
                                                                        {/* Nút giảm */}
                                                                        <Button
                                                                            small
                                                                            round
                                                                            className={`w-30 ${currentAmount > 0 ? ' text-xanh' : 'text-secondary border'}`}
                                                                            onClick={() => handleAmountChange(item, -1)}
                                                                            disabled={currentAmount === 0}
                                                                        >
                                                                            <Icon f7="minus_circle"></Icon>
                                                                        </Button>
                                                                        
                                                                        {/* Số lượng */}
                                                                        <span className="mx-3 fw-bold fs-14 text-center" style={{ minWidth: '20px' }}>
                                                                            {currentAmount}
                                                                        </span>
                                                                        
                                                                        {/* Nút tăng */}
                                                                        <Button
                                                                            small
                                                                            round
                                                                            onClick={() => handleAmountChange(item, 1)}
                                                                        >
                                                                            <Icon f7="plus_circle" className="text-xanh"></Icon>
                                                                        </Button>
                                                                    </div>
                                                                </Card>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            ) : (
                                                <div className="text-center py-4">
                                                    <p className="fs-13 mb-0">Không có dữ liệu</p>
                                                </div>
                                            )}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </div>
                        </div>

                    </Card>
                </PageContent>
                <footer className="fixed-bottom p-3 py-2">
                    <div className="grid grid-cols-2 grid-gap">
                        <Button sheetClose className="bg-secondary text-white p-3 rounded-pill fs-15" onClick={() => { localStorage.removeItem("selectedBookingMenu"); onClose() }}>Hủy</Button>
                        <Button className="bg-pink p-3 rounded-pill text-white fs-15" onClick={() => {
                            setSheetOpened1(true), console.log(32354);
                        }}>({numberOfUniqueItems}) Món</Button>
                    </div>
                </footer>
            </Sheet>

            {/* Modal Detail */}
            <SheetMenuDetail
                opened={sheetOpened2}
                onClose={() => setSheetOpened2(false)}
                activeId={activeId}
            />

            {/* Sheet Choice Menu */}
            <SheetChoiceMenu
                opened={sheetOpened1}
                onClose={() => setSheetOpened1(false)}
            />
        </>
    );
}