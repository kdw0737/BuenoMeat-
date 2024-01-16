import { useEffect, useState } from "react";
import { IconType } from "react-icons"

interface SelectedStarsProps {
    fillStar: IconType;
    setStarNum:  React.Dispatch<React.SetStateAction<number>>;
}

const SelectedStars = ({
    fillStar: Icon,
    setStarNum
}: SelectedStarsProps) => {
    let initialStarColors: Array<string> = ["orange", "orange", "orange", "orange", "orange"];
    const [starStatus, setStarStatus] = useState<string[]>(initialStarColors);
    const [statusText, setStatusText] = useState('최고');
    

    const changeStarColor = (id: number) => {
        const newStarColors: Array<string> = [];
        for (let i = 0; i < 5; i++) {
            if (i <= id) {
                newStarColors.push("orange");
            }   else {
                newStarColors.push("black");
            }
        }
        setStarStatus(newStarColors);
        setStarNum(newStarColors.filter((star) => star === "orange").length);
    }

    useEffect(() => {
        let orangeFrequency = 0;
        
        starStatus.map((status) => {
            if (status === "orange")  
            return orangeFrequency = orangeFrequency + 1;
        });

        switch (orangeFrequency) {
            case 5:
                setStatusText("최고");
                break;
            case 4:
                setStatusText("좋음");
                break;
            case 3:
                setStatusText("보통");
                break;
            case 2:
                setStatusText("별로");
                break;
            case 1:
                setStatusText("나쁨");
                break;
        }
    }, [changeStarColor])

    return (
        <div className="flex items-center gap-1">
            <Icon size={32} color={starStatus[0]} className="transition duration-300 hover:opacity-40" onClick={() => changeStarColor(0)}/>
            <Icon size={32} color={starStatus[1]} className="transition duration-300 hover:opacity-40" onClick={() => changeStarColor(1)}/>
            <Icon size={32} color={starStatus[2]} className="transition duration-300 hover:opacity-40" onClick={() => changeStarColor(2)}/>
            <Icon size={32} color={starStatus[3]} className="transition duration-300 hover:opacity-40" onClick={() => changeStarColor(3)}/>
            <Icon size={32} color={starStatus[4]} className="transition duration-300 hover:opacity-40" onClick={() => changeStarColor(4)}/>
            <p className="pl-2 text-semibold">{statusText}</p>
        </div>
    )
}

export default SelectedStars
