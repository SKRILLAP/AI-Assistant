let prompt=document.querySelector("#prompt")
let container=document.querySelector(".container")
let btn=document.querySelector("#btn")
let chatContainer=document.querySelector(".chat-container")
let userMessage=null;
let api_url=''
function createChatBox(html,className){
    let div=document.createElement("div")
    div.classList.add(className)
    div.innerHTML=html
    return div
}

async function getApiResponse(aiChatBox) {
    let textElement = aiChatBox.querySelector(".text");
    try {
        // Correct way to call the fetch API
        let response = await fetch(api_url, { 
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "contents": [{
                    "parts": [{ text: userMessage }]
                }]
            })
        });

        // Wait for the response JSON
        let data = await response.json();

        // Extract the API response content
        let apiResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text;

        // Check if response exists and update the text
        textElement.innerText = apiResponse || "No response from the API.";
    } catch (error) {
        console.log(error);
        textElement.innerText = "An error occurred while fetching the API response.";
    } finally {
        // Hide the loading animation
        aiChatBox.querySelector(".loading").style.display = "none";
    }
}


function showLoading(){
    let html=`<div class="img">
                <img src="../assets/bot.png" alt="" width="50">
            </div>
            <p class="text"></p>
            <img class="loading" src="../assets/loading.gif" alt="loading" height="50">`
            let aiChatBox = createChatBox(html,"ai-chat-box")
            chatContainer.appendChild(aiChatBox)
            getApiResponse(aiChatBox)
}

btn.addEventListener("click",()=>{
    userMessage=prompt.value
    if(userMessage==""){
        container.style.display="flex"
    }{
        container.style.display="none"
    }
    if(!userMessage) return;
    let html = `
            <div class="img">
                <img src="../assets/user.png" alt="user" width="50">
            </div>
            <p class="text"></p>`;

            let userChatBox = createChatBox(html,"user-chat-box")
            userChatBox.querySelector(".text").innerText=userMessage
            chatContainer.appendChild(userChatBox)
            prompt.value=""
            setTimeout(showLoading,500)
})