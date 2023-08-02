export const callbacks = new Array();
export function callback(messageId: string, error: any, result: any){
    console.log("response->",messageId, error ? error : result)
    for(var key in callbacks){ 
       if (key == messageId ){
         error ? callbacks[key].reject(new Error(error)) : callbacks[key].resolve(result)
         delete callbacks[key]
         break
       }
    }
};