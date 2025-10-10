import { Sheet, Toolbar, PageContent, Block, Link, Card, ListInput, List, Icon, Button, AccordionToggle, AccordionItem, AccordionContent } from "framework7-react";
import { useEffect, useState } from "react";
import moment from 'moment';
import SheetBooking1 from "./SheetBooking1";
import SheetMenuDetail from "./MenuDetail";
import axios from "axios";
const typeMap = {
    service: "services",
    food: "menu",
    combos: "combos", // nếu có dữ liệu combo thì thêm
};
export default function SheetMenu({ opened, onClose }) {
    const [activeTab, setActiveTab] = useState('service');

    const formatPrice = (price) => {
        if (price === 0) return '0';
        return price.toLocaleString('vi-VN');
    };

    const [sheetOpened1, setSheetOpened1] = useState(false);

    const [menu, setMenu] = useState([]);
    useEffect(() => {
        const brand = localStorage.getItem("happyCorp_brand")
        const token = localStorage.getItem("HappyCorp-token-app")
        const data = {
            "token": token,
            "brand": brand
        }
        const api = axios.create({
            baseURL: "https://api-happy.eclo.io/api",
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
                setMenu(res.data.data);
            }
        })
            .catch((error) => {
                f7.dialog.alert(error, 'Error');
                console.log("k ket noi dc api");

            });
    }, [])


    function getTab() {
        const currentType = typeMap[activeTab];
        const filtered = menu.filter((item) => item.type === currentType);

        const categories = filtered.reduce((acc, item) => {
            const found = acc.find((c) => c.title === item.categorys_name);
            if (found) {
                found.items.push({
                    id: item.id,
                    active: item.active,
                    name: item.name,
                    price: item.price,
                    images: item.images || "",
                });
            } else {
                acc.push({
                    id: item.categorys,
                    title: item.categorys_name,
                    isOpen: false,
                    items: [
                        {
                            id: item.id,
                            active: item.active,
                            name: item.name,
                            price: item.price,
                            images: item.images || "",
                        },
                    ],
                });
            }
            return acc;
        }, []);

        return { categories };
    }

    function OnclickDetail(e) {
        const brand = localStorage.getItem("happyCorp_brand")
        const token = localStorage.getItem("HappyCorp-token-app")
        const data = {
            "token": token,
            "brand": brand,
            "active": e
        }
        console.log(36456);

        const api = axios.create({
            baseURL: "https://api-happy.eclo.io/api",
        });
        api.post("/menu/" + e, data, {
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => {
            if (res.data.status === "error") {
                console.log('lỗi');
                f7.dialog.alert(res.data.content, 'Error');

            } else if (res.data.status === "success") {
                console.log(res.data.data);

            }
        })
            .catch((error) => {
                f7.dialog.alert(error, 'Error');
                console.log("k ket noi dc api");

            });
    }

    const [activeId, setActiveId] = useState(null);                     // lưu active

    // Hàm xử lý khi click card
    const handleCardClick = (active) => {
        setActiveId(active);          // lưu lại id/active để modal detail dùng
        setSheetOpened1(true); 
    };
    return (
        <>
            <Sheet
                className="demo-sheet-2 h-100 "
                opened={opened}
                onSheetClosed={onClose}
            >
                <Toolbar className="">
                    <div className=" fw-bold d-flex align-items-center" >
                        <Link sheetClose>
                            <img src='../img/backward.gif' className='size-icon me-1'></img>
                        </Link>
                        Chọn menu
                    </div>
                </Toolbar>
                <PageContent>
                    <Card className="rounded-4 p-3 shadow-none border border-light fs-13 bg-transparent">
                        {/* <div className="px-1 py-2">
                            <div className="row g-2">
                                <div className="col-4">
                                    <Button
                                        fill={activeTab === 'service'}
                                        round
                                        className={`w-100 py-3 ${activeTab === 'service'
                                            ? 'bg-pink text-white border-0'
                                            : ' text-color border-0'
                                            }`}
                                        onClick={() => setActiveTab('service')}
                                    >
                                        Dịch vụ
                                    </Button>
                                </div>
                                <div className="col-4">
                                    <Button
                                        fill={activeTab === 'food'}
                                        round
                                        className={`w-100 py-3 ${activeTab === 'food'
                                            ? 'bg-pink text-white border-0'
                                            : ' text-color border-0'
                                            }`}
                                        onClick={() => setActiveTab('food')}
                                    >
                                        Món ăn
                                    </Button>
                                </div>
                                <div className="col-4">
                                    <Button
                                        fill={activeTab === 'combo'}
                                        round
                                        className={`w-100 py-3 ${activeTab === 'combo'
                                            ? 'bg-pink text-white border-0'
                                            : ' text-color border-0'
                                            }`}
                                        onClick={() => setActiveTab('combo')}
                                    >
                                        Combo
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="px-2 fs-13">
                            <div accordionList className='my-3'>
                                {getCurrentData().categories.map((category) => (
                                    <AccordionItem
                                        key={category.id}
                                        accordionOpened={category.isOpen}
                                    >
                                        <AccordionToggle>
                                            <div className="d-flex justify-content-between align-items-center w-100 py-3 mt-2">
                                                <span className="fw-semibold fs-13">
                                                    {category.title}
                                                </span>
                                                <Icon
                                                    f7="chevron_down"
                                                    size="16px"
                                                    className="text-muted accordion-toggle-icon"
                                                />
                                            </div>
                                        </AccordionToggle>

                                        <AccordionContent>
                                            {category.items.length > 0 ? (
                                                <div className="row g-3 py-3">
                                                    {category.items.map((item) => (
                                                        <div key={item.id} className="col-6">
                                                            <Card className="m-0 border-0 shadow-sm p-2 h-100" >
                                                                <div className="text-center">
                                                                    <div className="mb-3">
                                                                        <img onClick={() => { setSheetOpened1(true) }}
                                                                            src={item.image}
                                                                            alt={item.name}
                                                                            className="w-100 rounded-3"
                                                                            style={{
                                                                                height: '120px',
                                                                                objectFit: 'cover',
                                                                                backgroundColor: '#f8f9fa'
                                                                            }}
                                                                            onError={(e) => {
                                                                                e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiBmaWxsPSIjRjhGOUZBIi8+CjxjaXJjbGUgY3g9IjYwIiBjeT0iNjAiIHI9IjIwIiBmaWxsPSIjREVFMkU2Ii8+PC9zdmc+';
                                                                            }}
                                                                        />
                                                                    </div>

                                                                    <div className="mb-2">
                                                                        <h6 className=" mb-1 fs-13 text-uppercase">
                                                                            {item.name}
                                                                        </h6>
                                                                        <p className=" fw fs-13">
                                                                            {formatPrice(item.price)}
                                                                            {item.price > 0 && <span className="fs-12 text-muted">đ</span>}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </Card>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="text-center py-4">
                                                    <p className=" fs-13 mb-0">
                                                        Không có dữ liệu
                                                    </p>
                                                </div>
                                            )}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </div>
                        </div> */}
                        <div className="px-1 py-2">
                            <div className="row g-2">
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
                                                    {category.items.map((item) => (
                                                        <div key={item.id} className="col-6 px-0 m-0">
                                                            <Card className="m-0 border-0 shadow-sm p-2 pb-0 h-100  bg-transparent position-relative" >
                                                                <div
                                                                    className="position-absolute top-0 start-0 w-100 h-100"
                                                                    style={{ zIndex: 10, cursor: "pointer" }}
                                                                    onClick={() => { handleCardClick(item.active) }}
                                                                ></div>
                                                                <div className="text-center">
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

                                                                    <div className="mb-2">
                                                                        <h6 className="mb-1 fs-13 text-uppercase">
                                                                            {item.name}
                                                                        </h6>
                                                                        <p className="fw fs-13">
                                                                            {formatPrice(item.price)}
                                                                            {item.price > 0 && (
                                                                                <span className="fs-12 text-muted">đ</span>
                                                                            )}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </Card>
                                                        </div>
                                                    ))}
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
            </Sheet>
            <SheetMenuDetail
                opened={sheetOpened1}
                onClose={() => setSheetOpened1(false)}
                active={activeId}
            >
              
            </SheetMenuDetail>
        </>
    );
}
