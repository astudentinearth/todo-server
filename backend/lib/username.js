/**
 * 
 * @param {string} username 
 */
export function validateUsername(username){
    const exp = new RegExp(/^[a-z0-9]+$/i);
    const match = username.match(exp);
    if(match==null) return false;
    if(match.length==0) return false;
    if(username.length>32) return false;
    return true;
}