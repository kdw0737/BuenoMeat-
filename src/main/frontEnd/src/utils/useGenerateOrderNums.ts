export const useGenerateOrderNums = () => {
    const timestamp = String(Date.now()).slice(0,4);
    const random = Math.floor(Math.random() * 10000); 
    return `${timestamp}${random}`;
};