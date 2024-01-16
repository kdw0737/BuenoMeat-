import { FaCow, FaPiggyBank, FaFish } from "react-icons/fa6"
import { GiChicken, GiKnifeFork, GiSheep } from "react-icons/gi"
import IconCard from "../utils/IconCard"

export const Categories = [
    {
        id: 1,
        label: 'Pig',
        icon: FaPiggyBank,
        path: 'pig'
    },
    {
        id: 2,
        label: 'Cow',
        icon: FaCow,
        path: 'cow'
    },
    {
        id: 3,
        label: 'Chicken',
        icon: GiChicken,
        path: 'chicken'
    },
    {
        id: 4,
        label: 'Sheep',
        icon: GiSheep,
        path: 'sheep'
    },
    {
        id: 5,
        label: 'Fishery',
        icon: FaFish,
        path: 'fish'
    },
    {
        id: 6,
        label: 'MealKit',
        icon: GiKnifeFork,
        path: 'meal_kit'
    }
]

export const ShowCategoryItems = () => {
    return (
        <div className="grid grid-cols-3 gap-2 mt-12">
            {Categories.map(c => (
                <IconCard
                    key={c.id}
                    label={c.label}
                    icon={c.icon}
                    path={c.path}
                />
            ))}
        </div>
    )
}