import React, { useEffect, useState } from 'react';
import {
    Page,
    Navbar,
    NavLeft,
    NavTitle,
    NavTitleLarge,
    NavRight,
    Link,
    Toolbar,
    Block,
    BlockTitle,
    List,
    ListItem,
    Button,
    Card,
    Icon,
    Badge,
    Popup,
    View,
    f7
} from 'framework7-react';
import moment from 'moment';
import { number } from 'prop-types';
import CommonNavbar from '../components/CommonNavbar';


const EventPage = () => {

    const handleClick = (e) => {
        f7.views.main.router.navigate('/event-detail/');
        console.log("jhgdsjhf", e);
    };

    function handleRefresh(event) {
        setTimeout(() => {
            // Any calls to load data go here
            event.detail.complete();
        }, 2000);
    }

    return (


        <Page name="home">
            {/* Top Navbar */}
            <CommonNavbar />
            {/* Page content */}
            <List className='m-2' simpleList>
                <div className='d-flex align-items-center fs-6 fw-bold'>
                    <Link back>
                        <img src='../img/backward.gif' className='size-icon me-1'></img>
                    </Link>
                    Sự kiện
                </div>
            </List>
            <List className='my-2'>
                <div className='bg-warning bg-opacity-10 row'>
                    <div className='col-7 p-2 ps-4 pe-0 fs-5 fw-bold'>
                        <div className=''>Hãy đến với HappyCorp để nào</div>
                        <div className='mt-1'> <span className='bg-pink rounded-1 text-white px-2'>đến 50%</span></div>
                    </div>
                    <div className='col-5 ps-0'>
                        <img src='../image/10.gif' className='w-100'></img>
                    </div>
                </div>
            </List>
            <List className=' mb-3 mt-0'>
                <Card className='border-1 border-light my-3 shadow-sm p-1 rounded-3'>
                    <div className="row " onClick={() => { handleClick(1) }}>
                        <div className='col-4'>
                            <img src='https://play-lh.googleusercontent.com/IeNJWoKYx1waOhfWF6TiuSiWBLfqLb18lmZYXSgsH1fvb8v1IYiZr5aYWe0Gxu-pVZX3' className='rounded-3 w-100'></img>
                        </div>
                        <div className='col-8 ps-0 fs-13'>
                            <div className='d-flex align-items-center fst-italic'>
                                <img src='../image/6.gif' style={{ width: "25px", height: "25px" }}></img>Giảm giá sốc
                            </div>
                            <div className='fw-bold '>Giảm 10%</div>
                            <div className='limited-lines2'>Giảm tối đa tiền mặt 1.000.000đ cho hóa đơn từ 50.000.000đ</div>
                            <div className='d-flex justify-content-end mt-1'>
                                <button className=' p-1 px-3 rounded-3 border-btn text-white'>Xem ngay</button>
                            </div>
                        </div>
                    </div>
                </Card>
                <Card className='border-1 border-light my-3 shadow-sm p-1 rounded-3'>
                    <div className="row ">
                        <div className='col-4'>
                            <img src='https://play-lh.googleusercontent.com/IeNJWoKYx1waOhfWF6TiuSiWBLfqLb18lmZYXSgsH1fvb8v1IYiZr5aYWe0Gxu-pVZX3' className='rounded-3 w-100'></img>
                        </div>
                        <div className='col-8 ps-0 fs-13'>
                            <div className='d-flex align-items-center fst-italic fw-bold'>
                                <img src='../image/6.gif' style={{ width: "25px", height: "25px" }}></img>Giảm giá sốc
                            </div>
                            <div className='fw-bold text-pink'>Giảm 10%</div>
                            <div className='limited-lines2'>Giảm tối đa tiền mặt 1.000.000đ cho hóa đơn từ 50.000.000đ</div>
                            <div className='d-flex justify-content-end mt-1'>
                                <button className=' p-1 px-3 rounded-3 border-btn text-white'>Xem ngay</button>
                            </div>
                        </div>
                    </div>
                </Card>
            </List>


            <div className='fs-6 fw-bold mx-3 mt-4 d-flex align-items-center'><img src='../image/6.gif' className='size-icon'></img>  Ưu đãi</div>
            <div className='row d-flex flex-nowrap mx-2 mt-2 pb-2' style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
                <div className='col-4 px-1'>
                    <Card className='m-0 border-light p-1 fs-13'>
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
                    <Card className='m-0 border-light p-1 fs-13'>
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
                    <Card className='m-0 border-light p-1 fs-13'>
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
                    <Card className='m-0 border-light p-1 fs-13'>
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
        </Page>

    );
}
export default EventPage;