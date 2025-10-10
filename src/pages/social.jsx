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
    Popover,
    ListInput,
    f7
} from 'framework7-react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import CommonNavbar from '../components/CommonNavbar';
import PageTransition from '../components/PageTransition';

const SocialPage = () => {
    const { t } = useTranslation();
    const [sheetOpenedSuccess, setSheetOpenedSuccess] = useState(false);
    const [sheetOpenedEdit, setSheetOpenedEdit] = useState(false);
    const [sheetOpenComment, setSheetOpenComment] = useState(false);
    const [sheetOpenedDeleteSocial, setSheetOpenedDeleteSocial] = useState(false);
    const [sheetOpenedAdd, setSheetOpenedAdd] = useState(false);
  
    // const [images, setImages] = useState([]);

    // const [addimage, setaddimage] = useState([]);
    // const handleImageChange = (event) => {
    //     const files = Array.from(event.target.files); // Lấy danh sách file
    //     setaddimage((prevImages) => [...prevImages, ...files]);
    //     console.log(files);
    //     const newImages = [];
    //     files.forEach((file) => {
    //         const reader = new FileReader();
    //         reader.onload = (e) => {
    //             newImages.push(e.target.result);
    //             if (newImages.length === files.length) {
    //                 setImages((prev) => [...prev, ...newImages]); // Cập nhật state

    //             }
    //         };
    //         reader.readAsDataURL(file);
    //     });
    // };

    // const triggerFileInput = () => {
    //     document.getElementById("fileInput").click();
    // };

    // const handleDeleteImage = (index) => {
    //     setImages(images.filter((_, i) => i !== index));

    //     setaddimage(addimage.filter((_, i) => i !== index));

    // };

    // test

    const [media, setMedia] = useState([]); // [{ preview, file, type }]

    const handleImageChange = (event) => {
        const files = Array.from(event.target.files);
        const newMedia = [];

        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const type = file.type.startsWith("video") ? "video" : "image";
                newMedia.push({
                    preview: e.target.result,
                    file,
                    type,
                });

                if (newMedia.length === files.length) {
                    setMedia((prev) => [...prev, ...newMedia]);
                }
            };
            reader.readAsDataURL(file);
        });
    };

    const triggerFileInput = () => {
        document.getElementById("fileInput").click();
    };

    const handleDeleteMedia = (index) => {
        setMedia((prev) => prev.filter((_, i) => i !== index));
    };

    //upload audio

    const [audioFile, setAudioFile] = useState(null);
    const [audioadd, setAudioAdd] = useState("");
    const handleAudioChange = (event) => {
        const file = event.target.files[0]; // Lấy file đầu tiên
        setAudioAdd(file)
        if (file && file.type.startsWith("audio/")) {
            setAudioFile(URL.createObjectURL(file)); // Tạo URL để phát file
        } else {
            alert("Vui lòng chọn một tệp âm thanh hợp lệ!");
        }
    };

    const handleDeleteAudio = () => {
        setAudioFile(null); // Xóa file đã chọn
        setAudioAdd("")
    };

    const triggerFileInputAudio = () => {
        document.getElementById("audioInput").click();
    };

    const uid_account = localStorage.getItem("ELLM-uid");

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState("");
    const token = localStorage.getItem("ELLM-token");
    const language = localStorage.getItem("ELLM_language");
    const [socials, setSocials] = useState([]);
    useEffect(() => {
        const name = localStorage.getItem("ELLM-name");
        const email = localStorage.getItem("ELLM-email");
        const avatar = localStorage.getItem("ELLM-avatar");
        { name && setName(name) }
        { email && setEmail(email) }
        { avatar && setAvatar(avatar) }
        getSocials();


    }, [])
    function getSocials() {
        const data = {
            "token": token,
            "lang": language
        }

        const api = axios.create({
            baseURL: "https://beta.ellm.io/api",
        });
        api.post("/socials", data, {
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
                setSocials(res.data.data)

            }
        })
            .catch((error) => {
                f7.dialog.alert(res.data.content, 'Error');
                console.log("k ket noi dc api");

            });
    }
    const [selectedContent, setSelectedContent] = useState("");
    const [sheetOpenedDetailImage, setSheetOpenedDetailImage] = useState(false);

    const [selectImage, setSelectImage] = useState("");

    const handleClick = (content, index) => {
        setSelectedContent(content, index);
        setSelectImage(index)
        console.log("Nội dung đã chọn:", index);
        social_id(content.active);
        setSheetOpenedDetailImage(true);
    };

    const [selectTypePost, setSelectTypePost] = useState("");

    //Kết nối websocket
    const ws = useRef(null);
    const [connectionOpen, setConnectionOpen] = useState(false);

    useEffect(() => {
        const id_device = (localStorage.getItem("ELLM-id-device") || "default-protocol").trim();
        // Kết nối WebSocket không có tham số trên URL
        ws.current = new WebSocket("wss://wsa.ellm.io/", id_device);
        ws.current.onopen = () => {
            console.log("Connection Opened", id_device);
            setConnectionOpen(true);
        };
        ws.current.binaryType = "arraybuffer";
        ws.current.onmessage = async (event) => {
            if (event.data instanceof ArrayBuffer) {
                const text = await event.data;
                var string = new TextDecoder().decode(text);
                var decrypted = encrypt(string, 'd');
                // var decrypted = JSON.parse(decrypted.replace(/^[^{]+/, ""));
                if (isObject(decrypted)) {
                    decrypted = decrypted;
                }
                else if (isJson(decrypted)) {
                    decrypted = JSON.parse(decrypted);
                }
                else {
                    var decrypted = decrypted.replace(/\\/g, "");
                    if (isJson(decrypted)) {
                        decrypted = JSON.parse(decrypted);
                    }
                }
                var datas = decrypted;
                console.log(datas);
                if (datas.router == 'ping') {
                    console.log(datas);
                } else if (JSON.parse(datas).status == "success") {
                    console.log("du lieu socket tra ve", JSON.parse(datas));
                    if (JSON.parse(datas).router == "social-like") {

                        setSocials(prev =>
                            prev.map(social => {
                                if (social.active === JSON.parse(datas).data.social) {
                                    const isLiked = JSON.parse(datas).data.like === 1;
                                    const newLikeCount = isLiked ? social.like + 1 : social.like - 1;
                                    setAcc_like_social(JSON.parse(datas).data.like)
                                    return {
                                        ...social,
                                        accountlike: JSON.parse(datas).data.like,
                                        like: Math.max(newLikeCount, 0), // để tránh số âm
                                    };
                                }
                                return social;
                            })
                        );
                    } else {
                        setListComment(prevMessage => [...prevMessage, JSON.parse(datas).data]);
                        setContent("");
                        setSocials(prev =>
                            prev.map(social => {
                                if (social.active === JSON.parse(datas).data.social) {
                                    const newCommentCount = social.comment + 1;
                                    return {
                                        ...social,
                                        comment: Math.max(newCommentCount, 0), // để tránh số âm
                                    };
                                }
                                return social;
                            })
                        );


                    }

                }

            } else {
                console.log("Received non-Blob message:", event.data);
            }
        };
        ws.current.onerror = (error) => {
            console.error("WebSocket Error", error);
        };
        ws.current.onclose = (event) => {
            console.log("Connection Closed", event.code, event.reason);
            setConnectionOpen(false);
        };
        return () => {
            console.log("Cleaning up...");
            if (ws.current && ws.current.readyState === WebSocket.OPEN) {
                ws.current.close();
            }
        };
    }, []);

    function encrypt(getdata, type) {
        try {
            const { SHA256, enc, AES } = CryptoJS;

            const secret_iv = type === 'e' ? makeid(16) : getdata.substring(0, 16);
            const active = localStorage.getItem("ELLM-id-device") || "default-secret-key";

            const encryptedText = getdata.slice(16);

            // 🛠 Fix lỗi enc.Hex → enc.Utf8
            const key = SHA256(active).toString(enc.Hex).substring(0, 32);
            const iv = SHA256(secret_iv).toString(enc.Hex).substring(0, 16);


            let crypted;

            if (type === 'e') {
                crypted = secret_iv + AES.encrypt(getdata, enc.Utf8.parse(key), { iv: enc.Utf8.parse(iv) }).toString();
            } else {
                if (!encryptedText || encryptedText.length < 1) {
                    console.error("❌ Dữ liệu mã hóa không hợp lệ.");
                    return null;
                }

                crypted = AES.decrypt(encryptedText, enc.Utf8.parse(key), { iv: enc.Utf8.parse(iv) }).toString(enc.Utf8);
                // console.log("decrypt", crypted)
                if (!crypted) {
                    console.error("❌ Giải mã thất bại.");
                    return null;
                }
            }
            return crypted;
        } catch (error) {
            console.error("❌ Encryption/Decryption error:", error);
            return null;
        }
    }

    function makeid(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    function uintToString(uintArray) {
        var encodedString = String.fromCharCode.apply(null, uintArray);
        return decodeURIComponent(escape(atob(encodedString)));
    }
    function ArrayBufferToString(buffer) {
        return BinaryToString(String.fromCharCode.apply(null, new Uint8Array(buffer)));
    }
    function StringToArrayBuffer(string) {
        return new Uint8Array(StringToUint8Array(string)).buffer;
    }
    function BinaryToString(binary) {
        try {
            return decodeURIComponent(escape(binary));
        } catch (error) {
            if (error instanceof URIError) {
                return binary;
            } else {
                throw error;
            }
        }
    }
    function StringToBinary(string) {
        var chars = [];
        for (var i = 0; i < string.length; i++) {
            chars.push(string.charCodeAt(i) & 0xFF);
        }
        return String.fromCharCode.apply(null, new Uint8Array(chars));
    }
    function StringToUint8Array(string) {
        var chars = [];
        for (var i = 0; i < string.length; i++) {
            chars.push(string.charCodeAt(i));
        }
        return new Uint8Array(chars);
    }
    function isObject(value) {
        return value && typeof value === "object" && value.constructor === Object;
    }

    function isJson(str) {
        try {
            JSON.parse(str);
            return true;
        } catch (e) {
            return false;
        }
    }
    //Like

    function LikeSocial(active, like) {
        var id_device = localStorage.getItem("ELLM-id-device");
        var token = localStorage.getItem("ELLM-token");

        console.log("nhận onclick", active, like)
        if (ws.current) {

            const a = {
                "content": "like",
                "like": like,
                "social": active,
            }

            const data = {
                "code": "send",
                // "message": active,
                "router": "social-like",
                "sender": id_device, //cần lấy id thiết bị
                "token": token,
                "data": a,
                "stream": "true"
            }

            console.log("data send", data);
            // setMessage((_message) => [..._message, data]);
            var encrypted = encrypt(JSON.stringify(data), 'e');
            console.log('Send Socket', encrypted);
            ws.current.send(StringToArrayBuffer(encrypted));


        }
    }
    const [social_view, setSocial_view] = useState("");
    const [acc_social_view, setacc_social_view] = useState("");
    const [data_social_view, setdata_social_view] = useState([]);
    const [acc_like_social, setAcc_like_social] = useState();

    const [contentUpdate, setContentUpdate] = useState("");
    const [accessUpdate, setAccessUpdate] = useState();
    const [typeUpdate, setTypeUpdate] = useState("");
    const [audioUpdate, setAudioUpdate] = useState("");
    const [imageUpdate, setImageUpdate] = useState([]);
    function social_id(e) {
        console.log(e);
        localStorage.setItem("ELLM_social_view", e)
        const data = {
            "token": token,
            "active": e
        }

        const api = axios.create({
            baseURL: "https://beta.ellm.io/api",
        });
        api.post("/social-view", data, {
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer 123123ellm',
            },
        }).then((res) => {
            if (res.data.status === "error") {
                console.log('lỗi');
                f7.dialog.alert(res.data.content, 'Error');

            } else if (res.data.status === "success") {
                console.log(123, res.data.data.acc);

                setComment(res.data.data.acc.comment)
                setacc_social_view(res.data.data.acc)
                setdata_social_view(res.data.data.selectData)
                setSocial_view(res.data.data.social)
                setListComment(res.data.comment)
                setAcc_like_social(res.data.accountlike)
                console.log("content", res.data.data.social.content);
                //dùng để chỉnh sửa
                setContentUpdate(res.data.data.social.content);
                setAccessUpdate(res.data.data.social.access);
                setTypeUpdate(res.data.data.social.type)

                if (res.data.data.social.type == 'images') {
                    setImageUpdate(res.data.data.selectData)
                    console.log(res.data.data.selectData);
                }
                if (res.data.data.social.type == 'audio') {
                    setAudioUpdate(res.data.data.selectData[0])
                    console.log(res.data.data.selectData);
                }



            }
        })
            .catch((error) => {
                console.log("k ket noi dc api");

            });
    }
    //Comment
    const [content, setContent] = useState("");
    const [comment, setComment] = useState();

    const [listComment, setListComment] = useState([]);
    function CommentSocial() {
        var id_device = localStorage.getItem("ELLM-id-device");
        var token = localStorage.getItem("ELLM-token");

        var active_social = localStorage.getItem("ELLM_social_view");

        if (ws.current && content) {

            const a = {
                "content": content,
                "comment": comment ? comment : 0,
                "social": active_social,
                "date": "Just Now",
            }

            const data = {
                "code": "send",
                // "message": active,
                "router": "social-comments",
                "sender": id_device, //cần lấy id thiết bị
                "token": token,
                "data": a,
                "stream": "true"
            }

            console.log("data send", data);
            // setMessage((_message) => [..._message, data]);
            var encrypted = encrypt(JSON.stringify(data), 'e');
            console.log('Send Socket', encrypted);
            ws.current.send(StringToArrayBuffer(encrypted));
        }
    }

    //delete comment
    function deleteComment(e) {
        console.log(e);
        const data = {
            "token": token,
            "active": e
        }

        const api = axios.create({
            baseURL: "https://beta.ellm.io/api",
        });
        api.post("/social-deletecomment", data, {
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer 123123ellm',
            },
        }).then((res) => {
            if (res.data.status === "error") {
                console.log('lỗi');
                f7.dialog.alert(res.data.content, 'Error');

            } else if (res.data.status === "success") {
                console.log(123, res.data);
                f7.dialog.alert(res.data.content, 'Success', () => {
                    setListComment(prev =>
                        prev.filter(comment => comment.active !== e)
                    );

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

    const [contentAdd, setContentAdd] = useState("");
    const [access, setAccess] = useState("");
    const [type, setType] = useState("");

    // Add new post
    function handleAddPost() {
        var token = localStorage.getItem("ELLM-token");


        let formData = new FormData();
        formData.append("token", token);
        formData.append("content", contentAdd);
        formData.append("access", access);
        formData.append("type", type);

        formData.append("voice", audioadd);
        if (addimage.length > 0) {
            addimage.forEach((file) => {
                formData.append("images[]", file); // Đảm bảo gửi từng file riêng lẻ
            });

        }
        for (let pair of formData.entries()) {
            console.log(pair[0], pair[1].name); // In tên file để kiểm tra
        }

        const api = axios.create({
            baseURL: "https://beta.ellm.io/api",
        });

        api.post("/social-add", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                'Authorization': 'Bearer 123123ellm',
            },
        }).then((res) => {
            if (res.data.status === "error") {
                console.log('lỗi');
                console.log(res.data.content);
                f7.dialog.alert(res.data.content, 'Error');

            } else if (res.data.status === "success") {
                console.log(res.data);
                f7.dialog.alert(res.data.content, 'Success', () => {
                    f7.sheet.close();
                    setContentAdd("");
                    setImages([]);
                    setaddimage([]);
                    setAudioAdd("")
                    getSocials();
                }
                )
            }
        })
            .catch((error) => {
                f7.dialog.alert(res.data.content, 'Error');
                console.log("k ket noi dc api:", error);
            });
    }

    const [selectActive, setSelectActive] = useState("");
    const [selectuidSocial, setSelectuidSocial] = useState("");
    const [selectSaveSocial, setSelectSaveSocial] = useState(0);
    const getActive = (active, uid, save) => {
        setSelectActive(active);
        console.log("active", active);
        setSelectuidSocial(uid);
        setSelectSaveSocial(save);
        localStorage.getItem("ELLM_active_social", active)
    }
    //Xóa social
    function DeleteSocial() {
        const data = {
            "token": token,
            "active": selectActive
        }
        const api = axios.create({
            baseURL: "https://beta.ellm.io/api",
        });
        api.post("/social-delete", data, {
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
                    f7.sheet.close();
                    getSocials();
                });
            }
        })
            .catch((error) => {
                f7.dialog.alert(res.data.content, 'Error');
                console.log("k ket noi dc api");
            });
    }

    //Update Social
    const handleImageChangeUpdate = (e) => {
        const files = Array.from(e.target.files);
        console.log("hình được chọn", files);

        const newImages = [];
        let loadedCount = 0;

        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                newImages.push({
                    file: file,
                    preview: event.target.result, // base64
                    id: ""
                });

                loadedCount++;
                if (loadedCount === files.length) {
                    setImageUpdate((prev) => [...prev, ...newImages]);
                }
            };
            reader.readAsDataURL(file);
        });
    };

    const handleDeleteImageUpdate = (indexToRemove) => {
        setImageUpdate((prev) =>
            prev.filter((_, index) => index !== indexToRemove)
        );
    };

    const triggerFileInputUpdate = () => {
        document.getElementById("fileInputUpdate").click();
    };

    const [audioFileUpdate, setAudioFileUpdate] = useState(null);
    const handleAudioChangeUpdate = (event) => {
        const file = event.target.files[0]; // Lấy file đầu tiên
        console.log(file);

        setAudioFileUpdate(file)
        if (file && file.type.startsWith("audio/")) {
            const reader = new FileReader();

            reader.onload = (e) => {
                const base64Audio = e.target.result;

                const audioObj = {
                    file: file,
                    preview: base64Audio, // base64 để phát
                    id: "" // âm thanh mới chưa có id
                };

                setAudioUpdate(audioObj);
            };

            reader.readAsDataURL(file); // Đọc thành base64
        } else {
            alert("Vui lòng chọn một tệp âm thanh hợp lệ!");
        }
    };

    const handleDeleteAudioUpdate = () => {
        setAudioFileUpdate(""); // Xóa file đã chọn
        setAudioUpdate("")
    };

    const triggerFileInputAudioUpdate = () => {
        document.getElementById("audioInput").click();
    };

    function updateSocial() {
        console.log(imageUpdate);
        var token = localStorage.getItem("ELLM-token");


        let formData = new FormData();
        formData.append("token", token);
        formData.append("active", selectActive);
        formData.append("content", contentUpdate);
        formData.append("access", accessUpdate);
        formData.append("type", typeUpdate);
        if (audioFileUpdate) {
            formData.append("voice", audioFileUpdate);
        }
        if (imageUpdate.length > 0) {
            imageUpdate.forEach((file) => {
                if (file.file) {
                    formData.append("images[]", file.file);
                } else {
                    formData.append("images_id[]", file.id);

                }
            });
        }
        for (let pair of formData.entries()) {
            console.log(pair[0], pair[1].name); // In tên file để kiểm tra
        }

        const api = axios.create({
            baseURL: "https://beta.ellm.io/api",
        });

        api.post("/social-update", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                'Authorization': 'Bearer 123123ellm',
            },
        }).then((res) => {
            if (res.data.status === "error") {
                console.log('lỗi');
                console.log(res.data.content);
                f7.dialog.alert(res.data.content, 'Error');

            } else if (res.data.status === "success") {
                console.log(res.data);
                f7.dialog.alert(res.data.content, 'Success', () => {
                    f7.sheet.close();
                    setAudioFileUpdate("");

                    getSocials();
                }
                )
            }
        })
            .catch((error) => {
                f7.dialog.alert(res.data.content, 'Error');
                console.log("k ket noi dc api:", error);
            });

    }

    //Ân bài viết
    function socialHide() {
        const data = {
            "token": token,
            "active": selectActive
        }
        console.log(123, data);

        const api = axios.create({
            baseURL: "https://beta.ellm.io/api",
        });
        api.post("/social-hide", data, {
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
                f7.dialog.alert(res.data.content, 'Success', () => {
                    console.log(123);
                    getSocials();
                });
            }
        })
            .catch((error) => {
                f7.dialog.alert(res.data.content, 'Error');
                console.log("k ket noi dc api");

            });
    }

    //Lưu bài viết
    function socialSave() {
        const data = {
            "token": token,
            "active": selectActive
        }
        console.log(123, data);

        const api = axios.create({
            baseURL: "https://beta.ellm.io/api",
        });
        api.post("/social-save", data, {
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
                f7.dialog.alert(res.data.content, 'Success', () => {
                    console.log(123);
                    getSocials();
                });
            }
        })
            .catch((error) => {
                f7.dialog.alert(res.data.content, 'Error');
                console.log("k ket noi dc api");

            });
    }


    // xem video
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlay = () => {
        if (!videoRef.current) return;

        if (isPlaying) {
            videoRef.current.pause();
            setIsPlaying(false);
        } else {
            videoRef.current.play();
            setIsPlaying(true);
        }
    };

    const viewSocial = {
        "avatar": "https://www.in.pro.vn/wp-content/uploads/2025/01/avatar-nu-diu-dang.webp",
        "access": "1",
        "name": "Thanh Thúy",
        "date": "31/07/2025",
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "images": ["https://media.macphun.com/img/uploads/customer/how-to/608/15542038745ca344e267fb80.28757312.jpg?q=85&w=1340", "https://images.pexels.com/photos/1194775/pexels-photo-1194775.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"],
        "video": "https://www.w3schools.com/html/mov_bbb.mp4",
        "like": 1,
        "comment": 2,
        "share": 0,
        "comments": [
            {
                "avatar": "https://www.in.pro.vn/wp-content/uploads/2025/01/avatar-nu-diu-dang.webp",
                "name": "Nguyễn Văn A",
                "date": "31/07/2025",
                "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            }
        ]
    }

    const textComment = [
        {
            "avatar": "https://www.in.pro.vn/wp-content/uploads/2025/01/avatar-nu-diu-dang.webp",
            "account": "Nguyễn Văn A",
            "date": "31/07/2025",
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            "active": "1234567890",
        },
        {
            "avatar": "https://www.in.pro.vn/wp-content/uploads/2025/01/avatar-nu-diu-dang.webp",
            "account": "Nguyễn Văn A",
            "date": "31/07/2025",
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            "active": "1234567890",
        },
        {
            "avatar": "https://www.in.pro.vn/wp-content/uploads/2025/01/avatar-nu-diu-dang.webp",
            "account": "Nguyễn Văn A",
            "date": "31/07/2025",
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            "active": "1234567890",
        },
        {
            "avatar": "https://www.in.pro.vn/wp-content/uploads/2025/01/avatar-nu-diu-dang.webp",
            "account": "Nguyễn Văn A",
            "date": "31/07/2025",
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            "active": "1234567890",
        },
        {
            "avatar": "https://www.in.pro.vn/wp-content/uploads/2025/01/avatar-nu-diu-dang.webp",
            "account": "Nguyễn Văn A",
            "date": "31/07/2025",
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            "active": "1234567890",
        },
        {
            "avatar": "https://www.in.pro.vn/wp-content/uploads/2025/01/avatar-nu-diu-dang.webp",
            "account": "Nguyễn Văn A",
            "date": "31/07/2025",
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            "active": "1234567890",
        },
        {
            "avatar": "https://www.in.pro.vn/wp-content/uploads/2025/01/avatar-nu-diu-dang.webp",
            "account": "Nguyễn Văn A",
            "date": "31/07/2025",
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            "active": "1234567890",
        },
        {
            "avatar": "https://www.in.pro.vn/wp-content/uploads/2025/01/avatar-nu-diu-dang.webp",
            "account": "Nguyễn Văn A",
            "date": "31/07/2025",
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            "active": "1234567890",
        }
    ]

    const [expanded, setExpanded] = useState(false);

    const [liked, setLiked] = useState(false);
    return (
        <>
            <Page name="social" >
                <CommonNavbar />

                {/* Page content */}
                <div className='pb-2 pt-0 bg-social'>
                    <Card className='m-0 p-3 pb-2 rounded-0 border border-0' style={{backgroundColor:"#292489"}}>
                        <div className='row d-flex align-items-center'>
                            <div className='col-8'>
                                <div className='d-flex align-items-center'>
                                    <Link fill popoverOpen=".popover-menu-social">
                                        <img src="https://www.in.pro.vn/wp-content/uploads/2025/01/avatar-nu-diu-dang.webp" className='rounded-circle' style={{ width: "40px", height: "40px" }}></img>
                                    </Link>
                                    <Link fill popupOpen="#add-social">
                                        <span className='fst-italic  ms-3'>Bạn đang nghĩ gì?</span>
                                    </Link>
                                </div>
                            </div>
                            <div className='col-4 text-end'>
                                <Link className='d-flex align-items-center justify-content-end align-items-center' fill popupOpen="#add-social">
                                    <lord-icon
                                        src="https://cdn.lordicon.com/wsaaegar.json"
                                        trigger="loop"
                                        colors="primary:#1fc5f7,secondary:#1fc5f7"
                                        className=' me-2'
                                        style={{ width: '30px', height: '30px' }}>
                                    </lord-icon>
                                </Link>
                            </div>
                        </div>
                    </Card>
                    <Card className='m-0 mt-1 p-0 rounded-0 border border-0' style={{backgroundColor:"#292489"}}>
                        <div className='d-flex align-items-center justify-content-between p-3 pb-1'>
                            <div className='d-flex align-items-center'>
                                <img src="https://www.in.pro.vn/wp-content/uploads/2025/01/avatar-nu-diu-dang.webp" onClick={() => { profile_social(socials.account.uid) }} className='rounded-circle' style={{ width: "40px", height: "40px" }}></img>
                                <span className=' ms-2 fs-13'>
                                    <span className='fw-bold'> Thanh Thúy</span>
                                    <div className='fs-11 text-secondary mt-1'>31/07/2025
                                    </div>
                                </span>
                            </div>
                            <div className='d-flex align-items-center'>
                                <Button fill popoverOpen=".popover-menu" className='rounded-circle bg-transparent p-1 text-center me-2' style={{ width: "30px", height: "30px" }}> <Icon f7="ellipsis" size="20px" ></Icon></Button>
                                <Button fill popoverOpen=".popover-menu" className='rounded-circle bg-transparent p-1 text-center' style={{ width: "30px", height: "30px" }}> <Icon f7="xmark" size="20px" ></Icon></Button>
                            </div>
                        </div>
                        <div className="p-2 px-3">
                            <div
                                className={`fs-13 ${expanded ? "" : "line-clamp"}`}
                                style={{
                                    overflow: "hidden",
                                    display: "-webkit-box",
                                    WebkitLineClamp: expanded ? "unset" : 3, // số dòng
                                    WebkitBoxOrient: "vertical"
                                }}
                            >
                                Happy Corp tiên phong trong việc kiến tạo các điểm đến giải trí mang phong cách Nightlife, nơi hội tụ không gian sáng tạo, dịch vụ tinh tế và trải nghiệm phong cachs sống hiện đại, nhằm mang đến giá trị khác biệt cho khách hàng.
                            </div>

                            <button
                                className="btn btn-link p-0 text-start fs-13"
                                onClick={() => setExpanded(!expanded)}
                            >
                                {expanded ? "Thu gọn" : "Xem thêm"}
                            </button>
                        </div>
                        <div className='grid grid-cols-2'>
                            <div className=' p-0'>
                                <img src='https://media.macphun.com/img/uploads/customer/how-to/608/15542038745ca344e267fb80.28757312.jpg?q=85&w=1340' className='w-100'></img>
                            </div>
                            <div className=' p-0'>
                                <img src='https://images.pexels.com/photos/1194775/pexels-photo-1194775.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' className='w-100'></img>
                            </div>
                        </div>
                        <div className='d-flex justify-content-between align-items-center fs-13 p-2 px-3'>
                            <div className='d-flex align-items-center'>
                                <Icon f7="hand_thumbsup_fill" size="20px" color='blue' className='me-1'></Icon> 12
                            </div>
                            <div className='d-flex align-items-center'>
                                12 Bình luận  <span className='ms-2'>2 lượt chia sẻ</span>
                            </div>
                        </div>
                        <div className='row w-100 my-3 d-flex align-items-center'>
                            <div className='col-4 d-flex justify-content-center'>
                                <div className='d-flex align-items-center'>
                                    <div onClick={() => setLiked(!liked)} style={{ cursor: "pointer" }}>
                                        {liked ? (
                                            <Icon
                                                f7="hand_thumbsup_fill"
                                                size="20px"
                                                className="me-1 color-icon"
                                            />
                                        ) : (
                                            <Icon
                                                f7="hand_thumbsup"
                                                size="20px"
                                                className="me-1 color-icon"
                                            />
                                        )}
                                    </div>
                                    Like
                                </div>
                            </div>
                            <div className='col-4 text-center'>
                                <Link fill popupOpen="#comment-social">
                                    <Icon f7="chat_bubble" size="20px" className="me-1 color-icon"></Icon>
                                    Comment
                                </Link>
                            </div>
                            <div className='col-4 text-center'>
                                <div>
                                    <Icon f7="arrowshape_turn_up_right" size="20px" className="me-1 color-icon"></Icon>
                                    Share
                                </div>
                            </div>
                        </div>


                    </Card>
                    <Card className='m-0 mt-1 p-0 rounded-0 border border-0' style={{backgroundColor:"#292489"}}>
                        <div className='d-flex align-items-center justify-content-between p-3 pb-1'>
                            <div className='d-flex align-items-center'>
                                <img src="https://www.in.pro.vn/wp-content/uploads/2025/01/avatar-nu-diu-dang.webp" onClick={() => { profile_social(socials.account.uid) }} className='rounded-circle' style={{ width: "40px", height: "40px" }}></img>
                                <span className=' ms-2 fs-13'>
                                    <span className='fw-bold'> Thanh Thúy</span>
                                    <div className='fs-11 text-secondary mt-1'>31/07/2025
                                    </div>
                                </span>
                            </div>
                            <div className='d-flex align-items-center'>
                                <Button fill popoverOpen=".popover-menu" className='rounded-circle bg-transparent p-1 text-center me-2' style={{ width: "30px", height: "30px" }}> <Icon f7="ellipsis" size="20px" ></Icon></Button>
                                <Button fill popoverOpen=".popover-menu" className='rounded-circle bg-transparent p-1 text-center' style={{ width: "30px", height: "30px" }}> <Icon f7="xmark" size="20px" ></Icon></Button>
                            </div>
                        </div>
                        <div className="p-2 px-3">
                            <div
                                className={`fs-13 ${expanded ? "" : "line-clamp"}`}
                                style={{
                                    overflow: "hidden",
                                    display: "-webkit-box",
                                    WebkitLineClamp: expanded ? "unset" : 3, // số dòng
                                    WebkitBoxOrient: "vertical"
                                }}
                            >
                                Happy Corp tiên phong trong việc kiến tạo các điểm đến giải trí mang phong cách Nightlife, nơi hội tụ không gian sáng tạo, dịch vụ tinh tế và trải nghiệm phong cachs sống hiện đại, nhằm mang đến giá trị khác biệt cho khách hàng.
                            </div>

                            <button
                                className="btn btn-link p-0 text-start fs-13"
                                onClick={() => setExpanded(!expanded)}
                            >
                                {expanded ? "Thu gọn" : "Xem thêm"}
                            </button>
                        </div>
                        <div className='grid grid-cols-2'>
                            <div className=' p-0'>
                                <img src='https://media.macphun.com/img/uploads/customer/how-to/608/15542038745ca344e267fb80.28757312.jpg?q=85&w=1340' className='w-100'></img>
                            </div>
                            <div className=' p-0'>
                                <img src='https://images.pexels.com/photos/1194775/pexels-photo-1194775.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' className='w-100'></img>
                            </div>
                        </div>

                        <div className='d-flex justify-content-between align-items-center fs-13 p-2 px-3'>
                            <div className='d-flex align-items-center'>
                                <Icon f7="hand_thumbsup_fill" size="20px" color='blue' className='me-1'></Icon> 12
                            </div>
                            <div className='d-flex align-items-center'>
                                12 Bình luận
                            </div>
                        </div>
                        <div className='row w-100 my-2 d-flex align-items-center'>
                            <div className='col-4 d-flex justify-content-center'>
                                <div className='d-flex align-items-center'>
                                    <div onClick={() => setLiked(!liked)} style={{ cursor: "pointer" }}>
                                        {liked ? (
                                            <Icon
                                                f7="hand_thumbsup_fill"
                                                size="20px"
                                                className="me-1 color-icon"
                                            />
                                        ) : (
                                            <Icon
                                                f7="hand_thumbsup"
                                                size="20px"
                                                className="me-1 color-icon"
                                            />
                                        )}
                                    </div>
                                    Like
                                </div>
                            </div>
                            <div className='col-4 text-center'>
                                <Link fill popupOpen="#comment-social">
                                    <Icon f7="chat_bubble" size="20px" className="me-1 color-icon"></Icon>
                                    Comment
                                </Link>
                            </div>
                            <div className='col-4 text-center'>
                                <div>
                                    <Icon f7="arrowshape_turn_up_right" size="20px" className="me-1 color-icon"></Icon>
                                    Share
                                </div>
                            </div>
                        </div>
                    </Card>



                </div>
                {/* success  */}



            </Page>
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

                <PageContent className='py-4 text-center '>
                    <img src='../img/icons8-success.gif' className=''></img>
                    <div className='fs-2' style={{ fontWeight: "300" }}>Success</div>
                    <div className='fs-14  my-2'>Đã lưu thành công</div>
                    <div className='d-flex justify-content-center'>
                        <Button className='bg-success   fs-15  rounded-pill w-50' style={{ padding: "22px" }} sheetClose>OK</Button>
                    </div>
                </PageContent>
            </Sheet>

            {/* Detail Image  */}
            <Popup id="add-social">
                <View>
                    <Page>
                        <Navbar title="Thêm bài viết">
                            <NavRight>
                                <Link popupClose>Close</Link>
                            </NavRight>
                        </Navbar>
                        <List className='mt-3 mb-4 px-2'>
                            <div className='px-3 mb-2'>
                                {selectedContent.content}
                            </div>

                            <div id="carouselExampleControls0" className="carousel slide my-5" data-bs-ride="carousel">
                                <div className="carousel-inner">
                                    {selectedContent && selectedContent.data.map((image, index) => (
                                        <div key={index} className={`carousel-item ${index === selectImage ? "active" : ""}`}>
                                            <img src={`https://beta.ellm.io/${image.data}`} className="d-block w-100" alt="..."></img>
                                        </div>
                                    ))}
                                </div>

                                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls0" data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls0" data-bs-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </button>
                            </div>

                            <div className='row mx-0 py-2 border-top border-bottom fs-14 mb-3'>
                                <div className='col-4 text-center' onClick={() => { LikeSocial(social_view.active, social_view.like) }}>
                                    {acc_like_social == 1 ?
                                        <Icon f7="heart_fill" size="20px" className='me-1' color='red'></Icon>
                                        :
                                        <Icon f7="heart" size="20px" className='me-1'></Icon>
                                    }

                                    {t("like")}
                                </div>

                                <div className='col-4 text-center px-0 ' >
                                    <Icon f7="chat_bubble" size="20px" className='me-1'></Icon>
                                    {social_view.comment} {t("comment")}
                                </div>
                                <div className='col-4 text-center'>
                                    <Icon f7="arrowshape_turn_up_right" size="20px" className='me-1'></Icon>
                                    {t("share")}
                                </div>
                            </div>

                            <div className='px-2' style={{ marginBottom: "70px" }}>
                                {listComment && listComment.map((cmt) => {
                                    return (
                                        <>
                                            <div className='row mt-3'>
                                                <div className='col-2'>
                                                    <img src={`https://beta.ellm.io/${cmt.avatar}`} className='w-100 rounded-circle'></img>
                                                </div>
                                                <div className='col-10 ps-0'>
                                                    <div className='d-flex align-items-center justify-content-between'>
                                                        <div className='fs-15'>{cmt.account} <span className='fs-12 text-muted ms-2'> {cmt.date}</span></div>
                                                        {cmt.id_account == acc_social_view.id ?
                                                            <div className='fs-12 d-flex align-items-center' onClick={() => { deleteComment(cmt.active) }}><Icon f7='trash' color='red' size="16px" className='me-1'></Icon>Xóa</div>
                                                            :
                                                            <div></div>
                                                        }

                                                    </div>
                                                    <div className='mt-1'>
                                                        <div className='w-100 rounded-3 border border-1  fs-15 p-2'>
                                                            {cmt.content}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )
                                })}
                            </div>
                            <Card className='p-0 m-0 mt-4 mx-1 ' style={{
                                backgroundColor: "rgba(52, 58, 64)",
                                position: "fixed",
                                bottom: 0,
                                left: 0,
                                right: 0,
                                zIndex: 1000, // đảm bảo nổi lên trên
                                borderTopLeftRadius: "1rem",
                                borderTopRightRadius: "1rem"
                            }}>
                                <div className="input-group m-0 mb-1  rounded-3 p-0 form-control rounded-pill-chat border border-0 " style={{ position: "relative" }}>
                                    <input
                                        rows={1}
                                        className="border border-0 ps-2 rounded-3 fs-15  "
                                        placeholder="Comment"
                                        style={{
                                            width: "90%",
                                            height: "45px"
                                        }}
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        aria-describedby="basic-addon1"
                                    ></input>
                                    <span
                                        className="clear-button position-absolute d-flex text-end justify-content-end"
                                        id="basic-addon2"
                                        style={{
                                            right: "5px",
                                            top: "17px",
                                            transform: "translateY(-50%)"
                                        }}
                                    >
                                        <Button onClick={CommentSocial} className='p-2 mt-2 rounded-3 bg-danger ' style={{ width: "35px", height: "35px" }}>
                                            <Icon f7="paperplane" size="20px" ></Icon>
                                        </Button>
                                    </span>

                                </div>
                            </Card>



                        </List>
                    </Page>
                </View>
            </Popup>

            {/* menu-social */}
            <Popover className="popover-menu-social " style={{ width: "250px" }}>
                <List className='px-3'>
                    <ListItem >
                        <Link className='d-flex align-items-center fs-14  fw-bold' href="/profile/" data-view=".view-main" popoverClose >
                            <img src="https://www.in.pro.vn/wp-content/uploads/2025/01/avatar-nu-diu-dang.webp" className='rounded-circle me-2' style={{ width: "40px", height: "40px" }}></img>
                            Thanh Thúy
                        </Link>
                    </ListItem>
                    <ListItem >
                        <Link className='d-flex align-items-center fs-14 ' href="/social/" data-view=".view-main" popoverClose >
                            <lord-icon
                                src="https://cdn.lordicon.com/sobzmbzh.json"
                                trigger="loop"
                                colors="primary:#1fc5f7,secondary:#1fc5f7"
                                className=' me-2'
                                style={{ width: '30px', height: '30px' }}>
                            </lord-icon>
                            {t("feed")}
                        </Link>
                    </ListItem>
                    <ListItem >
                        <Link className='d-flex align-items-center fs-14 ' href="/chat-explore/" data-view=".view-main" popoverClose >
                            <lord-icon
                                src="https://cdn.lordicon.com/rrbmabsx.json"
                                trigger="loop"
                                colors="primary:#1fc5f7,secondary:#1fc5f7"
                                className=' me-2'
                                style={{ width: '30px', height: '30px' }}>
                            </lord-icon>
                            {t("explore")}
                        </Link>
                    </ListItem>
                    <ListItem  >
                        <Link className='d-flex align-items-center fs-14 ' href="/social-follower/" data-view=".view-main" popoverClose >
                            <lord-icon
                                src="https://cdn.lordicon.com/cfoaotmk.json"
                                trigger="loop"
                                colors="primary:#1fc5f7,secondary:#1fc5f7"
                                className=' me-2'
                                style={{ width: '20px', height: '20px' }}>
                            </lord-icon>
                            {t("friends")}
                        </Link>
                    </ListItem>
                    <ListItem >
                        <PageTransition className='d-flex align-items-center fs-14 ' href="/social-save/" data-view=".view-main" popoverClose>
                            <lord-icon
                                src="https://cdn.lordicon.com/lcvlsnre.json"
                                trigger="loop"
                                colors="primary:#1fc5f7,secondary:#1fc5f7"
                                className=' me-2'
                                style={{ width: '20px', height: '20px' }}>
                            </lord-icon>
                            {t("saved")}
                        </PageTransition>
                    </ListItem>
                    <ListItem  >
                        <PageTransition className='d-flex align-items-center fs-14 ' href="/social-hide/" data-view=".view-main" popoverClose>
                            <lord-icon
                                src="https://cdn.lordicon.com/dicvhxpz.json"
                                trigger="loop"
                                colors="primary:#1fc5f7,secondary:#1fc5f7"
                                className=' me-2'
                                style={{ width: '20px', height: '20px' }}>
                            </lord-icon>
                            {t("hidden")}
                        </PageTransition>
                    </ListItem>
                </List>
            </Popover>

            {/* menu từng social */}
            <Popover className="popover-menu " style={{ width: "200px" }}>
                <List className='px-3'>
                    {/* {uid_account == selectuidSocial && */}
                    <ListItem >
                        <Link className='d-flex align-items-center fs-14 ' onClick={() => { social_id(selectActive) }} fill sheetOpen=".edit-social-sheet" popoverClose >
                            <lord-icon
                                src="https://cdn.lordicon.com/fikcyfpp.json"
                                trigger="loop"
                                colors="primary:#1fc5f7,secondary:#1fc5f7"
                                className=' me-2'
                                style={{ width: '20px', height: '20px' }}>
                            </lord-icon>
                            Chỉnh sửa
                        </Link>
                    </ListItem>
                    {/* } */}

                    <ListItem >
                        <Link className='d-flex align-items-center fs-14 ' onClick={() => { socialSave() }} popoverClose >

                            {selectSaveSocial == 1 ?
                                <>
                                    <lord-icon
                                        src="https://cdn.lordicon.com/lcvlsnre.json"
                                        trigger="loop"
                                        colors="primary:#1fc5f7,secondary:#1fc5f7"
                                        className=' me-2'
                                        style={{ width: '20px', height: '20px' }}>
                                    </lord-icon>
                                    Xóa lưu
                                </>
                                :
                                <>
                                    <lord-icon
                                        src="https://cdn.lordicon.com/lcvlsnre.json"
                                        trigger="loop"
                                        colors="primary:#1fc5f7,secondary:#1fc5f7"
                                        className=' me-2'
                                        style={{ width: '20px', height: '20px' }}>
                                    </lord-icon>
                                    Lưu bài viết
                                </>
                            }
                        </Link>
                    </ListItem>
                    <ListItem popoverClose >
                        <Link className='d-flex align-items-center fs-14 ' onClick={() => { socialHide() }} popoverClose >
                            <lord-icon
                                src="https://cdn.lordicon.com/dicvhxpz.json"
                                trigger="loop"
                                colors="primary:#1fc5f7,secondary:#1fc5f7"
                                className=' me-2'
                                style={{ width: '20px', height: '20px' }}>
                            </lord-icon>
                            Ẩn bài viết
                        </Link>
                    </ListItem>
                    <ListItem >
                        <div className='d-flex align-items-center fs-14'>
                            <lord-icon
                                src="https://cdn.lordicon.com/evxithfv.json"
                                trigger="loop"
                                colors="primary:#1fc5f7,secondary:#1fc5f7"
                                className=' me-2'
                                style={{ width: '20px', height: '20px' }}>
                            </lord-icon>
                            Copy bài viết
                        </div>
                    </ListItem>
                    <ListItem popoverClose >
                        <div className='d-flex align-items-center fs-14'>
                            <lord-icon
                                src="https://cdn.lordicon.com/lltgvngb.json"
                                trigger="loop"
                                colors="primary:#1fc5f7,secondary:#1fc5f7"
                                className=' me-2'
                                style={{ width: '20px', height: '20px' }}>
                            </lord-icon>
                            Báo cáo
                        </div>
                    </ListItem>
                    {/* {uid_account == selectuidSocial && */}
                    <ListItem popoverClose >
                        <Link className='d-flex align-items-center fs-14 ' fill sheetOpen=".delete-social-sheet" popoverClose >
                            <lord-icon
                                src="https://cdn.lordicon.com/jzinekkv.json"
                                trigger="loop"
                                colors="primary:#1fc5f7,secondary:#1fc5f7"
                                className=' me-2'
                                style={{ width: '20px', height: '20px' }}>
                            </lord-icon>
                            Xóa bài viết
                        </Link>
                    </ListItem>
                    {/* } */}
                </List>
            </Popover>

            {/* add social */}
            <Popup id="add-social">
                <View>
                    <Page>
                        <Navbar title="Tạo bài viết">
                            <NavRight>
                                <Link popupClose>Close</Link>
                            </NavRight>
                        </Navbar>
                        <List className='mt-3 mb-4 px-2'>
                            <div className='row w-100'>
                                <div className='col-2'>
                                    <img src="https://www.in.pro.vn/wp-content/uploads/2025/01/avatar-nu-diu-dang.webp" className='rounded-circle' style={{ width: "40px", height: "40px" }}></img>
                                </div>
                                <div className='col-10 ps-0 '>
                                    <div className='fs-15 fw-bold'>Nguyễn Thị Thanh Thúy</div>
                                    <div className='fs-13 mt-2 fw-bold'>
                                        <span className='text-primary p-1 px-2 rounded-2 bg-primary bg-opacity-25 me-1'>Bạn bè</span> <span className='text-primary p-1 px-2 rounded-2 bg-primary bg-opacity-25 me-1'>Trải nghiệm</span>
                                    </div>
                                </div>
                            </div>
                            <div className='px-2 mt-3'>
                                <textarea rows={5} className=' rounded-3 fs-13 px-2  mb-3' placeholder="Hãy nêu cảm nghĩ của bạn" onChange={(e) => setContentAdd(e.target.value)}></textarea>
                            </div>

                            <div className="m-0 p-3 pb-5" style={{ minHeight: "300px" }}>
                                <div className="image-upload-container">
                                    <input
                                        id="fileInput"
                                        type="file"
                                        multiple
                                        accept="image/*,video/*"
                                        style={{ display: "none" }}
                                        onChange={handleImageChange}
                                    />

                                    <div className="image-grid">
                                        <div className="upload-box text-center mt-4 border border-1 p-2 rounded-3 fs-13" onClick={triggerFileInput} style={{ cursor: 'pointer' }}>
                                            <Icon f7="cloud_upload" size="30px" />
                                            <div>Thêm hình ảnh / video</div>
                                        </div>
                                        <div className="row mt-3">
                                            {media.map((item, index) => (
                                                <div key={index} className="image-item position-relative col-6 mb-3">
                                                    <Button
                                                        className="btn bg-danger btn-sm position-absolute top-0 end-0 m-1 rounded-circle p-1"
                                                        onClick={() => handleDeleteMedia(index)}
                                                        style={{ width: "30px", height: "30px" }}
                                                    >
                                                        <Icon f7="trash" size="15px" color="white" />
                                                    </Button>

                                                    {item.type === 'image' ? (
                                                        <img src={item.preview} alt={`Ảnh ${index + 1}`} className="preview-img w-100 rounded-3" />
                                                    ) : (
                                                        <video
                                                            src={item.preview}
                                                            controls
                                                            className="preview-img w-100 rounded-3"
                                                            style={{ maxHeight: "150px", objectFit: "cover" }}
                                                        />
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <footer className="fixed-bottom p-3 py-2">
                                <Button className=' rounded-pill p-4 bg-pink  mx-3 fs-6 fw-bold text-white' onClick={handleAddPost}>Đăng</Button>
                            </footer>
                        </List>
                    </Page>
                </View>
            </Popup>

            {/* Edit Social */}
            <Popup id="edit-social">
                <View>
                    <Page>
                        <Navbar title="Sửa bài viết">
                            <NavRight>
                                <Link popupClose>Close</Link>
                            </NavRight>
                        </Navbar>
                        <List className='mt-3 mb-4 px-2'>
                            <div className='px-3'>

                                <textarea rows={5} className=' rounded-3 border border-1 px-2  mb-3' placeholder="Hãy nêu cảm nghĩ của bạn" onChange={(e) => setContentAdd(e.target.value)}></textarea>
                            </div>

                            <div className="m-0 mx-3 p-3 rounded-4 border border-1" style={{ minHeight: "300px" }}>
                                <div className="image-upload-container">
                                    <input
                                        id="fileInput"
                                        type="file"
                                        multiple
                                        accept="image/*,video/*"
                                        style={{ display: "none" }}
                                        onChange={handleImageChange}
                                    />

                                    <div className="image-grid">
                                        <div className="upload-box text-center mt-4" onClick={triggerFileInput} style={{ cursor: 'pointer' }}>
                                            <Icon f7="cloud_upload" size="30px" />
                                            <div>Thêm hình ảnh / video</div>
                                        </div>

                                        <div className="row mt-3">
                                            {media.map((item, index) => (
                                                <div key={index} className="image-item position-relative col-4 mb-3">
                                                    <Button
                                                        className="btn bg-danger btn-sm position-absolute top-0 end-0 m-1 rounded-circle p-1"
                                                        onClick={() => handleDeleteMedia(index)}
                                                        style={{ width: "30px", height: "30px" }}
                                                    >
                                                        <Icon f7="trash" size="15px" color="white" />
                                                    </Button>

                                                    {item.type === 'image' ? (
                                                        <img src={item.preview} alt={`Ảnh ${index + 1}`} className="preview-img w-100 rounded-3" />
                                                    ) : (
                                                        <video
                                                            src={item.preview}
                                                            controls
                                                            className="preview-img w-100 rounded-3"
                                                            style={{ maxHeight: "150px", objectFit: "cover" }}
                                                        />
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Button className=' rounded-pill p-4 bg-pink  mt-5 mx-3 fs-6' onClick={handleAddPost}>Đăng</Button>
                        </List>
                    </Page>
                </View>
            </Popup>
            {/* Modal comment */}
            <Popup id="comment-social" className="auto-height-popup">
                <View>
                    <Page>
                        <Navbar title="Bình luận bài viết">
                            <NavRight>
                                <Link popupClose>Close</Link>
                            </NavRight>
                        </Navbar>
                        <List className='mt-0 mb-4 '>

                            <Card className='m-0  p-0 rounded-0 border border-0'>
                                <div className='d-flex align-items-center justify-content-between p-3 pb-1'>
                                    <div className='d-flex align-items-center'>
                                        <img src="https://www.in.pro.vn/wp-content/uploads/2025/01/avatar-nu-diu-dang.webp" onClick={() => { profile_social(socials.account.uid) }} className='rounded-circle' style={{ width: "40px", height: "40px" }}></img>
                                        <span className=' ms-2 fs-13'>
                                            <span className='fw-bold'> Thanh Thúy</span>
                                            <div className='fs-11 text-secondary mt-1'>31/07/2025
                                            </div>
                                        </span>
                                    </div>
                                    <div className='d-flex align-items-center'>
                                        <Button fill popoverOpen=".popover-menu" className='rounded-circle bg-transparent p-1 text-center me-2' style={{ width: "30px", height: "30px" }}> <Icon f7="ellipsis" size="20px" ></Icon></Button>
                                        {/* <Button fill popoverOpen=".popover-menu" className='rounded-circle bg-transparent p-1 text-center' style={{ width: "30px", height: "30px" }}> <Icon f7="xmark" size="20px" ></Icon></Button> */}
                                    </div>
                                </div>
                                <div className="p-2 px-3">
                                    <div
                                        className={`fs-13 ${expanded ? "" : "line-clamp"}`}
                                        style={{
                                            overflow: "hidden",
                                            display: "-webkit-box",
                                            WebkitLineClamp: expanded ? "unset" : 3, // số dòng
                                            WebkitBoxOrient: "vertical"
                                        }}
                                    >
                                        Happy Corp tiên phong trong việc kiến tạo các điểm đến giải trí mang phong cách Nightlife, nơi hội tụ không gian sáng tạo, dịch vụ tinh tế và trải nghiệm phong cachs sống hiện đại, nhằm mang đến giá trị khác biệt cho khách hàng.
                                    </div>

                                    <button
                                        className="btn btn-link p-0 text-start fs-13"
                                        onClick={() => setExpanded(!expanded)}
                                    >
                                        {expanded ? "Thu gọn" : "Xem thêm"}
                                    </button>
                                </div>
                                <div className='grid grid-cols-2'>
                                    <div className=' p-0'>
                                        <img src='https://media.macphun.com/img/uploads/customer/how-to/608/15542038745ca344e267fb80.28757312.jpg?q=85&w=1340' className='w-100'></img>
                                    </div>
                                    <div className=' p-0'>
                                        <img src='https://images.pexels.com/photos/1194775/pexels-photo-1194775.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' className='w-100'></img>
                                    </div>
                                </div>

                                <div className='d-flex justify-content-between align-items-center fs-13 p-2 px-3'>
                                    <div className='d-flex align-items-center'>
                                        <Icon f7="hand_thumbsup_fill" size="20px" color='blue' className='me-1'></Icon> 12
                                    </div>
                                    <div className='d-flex align-items-center'>
                                        12 Bình luận
                                    </div>
                                </div>
                                <div className='grid grid-cols-3  grid-gap my-2  fs-13'>
                                    <div className=' d-flex justify-content-center'>
                                        <div className='d-flex align-items-center'>
                                            <div onClick={() => setLiked(!liked)} style={{ cursor: "pointer" }}>
                                                {liked ? (
                                                    <Icon
                                                        f7="hand_thumbsup_fill"
                                                        size="20px"
                                                        className="me-1 color-icon"
                                                    />
                                                ) : (
                                                    <Icon
                                                        f7="hand_thumbsup"
                                                        size="20px"
                                                        className="me-1 color-icon"
                                                    />
                                                )}
                                            </div>
                                            Like
                                        </div>
                                    </div>
                                    <div className=' text-center'>
                                        <Link fill popupOpen="#comment-social">
                                            <Icon f7="chat_bubble" size="20px" className="me-1 color-icon"></Icon>
                                            Comment
                                        </Link>
                                    </div>
                                    <div className=' text-center'>
                                        <div>
                                            <Icon f7="arrowshape_turn_up_right" size="20px" className="me-1 color-icon"></Icon>
                                            Share
                                        </div>
                                    </div>
                                </div>
                            </Card>
                            <div className='px-3 fs-13' style={{ marginBottom: "70px" }}>
                                {textComment && textComment.map((cmt) => {
                                    return (
                                        <>
                                            <div className='row mt-4'>
                                                <div className='col-2'>
                                                    <img src={`${cmt.avatar}`} className='w-100 rounded-circle'></img>
                                                </div>
                                                <div className='col-10 ps-0  border-bottom'>
                                                    <div className='d-flex align-items-center justify-content-between'>
                                                        <div className='fs-15 fw-bold'>{cmt.account} <span className='fs-11 text-secondary ms-2'> {cmt.date}</span></div>
                                                        {/* {cmt.id_account == acc_social_view.id ? */}
                                                        <div className='fs-11 d-flex align-items-center' onClick={() => { deleteComment(cmt.active) }}>
                                                            <lord-icon
                                                                src="https://cdn.lordicon.com/fozsorqm.json"
                                                                trigger="loop"
                                                                colors="primary:#1fc5f7,secondary:#1fc5f7"
                                                                className=' me-3'
                                                                style={{ width: '20px', height: '20px' }}>
                                                            </lord-icon>
                                                            <lord-icon
                                                                src="https://cdn.lordicon.com/jzinekkv.json"
                                                                trigger="loop"
                                                                colors="primary:red,secondary:red"
                                                                className=''
                                                                style={{ width: '15px', height: '15px' }}>
                                                            </lord-icon>
                                                        </div>
                                                        {/* :
                                                        <div></div>
                                                         } */}
                                                    </div>
                                                    <div className='mt-1'>
                                                        <div className='w-100  fs-13 py-2 pt-0 text-secondary'>
                                                            {cmt.content}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )
                                })}

                            </div>


                            <div className='px-4 py-2 ' style={{
                                cursor: 'pointer', position: "fixed",
                                bottom: 0,
                                left: 0,
                                right: 0,
                                zIndex: 1000,
                            }}>

                                <div className="d-flex align-items-center bg-input  rounded-3 p-1 row" style={{

                                }}>
                                    <input className='border bg-input rounded-3 border-0 p-2 px-3 fs-13 col-10' placeholder='Nhập nội dung'></input>
                                    <Button fill={false} className=" col-2 pe-0 d-flex justify-content-end">
                                        <Icon f7="location_fill" size="25px" color='pink' className='me-1'></Icon>
                                    </Button>
                                </div>
                            </div>


                        </List>
                    </Page>
                </View>
            </Popup>
            {/* //delete social */}
            <Sheet
                push
                className="delete-social-sheet rounded-5 modal-delete"
                opened={sheetOpenedDeleteSocial}
                onSheetClosed={() => {
                    setSheetOpenedDeleteSocial(false);
                }}
                style={{ height: "auto", width: "70%", backgroundColor: "rgba(52, 58, 64)", color: "white" }}
                swipeToClose
                swipeToStep
                backdrop>

                <PageContent className='p-4 text-center'>
                    <img src='../img/deleted.svg'></img>
                    <div className='fs-14  my-2'>{t("title_delete")}</div>
                    <div className='d-flex align-items-center justify-content-center '>
                        <Button className='  fs-15 rounded-pill me-3' style={{ padding: "22px" }} sheetClose>{t("cancel")}</Button>
                        <Button className='bg-danger   fs-15  rounded-pill' style={{ padding: "22px" }} onClick={DeleteSocial}>{t("delete")}</Button>
                    </div>
                </PageContent>
            </Sheet>
        </>
    );
};
export default SocialPage;