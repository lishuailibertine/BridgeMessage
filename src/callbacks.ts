let callbacks = new Array();
export function callback(messageId: string, error: any, result: any){
    for(var key in callbacks){ 
       if (key == messageId ){
        console.log("Callback->",messageId, error ? error : result)
         error ? callbacks[key].reject(new Error(error)) : callbacks[key].resolve(result)
         delete callbacks[key]
         break
       }
    }
};