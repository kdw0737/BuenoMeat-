import React from 'react'

interface ContainerProps {
    children: React.ReactNode;
    className?: string; // 추가된 부분
}


const Container = ({ children, className }: ContainerProps) => {
    const combinedClassName = `
        max-w-[2520px]
        mx-auto
        xl:px-20
        md:px-10
        sm:px-2
        px-4
        ${className || ''}`
    return (
        <div className={combinedClassName}>
            {children}
        </div>
    )
}

export default Container

