import react from "react";
import ChatGPTLogo from "./chatGBTLogo";


function MessageList() {
    return <div className={'flex flex-col items-center justify-center h-full text-center px-4'}> message list
    <ChatGPTLogo className={'w-16 h-16 text-green-500 mb-4'} />
    <h2> How can i help you?</h2>
    </div>
}

export default MessageList;