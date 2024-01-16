import { IconType } from "react-icons";

interface ShowStarsProps {
    starNum: number;
    size?: number;
    fillStar: IconType;
}

const ShowStars = ({
    starNum,
    size,
    fillStar: Icon,
}: ShowStarsProps) => {

    const starAndText = [
        {
            starStatus: ["orange", "black", "black", "black", "black"],
            statusText: "나쁨"
        },
        {
            starStatus: ["orange", "orange", "black", "black", "black"],
            statusText: "별로"
        },
        {
            starStatus: ["orange", "orange", "orange", "black", "black"],
            statusText: "보통"
        },
        {
            starStatus: ["orange", "orange", "orange", "orange", "black"],
            statusText: "좋음"
        },{
            starStatus: ["orange", "orange", "orange", "orange", "orange"],
            statusText: "최고"
        },
    ];
    
    return (
        <div className="flex items-center gap-1">
            {starNum && <><Icon size={size ? size : 32} color={starAndText[starNum-1].starStatus[0]} />
            <Icon size={size ? size : 32} color={starAndText[starNum-1].starStatus[1]} />
            <Icon size={size ? size : 32} color={starAndText[starNum-1].starStatus[2]} />
            <Icon size={size ? size : 32} color={starAndText[starNum-1].starStatus[3]} />
            <Icon size={size ? size : 32} color={starAndText[starNum-1].starStatus[4]} />
            <p className="pl-2 text-semibold">{starAndText[starNum-1].statusText}</p></>}
        </div>
    )
}

export default ShowStars