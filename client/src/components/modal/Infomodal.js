import React from "react";
import "../../App.css";

function Infomodal({ setIsOpen }) {
    return (
        <>
            <div className="modal">
                <div className="bg" onClick={() => setIsOpen(false)}></div>
                <div className="modal-box">
                    <h1>[ 요망진SHOP ]은 제페토 내 "리얼제주오름" 탐방자(인증서 발급자)에 한하여 이용가능한 비공개 스토어 입니다.</h1>
                    <p>* (인증번호 보유자) 발급받은 인증번호, 제페토 아이디, 이용날짜 입력시 스토어 접속</p>
                    <p>* (인증번호 미보유자) 제페토에서 '리얼제주오름' 이용 완료 후 인증번호 발급 필요</p>
                    <div className="btn-box">
                        <div className="close-btn" onClick={() => setIsOpen(false)}>
                            닫기
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Infomodal;
