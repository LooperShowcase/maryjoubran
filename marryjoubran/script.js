let open_ai_response;

let conversation = [
{ role: "user" , content: "hi"},
{ role: "assistant",content : "hi, how can i help u today"},
]
async function conversationUserAdd(question,sentiment){
    conversation.push( {
        role:"user",
        content:"My happinest out of 10: "+sentiment+ "my question is:" + question
    })
}
async function conversationAssistantAdd(response){
    conversation.push( { role: "assistant",content:response});
}
async function openai_test(){
    let url ="https://api.openai.com/v1/chat/completions";

    //

    let apikey1="sk-";
    let apikey2="BFXn6S1AlIDqGCX7xe3YT3Blb";
    let apikey3="kFJbnCYChkNgKO6BHhVvfx2";
    let apikey =apikey1 + apikey2 + apikey3;

    let data = {model: "gpt-3.5-turbo", messages : conversation};

    try {
        const response =await fetch (url, {
            method:"POST",
            headers:{
                "Content-Type": "application/json",
                Authorization : `Bearer ${apikey}`


            },
            body : JSON.stringify(data)
        })
        if (response.ok){
            const responseData = await response.json();
            const message = responseData.choices[0].message.content;
           conversationAssistantAdd(message);
            console.log(message)
        const  uttetance = new SpeechSynthesisUtterance(message);
        speechSynthesis.speak(uttetance);
        return message;
        }
        else{console.log("request failed with status",response.status)
        
        
        }
    } catch (error) {
        console.log(error)
    }





}