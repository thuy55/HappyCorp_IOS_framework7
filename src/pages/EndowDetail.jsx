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
    View
} from 'framework7-react';
import moment from 'moment';
import { number } from 'prop-types';
import CommonNavbar from '../components/CommonNavbar';


const EndowDetailPage = () => {

    const handleClick = (e) => {
        setIsModalOpenSee(false);
        history.push(e);
        console.log(e);
    };

    function handleRefresh(event) {
        setTimeout(() => {
            // Any calls to load data go here
            event.detail.complete();
        }, 2000);
    }

    return (

        <Page name="home">
            <CommonNavbar />
            {/* Page content */}
            <List className='m-2' simpleList>
                <div className='d-flex align-items-center fs-6 fw-bold'>
                    <Link back>
                        <img src='../img/backward.gif' className='size-icon me-1'></img>
                    </Link>
                    Chi tiết sự kiện jkdfhsj
                </div>
            </List>
            <List className='my-2 position-relative'>
                <div className='bg-warning bg-opacity-10 row pb-4'>
                    <div className='col-7 p-2 ps-4 pe-0 fs-5 fw-bold'>
                        <div className=''>Hãy đến với HappyCorp để nào</div>
                        <div className='mt-1'> <span className='bg-pink rounded-1 text-white px-2'>đến 50%</span></div>
                    </div>
                    <div className='col-5 ps-0'>
                        <img src='../image/10.gif' className='w-100'></img>
                    </div>
                </div>
            </List>
            <List className='mb-2' style={{
                position: 'relative',
                marginTop: '-12%', // đè lên 1/5 list trên
                zIndex: 10,        // đảm bảo nổi lên
            }}>
                <Card className='rounded-4 border-light border-1 p-2 shadow-sm'>
                    <div className='text-center fw-bold'>
                        Giảm 20%
                    </div>
                    <div className='fs-13 text-center mt-2 pb-4 border-bottom'>Giảm tối đa tiền mặt 1.000.000đ cho hóa đơn từ 50.000.000đ </div>
                    <div className='fs-13 mt-1'><img src='../image/6.gif' style={{ width: "25px", height: "25px" }}></img>Giảm giá Combo</div>
                </Card>
            </List>
            <List className='my-3'>
                <Card className='rounded-4 border-light border-1 p-2 shadow-sm fs-13'>
                    <div className='fw-bold'>Điều khoản sử dụng</div>
                    <ul className='mt-1' style={{ listStyle: 'disc', paddingLeft: '1.1rem' }}>
                        <li>Thời gian áp dụng: từ thứ 2-6</li>
                        <li>Thời gian áp dụng: từ thứ 2-6</li>
                        <li>Thời gian áp dụng: từ thứ 2-6</li>
                    </ul>
                </Card>
            </List>
            <List className='my-3'>
                <Card className='rounded-4 border-light border-1 p-2 shadow-sm fs-13'>
                    <div className='fw-bold'>Hướng dẫn sử dụng</div>
                    <ul className='mt-1' style={{ listStyle: 'disc', paddingLeft: '1.1rem' }}>
                        <li>Thời gian áp dụng: từ thứ 2-6</li>
                        <li>Thời gian áp dụng: từ thứ 2-6</li>
                        <li>Thời gian áp dụng: từ thứ 2-6</li>
                    </ul>
                </Card>
            </List>


            <div className='fs-6 fw-bold mx-3 mt-4 d-flex align-items-center'><img src='../image/6.gif' className='size-icon'></img>  Ưu đãi khác</div>
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
export default EndowDetailPage;