import { Sheet, Toolbar, PageContent, Block, Link, Card, ListInput, List, Icon, Button, Segmented, ListItem, f7 } from "framework7-react";
import { useEffect, useState } from "react";
import SheetEndowDetail from "./EndowDetail";
export default function SheetEndow({ opened, onClose }) {
    const [sheetOpened1, setSheetOpened1] = useState(false);
    return (
        <>
            <Sheet
                className="demo-sheet-2 h-100 "
                opened={opened}
                onSheetClosed={onClose}
            >
                <Toolbar className="border border-0">
                    <div className="left fw-bold d-flex align-items-center">
                        Ưu đãi
                    </div>
                    <div className="right fs-13">
                        <Link sheetClose>Close</Link>
                    </div>
                </Toolbar>
                <PageContent className="pb-5">

                    <div className=' ' style={{backgroundColor:"#292579"}}>
                        <div className="row w-100">

                            <div className='col-7 fs-5 fw-bold'>
                                <div className="p-2 pt-3">Hãy đến với HappyCorp để nào</div>
                                <div className='mt-1 ps-2'> <span className='bg-pink rounded-1  px-2'>đến 50%</span></div>
                            </div>
                            <div className='col-5 py-3 d-flex justify-content-end'>
                                <img src='../image/flash-sale-removebg.png' style={{width:"120px"}}></img>
                            </div>
                        </div>
                    </div>
               
                    <List className=' mb-3 mt-0'>
                        <Card className='border border-0 my-3 shadow-none p-1 rounded-3'>
                            <div className="row ">
                                <div className='col-4'>
                                    <img src='https://topgo.vn/wp-content/uploads/2017/07/3-Karaoke-Olala-3.jpg' className='rounded-3 w-100'></img>
                                </div>
                                <div className='col-8 ps-0 fs-13'>
                                    <div className='d-flex align-items-center fst-italic'>
                                        <img src='../image/6.gif' style={{ width: "25px", height: "25px" }}></img>Giảm giá sốc
                                    </div>
                                    <div className='fw-bold '>Giảm 10%</div>
                                    <div className='limited-lines2'>Giảm tối đa tiền mặt 1.000.000đ cho hóa đơn từ 50.000.000đ</div>
                                    <div className='d-flex justify-content-end mt-2'>
                                         <button className=' p-1 px-3 rounded-3 border-btn text-pink' style={{ width: "auto", display: "inline-block" }} onClick={() => setSheetOpened1(true)}>Xem ngay</button>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        <Card className='border border-0 my-3 shadow-sm p-1 rounded-3'>
                            <div className="row ">
                                <div className='col-4'>
                                    <img src='https://topgo.vn/wp-content/uploads/2017/07/3-Karaoke-Olala-3.jpg' className='rounded-3 w-100'></img>
                                </div>
                                <div className='col-8 ps-0 fs-13'>
                                    <div className='d-flex align-items-center fst-italic'>
                                        <img src='../image/6.gif' style={{ width: "25px", height: "25px" }}></img>Giảm giá sốc
                                    </div>
                                    <div className='fw-bold '>Giảm 10%</div>
                                    <div className='limited-lines2'>Giảm tối đa tiền mặt 1.000.000đ cho hóa đơn từ 50.000.000đ</div>
                                    <div className='d-flex justify-content-end mt-2'>
                                        <div className='d-flex justify-content-end  mt-2'>
                                            <button className=' p-1 px-3 rounded-3 border-btn text-pink' style={{ width: "auto", display: "inline-block" }} onClick={() => setSheetOpened1(true)}>Xem ngay</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                        <Card className='border border-0 my-3 shadow-sm p-1 rounded-3'>
                            <div className="row ">
                                <div className='col-4'>
                                    <img src='https://topgo.vn/wp-content/uploads/2017/07/3-Karaoke-Olala-3.jpg' className='rounded-3 w-100'></img>
                                </div>
                                <div className='col-8 ps-0 fs-13'>
                                    <div className='d-flex align-items-center fst-italic'>
                                        <img src='../image/6.gif' style={{ width: "25px", height: "25px" }}></img>Giảm giá sốc
                                    </div>
                                    <div className='fw-bold '>Giảm 10%</div>
                                    <div className='limited-lines2'>Giảm tối đa tiền mặt 1.000.000đ cho hóa đơn từ 50.000.000đ</div>
                                    <div className='d-flex justify-content-end mt-2'>
                                        <button className=' p-1 px-3 rounded-3 border-btn text-pink' style={{ width: "auto", display: "inline-block" }} onClick={() => setSheetOpened1(true)}>Xem ngay</button>
                                    </div>
                                </div>
                            </div>
                        </Card>
                        <Card className='border border-0 my-3 shadow-sm p-1 rounded-3'>
                            <div className="row ">
                                <div className='col-4'>
                                    <img src='https://topgo.vn/wp-content/uploads/2017/07/3-Karaoke-Olala-3.jpg' className='rounded-3 w-100'></img>
                                </div>
                                <div className='col-8 ps-0 fs-13'>
                                    <div className='d-flex align-items-center fst-italic fw-bold'>
                                        <img src='../image/6.gif' style={{ width: "25px", height: "25px" }}></img>Giảm giá sốc
                                    </div>
                                    <div className='fw-bold text-pink'>Giảm 10%</div>
                                    <div className='limited-lines2'>Giảm tối đa tiền mặt 1.000.000đ cho hóa đơn từ 50.000.000đ</div>
                                    <div className='d-flex justify-content-end mt-2'>
                                         <button className=' p-1 px-3 rounded-3 border-btn text-pink' style={{ width: "auto", display: "inline-block" }} onClick={() => setSheetOpened1(true)}>Xem ngay</button>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </List>


                    <div className='fs-6 fw-bold mx-3 mt-4 d-flex align-items-center'><img src='../image/6.gif' className='size-icon'></img>  Ưu đãi</div>
                    <div className='row d-flex flex-nowrap mx-2 mt-2 pb-2' style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
                        <div className='col-4 px-1'>
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
                        <div className='col-4 px-1'>
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
                        <div className='col-4 px-1'>
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
                        <div className='col-4 px-1'>
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

            </Sheet>
            <SheetEndowDetail
                opened={sheetOpened1}
                onClose={() => setSheetOpened1(false)}
            />

        </>


    );
}
