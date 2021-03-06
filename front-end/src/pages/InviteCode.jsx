import "./InviteCode.css";
import React from "react";
import InviteCodeInput from "../components/InviteCodeInput";
import Button from "../components/Button";
import Spacer from "../components/Spacer";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

function InviteCode() {
  const history = useHistory();
  const inviteCode = getInviteCode();

  return (
    <div className="InviteCode">
      <div id="copy-msg">
        <span>✨ Copied to Clipboard ✨</span>
      </div>
      <div className="InviteCode__title">Your Invite Code</div>
      <div className="InviteCode__invite">
        <InviteCodeInput disabled value={inviteCode} />
        <Button id="copyButton" text="Copy" width="70px" height="40px" bg="#ECECEC" color="#000" onClick={() => {
          navigator.clipboard.writeText(getInviteCode());
          successMessage();
        }}
        />
      </div>
      <Spacer space="75" />
      <Link to="/new-user" className="InviteCode__button">
        <Button text="Continue" width="300px" height="50px" />
      </Link>
    </div>
  );

  function getInviteCode() {
    const roomId = history?.location?.state?.roomId;
    return roomId || "N/A";
  }

  function successMessage() {
    let copyMsg = document.getElementById("copy-msg");
    copyMsg.style.display = "inline";
    setTimeout(function () {
      copyMsg.style.display = "none";
    }, 2500);
  }
}

export default InviteCode;
