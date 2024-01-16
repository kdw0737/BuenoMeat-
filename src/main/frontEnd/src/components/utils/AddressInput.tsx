import React, { useState } from 'react';
import { FieldValues, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import DaumPostcode, { Address } from "react-daum-postcode";

interface AddressInputProps {
    label?: string;
    register?: UseFormRegister<FieldValues>;
    setValue?: UseFormSetValue<FieldValues>;
    message?: string;
    required?: boolean;
}


const AddressInput:React.FC<AddressInputProps> = ({ 
    register, 
    setValue, 
    label, 
    required, 
    }: AddressInputProps) => {

    const [popup, setPopup] = useState(false);

    const complete = (data: Address) => {
        
        
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
            }
            fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }
        
        if (setValue) {
            setValue('address', fullAddress);
        }

        if (register) {
            register('address', { required });
        }
    }

    return (
        <div className='relative'>
            <div className='flex items-center gap-5 '>
                <button className='w-1/3 bg-green-500 h-[68px]' onClick={() => setPopup(!popup)}>Post</button>
                <input
                    className={`
                        p-4
                        pt-6
                        border-2 
                        border-black 
                        rounded-md
                    `}
                    type="text"
                    {...(register ? register('address', { required }) : {})}
                />
                <label 
                    className={`
                        absolute
                        font-light
                        text-zinc-400
                        text-md
                        duration-150
                        transform
                        -translate-y-3
                        top-5
                        z-10
                        origin-[0]
                        left-[150px]
                        peer-placeholder-shown:scale-100
                        peer-placeholder-shown:translate-y-0
                        peer-focus:scale-75
                        peer-focus:-translate-y-4
                    `}
                >
                {label}
            </label>
            </div>
            {popup && <div>
                <DaumPostcode 
                    autoClose
                    onComplete={complete}
                />
            </div>}
            
        </div>
    );
};

export default AddressInput;


