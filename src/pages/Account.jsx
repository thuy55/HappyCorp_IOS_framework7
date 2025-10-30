import React, { useEffect, useRef, useState } from 'react';
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
import axios from 'axios';


const AccountPage = () => {

    const handleClick = (e) => {
        f7.views.main.router.navigate('/event-detail/');
        console.log("jhgdsjhf", e);
    };

    function handleRefresh(event) {
        setTimeout(() => {
            event.detail.complete();
        }, 2000);
    }

    const [showPasswordold, setShowPasswordold] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showRePassword, setShowRePassword] = useState(false);

    const [sheetOpenedChangePass, setSheetOpenedChangePass] = useState(false);
    const [sheetOpenedChangeInfo, setSheetOpenedChangeInfo] = useState(false);

    const [updateAvatar, setUpdateAvatar] = useState("");

    const fileInputRef = useRef(null);

    const triggerFileInputAvatar = () => {
        fileInputRef.current?.click();
    };

    const handleImageAvatar = (event) => {

        const file = event.target.files?.[0];
        if (file) {
            setavatar(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target?.result) {
                    setUpdateAvatar(e.target.result); // base64 string
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDeleteImageAddAvatar = () => {
        setUpdateAvatar("");
    };

    const [name, setName] = useState("");
    const [account, setAccount] = useState("");
    const [email, setemail] = useState("");
    const [birthday, setbirthday] = useState("");
    const [gender, setgender] = useState("");
    const [phone, setphone] = useState("");
    const [avatar, setavatar] = useState("");
    const [dateRegister, setdateRegister] = useState("");
    const [code, setcode] = useState("");
    const profile = () => {
        const token = localStorage.getItem("HappyCorp-token-app");
        const data = {
            "token": token
        }
        const api = axios.create({
            baseURL: "https://api-happy.eclo.io/api",
        });
        api.post("/profile", data, {
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => {
            if (res.data.status === "error") {
                console.log('lỗi');
                f7.dialog.alert(res.data.content, 'Error');

            } else if (res.data.status === "success") {
                console.log(res.data.data);
                setName(res.data.data.name);
                setAccount(res.data.data.account);
                setemail(res.data.data.email);
                setbirthday(res.data.data.birthday);
                setgender(res.data.data.gender);
                setphone(res.data.data.phone);
                setavatar(res.data.data.avatar);
                setdateRegister(res.data.data.date)
                setcode(res.data.data.id);

            }
        })
            .catch((error) => {
                f7.dialog.alert(error, 'Error');
                console.log("k ket noi dc api");

            });
    }
    useEffect(() => {
        profile()
    }, [])
    function formatDate(dateStr) {
        const date = new Date(dateStr);
        return date.toLocaleDateString("vi-VN");
    }

    const [passwordOld, setPasswordOld] = useState("");
    const [password, setPassword] = useState("");
    const [passwordconfirm, setPasswordconfirm] = useState("");

    function changePassword() {
        const token = localStorage.getItem("HappyCorp-token-app");
        const data = {
            "token": token,
            "password-old": passwordOld,
            "password": password,
            "password-confirm": passwordconfirm

        }
        console.log("change", data);

        const api = axios.create({
            baseURL: "https://api-happy.eclo.io/api",
        });
        api.post("/change-password", data, {
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => {
            if (res.data.status === "error") {
                console.log('lỗi');
                f7.dialog.alert(res.data.content, 'Error');

            } else if (res.data.status === "success") {
                console.log(res.data.data);
                f7.dialog.alert(res.data.content, 'Success', () => {
                    f7.sheet.close();
                });

            }
        })
            .catch((error) => {
                f7.dialog.alert(error, 'Error');
                console.log("k ket noi dc api");

            });
    }

    function changeInfo() {
        const token = localStorage.getItem("HappyCorp-token-app");
        const data = {
            "token": token,
            "name": name,
            "email": email,
            "birthday": birthday,
            "gender": gender,
            "images": avatar

        }
        console.log("change", data);
        let formData = new FormData();

        formData.append("token", token);
        formData.append("name", name);
        formData.append("email", email);
        formData.append("birthday", birthday);
        formData.append("gender", gender);
        formData.append("images", avatar);

        const api = axios.create({
            baseURL: "https://api-happy.eclo.io/api",
        });
        api.post("/change-infomation", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }).then((res) => {
            if (res.data.status === "error") {
                console.log('lỗi');
                f7.dialog.alert(res.data.content, 'Error');

            } else if (res.data.status === "success") {
                console.log(res.data.data);
                f7.dialog.alert(res.data.content, 'Success', () => {
                    f7.sheet.close();
                    profile()
                });
            }
        })
            .catch((error) => {
                f7.dialog.alert(error, 'Error');
                console.log("k ket noi dc api");

            });
    }

    return (

        <>
            <Page name="home">
                {/* Top Navbar */}
                {/* <CommonNavbar /> */}
                {/* Page content */}

                <div className="position-relative text-center ">
                    {/* Nền */}
                    <img
                        src="../image/nen.png"
                        className="w-100"
                        style={{ height: "350px", objectFit: "cover" }}
                    />

                    {/* Thanh tiêu đề */}
                    <div
                        className="position-absolute top-0 start-0 w-100 d-flex justify-content-between align-items-center p-3 p-60"
                        style={{ zIndex: 10 }}
                    >
                        <div className="fw-bold d-flex align-items-center text-dark">
                            {/* <Link  className="d-flex align-items-center text-white">
                                <Icon f7="arrow_left" size='15px' color='black' className='me-3'></Icon>
                            </Link> */}
                            Thông tin cá nhân
                        </div>
                        <img
                            src="../image/happy-corp-logo.png"
                            className=""
                            style={{ height: "30px" }}
                        />
                    </div>

                    {/* Avatar + Info */}
                    <div
                        className="position-absolute top-50 start-50 translate-middle text-center "
                        style={{ zIndex: 5 }}
                    >
                        <img
                            src={`https://api-happy.eclo.io/${avatar}`}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src =
                                    "https://img.freepik.com/premium-vector/people-profile-icon_24877-40758.jpg";
                            }}
                            className="rounded-circle border border-2 border-white shadow"
                            style={{
                                height: "150px",
                                width: "150px",
                                objectFit: "cover",
                                marginTop: "70px"
                            }}
                        />
                        <div className="mt-3 text-dark">
                            <div className="fs-5 fw-bold">{name}</div>
                            <div className=" fs-13">{email}</div>
                        </div>
                    </div>
                </div>

                <Card className='p-3 border border-1 m-2 m-15 bg-white rounded-3'>
                    <div className='fs-13 fw-bold'>Thông tin tài khoản</div>
                    <div className='px-2'>
                        <div className='d-flex justify-content-between align-items-center mt-3'>
                            <div className='fs-13 fw-bold'>Mã của bạn:</div>
                            <div className=''>#{code}</div>
                        </div>
                        <div className='d-flex justify-content-between align-items-center mt-3'>
                            <div className='fs-13 fw-bold'>Họ và tên:</div>
                            <div >{name}</div>
                        </div>
                        <div className='d-flex justify-content-between align-items-center mt-3'>
                            <div className='fs-13 fw-bold'>Số điện thoại:</div>
                            <div >{phone}</div>
                        </div>
                        <div className='d-flex justify-content-between align-items-center mt-3'>
                            <div className='fs-13 fw-bold'>Email:</div>
                            <div >{email}</div>
                        </div>
                        <div className='d-flex justify-content-between align-items-center mt-3'>
                            <div className='fs-13 fw-bold'>Tài khoản:</div>
                            <div >{account}</div>
                        </div>
                        <div className='d-flex justify-content-between align-items-center mt-3'>
                            <div className='fs-13 fw-bold'>Ngày sinh:</div>
                            <div >{formatDate(birthday)}</div>
                        </div>
                        <div className='d-flex justify-content-between align-items-center mt-3'>
                            <div className='fs-13 fw-bold'>Giới tính:</div>
                            <div >{gender}</div>
                        </div>
                        <div className='d-flex justify-content-between align-items-center mt-3'>
                            <div className='fs-13 fw-bold'>Ngày đăng ký:</div>
                            <div >{dateRegister}</div>
                        </div>
                    </div>

                </Card>
                <Card className='p-3 border border-1 rounded-3 m-2'>
                    <div className='d-flex align-items-center' fill sheetOpen=".sheet-changepassword" link>
                        <lord-icon
                                slot="media"
                                src="https://cdn.lordicon.com/exymduqj.json"
                                trigger="loop"
                                colors="primary:#1fc5f7,secondary:#1fc5f7"
                                style={{ width: '20px', height: '20px' }}
                            ></lord-icon>
                        <div className='fw-bold ms-3'>Đổi mật khẩu</div>
                    </div>
                     <div className='d-flex align-items-center mt-3' fill sheetOpen=".sheet-changeinfo" link>
                         <lord-icon
                                slot="media"
                                src="https://cdn.lordicon.com/fikcyfpp.json"
                                trigger="loop"
                                colors="primary:#1fc5f7,secondary:#1fc5f7"
                                style={{ width: '20px', height: '20px' }}
                            ></lord-icon>
                        <div className='fw-bold ms-3'>Cập nhật thông tin</div>
                    </div>
                </Card>

                <Card className='p-3 border border-1 rounded-3 m-2'>
                    <BlockTitle className='m-0 mb-3 text-white'>Mời bạn bè</BlockTitle>
                    <div className='row d-flex align-items-center'>
                        <div className='col-1'>
                            <div className='text-center bg-primary text-white rounded-circle' style={{ width: "20px", height: "20px" }}>1</div>
                            {/* <Chip text="1" color="blue"  /> */}
                        </div>
                        <div className='col-11'>
                            <Block className='m-0 p-0'>
                                <p>Bạn gửi liên kết lời mời của mình tới bạn bè.</p>
                            </Block>
                        </div>
                    </div>
                    <div className='row my-3  d-flex align-items-center'>
                        <div className='col-1'>
                            <div className='text-center bg-primary text-white rounded-circle' style={{ width: "20px", height: "20px" }}>2</div>
                        </div>
                        <div className='col-11'>
                            <Block className='m-0 p-0'>
                                <p>Họ đăng ký và đặt phòng bằng cách sử dụng liên kết giới thiệu của bạn.</p>
                            </Block>
                        </div>
                    </div>
                    <div className='row  d-flex align-items-center'>
                        <div className='col-1'>
                            <div className='text-center bg-primary text-white rounded-circle' style={{ width: "20px", height: "20px" }}>3</div>
                        </div>
                        <div className='col-11'>
                            <Block className='m-0 p-0'>
                                <p>Từ lần đặt phòng đầu tiên của họ, bạn sẽ bắt đầu sẽ hoa hồng.</p>
                            </Block>
                        </div>
                    </div>
                    <BlockTitle className='m-0 mt-3 fs-14 text-white'>Liên kết của bạn</BlockTitle>
                    <div className="m-2 mx-1  row border border-1 rounded-pill p-2 d-flex align-items-center " >
                        <div className='col-11 p-1 border border-0 text-truncate'>https://beta.ellm.io/?</div>

                        <div className='col-1 d-flex justify-content-end px-0' onClick={() => {
                            navigator.clipboard.writeText(`https://beta.ellm.io/?`);
                            alert("Coppy success");
                        }} >
                            <Icon f7="doc_on_doc" size='20px'></Icon>
                        </div>
                    </div>
                </Card>
            </Page>
            <Sheet
                className="sheet-changepassword h-auto"
                opened={sheetOpenedChangePass}
                onSheetClosed={() => {
                    setSheetOpenedChangePass(false);
                }}
            >
                <Toolbar style={{ backgroundColor: "red !important" }}>
                    <div className="left fs-14">Đổi mật khẩu</div>
                    <div className="right">
                        <Link sheetClose>Close</Link>
                    </div>
                </Toolbar>
                <PageContent>
                    <Block className='my-3 text-white'>
                        <List className='my-2'>
                            <div className='fs-14 mt-4'>Mật khẩu cũ</div>
                            <div className="position-relative rounded-pill mt-2 w-100" style={{ border: "0.5px solid #1fc5f7" }}>
                                <input value={passwordOld} onChange={(e) => { setPasswordOld(e.target.value) }}
                                    className="rounded-pill w-100 pe-5 px-3 text-white"
                                    placeholder="Mật khẩu"
                                    type={showPasswordold ? 'text' : 'password'}
                                />
                                <span
                                    onClick={() => setShowPasswordold(!showPasswordold)}
                                    style={{
                                        position: 'absolute',
                                        right: '10px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        cursor: 'pointer',
                                        color: '#666'

                                    }}
                                >
                                    {showPasswordold ? <span class="material-icons fs-6" >
                                        visibility
                                    </span> : <span class="material-icons fs-6">
                                        visibility_off
                                    </span>}
                                </span>
                            </div>
                            <div className='fs-14 mt-4'>Mật khẩu mới</div>
                            <div className="position-relative rounded-pill mt-2 w-100" style={{ border: "0.5px solid #1fc5f7" }}>
                                <input value={password} onChange={(e) => { setPassword(e.target.value) }}
                                    className="rounded-pill  w-100 pe-5 text-white px-3"
                                    placeholder="Mật khẩu"
                                    type={showPassword ? 'text' : 'password'}
                                />
                                <span
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{
                                        position: 'absolute',
                                        right: '10px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        cursor: 'pointer',
                                        color: '#666'

                                    }}
                                >
                                    {showPassword ? <span class="material-icons fs-6" >
                                        visibility
                                    </span> : <span class="material-icons fs-6">
                                        visibility_off
                                    </span>}
                                </span>
                            </div>
                            <div className='fs-14 mt-4'>Nhập lại mật khẩu</div>
                            <div className="position-relative rounded-pill mt-2 w-100" style={{ border: "0.5px solid #1fc5f7" }}>
                                <input value={passwordconfirm} onChange={(e) => { setPasswordconfirm(e.target.value) }}
                                    className="rounded-pill  w-100  text-white pe-5 px-3"
                                    placeholder="Mật khẩu"
                                    type={showRePassword ? 'text' : 'password'}
                                />
                                <span
                                    onClick={() => setShowRePassword(!showRePassword)}
                                    style={{
                                        position: 'absolute',
                                        right: '10px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        cursor: 'pointer',
                                        color: '#666'

                                    }}
                                >
                                    {showRePassword ? <span class="material-icons fs-6" >
                                        visibility
                                    </span> : <span class="material-icons fs-6">
                                        visibility_off
                                    </span>}
                                </span>
                            </div>
                            <div className='mt-4 grid grid-cols-2 grid-gap'>
                                <div>
                                    <button className='p-2 rounded-pill border border-secondary bg-transparent fs-14 text-white' onClick={() => { f7.sheet.close() }}>Hủy</button>
                                </div>
                                <div>
                                    <button type="button" className='p-2 rounded-pill border-btn fs-14 text-pink' onClick={() => { changePassword() }}>Cập nhật</button>
                                </div>
                            </div>
                        </List>
                    </Block>
                </PageContent>
            </Sheet>

            <Sheet
                className="sheet-changeinfo h-auto"
                opened={sheetOpenedChangeInfo}
                onSheetClosed={() => {
                    setSheetOpenedChangeInfo(false);
                }}
            >
                <Toolbar style={{ backgroundColor: "red !important" }}>
                    <div className="left fs-14">Cập nhật thông tin</div>
                    <div className="right">
                        <Link sheetClose>Close</Link>
                    </div>
                </Toolbar>
                <PageContent>
                    <Block className='my-3'>
                        <List className='my-2'>
                            <div className='fs-14 mt-4'>Họ và tên</div>
                            <input value={name} onChange={(e) => { setName(e.target.value) }} type='text' className='rounded-pill border-input mt-2 w-100' placeholder='Họ và tên'></input>
                            <div className='fs-14 mt-4'>Email</div>
                            <input value={email} onChange={(e) => { setemail(e.target.value) }} type='email' className='rounded-pill border-input mt-2 w-100' placeholder='Email'></input>
                            <div className='fs-14 mt-4'>Ngày sinh</div>
                            <input value={birthday} onChange={(e) => { setbirthday(e.target.value) }} type='date' className='rounded-pill border-input mt-2 w-100' placeholder='Ngày sinh'></input>
                            <div className='fs-14 mt-4'>Giới tính</div>
                            <select value={gender} onChange={(e) => { setgender(e.target.value) }} className='rounded-pill border-input mt-2 w-100 '>
                                <option value="1">Nữ</option>
                                <option value="2">Nam</option>
                            </select>
                            <div className='fs-14 mt-4'>Ảnh đại diện</div>

                            <Card className='m-1 mt-3 p-3'>
                                <div style={{ cursor: "pointer" }}>
                                    {updateAvatar ? (
                                        <div className="position-relative">
                                            <button
                                                className="btn bg-danger btn-sm position-absolute top-0 end-0 m-1 rounded-circle p-1"
                                                onClick={handleDeleteImageAddAvatar}
                                                style={{ width: "40px", height: "40px", zIndex: 2 }}
                                            >
                                                <Icon f7="trash" size="15px" color="white" />
                                            </button>
                                            <img
                                                src={updateAvatar}
                                                className="w-100 rounded-4 object-fit-cover"
                                                alt="avatar preview"
                                            />
                                        </div>
                                    ) : (
                                        <div
                                            className=""
                                            style={{ height: "160px", borderRadius: "10px" }}
                                            onClick={triggerFileInputAvatar}
                                        >
                                            <div className="d-flex justify-content-center">
                                                <Icon f7="cloud_upload" size="30px" />
                                            </div>
                                            <div className="d-flex fs-13 justify-content-center mt-3">Nhấn vào để tải hình ảnh của bạn lên</div>
                                        </div>
                                    )}

                                    {/* Input file ẩn */}
                                    <input
                                        ref={fileInputRef}
                                        id="fileInput"
                                        type="file"
                                        accept="image/*"
                                        // ref={fileInputRef}
                                        style={{ display: "none" }}
                                        onChange={handleImageAvatar}
                                    />
                                </div>
                            </Card>
                            <div className='mt-4 grid grid-cols-2 grid-gap'>
                                <div>
                                    <button className='p-2 rounded-pill border border-secondary bg-transparent fs-14 text-white' onClick={() => { f7.sheet.close() }}>Hủy</button>
                                </div>
                                <div>
                                    <button type="button" className='p-2 rounded-pill border-btn fs-14 text-white' onClick={() => { changeInfo() }}>Cập nhật</button>
                                </div>
                            </div>
                        </List>


                    </Block>
                </PageContent>
            </Sheet>
        </>

    );
}
export default AccountPage;