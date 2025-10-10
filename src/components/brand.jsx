import axios from "axios";
import { Sheet, Toolbar, PageContent, Block, Link, Card, ListInput, List, Icon, Button, Segmented, ListItem, f7 } from "framework7-react";
import { useEffect, useState } from "react";
export default function SheetBrand({ opened, onClose }) {
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
    const [brandId, setBrandId] = useState(1);

    const [brand, setbrand] = useState([]);
    useEffect(() => {
        const brand = localStorage.getItem("happyCorp_brand")
        { brand && setBrandId(brand) }
        const token = localStorage.getItem("HappyCorp-token-app")
        const data = {
            "token": token,
        }
        const api = axios.create({
            baseURL: "https://api-happy.eclo.io/api",
        });
        api.post("/brand", data, {
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => {
            if (res.data.status === "error") {
                console.log('lỗi');
                f7.dialog.alert(res.data.content, 'Error');

            } else if (res.data.status === "success") {
                console.log(res.data.data);
                setbrand(res.data.data);
            }
        })
            .catch((error) => {
                f7.dialog.alert(error, 'Error');
                console.log("k ket noi dc api");
            });
    }, [])

    function onClickBrand(e, name) {
        localStorage.setItem("happyCorp_brand", e)
        localStorage.setItem("happyCorp_brand_name", name)
        console.log("id_brand", e + name);
        setBrandId(e)
        // ép Framework7 đóng
        window.location.reload();
        // f7.sheet.close('.demo-sheet-brand');

        // đồng thời cập nhật state React ở cha
        onClose();
    }
    return (
        <>
            <Sheet
                className="demo-sheet-brand "
                opened={opened}
                onSheetClosed={onClose}
                swipeToClose
                swipeToStep
                push
            >

                <PageContent className="h-auto">
                    <div className="d-flex align-items-center justify-content-between p-2 pt-3">
                        <div className="fs-15">Chọn chi nhánh</div>
                        <div className="fs-13">
                            <Link sheetClose>Close</Link>
                        </div>
                    </div>
                    <List className="px-3 m-0">
                        {brand && brand.map((brand, key) => {
                            return (
                                <>
                                    <div className={`d-flex align-items-center mt-2 p-2 rounded ${brandId == brand.id ? "bg-danger bg-opacity-25 text-white" : ""}`} onClick={() => { onClickBrand(brand.id, brand.name) }}>
                                        <lord-icon
                                            src="https://cdn.lordicon.com/lbcxnxti.json"
                                            trigger="loop"
                                            colors="primary:#f30771,secondary:#f30771"
                                            className=' me-2'
                                            style={{ width: '30px', height: '30px' }}>
                                        </lord-icon>
                                        <div className="ms-3 fs-15">
                                            {brand.name}
                                        </div>

                                    </div>
                                </>
                            )
                        })}

                    </List>
                </PageContent>
            </Sheet>


        </>


    );
}
