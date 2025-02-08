export const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);  // ✅ Return true or false
  };

  export const getInitials=(name)=>{
    if(!name) return "";
    const words=name.trim().split(" ");
    let initials= "";
    for (let i = 0; i < Math.min(words.length, 2); i++) {

      initials+=words[0][0]
    }
    return initials.toUpperCase();
  }