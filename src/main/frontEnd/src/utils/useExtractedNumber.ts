export default function useExtractedNumber (enteredValue: string): number   {
    if (enteredValue === '') {
        return 0;
    }
    let plusIndex = enteredValue.indexOf("+");
    
    let subStringAfterPlus = enteredValue.substring(plusIndex + 1);

    let wonIndex = subStringAfterPlus.indexOf("원");    
    let result = subStringAfterPlus.substring(0, wonIndex);

    let extractedValue = parseInt(result, 10);

    return extractedValue;
}

