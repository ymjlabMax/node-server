/* eslint-disable */
import React, { useState } from "react";
import axios from "axios";
import Infomodal from "../components/modal/Infomodal.js";

axios.defaults.withCredentials = true;

function Authpage() {
    const [isOpen, setIsOpen] = useState(false);

    const [authInfo, setAuthInfo] = useState({
        authKey: "",
        nickName: "",
        baseDate: "",
    });

    const [nickName, setNickName] = useState("");
    const [authKey, setAuthKey] = useState("");
    const [baseDay, setBaseDay] = useState("");

    let API_NODE = process.env.REACT_APP_YMJ_API_URL_NODE;
    let Link = process.env.REACT_APP_YMJ_SHOP_NAVER_STORE;

    const handleModal = () => {
        setIsOpen(true);
    };

    const handlenickName = (e) => {
        setNickName(e.target.value);
    };

    const handleauthKey = (e) => {
        setAuthKey(e.target.value);
    };

    const handleBaseDay = (e) => {
        setBaseDay(e.target.value);
    };

    const handleSubmit = () => {
        let checkNum = /[0-9]{10}$/;

        if (!authKey) {
            alert("인증번호를 입력해주세요");
        } else if (!checkNum.test(authKey)) {
            alert("인증번호 숫자 10자리르 입력주세요.");
        } else if (!nickName) {
            alert("제페토 아이디를 입력해주세요.");
        } else if (!baseDay) {
            alert("이용날짜를 넣어주세요");
        } else {
            const parameter = {
                authKey: authKey,
                nickName: nickName,
                baseDay: baseDay,
            };

            console.log("파라미터", parameter);
            console.log("API_URL2222", API_NODE);
            console.log("API_URL", Link);
            axios
                .post(`${API_NODE}/shopHistory`, parameter, { headers: { Accept: "application/json" } })

                .then((res) => {
                    console.log("성공", res);
                    if (res.data === "Y") {
                        window.location.href = `${Link}`;
                    } else {
                        alert("유효하지 않는 인증번호 입니다. 다시 입력해주세요.");
                    }
                })
                .catch((err) => {
                    console.log("에러", err);
                });
        }
    };

    return (
        <>
            <section className="container">
                <div className="flex-box">
                    <div className="title-img">
                        <div className="btn-detail open-btn" onClick={handleModal}>
                            더보기
                        </div>
                        {isOpen ? <Infomodal setIsOpen={setIsOpen} /> : null}
                    </div>
                    <div className="info-wrap">
                        <div className="info-content">
                            <div className="info-title">요망진샵 접속정보</div>
                        </div>
                        <div className="info-content">
                            <input
                                className="info-input"
                                type="text"
                                id="authkey"
                                placeholder="인증번호 : 10자리 숫자"
                                required
                                aria-required="true"
                                onChange={handleauthKey}
                            />
                        </div>
                        <div className="info-content">
                            <input
                                className="info-input"
                                type="text"
                                id="nickname"
                                placeholder="제페토 계정 아이디"
                                required
                                aria-required="true"
                                onChange={handlenickName}
                            />
                        </div>
                        <div className="info-content">
                            <input
                                className="info-input datepicker"
                                type="text"
                                id="baseday"
                                placeholder="이용날짜 : YYYY-MM-DD"
                                required
                                aria-required="true"
                                onChange={handleBaseDay}
                            />
                        </div>
                        <div className="info-content">
                            <a className="info-btn" type="button" onClick={() => handleSubmit()}>
                                입장하기
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Authpage;
