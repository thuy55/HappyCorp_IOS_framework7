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
    Views,
    View,
    Icon,
    Card,
    Sheet,
    PageContent,
    Popup,
    Popover,
    ListInput,
    Subnavbar,
    Segmented,
    Tabs,
    Tab,
    f7
} from 'framework7-react';
import axios from 'axios';
import { data, index } from 'dom7';
import { useTranslation } from 'react-i18next';


const SocialFollowingPage = () => {
    const { t } = useTranslation();
    const [sheetOpenedSuccess, setSheetOpenedSuccess] = useState(false);


    const [avatar, setAvatar] = useState("");
    const token = localStorage.getItem("ELLM-token");
    const language = localStorage.getItem("ELLM_language");

    const uid_social = localStorage.getItem("ELLM_social_profile");
    const uid_account = localStorage.getItem("ELLM-uid");
    useEffect(() => {
        ListFollowing();
        const avatar = localStorage.getItem("ELLM-avatar");
        { avatar && setAvatar(avatar) }

    }, [])

    //social profile
    const [listFollowing, setListFollowing] = useState([]);
    const [social_acc, setsocial_acc] = useState("");
    const [follow, setFollow] = useState("");

    //get list follower

    const ListFollowing = () => {
        const uid = localStorage.getItem("ELLM_social_profile");

        const data = {
            "token": token,
            "lang": language,
            "uid": uid
        }
        const api = axios.create({
            baseURL: "https://beta.ellm.io/api",
        });
        api.post("/social_following", data, {
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer 123123ellm',
            },
        }).then((res) => {
            if (res.data.status === "error") {
                console.log('lỗi');
                f7.dialog.alert(res.data.content, 'Error');
            } else if (res.data.status === "success") {
                console.log(res.data.data);
                setListFollowing(res.data.following)
                setsocial_acc(res.data.social_acc);
                setFollow(res.data.friend)
            }
        })
            .catch((error) => {
                f7.dialog.alert(res.data.content, 'Error');
                console.log("k ket noi dc api");
            });
    }

    const [searchFollowing, setsearchFollowing] = useState("");
    const filteredFollowing = listFollowing
        .filter((following) =>
            following.name.toLowerCase().includes(searchFollowing.toLowerCase())
        )
        .slice(0, 20);

    function addFollow() {
        const active = localStorage.getItem("ELLM_social_profile")
        const data = {
            "token": token,
            "active": active
        }
        const api = axios.create({
            baseURL: "https://beta.ellm.io/api",
        });
        api.post("/social-addfollow", data, {
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer 123123ellm',
            },
        }).then((res) => {
            if (res.data.status === "error") {
                console.log('lỗi');
                f7.dialog.alert(res.data.content, 'Error');
            } else if (res.data.status === "success") {
                f7.dialog.alert(res.data.content, 'Success', () => {
                    profile_add_cancel();
                });
            }
        })
            .catch((error) => {
                f7.dialog.alert(res.data.content, 'Error');
                console.log("k ket noi dc api");
            });
    }
    function CancelFollow() {
        const active = localStorage.getItem("ELLM_social_profile")
        const data = {
            "token": token,
            "active": active
        }
        const api = axios.create({
            baseURL: "https://beta.ellm.io/api",
        });
        api.post("/social-cancelfollow", data, {
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer 123123ellm',
            },
        }).then((res) => {
            if (res.data.status === "error") {
                console.log('lỗi');
                f7.dialog.alert(res.data.content, 'Error');
            } else if (res.data.status === "success") {
                f7.dialog.alert(res.data.content, 'Success', () => {
                    profile_add_cancel();
                });
            }
        })
            .catch((error) => {
                f7.dialog.alert(res.data.content, 'Error');
                console.log("k ket noi dc api");
            });
    }
    function profile_social(e) {
        localStorage.setItem("ELLM_social_profile", e);
        f7.views.main.router.navigate('/profile/');
    }

    return (
        <Page name="profile" >

            <Navbar className='py-2'  >
                <div class="navbar-bg"></div>
                <div className=' d-flex justify-content-between w-100'>
                    <div className='d-flex align-items-center'>
                        <NavLeft >
                            <Link href="/" data-view=".view-main">
                                <img src='../img/logo-small.svg' style={{ width: "30px", height: "30px", }}></img>
                            </Link>
                        </NavLeft>
                        <Button href="/search/" data-view=".view-main" className='  text-light border border-0 text-center  me-2' style={{ width: "40px", height: "40px", }}><Icon f7="search" size="25px"></Icon></Button>
                    </div>
                    <div className='d-flex align-items-center'>

                        <Button fill sheetOpen=".my-popup-menu" className=' rounded-circle text-light border border-0 text-center p-2 me-2' style={{ width: "40px", height: "40px", backgroundColor: "rgba(52, 58, 64)" }}><Icon f7="rectangle_grid_2x2" size="20px"></Icon></Button>
                        <Button fill popupOpen=".my-popup-notification" className=' rounded-circle text-light border border-0 text-center p-2 me-2' style={{ width: "40px", height: "40px", backgroundColor: "rgba(52, 58, 64)" }}><Icon f7="bell" size="20px"></Icon></Button>
                        <Button fill panelOpen="right" className='p-0 m-0 bg-none rounded-circle' style={{ width: "40px", height: "40px" }}>
                            <img src={`${avatar}`} className='rounded-circle' style={{ width: "40px", height: "40px" }}></img>
                        </Button>

                    </div>
                </div>

            </Navbar>


            {/* Thanh Toolbar ở dưới */}
            <Toolbar tabbar icons bottom>
                <Link tabLink="#view-app" href="/account/" iconIos="f7:circle_grid_hex" iconMd="material:settings" text={t("application")} />
                <Link tabLink="#view-chat" href="/chatnew/" iconIos="f7:bubble_left_bubble_right" iconMd="material:view_list" text={t("chat")} />
                <Link href="/" tabLink="#view-home" link="/home/" iconIos="f7:house" iconMd="material:home" text={t("home")} />
                <Link tabLink="#view-account" href="/social/" iconIos="f7:globe" iconMd="material:settings" text={t("community")} />
                <Link tabLink="#view-account" href="/account/" tabLinkActive iconIos="f7:person" iconMd="material:settings" text={t("account")} />
            </Toolbar>

            {/* Page content */}
            <div className='p-2 position-relative'>
                <img src={
                    !social_acc.cover || social_acc.cover === "no-image"
                        ? "/img/logo-small.svg"
                        : `https://beta.ellm.io/${social_acc.cover}`
                } className=' rounded-4 w-100' style={{ height: '250px', objectFit: 'cover' }}></img>

                <img src={
                    !social_acc.avatar || social_acc.avatar === "no-image"
                        ? "/img/logo-small.svg"
                        : `https://beta.ellm.io/${social_acc.avatar}`
                } className='rounded-circle border border-4 border-dark position-absolute top-50 start-0 m-3' style={{ height: "150px", width: "150px" }}></img>
            </div>
            <div className='mt-5 mx-4 text-white'>
                <div className='fs-5 fw-bold'>{social_acc.name}</div>
                {uid_account !== uid_social &&

                    <div className='d-flex align-items-center row'>
                        <div className='col-6'>
                            {follow.status === 1 ?
                                <Button className='bg-dark bg-opacity-75 rounded-3 p-3 text-white mt-2 ' onClick={CancelFollow}>Hủy theo dõi</Button>
                                :
                                <Button className='bg-dark bg-opacity-75 rounded-3 p-3 text-white mt-2 ' onClick={addFollow}>Theo dõi</Button>
                            }
                        </div>
                        <div className='col-6'>
                            <Button className='bg-danger bg-opacity-75 rounded-3 p-3 text-white mt-2' fill sheetOpen=".update-info-sheet-profile">Chặn</Button>
                        </div>
                    </div>
                }
            </div>
            <List className='m-3'>

                <div className='d-flex justify-content-between align-items-center'>
                    <div className='fs-15 fw-bold'>Người theo dõi ({listFollowing.length})</div>
                    <div className="input-group align-items-center  p-2 py-1 mt-2 rounded-pill bg-dark bg-opacity-75" style={{ width: "60%" }}>
                        <input
                            style={{
                                width: "35%",
                                outline: "none",
                                boxShadow: "none",
                            }}
                            type="text"
                            className="form-control fs-15"
                            placeholder="Tìm kiếm"
                            aria-label="Tìm kiếm"
                            aria-describedby="basic-addon2"
                            value={searchFollowing}
                            onChange={(e) => setsearchFollowing(e.target.value)} // Cập nhật state khi nhập
                        />
                        <span
                            className="input-group-text border border-0 p-2 rounded-pill bg-dark bg-opacity-75"
                            id="basic-addon2"
                        >
                            <Icon f7="search" size="25px" color="white" />
                        </span>
                    </div>
                </div>

                <div className='row mx-0 mt-2'>
                    {filteredFollowing && filteredFollowing.map((following) => {
                        return (
                            <>
                                <div className='col-6 p-2'>
                                    <Card className=' bg-dark bg-opacity-75 rounded-4 m-0 p-3' >
                                        {following.avatar === "no-image" ?
                                            <img src="../img/logo-small.svg" className='rounded-circle w-100' onClick={() => { profile_social(following.uid) }}></img>
                                            :
                                            <img src={`https://beta.ellm.io/${following.avatar}`} className='rounded-circle w-100' onClick={() => { profile_social(following.uid) }}></img>
                                        }

                                        <div className='mt-1 fs-15 text-center'>{following.name}</div>
                                    </Card>
                                </div>
                            </>
                        )
                    })}
                </div>
            </List>

            {/* success  */}
            <Sheet
                push
                className="success-social-sheet rounded-5 modal-success"
                opened={sheetOpenedSuccess}
                onSheetClosed={() => {
                    setSheetOpenedSuccess(false);
                }}
                style={{ height: "auto", width: "60%", backgroundColor: "rgba(52, 58, 64)", color: "white" }}
                swipeToClose
                swipeToStep
                backdrop>

                <PageContent className='py-4 text-center text-white'>
                    <img src='../img/icons8-success.gif' className='bg-dark'></img>
                    <div className='fs-2' style={{ fontWeight: "300" }}>Success</div>
                    <div className='fs-14 text-white my-2'>Đã lưu thành công</div>
                    <div className='d-flex justify-content-center'>
                        <Button className='bg-success  text-white fs-15  rounded-pill w-50' style={{ padding: "22px" }} sheetClose>OK</Button>
                    </div>
                </PageContent>
            </Sheet>

        </Page>
    );
};
export default SocialFollowingPage;