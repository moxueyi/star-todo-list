export function generateRandomId() {  
    const timestamp = Date.now();  
  
    const randomLetters = Math.random()  
        .toString(36)  
        .substring(7);  
  
    const id = `${timestamp}-${randomLetters}`;  
  
    return id;  
}  

// const randomId = generateRandomId();  
// console.log(randomId);
