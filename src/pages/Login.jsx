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
    Views,
    View,
    Icon,
    Card,
    Sheet,
    PageContent,
    Popup,
    ListInput,
    f7,

} from 'framework7-react';
// import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const LoginPage = () => {

    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const ws = useRef < WebSocket | null > (null);
    const [idDevice, setIdDevice] = useState('')


    function login() {

        let id = localStorage.getItem('HappyCorp-id-device');
        if (!id) {
            id = uuidv4();

            console.log("id-device", 123 + id);
            setIdDevice(id);
            localStorage.setItem("HappyCorp-id-device", id)
        } else {
            setIdDevice(id);
        }
        const data = {
            "phone": phone,
            "password": password
        }
        console.log(123, data);

        const api = axios.create({
            baseURL: "https://api-happy.eclo.io/api",
        });
        api.post("/login", data, {
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => {
            if (res.data.status === "error") {
                console.log('lỗi');
                f7.dialog.alert(res.data.content, 'Error');

            } else if (res.data.status === "success") {
                console.log(res.data.data);
                brand(res.data.data.token)
                f7.dialog.alert(res.data.content, 'Success', () => {
                    console.log(123);
                    localStorage.setItem("HappyCorp-id-device", id)
                    localStorage.setItem("HappyCorp-token-app", res.data.data.token)
                    localStorage.setItem("HappyCorp-token-active", res.data.data.active)
                    localStorage.setItem("HappyCorp-token-phone", res.data.data.phone)
                    localStorage.setItem("HappyCorp-token-name", res.data.data.name)
                    localStorage.setItem("HappyCorp-token-avatar", res.data.data.avatar)
                    localStorage.setItem("HappyCorp-token-email", res.data.data.email)
                    localStorage.setItem("HappyCorp-id-account", res.data.data.id)
                    
                    window.location.href = '/';


                });
            }
        })
            .catch((error) => {
                f7.dialog.alert(error, 'Error');
                console.log("k ket noi dc api");

            });
    }
    const { t } = useTranslation();
    const [showPassword, setShowPassword] = useState(false);

    function brand(e) {
        const data = {
            "token": e,
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
                if (res.data.data.length > 0) {
                    const firstBrandId = res.data.data[0].id;
                    const firstBrandName = res.data.data[0].name;
                    localStorage.setItem("happyCorp_brand", firstBrandId);
                    localStorage.setItem("happyCorp_brand_name", firstBrandName);
                }
            }
        })
            .catch((error) => {
                f7.dialog.alert(error, 'Error');
                console.log("k ket noi dc api");
            });
    }


    return (
        <Page name="login">
            {/* Page content */}

            <div className='d-flex justify-content-center mb-4' style={{ marginTop: "20%" }}>
                <img src='../image/happy-corp-logo.png' className='w-50'></img>
            </div>


            <Card className=' p-4 m-4 border border-1 shadow-sm rounded-4'>
                <div className=' fs-2 text-center fw-bold'>ĐĂNG NHẬP</div>
                <List className='mt-4'>
                    <div className='fs-13 '>Số điện thoại</div>
                    <input value={phone} onChange={(e) => { setPhone(e.target.value) }}
                        className="rounded-3 bg-input mt-2 fs-13 w-100 p-2 text-dark" style={{ height: "40px" }}
                        placeholder="Số điện thoại"
                        type="tel"
                    ></input>
                    <div className='fs-13 mt-3'>Mật khẩu</div>
                    {/* <input className='rounded-3 mt-2 w-100' placeholder='Mật khẩu'></input> */}
                    <div className="position-relative rounded-3 mt-2 w-100 bg-input" style={{ height: "40px" }}>
                        <input value={password} onChange={(e) => { setPassword(e.target.value) }}
                            className="rounded-3 bg-input w-100 text-dark p-2"
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
                                color: 'white'

                            }}
                        >
                            {showPassword ? <span class="material-icons fs-6" >
                                visibility
                            </span> : <span class="material-icons fs-6">
                                visibility_off
                            </span>}
                        </span>
                    </div>

                </List>

                <div className='d-flex justify-content-between align-items-center fs-13 mt-3'>
                    <div className="form-check d-flex align-items-center">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"></input>
                        <label className="form-check-label mt-1 ms-2" htmlFor="flexCheckDefault">
                            Nhớ tài khoản
                        </label>
                    </div>
                    <Link className='text-pink fw-bold' href="/forgot-password/" data-view=".view-main">Quên mật khẩu </Link>
                </div>
                <Button className='p-4 rounded-pill bg-pink text-white text-center fs-15 my-4' onClick={() => { login() }}>Đăng nhập</Button>
                <div className='d-flex justify-content-between align-items-center fs-13 fw-bold '>
                    <div className=''>Bạn chưa có tài khoản</div>
                    <Link className='text-pink' href="/register/" data-view=".view-main">Đăng kí</Link>
                </div>




            </Card>

        </Page>
    );
};
export default LoginPage;