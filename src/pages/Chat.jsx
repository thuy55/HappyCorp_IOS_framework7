import React, { use, useEffect, useRef, useState } from 'react';
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
    f7,
    Sheet,
    PageContent
} from 'framework7-react';
import moment from 'moment';
import { number } from 'prop-types';
import CommonNavbar from '../components/CommonNavbar';
import PageTransition from '../components/PageTransition';


const ChatPage = () => {

   

    return (


        <Page name="home" >
            {/* Top Navbar */}
            <CommonNavbar />
            {/* Page content */}

          

            <div className="card-header mt-3 px-3">
                <ul
                    className="nav nav-pills row w-100 mx-3 d-flex justify-content-around text-white"
                    id="pills-tab"
                    role="tablist"
                >
                    <li className="nav-item col-6 px-0" role="presentation">
                        <button
                            className="nav-link active p-2 rounded-pill fs-13 d-flex align-items-center justify-content-center"
                            id="pills-chat-tab"
                            data-bs-toggle="pill"
                            data-bs-target="#nav-chat"
                            type="button"
                            role="tab"
                            aria-controls="pills-chat"
                            aria-selected="true"
                        >
                            Tin nhắn
                        </button>
                    </li>
                    <li className="nav-item col-6 px-0" role="presentation">
                        <button
                            className="nav-link fs-13 p-2 rounded-pill d-flex align-items-center justify-content-center"
                            id="pills-friend-tab"
                            data-bs-toggle="pill"
                            data-bs-target="#nav-friend"
                            type="button"
                            role="tab"
                            aria-controls="pills-friend"
                            aria-selected="false"
                        >
                            Bạn bè
                        </button>
                    </li>
                </ul>
            </div>
            <form className=" tab-content overflowY pt-2 px-2">
                <div className="tab-pane active" id="nav-chat">
                    <List className='p-3 m-0'>
                        <div className=" mx-1 d-flex align-items-center bg-light border border-secondary-10 rounded-pill p-1 row" style={{ cursor: 'pointer' }}>
                            <input className='border bg-light rounded-pill border-0 p-2 px-3 col-10 text-dark' placeholder='Tìm kiếm'></input>
                            <Button fill={false} className=" col-2 pe-0 d-flex justify-content-end">
                                <lord-icon
                                    src="https://cdn.lordicon.com/wjyqkiew.json"
                                    trigger="loop"
                                    colors="primary:#000000,secondary:#f30771"
                                    className=' me-2'
                                    style={{ width: '30px', height: '30px' }}>
                                </lord-icon>
                            </Button>
                        </div>
                        <List>
                            <div className='d-flex align-items-center fs-13 mt-3 ' >
                                <img src='https://avatarngau.sbs/wp-content/uploads/2025/05/avatar-vit-5-400x400.jpg' className='rounded-circle col-2' style={{ width: "45px", height: "45px" }}></img>
                                <div className='col-10 ms-2 pb-2 border-bottom'>
                                    <div className='d-flex align-items-center justify-content-between mb-1'>
                                        <div className='fw-bold fs-15'>Mia</div>
                                        <div className="text-secondary fs-11">3 phút</div>
                                    </div>
                                    <div style={{
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis"
                                    }}>
                                        Hiện tại, tôi không biết bạn là ai. Bạn có thể giới thiệu về bản thân mình được không?
                                    </div>
                                </div>
                            </div>
                            <div className='d-flex align-items-center fs-13 mt-3' >
                                <img src='https://avatarngau.sbs/wp-content/uploads/2025/05/avatar-vit-5-400x400.jpg' className='rounded-circle col-2' style={{ width: "45px", height: "45px" }}></img>
                                <div className='col-10 ms-2 pb-2 border-bottom'>
                                    <div className='d-flex align-items-center justify-content-between mb-1'>
                                        <div className='fw-bold fs-15'>Mia</div>
                                        <div className="text-secondary fs-11">3 phút</div>
                                    </div>
                                    <div style={{
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis"
                                    }}>
                                        Hiện tại, tôi không biết bạn là ai. Bạn có thể giới thiệu về bản thân mình được không?
                                    </div>
                                </div>
                            </div>
                            <div className='d-flex align-items-center fs-13 mt-3' >
                                <img src='https://avatarngau.sbs/wp-content/uploads/2025/05/avatar-vit-5-400x400.jpg' className='rounded-circle col-2' style={{ width: "45px", height: "45px" }}></img>
                                <div className='col-10 ms-2 pb-2 border-bottom'>
                                    <div className='d-flex align-items-center justify-content-between mb-1'>
                                        <div className='fw-bold fs-15'>Mia</div>
                                        <div className="text-secondary fs-11">3 phút</div>
                                    </div>
                                    <div style={{
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis"
                                    }}>
                                        Hiện tại, tôi không biết bạn là ai. Bạn có thể giới thiệu về bản thân mình được không?
                                    </div>
                                </div>
                            </div>
                        </List>
                    </List>
                </div>
                <div className="tab-pane" id="nav-friend">
                    <List className='p-3 m-0'>
                        <div className="mx-1 d-flex align-items-center bg-light border border-secondary-10 rounded-pill p-1 row" style={{ cursor: 'pointer' }}>
                            <input className='border bg-light rounded-pill border-0 p-2 px-3 col-10 text-dark' placeholder='Tìm kiếm'></input>
                            <Button fill={false} className=" col-2 pe-0 d-flex justify-content-end">
                                <lord-icon
                                    src="https://cdn.lordicon.com/wjyqkiew.json"
                                    trigger="loop"
                                    colors="primary:#000000,secondary:#f30771"
                                    className=' me-2'
                                    style={{ width: '30px', height: '30px' }}>
                                </lord-icon>
                            </Button>
                        </div>
                        <List>

                            <div className='d-flex align-items-center fs-13 mt-3' >
                                <img src="https://avatarngau.sbs/wp-content/uploads/2025/05/avatar-vit-5-400x400.jpg" className='rounded-circle col-2' style={{ width: "45px", height: "45px" }}></img>
                                <div className='col-10 ms-3'>
                                    <div className='fs-15 fw-bold mb-1'>
                                        Thanh Thúy
                                    </div>
                                    <div className='text-secondaryb fs-13'>
                                        SĐT: 0123456789
                                    </div>
                                </div>
                            </div>
                            <div className='border-50 my-3'></div>


                        </List>

                    </List>

                </div>
            </form>
        </Page>

    );
}
export default ChatPage;